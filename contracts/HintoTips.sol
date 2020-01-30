pragma solidity 0.5.10;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract HintoTips is Ownable {
    mapping(address => bool) publishers;
    uint256 tipsCount;
    mapping(uint256 => Tip) public tips;

    struct Tip {
        address publisher;
        bytes32 tipCode;
        bytes32 tipMetaSha256Hash;
        bytes32[] recipients;
        bool isValid;
    }

    event ApprovePublisher(address publisher);
    event PublisherDisapproved(address publisher);
    event TipPublished(
        address publisher,
        bytes32 tipCode,
        uint256 tipId,
        bytes32[] indexed recipients
    );
    event TipVoided(uint256 tipId);

    modifier isPublisher() {
        require(
            publishers[msg.sender],
            "Only approved publishers can call this method"
        );
        _;
    }

    modifier tipExists(uint256 _tipId) {
        require(tipsCount > _tipId, "Tip with the given id does not exist");
        _;
    }

    function approvePublisher(address _publisher) external onlyOwner() {
        publishers[_publisher] = true;
        emit ApprovePublisher(_publisher);
    }

    function disapprovePublisher(address _publisher) external onlyOwner() {
        publishers[_publisher] = false;
        emit PublisherDisapproved(_publisher);
    }

    function publishTip(
        bytes32 _tipCode,
        bytes32 _tipMetaSha256Hash,
        bytes32[] calldata _recipients
    ) external isPublisher() {
        Tip memory tip = Tip(
            msg.sender,
            _tipCode,
            _tipMetaSha256Hash,
            _recipients,
            true
        );
        tips[tipsCount] = tip;
        emit TipPublished(msg.sender, _tipCode, tipsCount, _recipients);
        tipsCount++;
    }

    function invalidateTip(uint256 _tipId) external tipExists(_tipId) {
        require(
            msg.sender == owner() || tips[_tipId].publisher == msg.sender,
            "Only the contract owner or the tip publisher can unvalid it"
        );
        tips[_tipId].isValid = false;
        emit TipVoided(_tipId);
    }

    function getTipsCount() external view returns (uint256) {
        return tipsCount;
    }

    function getTip(uint256 _tipId)
        external
        view
        tipExists(_tipId)
        returns (address, bytes32, bytes32, bytes32[] memory, bool)
    {
        return (
            tips[_tipId].publisher,
            tips[_tipId].tipCode,
            tips[_tipId].tipMetaSha256Hash,
            tips[_tipId].recipients,
            tips[_tipId].isValid
        );
    }
}
