import { INITIAL_DIFFICULTY } from '../../utilitites/config.mjs';
export const GENESIS_BLOCK = {
	timestamp: Date.now(),

	hash: '#1',
	difficulty: INITIAL_DIFFICULTY,
	nonce: 0,
	lastHash: '###',
	data: [],
};
