const Web3 = require('web3');
const Greeting = require('./build/contracts/Greeting.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

require('dotenv').config({ path: require('find-config')('.env') })

const ADDRESS = process.env.ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PROJECT_ID = process.env.PROJECT_ID;


const init = async () => {
	const provider = new HDWalletProvider(
			PRIVATE_KEY, `https://ropsten.infura.io/v3/${PROJECT_ID}`
		);

	const web3 = new Web3(provider);

	// const id = await web3.eth.net.getId();
	// const deployedNetwork = Greeting.networks[id];
	let contract = new web3.eth.Contract(Greeting.abi);

	contract = await contract.deploy({data: Greeting.bytecode}).send({from: ADDRESS})

	await contract.methods
	.setStr("Happy New Year")
	.send({from: ADDRESS});

	const result = await contract.methods.getStr().call();

	console.log(result);

	// let greetings = document.getElementById('greetings');

	// greetings.innerHTML = result;

	// getGreeting();
}

function getGreeting() {
  document.getElementById('getGreeting').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    contract.methods.read(id).call()
    .then(result => {
      document.getElementById('greetings').innerHTML = result;
    })
    .catch(_e => {
     	document.getElementById('greetings').innerHTML = `Input error`;
    });
  });
}

init();
