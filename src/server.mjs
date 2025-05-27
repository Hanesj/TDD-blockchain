import { app } from './app.mjs';
import Blockchain from './models/blockchain/Blockchain.mjs';
import Network from './network.mjs';
import { blockRouter } from './routes/blockchain-routes.mjs';
import { transactionRouter } from './routes/transaction-routes.mjs';
import TransactionPool from './models/wallet/TransactionPool.mjs';
import Wallet from './models/wallet/Wallet.mjs';

export const blockChain = new Blockchain();
export const transactionPool = new TransactionPool();
export const networkServer = new Network({
	blockchain: blockChain,
	transactionPool: transactionPool,
});
export const wallet = new Wallet();

const DEFAULT_PORT = 4000;
let NODE_PORT;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

app.use('/api', blockRouter);
app.use('/api/wallet', transactionRouter);
const synchronize = async () => {
	let response = await fetch(`${ROOT_NODE}/api`);
	if (response) {
		const result = await response.json();
		console.log('Replacing chain on sync with: ', result.data.chain);
		blockChain.replaceChain(result.data.chain);
	}
	response = await fetch(`${ROOT_NODE}/api/wallet/transactions`);

	if (response) {
		const result = await response.json();
		console.log(
			'Replacing transaction pool map on sync with: ',
			result.data
		);
		transactionPool.replaceMap(result.data);
	}
};

if (process.env.GENERATE_NODE_PORT === 'true') {
	NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
	console.log(
		`Server
     startad: ${PORT}, mode: ${process.env.NODE_ENV}`
	);
	if (PORT !== DEFAULT_PORT) synchronize();
});
