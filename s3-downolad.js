/* eslint-env node */


const FS = require('fs');
const zlib = require('zlib');
const S3 = require('aws-sdk/clients/s3');

const CustomReadable = require('./src/custom-readable').CustomReadable;
const CustomTransform = require('./src/transform').CustomTransform;

const s3 = new S3({ apiVersion: '2006-03-01', params: { Bucket: 'weave.io.dynamodb', Delimiter: '/' } });
const prefix = 'PROD.Messages/2017-01-12T02:43:20.042/17/02/20/00/';
const params = { Prefix: prefix };


const messagePromiseFactory = function(key) {
  return new Promise((resolve) => {
    s3.getObject({ Key: key }, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        resolve(null);
      } else {
        resolve(data.Body + '\n');
        process.stdout.write('>');
      }

    });
  });
};

const getObjectKeys = function(params, stream) {
  return new Promise((resolve) => {
    s3.listObjectsV2(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        if (data.CommonPrefixes.length > 0) Promise.all(data.CommonPrefixes.map((e) => getObjectKeys(e, stream))).then(() => resolve());
        else {
          data.Contents.forEach( (e) => { stream.append(e.Key); } );
          resolve();
        }
      }
    });
  });
};


// main

const out = FS.createWriteStream(__dirname + '/backup.gz');
const gzip = zlib.createGzip();
const rs = new CustomReadable();
const ts = new CustomTransform(messagePromiseFactory);

rs.pipe(ts).pipe(gzip).pipe(out);
getObjectKeys(params, rs).then(() => rs.append(null));

//const key = 'PROD.Messages/2017-01-12T02:43:20.042/17/02/20/00/00/4439c062-02df-0ab5-1f49-47755f2b56a3+1489968024302';
//messagePromiseFactory(key).then((res) => console.log(res));


