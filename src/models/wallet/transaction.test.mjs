import { beforeEach, expect, it } from 'vitest';
import Transaction from './Transaction.mjs';
import Wallet from './Wallet.mjs';

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
			console.log(transaction.id);
			console.log(transaction.outputMap);
			console.log(transaction.inputMap);
			expect(transaction).toHaveProperty('outputMap');
		});
	});
	describe('inputMap', () => {
		it('should have property inputMap', () => {
			expect(transaction).toHaveProperty('inputMap');
		});
	});
});
