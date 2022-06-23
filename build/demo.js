"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weishaupt_1 = require("./weishaupt");
const api = new weishaupt_1.Weishaupt({ url: 'http://192.168.44.62' });
(async () => {
    const res = await api.getHomeParameters();
    console.log(res);
    console.log('----------------------');
    const res2 = await api.getWTCGProcessParameters();
    console.log(res2);
    console.log('----------------------');
    const res3 = await api.getWCMSOLProcessParameters();
    console.log(res3);
})();
//# sourceMappingURL=demo.js.map