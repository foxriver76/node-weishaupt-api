import axios from 'axios';
import { Command, Info, Protocol, Type, Unit } from './constants';

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
    highByte: number
][];

interface TelegramObject {
    MODULTYP: number;
    BUSKENNUNG: number;
    COMMAND: number;
    INFONR: number;
    INDEX: number;
    PROT: number;
    DATA: number;
    HIGH_BYTE: number;
}

interface FinalTelegramObject extends TelegramObject {
    COMMAND: Command;
    PROT: Protocol;
    INFONR: Info;
    UNIT?: 'string';
}

export class Weishaupt {
    /** URL of the API */
    private readonly url: string;

    constructor(options: WeishauptOptions) {
        this.url = options.url;
    }

    /**
     * Returns parameters present on Startsite
     */
    async getHomeParameters(): Promise<FinalTelegramObject[]> {
        const body = {
            prot: 'coco',
            telegramm: [
                [0, 0, 1, Info.Fehlercode, 0, 0, 0, 0],
                [10, 0, 1, Info.Waermeanforderung, 0, 0, 0, 0],
                [10, 0, 1, Info.Aussentemperatur, 0, 0, 0, 0],
                [10, 0, 1, Info.Vorlauftemperatur, 0, 0, 0, 0]
            ]
        };

        const res = await axios.post(`${this.url}/parameter.json`, body);

        if (res.status !== 200 || !res.data.telegramm) {
            throw new Error(res.data);
        }

        return this._decodeTelegram(res.data.telegramm);
    }

    /**
     * Returns the parameters present on WTC-G Process Parameter Page
     */
    async getWTCGProcessParameters(): Promise<FinalTelegramObject[]> {
        const body = {
            prot: 'coco',
            telegramm: [
                [10, 0, 1, Info.Laststellung, 0, 0, 0, 0],
                [10, 0, 1, Info.GedaempfteAussentemperatur, 0, 0, 0, 0],
                [10, 0, 1, Info.Waermeanforderung, 0, 0, 0, 0],
                [10, 0, 1, Info.VorlauftemperaturEstb, 0, 0, 0, 0],
                [10, 0, 1, Info.Abgastemperatur, 0, 0, 0, 0],
                [10, 0, 1, Info.Aussentemperatur, 0, 0, 0, 0],
                [10, 0, 1, Info.Warmwassertemperatur, 0, 0, 0, 0],
                [10, 0, 1, Info.Betriebsphase, 0, 0, 0, 0]
            ]
        };

        const res = await axios.post(`${this.url}/parameter.json`, body);

        if (res.status !== 200 || !res.data.telegramm) {
            throw new Error(res.data);
        }

        return this._decodeTelegram(res.data.telegramm);
    }

    /**
     * Returns the parameters from WCM-SOL Process Parameter Page
     */
    async getWCMSOLProcessParameters(): Promise<FinalTelegramObject[]> {
        const body = {
            prot: 'coco',
            telegramm: [
                [3, 0, 1, Info.T1Kollektor, 0, 0, 0],
                [3, 0, 1, Info.Durchfluss, 0, 0, 0],
                [3, 0, 1, Info.LeistungSolar, 0, 0, 0],
                [3, 0, 1, Info.T2SolarUnten, 0, 0, 0],
                [3, 0, 1, Info.B10PufferOben, 0, 0, 0],
                [3, 0, 1, Info.B11PufferUnten, 0, 0, 0]
            ]
        };

        const res = await axios.post(`${this.url}/parameter.json`, body);

        if (res.status !== 200 || !res.data.telegramm) {
            throw new Error(res.data);
        }

        return this._decodeTelegram(res.data.telegramm);
    }

    /**
     * Decodes a Telegram given from API
     * @param telegram telegram as given as response from API
     */
    private _decodeTelegram(telegram: Telegram): FinalTelegramObject[] {
        const response: TelegramObject[] = [];

        for (const telegramEntry of telegram) {
            const respObj: Partial<TelegramObject> = {};
            for (const i in telegramEntry) {
                const attributeName = Type[i];
                respObj[attributeName as keyof TelegramObject] = telegramEntry[i];
            }
            response.push(respObj as TelegramObject);
        }

        return this._decodeTelegramValues(response);
    }

    /**
     * Decodes the values of an array of telegramObjects, then returns an array of FinalTelegramObjects
     *
     * @param telegramObjects Array matching the interface
     */
    private _decodeTelegramValues(telegramObjects: TelegramObject[]): FinalTelegramObject[] {
        const finalTelegramObjects: FinalTelegramObject[] = [];
        for (const telegramObject of telegramObjects) {
            const finalTelegramObj: FinalTelegramObject = {
                COMMAND: Command[telegramObject.COMMAND] as any,
                MODULTYP: telegramObject.COMMAND,
                DATA: this._convertData(telegramObject),
                BUSKENNUNG: telegramObject.BUSKENNUNG,
                PROT: Protocol[telegramObject.PROT] as any,
                INDEX: telegramObject.INDEX,
                INFONR: (Info[telegramObject.INFONR] as any) || telegramObject.INFONR,
                HIGH_BYTE: telegramObject.HIGH_BYTE
            };

            if (finalTelegramObj.INFONR! in Unit) {
                // @ts-expect-error we have ensured it is in
                finalTelegramObj.UNIT = Unit[finalTelegramObj.INFONR!];
            }

            finalTelegramObjects.push(finalTelegramObj);
        }

        return finalTelegramObjects;
    }

    /**
     * Data is extracted and converted according to its INFONR field
     *
     * @param telegramObject a single telegramObject
     */
    private _convertData(telegramObject: TelegramObject): number {
        switch (telegramObject.INFONR) {
            case Info.VorlauftemperaturEstb:
            case Info.GedaempfteAussentemperatur:
            case Info.Waermeanforderung:
            case Info.Aussentemperatur:
            case Info.Warmwassertemperatur:
            case Info.Abgastemperatur:
            case Info.Vorlauftemperatur:
            case Info.T2SolarUnten:
            case Info.B11PufferUnten:
            case Info.B10PufferOben:
            case Info.T1Kollektor: {
                const val = this._extractValue(telegramObject.DATA, telegramObject.HIGH_BYTE);
                return val / 10;
            }
            case Info.LeistungSolar:
            case Info.Durchfluss: {
                const val = this._extractValue(telegramObject.DATA, telegramObject.HIGH_BYTE);
                return val / 100;
            }
            case Info.Fehlercode:
            case Info.Password:
            case Info.StartsiteFooter:
            case Info.Laststellung:
            case Info.Betriebsphase:
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
    private _extractValue(lowByte: number, highByte: number): number {
        let usValue;

        if (highByte <= 127) {
            usValue = highByte * 256 + lowByte;
        } else if (highByte === 128 && lowByte === 0) {
            usValue = highByte * 256 + lowByte;
        } else {
            usValue = -32768 + (highByte - 128) * 256 + lowByte;
        }
        return usValue;
    }
}
