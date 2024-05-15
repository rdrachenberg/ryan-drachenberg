import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import Link from 'next/link';
export default function ContractDeploymentSpecs() {
    const contractCode = `
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.20;

        import "@openzeppelin/contracts/access/Ownable.sol";
        import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
        import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


        contract Donate is Ownable() {
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
    `


    return (
        <div className='mt-1 max-w-[50%] sm:max-w-[90%] sm:mx-auto'>
            <div className='text-lg'>Deployed Contract Addresses</div>
            <div className='text-lg ml-2 mt-2 bold'>Mainnet<div className='text-sm sm:hidden'>0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9</div></div>
            <div className='p-4'>
                <Link href={'https://etherscan.io/address/0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9#code'} target='_blank'>
                    <div className='flex flex-col-2 p-3 border-4 border-blue-500 rounded-full mb-2 hover:bg-blue-600 hover:border-blue-600 hover:text-white items-center'>
                        <div className='text-sm ml-2'>Ethereum Mainnet</div>
                        <p className='ml-2 hidden sm:flex'>0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9</p>
                    </div>
                </Link>
                <Link href={'https://bscscan.com/address/0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9#code'} target='_blank'>
                    <div className='flex flex-col-2 p-3 border-4 border-black dark:border-gray-200 rounded-full mb-2 hover:bg-blue-600 hover:border-blue-600 dark:hover:border-blue-600 hover:text-white items-center'>
                        <div className='text-sm ml-2'>BSC Mainnet</div>
                        <p className='ml-2 hidden sm:flex'>0x3348791E931c0a9Fc6E40De3242B46ec5272C1b9</p>
                    </div>
                </Link>
                <div className='text-lg -ml-3 mt-3 mb-3 bold'>Testnets<div className='text-sm sm:hidden'>0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E</div></div>
                <Link href={'https://sepolia.etherscan.io/address/0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E#code'} target='_blank'>
                    <div className='flex flex-col-2 p-3 border-4 border-blue-500 rounded-full mb-2 hover:bg-blue-600 hover:border-blue-600 hover:text-white items-center'>
                        <div className='text-sm ml-2'>Sepolia Testnet</div>
                        <p className='ml-2 hidden sm:flex'>0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E</p>
                    </div>
                </Link>
                <Link href={'https://testnet.bscscan.com/address/0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E#code'} target='_blank'>
                    <div className='flex flex-col-2 p-3 border-4 border-black dark:border-gray-200 rounded-full mb-2 hover:bg-blue-600 hover:border-blue-600 dark:hover:border-blue-600 hover:text-white items-center'>
                        <div className='text-sm ml-2'>BSC Testnet</div>
                        <p className='ml-2 hidden sm:flex'>0x45b54e6AedeE2d73d9F09934C7C4973f6B6Cd41E</p>
                    </div>
                </Link>
                

            </div>
            
            <div className='text-lg mt-5'>Donate.sol Contract Code</div>
            <pre className='bg-gray-400 rounded-lg mt-5 max-w-[90%] flex flex-col-1 justify-center align-middle items-center mx-auto'>
                <SyntaxHighlighter language='solidity' className='rounded-lg mt-5'>
                    {contractCode}
                </SyntaxHighlighter>
            </pre>
            
        </div>
    )
}