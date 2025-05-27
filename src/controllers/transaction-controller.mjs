import { transactionPool, wallet, networkServer } from '../server.mjs';

export const addTransaction = (req, res) => {
	const { amount, recipient } = req.body;
	let transaction = transactionPool.transactionExists({
		address: wallet.publicKey,
	});
	try {
		if (transaction) {
			transaction.update({ sender: wallet, recipient, amount });
		} else {
			transaction = wallet.createTransaction({ recipient, amount });
		}
		transactionPool.addTransaction(transaction);
		networkServer.broadCastTransaction(transaction);
		res.status(201).json({
			success: true,
			statuscode: 201,
			data: transaction,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			statuscode: 400,
			error: error.message,
		});
	}
};

export const listAllTransactions = (req, res) => {
	res.status(200).json({
		success: true,
		statuscode: 200,
		data: transactionPool.transactionMap,
	});
};
