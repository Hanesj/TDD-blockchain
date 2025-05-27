export default class TransactionPool {
	constructor() {
		this.transactionMap = {};
	}

	addTransaction(transaction) {
		this.transactionMap[transaction.id] = transaction;
	}

	transactionExists({ address }) {
		const transactions = Object.values(this.transactionMap);
		console.log(transactions);
		return transactions.find(
			(transaction) => transaction.inputMap.address === address
		);
	}
}
