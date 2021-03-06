export declare enum Type {
    MODULTYP = 0,
    BUSKENNUNG = 1,
    COMMAND = 2,
    INFONR = 3,
    INDEX = 4,
    PROT = 5,
    DATA = 6,
    HIGH_BYTE = 7
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
    Waermeanforderung = 2,
    /** Divide by 10 */
    Aussentemperatur = 12,
    /** We need to calculate: 4 is 26 and 14 is 27, 24 is 28 */
    Vorlauftemperatur = 13,
    /** Divide by 10 */
    Warmwassertemperatur = 14,
    /** Divide by 10 */
    B10PufferOben = 118,
    /** Divide by 10 */
    B11PufferUnten = 120,
    /** Divide by 100 */
    Durchfluss = 130,
    /** As it is, it is percent */
    Laststellung = 138,
    /** Divide by 10 */
    Abgastemperatur = 325,
    /** Take as it is */
    Betriebsphase = 373,
    /** Divide by 100 */
    LeistungSolar = 475,
    /** Divide by 10 */
    GedaempfteAussentemperatur = 2572,
    /** Divide by 10 */
    T1Kollektor = 2601,
    /** Divide by 10 */
    T2SolarUnten = 2602,
    /** Divide by 10 */
    VorlauftemperaturEstb = 3101,
    StartsiteFooter = 5066,
    Password = 5056
}
export declare enum Unit {
    Waermeanforderung = "\u00B0C",
    Aussentemperatur = "\u00B0C",
    Vorlauftemperatur = "\u00B0C",
    Warmwassertemperatur = "\u00B0C",
    B10PufferOben = "\u00B0C",
    B11PufferUnten = "\u00B0C",
    Durchfluss = "l/min",
    Laststellung = "%",
    Abgastemperatur = "\u00B0C",
    LeistungSolar = "W",
    GedaempfteAussentemperatur = "\u00B0C",
    T1Kollektor = "\u00B0C",
    T2SolarUnten = "\u00B0C",
    VorlauftemperaturEstb = "\u00B0C"
}
