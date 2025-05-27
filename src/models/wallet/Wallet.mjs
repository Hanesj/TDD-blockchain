import { INITIAL_BALANCE } from '../../utilitites/config.mjs';
import { keyMgr } from '../../utilitites/keyManager.mjs';
import { createHash } from '../../utilitites/hash.mjs';
class Wallet {
	constructor() {
		this.balance = INITIAL_BALANCE;
		this.keyPair = keyMgr.genKeyPair();
		this.publicKey = this.keyPair.getPublic().encode('hex');
	}
	sign(data) {
		return this.keyPair.sign(createHash(data));
	}
}

export default Wallet;
