export enum Type {
    MODULTYP,
    BUSKENNUNG,
    COMMAND,
    INFONR,
    INDEX,
    PROT,
    DATA,
    UNKNOWN
}

export enum Command {
    READ = 1,
    WRITE = 2,
    ERROR = 255
}

export enum Protocol {
    STANDARD,
    GENERIC
}

export enum Info {
    /** Take it as it is */
    Fehlercode = 1,
    /** Divide by 10 */
    Wärmeanforderung = 2,
    /** Divide by 10 */
    Außentemperatur = 12,
    /** We need to calculate: 4 is 26 and 14 is 27 */
    Vorlauftemperatur = 13,
    StartsiteFooter = 5066,
    Password = 5056
}
