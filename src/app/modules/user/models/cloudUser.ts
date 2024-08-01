"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudUser = void 0;
/**
 * a semplified class just to handle users in cloud functions
 */
class CloudUser {
    email: string;
    key: string;
    enabledFunction: any[];
    /**
       * @param {unknown}user -user's data
       */
    constructor(user) {
        this.email = "";
        this.key = "";
        this.enabledFunction = [];
        Object.assign(this, user);
    }
    /**
       * @param {string} key -key of the user
       * @return {undefined}
       */
    setKey(key) {
        this.key = key;
        return this;
    }
    /**
     * @param  {string}   functionKey - key  of the  functionality
     * @return {boolean} true if the logged user
     *  is still enabled to use the function.
     *  false if the user is not enabled for the function
     */
    hasFunctionEnabled(functionKey) {
        let out = false;
        const requestedFunction = this.enabledFunction.filter((f) => {
            return f.key == functionKey;
        })[0];
        if (requestedFunction) {
            out = requestedFunction.endTime >= new Date().getTime();
        }
        return out;
    }
}
exports.CloudUser = CloudUser;
//# sourceMappingURL=cloudUser.js.map