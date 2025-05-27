import { v4 as uuid } from 'uuid';
import { verifySignature } from '../../utilitites/keyManager.mjs';

export default class Transaction {
	constructor({ sender, recipient, amount }) {
		//	this.transaction = { sender, recipient, amount };

		this.id = uuid().replaceAll('-', '');

		this.outputMap = this.createOutputMap({ sender, recipient, amount });
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
	static validate(transaction) {
		const {
			outputMap,
			inputMap: { address, amount, signature },
		} = transaction;

		const total = Object.values(outputMap).reduce(
			(sum, amount) => (sum += amount)
		);

		if (amount !== total) return false;
		if (
			!verifySignature({ publicKey: address, signature, data: outputMap })
		)
			return false;
		return true;
	}
	createOutputMap({ sender, recipient, amount }) {
		const map = {};

		map[recipient] = amount;
		map[sender.publicKey] = sender.balance - amount;
		//console.log('MAP', map);
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
