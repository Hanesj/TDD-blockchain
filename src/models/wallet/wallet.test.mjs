import { beforeEach, expect, it } from 'vitest';
import Wallet from './Wallet.mjs';
import { keyMgr, verifySignature } from '../../utilitites/keyManager.mjs';
import { createHash } from '../../utilitites/hash.mjs';
import Transaction from './Transaction.mjs';
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

	describe('balance in wallet', () => {
		describe('balance is lower than the amount is being sent', () => {
			it('should throw error', () => {
				expect(() =>
					wallet.createTransaction({
						amount: 110,
						recipient: new Wallet(),
					})
				).toThrow('Not enough balance!');
			});
			describe('enough funds to send', () => {
				let trx, amount, recipient;
				beforeEach(() => {
					amount = 25;
					recipient = 'Testarn';
					trx = wallet.createTransaction({ amount, recipient });
					console.log(trx);
				});
				it('should create transaction object', () => {
					expect(trx).toBeInstanceOf(Transaction);
				});

				it('should match wallet input', () => {
					expect(trx.inputMap.address).toEqual(wallet.publicKey);
				});

				it('should output the amount to recipient', () => {
					expect(trx.outputMap[recipient]).toEqual(amount);
				});
			});
		});
	});
});
