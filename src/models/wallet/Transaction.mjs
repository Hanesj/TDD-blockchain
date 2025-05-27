import { v4 as uuid } from 'uuid';

export default class Transaction {
	constructor({ sender, recipient, amount }) {
		this.transaction = { sender, recipient, amount };

		this.id = uuid().replaceAll('-', '');

		this.outputMap = this.createOutputMap(this.transaction);
		this.inputMap = this.createInputMap({
			sender,
			outputMap: this.outputMap,
		});
		//this.outputMap = {
		//sender: sender.publicKey,
		//recipient: recipient,
		//senderBalance: sender.balance - amount,
		//};
		//this.inputMap = {
		//recipient,
		//sender: sender.publicKey,
		//amount: `+${amount}`,
		//};
	}
	createOutputMap({ sender, recipient, amount }) {
		const map = {};

		map[recipient] = amount;
		map[sender.publicKey] = sender.balance - amount;
		console.log('MAP', map);
		return map;
	}
	createInputMap({ sender, outputMap }) {
		return {
			timestamp: Date.now(),
			amount: sender.balance,
			address: sender.publicKey,
			signature: sender.sign(outputMap),
		};
	}
}
