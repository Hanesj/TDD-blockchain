import redis from 'redis';

const CHANNELS = {
	TEST: 'TEST',
	BLOCKCHAIN: 'BLOCKCHAIN',
};
export default class Network {
	constructor({ blockchain }) {
		this.blockchain = blockchain;
		this.subscriber = redis.createClient();
		this.publisher = redis.createClient();

		//		this.subscriber.subscribe(CHANNELS.TEST);

		// Loadchannels
		this.loadChannels();

		this.subscriber.on('message', (channel, message) => {
			this.handleMessage(channel, message);
		});
	}
	broadCast() {
		this.publish({
			channel: CHANNELS.BLOCKCHAIN,
			message: JSON.stringify(this.blockchain.chain),
		});
	}

	handleMessage(channel, message) {
		console.log(`Got message ${message} from ${channel}`);
	}

	publish({ channel, message }) {
		this.publisher.publish(channel, message);
	}

	loadChannels() {
		Object.values(CHANNELS).forEach((channel) => {
			this.subscriber.subscribe(channel);
		});
	}
}
