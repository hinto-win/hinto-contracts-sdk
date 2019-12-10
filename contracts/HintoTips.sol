pragma solidity 0.5.10;


contract HintoTips {
    address owner;
    mapping(address => bool) publishers;
    uint tipsCount;
    mapping(uint => Tip) public tips;


    struct Tip {
        address publisher;
        bytes32 tipCode;
        bytes32 tipMetaSha256Hash;
        bytes32[] recipients;
        bool isValid;
    }

    event ApprovePublisher(address publisher);
    event TipPublished(
        address publisher,
        bytes32 tipCode,
        uint tipId,
        bytes32[] indexed recipients
    );
    event TipVoided(uint tipId);

    modifier isOwner() {
        require(msg.sender == owner, "Only the contract owner can call this method");
        _;
    }

    modifier isPublisher() {
        require(publishers[msg.sender], "Only approved publishers can call this method");
        _;
    }

    modifier tipExists(uint _tipId) {
        require(tipsCount > _tipId, "Tip with the given id does not exist");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function approvePublisher(address _publisher) external isOwner() {
        publishers[_publisher] = true;
        emit ApprovePublisher(_publisher);
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

    function invalidateTip(uint _tipId) external tipExists(_tipId) {
        require(msg.sender == owner || tips[_tipId].publisher == msg.sender, "Only the contract owner or the tip publisher can unvalid it");
        tips[_tipId].isValid = false;
        emit TipVoided(_tipId);
    }

    function getTipsCount() external view returns(uint) {
        return tipsCount ;
    }

    function getTip(uint _tipId) external tipExists(_tipId) view returns(
        address,
        bytes32,
        bytes32,
        bytes32[] memory,
        bool) {
        return (
            tips[_tipId].publisher,
            tips[_tipId].tipCode,
            tips[_tipId].tipMetaSha256Hash,
            tips[_tipId].recipients,
            tips[_tipId].isValid
        );
    }
}