const { describe } = require(`mocha`);
const { Weishaupt } = require(`${__dirname}/../build/weishaupt.js`);

describe('No API running', () => {
    let weishauptApi;

    before(done => {
        weishauptApi = new Weishaupt({ ip: '127.0.0.1' });
        done();
    });

    it('should fail in under 2000 ms', async () => {
        let success = false;
        try {
            await weishauptApi.getHomeParameters();
            success = true;
        } catch {
            // all good
        }

        if (success) {
            throw new Error('Request has not failed on non-running API');
        }
    });
});
