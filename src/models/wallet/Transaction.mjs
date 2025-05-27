import { createHash } from '../../utilitites/hash.mjs';

export default class Transaction {
	constructor({ sender, recipient, amount }) {
		this.transaction = { sender, recipient, amount };

		this.id = createHash(this.transaction);

		this.outputMap = {
			sender: sender.publicKey,
			recipient: recipient,
			senderBalance: (sender.balance -= amount),
		};
		this.inputMap = {
			recipient,
			sender: sender.publicKey,
			amount: `+${amount}`,
		};
	}
}
