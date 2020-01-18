pragma solidity ^0.5.0;

contract Greeting {
  uint data;
  string strData;

  function setStr(string memory _strData) public {
      strData = _strData;
  }  

  function getStr() view public returns(string memory) {
      return strData;
  }

  function setData(uint _data) external {
  	data = _data;
  }

  function getData() external view returns(uint) {
  	return data;
  }
}
