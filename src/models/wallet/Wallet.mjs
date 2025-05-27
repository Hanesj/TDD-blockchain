import { INITIAL_BALANCE } from '../../utilitites/config.mjs';
import { keyMgr } from '../../utilitites/keyManager.mjs';
import { createHash } from '../../utilitites/hash.mjs';
import Transaction from './Transaction.mjs';
class Wallet {
	constructor() {
		this.balance = INITIAL_BALANCE;
		this.keyPair = keyMgr.genKeyPair();
		this.publicKey = this.keyPair.getPublic().encode('hex');
	}
	sign(data) {
		return this.keyPair.sign(createHash(data));
	}

	createTransaction({ amount, recipient }) {
		if (this.balance < amount) {
			throw new Error('Not enough balance!');
		}
		return new Transaction({ sender: this, recipient, amount });
	}
}

export default Wallet;
