import express from 'express';
import {
	addTransaction,
	listAllTransactions,
} from '../controllers/transaction-controller.mjs';
export const transactionRouter = express.Router();

transactionRouter
	.route('/transactions')
	.get(listAllTransactions)
	.post(addTransaction);
