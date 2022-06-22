"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = exports.Protocol = exports.Command = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["MODULTYP"] = 0] = "MODULTYP";
    Type[Type["BUSKENNUNG"] = 1] = "BUSKENNUNG";
    Type[Type["COMMAND"] = 2] = "COMMAND";
    Type[Type["INFONR"] = 3] = "INFONR";
    Type[Type["INDEX"] = 4] = "INDEX";
    Type[Type["PROT"] = 5] = "PROT";
    Type[Type["DATA"] = 6] = "DATA";
    Type[Type["HIGH_BYTE"] = 7] = "HIGH_BYTE";
})(Type = exports.Type || (exports.Type = {}));
var Command;
(function (Command) {
    Command[Command["READ"] = 1] = "READ";
    Command[Command["WRITE"] = 2] = "WRITE";
    Command[Command["ERROR"] = 255] = "ERROR";
})(Command = exports.Command || (exports.Command = {}));
var Protocol;
(function (Protocol) {
    Protocol[Protocol["STANDARD"] = 0] = "STANDARD";
    Protocol[Protocol["GENERIC"] = 1] = "GENERIC";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
var Info;
(function (Info) {
    /** Take it as it is */
    Info[Info["Fehlercode"] = 1] = "Fehlercode";
    /** Divide by 10 */
    Info[Info["W\u00E4rmeanforderung"] = 2] = "W\u00E4rmeanforderung";
    /** Divide by 10 */
    Info[Info["Au\u00DFentemperatur"] = 12] = "Au\u00DFentemperatur";
    /** We need to calculate: 4 is 26 and 14 is 27, 24 is 28 */
    Info[Info["Vorlauftemperatur"] = 13] = "Vorlauftemperatur";
    /** Divide by 10 */
    Info[Info["Warmwassertemperatur"] = 14] = "Warmwassertemperatur";
    /** As it is, it is percent */
    Info[Info["Laststellung"] = 138] = "Laststellung";
    /** Divide by 10 */
    Info[Info["Abgastemperatur"] = 325] = "Abgastemperatur";
    /** Divide by 10 */
    Info[Info["GedaempfteAussentemperatur"] = 2572] = "GedaempfteAussentemperatur";
    /** Divide by 10 */
    Info[Info["VorlauftemperaturEstb"] = 3101] = "VorlauftemperaturEstb";
    Info[Info["StartsiteFooter"] = 5066] = "StartsiteFooter";
    Info[Info["Password"] = 5056] = "Password";
})(Info = exports.Info || (exports.Info = {}));
//# sourceMappingURL=constants.js.map