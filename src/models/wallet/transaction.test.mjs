import { beforeEach, expect, it } from 'vitest';
import Transaction from './Transaction.mjs';
import Wallet from './Wallet.mjs';
import { verifySignature } from '../../utilitites/keyManager.mjs';

describe('transaction', () => {
	let transaction, sender, recipient, amount;

	beforeEach(() => {
		sender = new Wallet();
		recipient = 'Luigi';
		amount = 20;

		transaction = new Transaction({
			sender: sender,
			recipient: recipient,
			amount: amount,
		});
	});
	it('should have property id', () => {
		expect(transaction).toHaveProperty('id');
	});
	describe('outputMap', () => {
		it('should have property outputMap', () => {
			//console.log(transaction.id);
			//console.log(transaction.outputMap);
			//console.log(transaction.inputMap);
			expect(transaction).toHaveProperty('outputMap');
		});
		it('should display the amount to the recipient', () => {
			expect(transaction.outputMap[recipient]).toEqual(amount);
		});
		it('should display the balance for the senders wallet', () => {
			expect(transaction.outputMap[sender.publicKey]).toEqual(
				sender.balance - amount
			);
		});
	});
	describe('inputMap', () => {
		it('should have property inputMap', () => {
			expect(transaction).toHaveProperty('inputMap');
		});

		it('should have amount property', () => {
			expect(transaction.inputMap).toHaveProperty('amount');
		});

		it('should have address property', () => {
			expect(transaction.inputMap).toHaveProperty('address');
		});

		it('should have signature property', () => {
			expect(transaction.inputMap).toHaveProperty('signature');
		});

		it('should have timestamp property', () => {
			expect(transaction.inputMap).toHaveProperty('timestamp');
		});
		it('should set the amount to the sendersbalance', () => {
			expect(transaction.inputMap.amount).toEqual(sender.balance);
		});

		it('should set the address to the senders pubkey', () => {
			expect(transaction.inputMap.address).toEqual(sender.publicKey);
		});

		it('should sign the input', () => {
			//console.log(transaction.inputMap.signature);
			expect(
				verifySignature({
					publicKey: sender.publicKey,
					data: transaction.outputMap,
					signature: transaction.inputMap.signature,
				})
			).toBeTruthy();
		});
	});
	describe('validation', () => {
		describe('when transaction is valid', () => {
			it('should return true', () => {
				expect(Transaction.validate(transaction)).toBeTruthy();
			});
		});
		describe('when transaction is invalid', () => {
			describe('and transaction outputmap is invalid', () => {
				it('should return false', () => {
					transaction.outputMap[sender.publicKey] = 123321;
					expect(Transaction.validate(transaction)).toBeFalsy();
				});
			});
		});
		describe('and transaction input signature is invalid', () => {
			it('should return false', () => {
				transaction.inputMap.signature = new Wallet().sign(
					'Can i change signature?'
				);
				expect(Transaction.validate(transaction)).toBeFalsy();
			});
		});
	});
});
