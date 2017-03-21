/* eslint-env node */


const Transform = require("stream").Transform;

const TStream = function(promiseFactory) {
  Transform.call(this);
  this._readableState.objectMode = false;
  this._writableState.objectMode = true;
  this.promiseFactory = promiseFactory
};

TStream.prototype = Object.create(Transform.prototype);

TStream.prototype.constructor = TStream;

TStream.prototype._transform = function (data, encoding, callback) {
  this.promiseFactory(data).then((res) => callback(null, res));
};

exports.CustomTransform = TStream;
