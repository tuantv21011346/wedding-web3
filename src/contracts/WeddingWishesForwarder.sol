// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./WeddingWishes.sol";

/**
 * @title WeddingWishesForwarder
 * @dev Contract to handle meta-transactions for the WeddingWishes contract
 * Allows guests to submit wishes without paying gas (handled by the couple)
 */
contract WeddingWishesForwarder {
    // Reference to the main WeddingWishes contract
    WeddingWishes public weddingWishes;
    
    // Biconomy trusted forwarder address
    address public trustedForwarder;
    
    // Owner of the contract
    address public owner;
    
    constructor(address _weddingWishesAddress, address _trustedForwarder) {
        weddingWishes = WeddingWishes(_weddingWishesAddress);
        trustedForwarder = _trustedForwarder;
        owner = msg.sender;
    }
    
    /**
     * @dev Modifier to verify if the sender is the trusted forwarder
     */
    modifier onlyTrustedForwarder() {
        require(
            msg.sender == trustedForwarder,
            "WeddingWishesForwarder: caller is not the trusted forwarder"
        );
        _;
    }
    
    /**
     * @dev Modifier to verify if the sender is the owner
     */
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "WeddingWishesForwarder: caller is not the owner"
        );
        _;
    }
    
    /**
     * @dev Updates the trusted forwarder address
     * @param _trustedForwarder The new trusted forwarder address
     */
    function setTrustedForwarder(address _trustedForwarder) external onlyOwner {
        trustedForwarder = _trustedForwarder;
    }
      /**
     * @dev Check if an address is a trusted forwarder
     * @param forwarder Address to check
     * @return bool True if the address is the trusted forwarder
     */
    function isTrustedForwarder(address forwarder) public view returns(bool) {
        return forwarder == trustedForwarder;
    }
    
    /**
     * @dev Add a wish through the forwarder (bypassing gas fees for the sender)
     * @param _message The message content
     * @param _senderName The name of the sender
     * @param _imageIpfsHash Optional IPFS hash for an image
     */
    function addWish(
        string memory _message,
        string memory _senderName,
        string memory _imageIpfsHash
    ) external {
        // Call the WeddingWishes contract
        weddingWishes.addWish(_message, _senderName, _imageIpfsHash);
    }
}
