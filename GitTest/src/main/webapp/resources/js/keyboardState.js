export default class keyboardState {
	constructor() {
		// holds the current state of a given key
		this.keyState = new Map();

		// holds the callback function for a key code
		this.key = new Map();
	}

	addMapping(keyCode, callback) {
		this. keyMap.set(keyCode, callback);
	}

	handleEvent(event) {
		const {keyCode} = event;

		if(!this.keyMap.has(keyCode)) {
			// did not have key mapped
			return false;
		}

		event.preventDefault();
	}
}