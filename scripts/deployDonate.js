const main = async () => {
    const Donate = await ethers.getContractFactory("Donate");
    const donate = await Donate.deploy();
    await donate.deployed();
    console.log("Donate contract deployed to:", donate.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });