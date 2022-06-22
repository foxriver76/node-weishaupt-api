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
                [10, 0, 1, 14, 0, 0, 0, 0]
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
            finalTelegramObj.UNKNOWN = telegramObject.UNKNOWN;
            finalTelegramObjects.push(finalTelegramObj);
        }
        return finalTelegramObjects;
    }
    _convertData(telegramObject) {
        switch (telegramObject.INFONR) {
            case constants_1.Info.Wärmeanforderung:
            case constants_1.Info.Außentemperatur:
                return telegramObject.DATA / 10;
            case constants_1.Info.Vorlauftemperatur:
                console.log(telegramObject.DATA);
                return telegramObject.DATA + 13;
            case constants_1.Info.Fehlercode:
            case constants_1.Info.Password:
            case constants_1.Info.StartsiteFooter:
                return telegramObject.DATA;
            default:
                throw new Error(`Unknown Info: ${telegramObject.INFONR}`);
        }
    }
}
exports.Weishaupt = Weishaupt;
//# sourceMappingURL=weishaupt.js.map