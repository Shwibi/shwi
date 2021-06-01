class Utils {
    constructor() {
        this.description = "Utilities";
        this.colors = require('colors');
    }
    static Fries = [];
    static LastCall_ = new Date().toLocaleDateString();

    /**
     * Log something to the console 
     * @param  {any} input Input anything to log
     */
    log(input) {
       console.log(`[StudyApp]: `.yellow, input); 
    }

    /**
     * Fry a message to the console (traces the origin) | Get all fries using <Utils>.Fries
     * @param {any} message 
     */
    fry(message) {
        const fryInfo = {
            id: Utils.Fries.length + 1,
            message: message,
            time: new Date(),
            timestamp: Date.now()
        };
        this.log(" TRACING--------- ".bgCyan.black);
        console.trace(message);
        this.log(" -----------TRACED ".bgCyan.black)
        Utils.Fries.push(fryInfo);
    }

    /**
     * Get the information for this project
     */
    get info() {
        let packet = require(`${__source}/package.json`);
       
        const {name, description, version, main, author} = packet;
        Utils.LastCall_ = new Date().toLocaleDateString();
        return {name, description, version, main, author, lastCall: Utils.LastCall_};
    }
}

const utils = new Utils();

module.exports = utils;
