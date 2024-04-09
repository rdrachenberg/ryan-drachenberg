// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract Donate is Ownable(msg.sender) {
    using SafeERC20 for IERC20;

    event PaymentReceived(address indexed sender, uint256 amount);
    event Withdraw(address indexed  recipient, uint256 amount);
    event WithdrawERC20(
        address indexed recipient,
        address indexed token,
        uint256 amount
    );

    receive() external payable { 
        emit PaymentReceived(msg.sender, msg.value);
    }

    function deposit() external payable {
        require(msg.value > 0 gwei, "You must send some value");
        emit PaymentReceived(msg.sender, msg.value);
    }

    function withdraw() external onlyOwner {
        uint256 amount = address(this).balance;

        (bool success, ) = (msg.sender).call{value: amount}("");
        require(success, "Failed to send");

        emit Withdraw((msg.sender), amount);
    }

    function transferNetworkToken(address _to, uint256 _amount) external onlyOwner {
        (bool success,) = _to.call{value: _amount}("");

        require(success, "Failed to Transfer Network Token");
        emit Withdraw(_to, _amount);
    }

    function transferERC20(
        address _token,
        address _to,
        uint256 _amount
    ) external onlyOwner {
        IERC20(_token).safeTransfer(_to, _amount);
        emit WithdrawERC20(_to, _token, _amount);
    }
}
