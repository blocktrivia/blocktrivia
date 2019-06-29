pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract BlockTriviaToken is ERC20, ERC20Detailed {

  uint private INITIAL_SUPPLY = 1000000000e18;

  constructor() public ERC20Detailed("BlockTrivia Token", "BTV", 18) {
    _mint(msg.sender, INITIAL_SUPPLY);
  }
}

// import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';

// contract BlockTriviaToken is ERC20Mintable {
//   string public name = "BlockTrivia Token";
//   string public symbol = "BTV";
//   uint8 public decimals = 18;
// }
