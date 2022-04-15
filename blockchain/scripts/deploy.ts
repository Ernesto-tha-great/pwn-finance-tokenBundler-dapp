/* eslint-disable no-dupe-keys */
import { ethers } from "hardhat";

// const asset = [
//   {
//     address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
//     Category: "ERC20",
//     Uint256: "0",
//     Uint256: "0",
//   },
// ];
async function main() {
  const Bundler = await ethers.getContractFactory("TokenBundler");
  const bundler = await Bundler.deploy(
    "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    22
  );

  await bundler.deployed();

  console.log("Bundler deployed to:", bundler.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
