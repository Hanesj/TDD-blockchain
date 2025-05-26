import { app } from './app.mjs';
import Blockchain from './models/Blockchain.mjs';
import Network from './network.mjs';
import { blockRouter } from './routes/blockchain-routes.mjs';

export const blockChain = new Blockchain();
export const networkServer = new Network({ blockchain: blockChain });

const DEFAULT_PORT = 4000;
let NODE_PORT;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

app.use('/api', blockRouter);

const synchronize = async () => {
	const response = await fetch(`${ROOT_NODE}/api`);
	if (response) {
		const result = await response.json();
		console.log('Replacing chain on sync with: ', result.data.chain);
		blockChain.replaceChain(result.data.chain);
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
