# Node-Weishaupt-API
[![NPM version](http://img.shields.io/npm/v/weishaupt-api.svg)](https://www.npmjs.com/package/weishaupt-api)
[![Downloads](https://img.shields.io/npm/dm/weishaupt-api.svg)](https://www.npmjs.com/package/weishaupt-api)
![Build Status](https://github.com/foxriver76/node-weishaupt-api/workflows/Test%20and%20Release/badge.svg)

A node module for the local Weishaupt WCM-COM 1.0 home API entirely written in TypeScript.

## Disclaimer
The developers of this module are in no way endorsed by or affiliated with
Weishaupt GmbH, or any associated subsidiaries, logos or trademarks.

## Installation
```npm install weisshaupt-api --production```

## Example

```typescript
import { Weishaupt } from 'weishaupt-api';

const api = new Weishaupt({ url: 'http://192.168.144.162' });

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

```

## Changelog
### 0.1.2 (2022-09-18)
* (foxriver76) fixed some types

### 0.1.0 (2022-09-18)
* (foxriver76) throw meaningful error if server is busy

### 0.0.2
* (foxriver76) added units for the values

### 0.0.1
* (foxriver76) initial release
