export enum Type {
    MODULTYP,
    BUSKENNUNG,
    COMMAND,
    INFONR,
    INDEX,
    PROT,
    DATA,
    HIGH_BYTE
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
    /** We need to calculate: 4 is 26 and 14 is 27, 24 is 28 */
    Vorlauftemperatur = 13,
    /** Divide by 10 */
    Warmwassertemperatur = 14,
    /** As it is, it is percent */
    Laststellung = 138,
    /** Divide by 10 */
    Abgastemperatur = 325,
    /** Divide by 10 */
    GedaempfteAussentemperatur = 2572,
    /** Divide by 10 */
    VorlauftemperaturEstb = 3101,
    StartsiteFooter = 5066,
    Password = 5056
}
