export declare enum Type {
    MODULTYP = 0,
    BUSKENNUNG = 1,
    COMMAND = 2,
    INFONR = 3,
    INDEX = 4,
    PROT = 5,
    DATA = 6,
    UNKNOWN = 7
}
export declare enum Command {
    READ = 1,
    WRITE = 2,
    ERROR = 255
}
export declare enum Protocol {
    STANDARD = 0,
    GENERIC = 1
}
export declare enum Info {
    /** Take it as it is */
    Fehlercode = 1,
    /** Divide by 10 */
    Wärmeanforderung = 2,
    /** Divide by 10 */
    Außentemperatur = 12,
    /** We need to calculate data + 13 */
    Vorlauftemperatur = 13,
    StartsiteFooter = 5066,
    Password = 5056
}
