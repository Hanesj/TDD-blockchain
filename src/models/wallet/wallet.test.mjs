import { beforeEach, expect, it } from 'vitest';
import Wallet from './Wallet.mjs';
import { keyMgr, verifySignature } from '../../utilitites/keyManager.mjs';
import { createHash } from '../../utilitites/hash.mjs';
describe('Wallet', () => {
	let wallet;

	beforeEach(() => {
		wallet = new Wallet();
	});
	it('should have publicKey prop', () => {
		console.log(wallet.publicKey);
		expect(wallet).toHaveProperty('publicKey');
	});
	it('should have balance prop', () => {
		expect(wallet).toHaveProperty('balance');
	});
	describe('signing data', () => {
		const data = 'Goodfellas';

		it('should verify a valid signature', () => {
			expect(
				verifySignature({
					publicKey: wallet.publicKey,
					data,
					signature: wallet.sign(data),
				})
			).toBeTruthy();
		});
		it('should not verify an invalid signature', () => {
			expect(
				verifySignature({
					publicKey: wallet.publicKey,
					data,
					signature: new Wallet().sign(data),
				})
			).toBeFalsy();
		});
	});
});
