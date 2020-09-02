
const _ = require('lodash');
const PROVIDER = Symbol('provider');

class Authentication {

	constructor({ provider, options = {}} = {}) {

			if (_.isNil(provider)) {
				throw new Error('Must provide a valid Authentication service provider');
			}
			if (_.isString(provider)) {
				this[PROVIDER] = new (require(provider))(options);
			} else {
				this[PROVIDER] = provider;
			}
	}

	
	async authenticate(...args) {
		turbo.trace('🔒  you are here → Authentication.authenticate');
		return await this[PROVIDER].authenticate(...args);
	}

	async isAuthenticated(...args) {
		turbo.trace('🔒  you are here → Authentication.isAuthenticated');
		return await this[PROVIDER].isAuthenticated(...args);
	}

	// async getToken(...args) {
	// 	turbo.trace('🔒  you are here → Authentication.getToken()');
	// 	return await this[provider].getToken(...args);
	// }

	async logout(...args) {
		turbo.trace('🔒  you are here → Authentication.logout()');
		debugger;
		return await this[PROVIDER].logout(...args);
	}

	async renew(...args) {
		turbo.trace('🔒  you are here → Authentication.renew()');
		return await this[PROVIDER].renew(...args);
	}

	static async getPublicKey(...args) {
		turbo.trace(`🔒  you are here → Authentication.getPublicKey()`);

		let public_key;
		if (_.isFunction(this[PROVIDER].getPublicKey)) {
			public_key = await this[PROVIDER].getPublicKey(...args);
		}

		return public_key;
	}

}

module.exports = Authentication;
