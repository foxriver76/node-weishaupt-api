"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weishaupt = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
class Weishaupt {
    constructor(options) {
        this.url = options.url;
    }
    /**
     * Returns parameters present on Startsite
     */
    async getHomeParameters() {
        const body = {
            prot: 'coco',
            telegramm: [
                [0, 0, 1, 1, 0, 0, 0, 0],
                [10, 0, 1, 2, 0, 0, 0, 0],
                [10, 0, 1, 12, 0, 0, 0, 0],
                [10, 0, 1, 13, 0, 0, 0, 0],
                [0, 0, 1, 5066, 0, 0, 0, 0]
            ]
        };
        const res = await axios_1.default.post(`${this.url}/parameter.json`, body);
        if (res.status !== 200) {
            throw new Error(res.data);
        }
        return this._decodeTelegram(res.data.telegramm);
    }
    /**
     * Returns the parameters present on WTC-G Process Parameter Page
     */
    async getWTCGProcessParameters() {
        const body = {
            prot: 'coco',
            telegramm: [
                [10, 0, 1, 138, 0, 0, 0, 0],
                [10, 0, 1, 2572, 0, 0, 0, 0],
                [10, 0, 1, 2, 0, 0, 0, 0],
                [10, 0, 1, 3101, 0, 0, 0, 0],
                [10, 0, 1, 325, 0, 0, 0, 0],
                [10, 0, 1, 12, 0, 0, 0, 0],
                [10, 0, 1, 14, 0, 0, 0, 0],
                [10, 0, 1, 373, 0, 0, 0, 0]
            ]
        };
        const res = await axios_1.default.post(`${this.url}/parameter.json`, body);
        if (res.status !== 200) {
            throw new Error(res.data);
        }
        return this._decodeTelegram(res.data.telegramm);
    }
    /**
     * Returns the parameters from WCM-SOL Process Parameter Page
     */
    async getWCMSOLProcessParameters() {
        const body = {
            prot: 'coco',
            telegramm: [
                [3, 0, 1, 2601, 0, 0, 0],
                [3, 0, 1, 130, 0, 0, 0]
            ]
        };
        const res = await axios_1.default.post(`${this.url}/parameter.json`, body);
        if (res.status !== 200) {
            throw new Error(res.data);
        }
        return this._decodeTelegram(res.data.telegramm);
    }
    /**
     * Decodes a Telegram given from API
     * @param telegram telegram as given as response from API
     */
    _decodeTelegram(telegram) {
        const response = [];
        for (const telegramEntry of telegram) {
            const respObj = {};
            for (const i in telegramEntry) {
                const attributeName = constants_1.Type[i];
                // @ts-expect-error fix it
                respObj[attributeName] = telegramEntry[i];
            }
            response.push(respObj);
        }
        return this._decodeTelegramValues(response);
    }
    /**
     * Decodes the values of an array of telegramObjects, then returns an array of FinalTelegramObjects
     *
     * @param telegramObjects Array matching the interface
     */
    _decodeTelegramValues(telegramObjects) {
        const finalTelegramObjects = [];
        for (const telegramObject of telegramObjects) {
            const finalTelegramObj = {};
            finalTelegramObj.COMMAND = constants_1.Command[telegramObject.COMMAND];
            finalTelegramObj.MODULTYP = telegramObject.COMMAND;
            finalTelegramObj.DATA = this._convertData(telegramObject);
            finalTelegramObj.BUSKENNUNG = telegramObject.BUSKENNUNG;
            finalTelegramObj.PROT = constants_1.Protocol[telegramObject.PROT];
            finalTelegramObj.INDEX = telegramObject.INDEX;
            finalTelegramObj.INFONR = constants_1.Info[telegramObject.INFONR] || telegramObject.INFONR;
            finalTelegramObj.HIGH_BYTE = telegramObject.HIGH_BYTE;
            finalTelegramObjects.push(finalTelegramObj);
        }
        return finalTelegramObjects;
    }
    /**
     * Data is extracted and converted according to its INFONR field
     *
     * @param telegramObject a single telegramObject
     */
    _convertData(telegramObject) {
        switch (telegramObject.INFONR) {
            case constants_1.Info.VorlauftemperaturEstb:
            case constants_1.Info.GedaempfteAussentemperatur:
            case constants_1.Info.Waermeanforderung:
            case constants_1.Info.Aussentemperatur:
            case constants_1.Info.Warmwassertemperatur:
            case constants_1.Info.Abgastemperatur:
            case constants_1.Info.Vorlauftemperatur:
            case constants_1.Info.T1Kollektor: {
                const val = this._extractValue(telegramObject.DATA, telegramObject.HIGH_BYTE);
                return val / 10;
            }
            case constants_1.Info.Durchfluss: {
                const val = this._extractValue(telegramObject.DATA, telegramObject.HIGH_BYTE);
                return val / 100;
            }
            case constants_1.Info.Fehlercode:
            case constants_1.Info.Password:
            case constants_1.Info.StartsiteFooter:
            case constants_1.Info.Laststellung:
            case constants_1.Info.Betriebsphase:
                return telegramObject.DATA;
            default:
                throw new Error(`Unknown Info: ${telegramObject.INFONR}`);
        }
    }
    /**
     * Calculate the Value from the low byte and high byte
     *
     * @param lowByte
     * @param highByte
     */
    _extractValue(lowByte, highByte) {
        let usValue;
        if (highByte <= 127) {
            usValue = highByte * 256 + lowByte;
        }
        else if (highByte === 128 && lowByte === 0) {
            usValue = highByte * 256 + lowByte;
        }
        else {
            usValue = -32768 + (highByte - 128) * 256 + lowByte;
        }
        return usValue;
    }
}
exports.Weishaupt = Weishaupt;
//# sourceMappingURL=weishaupt.js.map