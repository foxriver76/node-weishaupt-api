import { Command, Info, Protocol, Unit } from './constants';
interface WeishauptOptions {
    url: string;
}
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
    UNIT?: Unit;
}
export declare class Weishaupt {
    /** URL of the API */
    private readonly url;
    constructor(options: WeishauptOptions);
    /**
     * Returns parameters present on Startsite
     */
    getHomeParameters(): Promise<FinalTelegramObject[]>;
    /**
     * Returns the parameters present on WTC-G Process Parameter Page
     */
    getWTCGProcessParameters(): Promise<FinalTelegramObject[]>;
    /**
     * Returns the parameters from WCM-SOL Process Parameter Page
     */
    getWCMSOLProcessParameters(): Promise<FinalTelegramObject[]>;
    /**
     * Decodes a Telegram given from API
     * @param telegram telegram as given as response from API
     */
    private _decodeTelegram;
    /**
     * Decodes the values of an array of telegramObjects, then returns an array of FinalTelegramObjects
     *
     * @param telegramObjects Array matching the interface
     */
    private _decodeTelegramValues;
    /**
     * Data is extracted and converted according to its INFONR field
     *
     * @param telegramObject a single telegramObject
     */
    private _convertData;
    /**
     * Calculate the Value from the low byte and high byte
     *
     * @param lowByte
     * @param highByte
     */
    private _extractValue;
}
export {};
