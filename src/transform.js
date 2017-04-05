/* eslint-env node */

'use strict';

const Transform = require("stream").Transform;

/** @this TStream */
const TStream = function(promiseFactory) {
  Transform.call(this);
  this._readableState.objectMode = false;
  this._writableState.objectMode = true;
  this.promiseFactory = promiseFactory;
};

TStream.prototype = Object.create(Transform.prototype);

TStream.prototype.constructor = TStream;

TStream.prototype._transform = function (data, encoding, callback) {
  this.promiseFactory(data).then((res) => {
    this.push(res);
    this.push('\n');
    callback(null);
  });
};

exports.CustomTransform = TStream;
