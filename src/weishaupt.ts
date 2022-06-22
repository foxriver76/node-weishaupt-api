import axios from 'axios';
import { Command, Info, Protocol, Type } from './constants';

interface WeishauptOptions {
    url: string;
}

type Telegram = [
    Modultyp: number,
    Buskennung: number,
    Command: number,
    InfoNr: number,
    Index: number,
    Protocol: number,
    data: number,
    unknown: number
][];

interface TelegramObject {
    MODULTYP: number;
    BUSKENNUNG: number;
    COMMAND: number;
    INFONR: number;
    INDEX: number;
    PROT: number;
    DATA: number;
    UNKNOWN: number;
}

interface FinalTelegramObject extends TelegramObject {
    COMMAND: Command;
    PROTOCOL: Protocol;
    INFONR: Info;
}

export class Weishaupt {
    /** URL of the API */
    private readonly url: string;

    constructor(options: WeishauptOptions) {
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

        const res = await axios.post(`${this.url}/parameter.json`, body);

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

        const res = await axios.post(`${this.url}/parameter.json`, body);

        if (res.status !== 200) {
            throw new Error(res.data);
        }

        return this._decodeTelegram(res.data.telegramm);
    }

    /**
     * Decodes a Telegram given from API
     * @param telegram telegram as given as response from API
     */
    private _decodeTelegram(telegram: Telegram): TelegramObject[] {
        const response: TelegramObject[] = [];

        for (const telegramEntry of telegram) {
            const respObj: Partial<TelegramObject> = {};
            for (const i in telegramEntry) {
                const attributeName = Type[i];
                // @ts-expect-error fix it
                respObj[attributeName] = telegramEntry[i];
            }
            response.push(respObj as TelegramObject);
        }

        return this._decodeTelegramValues(response);
    }

    private _decodeTelegramValues(telegramObjects: TelegramObject[]): FinalTelegramObject[] {
        const finalTelegramObjects: FinalTelegramObject[] = [];
        for (const telegramObject of telegramObjects) {
            const finalTelegramObj: Partial<FinalTelegramObject> = {};

            finalTelegramObj.COMMAND = Command[telegramObject.COMMAND] as any;
            finalTelegramObj.MODULTYP = telegramObject.COMMAND;
            finalTelegramObj.DATA = this._convertData(telegramObject);
            finalTelegramObj.BUSKENNUNG = telegramObject.BUSKENNUNG;
            finalTelegramObj.PROT = Protocol[telegramObject.PROT] as any;
            finalTelegramObj.INDEX = telegramObject.INDEX;
            finalTelegramObj.INFONR = (Info[telegramObject.INFONR] as any) || telegramObject.INFONR;
            finalTelegramObj.UNKNOWN = telegramObject.UNKNOWN;

            finalTelegramObjects.push(finalTelegramObj as FinalTelegramObject);
        }

        return finalTelegramObjects;
    }

    private _convertData(telegramObject: TelegramObject): number {
        switch (telegramObject.INFONR) {
            case Info.Wärmeanforderung:
            case Info.Außentemperatur:
                return telegramObject.DATA / 10;
            case Info.Vorlauftemperatur:
                console.log(telegramObject.DATA);
                return telegramObject.DATA + 13;
            case Info.Fehlercode:
            case Info.Password:
            case Info.StartsiteFooter:
                return telegramObject.DATA;
            default:
                throw new Error(`Unknown Info: ${telegramObject.INFONR}`);
        }
    }
}
