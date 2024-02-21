// SPDX-License-Identifier: MIT
pragma  solidity <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage , Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    constructor() ERC721("Testnet","TEST") Ownable() payable {}

    function mintNFT(string memory tokenURI) public payable onlyOwner returns(uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function burn1(uint tokenId, uint mintAmount) public {
        _burn(tokenId);
        payable(msg.sender).transfer(mintAmount);
    }
}