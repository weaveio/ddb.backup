/*eslint-env node, es_modules*/

const ddb = require('./src/ddb');

const records = require('./src/records');

ddb.handler(records.events, {}, (error, success) => { console.log(success); });

