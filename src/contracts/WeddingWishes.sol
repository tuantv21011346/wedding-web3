// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title WeddingWishes
 * @dev Contract for storing wedding wishes on Polygon network
 */
contract WeddingWishes {
    struct Wish {
        address sender;
        string message;
        uint256 timestamp;
        string senderName;
        string imageIpfsHash; // Optional: IPFS hash for an image if provided
    }

    // Array to store all wishes
    Wish[] public wishes;
    
    // Event emitted when a new wish is added
    event WishAdded(
        address indexed sender,
        string message,
        uint256 timestamp,
        string senderName,
        string imageIpfsHash
    );

    // Owner of the contract (usually the couple)
    address public owner;
    
    // Trusted forwarding addresses allowed to submit wishes on behalf of users
    mapping(address => bool) public trustedForwarders;
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Modifier to check if sender is a trusted forwarder or the caller
     */
    modifier onlyOwnerOrForwarder() {
        require(
            msg.sender == owner || trustedForwarders[msg.sender],
            "WeddingWishes: not authorized"
        );
        _;
    }
    
    /**
     * @dev Set a trusted forwarder for meta-transactions
     * @param _forwarder Address of the forwarder contract
     * @param _status True to add as trusted, false to remove
     */
    function setTrustedForwarder(address _forwarder, bool _status) external {
        require(msg.sender == owner, "WeddingWishes: only owner can set trusted forwarders");
        trustedForwarders[_forwarder] = _status;
    }

    /**
     * @dev Add a new wish to the wedding
     * @param _message The wish/message content
     * @param _senderName The name of the sender
     * @param _imageIpfsHash Optional IPFS hash for an image
     */
    function addWish(
        string memory _message,
        string memory _senderName,
        string memory _imageIpfsHash
    ) public {
        require(bytes(_message).length > 0, "Message cannot be empty");
        
        // Create and store the new wish
        wishes.push(
            Wish({
                sender: msg.sender,
                message: _message,
                timestamp: block.timestamp,
                senderName: _senderName,
                imageIpfsHash: _imageIpfsHash
            })
        );
        
        // Emit event
        emit WishAdded(
            msg.sender,
            _message,
            block.timestamp,
            _senderName,
            _imageIpfsHash
        );
    }
    
    /**
     * @dev Get all wishes
     * @return All wishes stored in the contract
     */
    function getAllWishes() public view returns (Wish[] memory) {
        return wishes;
    }
    
    /**
     * @dev Get the total number of wishes
     * @return The number of wishes
     */
    function getWishCount() public view returns (uint256) {
        return wishes.length;
    }
    
    /**
     * @dev Get a specific wish by index
     * @param _index The index of the wish
     * @return The wish at the given index
     */
    function getWishAt(uint256 _index) public view returns (
        address sender,
        string memory message,
        uint256 timestamp,
        string memory senderName,
        string memory imageIpfsHash
    ) {
        require(_index < wishes.length, "Index out of bounds");
        
        Wish storage wish = wishes[_index];
        return (
            wish.sender,
            wish.message,
            wish.timestamp,
            wish.senderName,
            wish.imageIpfsHash
        );
    }
}
