/* eslint-env node */

var util = require('util');

exports.putObject = (obj, callback) => {
  var result = util.format('PUT => Bucket: %s, Key: %s, Body: %s', obj.Bucket, obj.Key, '<body here>');
  console.log(result);
  callback(null,'OK');
};

exports.deleteObject = (obj, callback) => {
  var result = util.format('DELETE => Bucket: %s, Key: %s, Body: %s', obj.Bucket, obj.Key);
  console.log(result);  
  callback(null,'OK');
};