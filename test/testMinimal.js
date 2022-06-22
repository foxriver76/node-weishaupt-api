const { describe } = require(`mocha`);
const { Weishaupt } = require(`${__dirname}/../build/weishaupt.js`);

describe('No API running', () => {
    let weishauptApi;

    before(done => {
        weishauptApi = new Weishaupt({ ip: '127.0.0.1' });
        done();
    });

    it('should fail in under 2000 ms', async () => {
        try {
            await weishauptApi.getHomeParameters();
        } catch (e) {
            if (!e.message.includes('ECONNREFUSED')) {
                throw new Error(`Wrong rejection message: ${e.message}`);
            }
        }
    });
});
