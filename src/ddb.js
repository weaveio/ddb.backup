/*eslint-env node*/
/**
 * @module src/ddb
 */

'use strict';


const util = require('util');
const s3 = require('./aws-sdk/clients/s3');

exports.handler = (event, context, callback) => {
  
  event.Records.forEach((record) => {
    
    const streamName = arn2name(record.eventSourceARN);
    const item = record.dynamodb;
    const date = new Date(parseInt(item.Keys.Millis.N, 10));
    const keyName = item.Keys.CnlUid.S + '+' + item.Keys.Millis.N;
    const keyFull = toKey(streamName, date, keyName);
    const data = JSON.stringify(item.NewImage);
    
    console.log(keyFull);
    
    switch(record.eventName) {
      case 'INSERT':
        doUpload(keyFull, data, callback);
        break;
      case 'MODIFY':
        doUpload(keyFull, data, callback);
        break;
      case 'REMOVE':
        doDelete(keyFull, callback);
        break;
      default:
        console.error(util.format('Unhandled case %s', record.eventName));
    }

  });

};



const toStr = function(n) { return ("0" + n).substr(-2); };

const toKey = function(streamName, date, keyName) {
  return util.format('%s/%s/%s/%s/%s/%s/%s', streamName,
    toStr(date.getUTCFullYear()),
    toStr(date.getUTCMonth()),
    toStr(date.getUTCDate()),
    toStr(date.getUTCHours()),
    toStr(date.getUTCMinutes()),
    keyName);
};

const arn2name = function(arn) {
  const tmp = arn.split('/');
  return tmp[1] + '/' + tmp[3];
};

const BUCKET = 'weave.io.dynamodb';

const doUpload = function(key, body, callback) {
  s3.putObject({Bucket: BUCKET, Key: key, Body: body}, callback);
};

const doDelete = function(key, callback) {
  s3.deleteObject({Bucket: BUCKET, Key: key}, callback);
};


