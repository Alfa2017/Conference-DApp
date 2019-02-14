﻿var accounts, account, pwd;
var myConferenceInstance;

// Initialize
function initializeConference() {
	var address = "0x2350fdeaacb4478bc911f128977565744a636671"; //"0x6326206e2781b912aa5ea1a3171de499309020e2";
	var cabi = [{"constant":true,"inputs":[{"name":"room_","type":"bytes32"},{"name":"key_","type":"bytes32"}],"name":"CheckPerson","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"room_","type":"bytes32"},{"name":"key_","type":"bytes32"}],"name":"DeletePerson","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"room_","type":"bytes32"}],"name":"GetMeeting","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"room_","type":"bytes32"},{"name":"key_","type":"bytes32"},{"name":"name_","type":"string"}],"name":"AddPerson","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"room_","type":"bytes32"}],"name":"DeleteMeeting","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"room_","type":"bytes32"},{"name":"note_","type":"string"}],"name":"AddMeeting","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GetMeetings","outputs":[{"name":"","type":"uint256"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

	var cexist = false;
	//address = address00;

	//web3.eth.getCode(address, function(error, result) {
	web3.eth.getCode(address, (error, result) => {
		if(error != null) {
			$("#confAddress").html("error!");
		}
		else {
			var conferenceContract;
			if( result == "0x" ) {
				conferenceContract = new web3.eth.Contract(cabi);
				conferenceContract.deploy({
					data: "608060405234801561001057600080fd5b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610e88806100616000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630609db741461008857806313f02963146100df5780632cbf91101461011e5780633072fc3c146101de5780634ad475f01461026357806371307fd5146102a8578063ba4c4b1e14610333575b600080fd5b34801561009457600080fd5b506100c5600480360381019080803560001916906020019092919080356000191690602001909291905050506103a6565b604051808215151515815260200191505060405180910390f35b3480156100eb57600080fd5b5061011c6004803603810190808035600019169060200190929190803560001916906020019092919050505061048f565b005b34801561012a57600080fd5b5061014d6004803603810190808035600019169060200190929190505050610630565b60405180848152602001836000191660001916815260200180602001828103825283818151815260200191508051906020019080838360005b838110156101a1578082015181840152602081019050610186565b50505050905090810190601f1680156101ce5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b3480156101ea57600080fd5b5061026160048036038101908080356000191690602001909291908035600019169060200190929190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919291929050505061073a565b005b34801561026f57600080fd5b50610292600480360381019080803560001916906020019092919050505061085b565b6040518082815260200191505060405180910390f35b3480156102b457600080fd5b5061031d6004803603810190808035600019169060200190929190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610a65565b6040518082815260200191505060405180910390f35b34801561033f57600080fd5b50610348610c7c565b6040518083815260200180602001828103825283818151815260200191508051906020019060200280838360005b83811015610391578082015181840152602081019050610376565b50505050905001935050505060405180910390f35b60008060008091506002846040518082600019166000191681526020019150506020604051808303816000865af11580156103e5573d6000803e3d6000fd5b5050506040513d60208110156103fa57600080fd5b810190808051906020019092919050505090506000600160008760001916600019168152602001908152602001600020600001541115610484576000600102600160008760001916600019168152602001908152602001600020600301600083600019166000191681526020019081526020016000206000015460001916111561048357600191505b5b819250505092915050565b60008060016000856000191660001916815260200190815260200160002060000154111515610526576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600e8152602001807f556e6b6e6f776e20706572736f6e00000000000000000000000000000000000081525060200191505060405180910390fd5b6002826040518082600019166000191681526020019150506020604051808303816000865af115801561055d573d6000803e3d6000fd5b5050506040513d602081101561057257600080fd5b810190808051906020019092919050505090506000600102600160008560001916600019168152602001908152602001600020600301600083600019166000191681526020019081526020016000206000018160001916905550602060405190810160405280600081525060016000856000191660001916815260200190815260200160002060030160008360001916600019168152602001908152602001600020600101908051906020019061062a929190610ce6565b50505050565b60008060606001600085600019166000191681526020019081526020016000206000015460016000866000191660001916815260200190815260200160002060010154600160008760001916600019168152602001908152602001600020600201808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107265780601f106106fb57610100808354040283529160200191610726565b820191906000526020600020905b81548152906001019060200180831161070957829003601f168201915b505050505090509250925092509193909250565b60006002836040518082600019166000191681526020019150506020604051808303816000865af1158015610773573d6000803e3d6000fd5b5050506040513d602081101561078857600080fd5b810190808051906020019092919050505090506000600160008660001916600019168152602001908152602001600020600001541115610855578060016000866000191660001916815260200190815260200160002060030160008360001916600019168152602001908152602001600020600001816000191690555081600160008660001916600019168152602001908152602001600020600301600083600019166000191681526020019081526020016000206001019080519060200190610853929190610ce6565b505b50505050565b6000806000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610925576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f53656e646572206e6f7420617574686f72697a65642e0000000000000000000081525060200191505060405180910390fd5b6000600160008660001916600019168152602001908152602001600020600001541115156109bb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600c8152602001807f556e6b6e6f776e20726f6f6d000000000000000000000000000000000000000081525060200191505060405180910390fd5b60016000856000191660001916815260200190815260200160002060000154915060006001600080549050038154811015156109f357fe5b9060005260206000200154905080600083815481101515610a1057fe5b90600052602060002001816000191690555081600160008660001916600019168152602001908152602001600020600001819055506000805480919060019003610a5a9190610d66565b508192505050919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610b2c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f53656e646572206e6f7420617574686f72697a65642e0000000000000000000081525060200191505060405180910390fd5b600060016000856000191660001916815260200190815260200160002060000154141515610bc2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f526f6f6d20616c7265616479206578697374730000000000000000000000000081525060200191505060405180910390fd5b60008390806001815401808255809150509060018203906000526020600020016000909192909190915090600019169055506060604051908101604052806000805490508152602001846000191681526020018381525060016000856000191660001916815260200190815260200160002060008201518160000155602082015181600101906000191690556040820151816002019080519060200190610c6a929190610d92565b50905050600080549050905092915050565b60006060600080549050600080805480602002602001604051908101604052809291908181526020018280548015610cd757602002820191906000526020600020905b81546000191681526020019060010190808311610cbf575b50505050509050915091509091565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610d2757805160ff1916838001178555610d55565b82800160010185558215610d55579182015b82811115610d54578251825591602001919060010190610d39565b5b509050610d629190610e12565b5090565b815481835581811115610d8d57818360005260206000209182019101610d8c9190610e37565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610dd357805160ff1916838001178555610e01565b82800160010185558215610e01579182015b82811115610e00578251825591602001919060010190610de5565b5b509050610e0e9190610e12565b5090565b610e3491905b80821115610e30576000816000905550600101610e18565b5090565b90565b610e5991905b80821115610e55576000816000905550600101610e3d565b5090565b905600a165627a7a723058202f88b3fac784d0358f5fb3ff2a8a44f1c8ed8f582422a0ddded9cd4ee1163ba10029"
				})
				.send({
					from: account,
					gas: 4700000
				})
				.then((newContractInstance) => {
					$("#confAddress").html(newContractInstance.options.address);
					myConferenceInstance = newContractInstance;
					//console.log(newContractInstance.options.address); // instance with the new contract address
				});
			} else {
				conferenceContract = new web3.eth.Contract(cabi, address);
				$("#confAddress").html(conferenceContract.options.address);
				myConferenceInstance = conferenceContract;
			}
		}
	});
}

// Add Meeting
function addMeeting(room, note) {
	var room_= web3.utils.utf8ToHex(room);

	web3.eth.personal.unlockAccount(account, pwd, 15000).then((response) => {
		myConferenceInstance.methods.AddMeeting(room_, note).send({from: account, gas: 2000000}).then((receipt) => {
			$("#MeetingResult").html(receipt.transactionHash)
		}).catch((error) => {
			$("#MeetingResult").html("error");
			console.log(error);
		});
	}).catch((error) => {
		console.log(error);
	});
}

function delMeeting(room) {
	var room_ = web3.utils.utf8ToHex(room);

	web3.eth.personal.unlockAccount(account, pwd, 15000).then((response) => {
		myConferenceInstance.methods.DeleteMeeting(room_).send({from: account, gas: 2000000}).then((receipt) => {
			$("#MeetingResult").html(receipt.transactionHash)
		}).catch((error) => {
			$("#MeetingResult").html("error");
			console.log(error);
		});
	}).catch((error) => {
		console.log(error);
	});
}

function checkPerson(room, pkey) {
	var res = "Person NOT found";
	var room_ = web3.utils.utf8ToHex(room);
	var pkey_ = web3.utils.utf8ToHex(pkey);

	myConferenceInstance.methods.CheckPerson(room_, pkey_).call({from: account}, (error, result) => {
		if (result) {
			res = "Person found";
		}
		$("#checkPersonResult").html(res)
	});
}

function addPerson(room, pkey, pname) {
	var room_ = web3.utils.utf8ToHex(room);
	var pkey_ = web3.utils.utf8ToHex(pkey);

	web3.eth.personal.unlockAccount(account, pwd, 15000).then((response) => {
		myConferenceInstance.methods.AddPerson(room_, pkey_, pname).send({from: account, gas: 2000000}).then((receipt) => {
			$("#PersonResult").html(receipt.transactionHash)
		}).catch((error) => {
			$("#PersonResult").html("error");
			console.log(error);
		});
	}).catch((error) => {
		console.log(error);
	});
}

function delPerson(room, pkey) {
	var room_ = web3.utils.utf8ToHex(room);
	var pkey_ = web3.utils.utf8ToHex(pkey);

	web3.eth.personal.unlockAccount(account, pwd, 15000).then((response) => {
		myConferenceInstance.methods.DeletePerson(room_, pkey_).send({from: account, gas: 2000000}).then((receipt) => {
			$("#PersonResult").html(receipt.transactionHash)
		}).catch((error) => {
			$("#PersonResult").html("error");
			console.log(error);
		});
	}).catch((error) => {
		console.log(error);
	});
}

// --------------------------------------------------
window.onload = function() {

	pwd = "1";

	// Initialize web3 and set the provider to the testRPC.
	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		var web3Provider;
		// set the provider you want from Web3.providers
		web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
		//web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/954ef207d6fd42bb834d7b3f8c0f02df');
		web3 = new Web3(web3Provider);
	}

	web3.eth.getAccounts(function(err, accs) {
		if (err != null) {
			alert("There was an error fetching your accounts.");
			return;
		}
		if (accs.length == 0) {
			alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
			return;
		}
		accounts = accs;
		if(accounts.length > 2) account = accounts[3];
		else account = accounts[0];
		
		initializeConference();
	});

	// Wire up the UI elements
	$("#addMeeting").click(function() {
		var room = $("#roomNumber").val();
		var note = $("#roomNote").val();
		addMeeting(room, note);
	});

	$("#delMeeting").click(function() {
		var room = $("#roomNumber").val();
		delMeeting(room);
	});

	$("#checkPerson").click(function() {
		var room = $("#roomNumber").val();
		var pkey = $("#personKey").val();
		checkPerson(room, pkey);
	});

	$("#addPerson").click(function() {
		var room = $("#roomNumber").val();
		var client = $("#personKey").val();
		var pname = $("#personName").val();
		addPerson(room, client, pname);
	});

	$("#delPerson").click(function() {
		var room = $("#roomNumber").val();
		var client = $("#personKey").val();
		delPerson(room, client);
	});
	
	// Set value of wallet to accounts[1]
	//$("#ownerAddress").val(accounts[3]);

};
