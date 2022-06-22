import { Weishaupt } from './weishaupt';

const api = new Weishaupt({ url: 'http://192.168.44.62' });

(async () => {
    const res = await api.getHomeParameters();
    console.log(res);

    //const res2 = await api.getWTCGProcessParameters();
    //console.log(res2);
})();
