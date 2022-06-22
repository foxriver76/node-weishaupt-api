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
export declare class Weishaupt {
    /** URL of the API */
    private readonly url;
    constructor(options: WeishauptOptions);
    getHomeParameters(): Promise<TelegramObject[]>;
    getWTCGProcessParameters(): Promise<TelegramObject[]>;
    /**
     * Decodes a Telegram given from API
     * @param telegram telegram as given as response from API
     */
    private _decodeTelegram;
    private _decodeTelegramValues;
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
