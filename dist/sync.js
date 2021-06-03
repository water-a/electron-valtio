"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sync = void 0;
var sync = function (target, path, value) {
    var curr = target;
    var index = 0;
    while (index < path.length - 1 && curr != null) {
        curr = target[path[index]];
        index += 1;
    }
    if (curr != null) {
        curr[path[index]] = value;
    }
    else {
        throw new Error('Failed to sync!');
    }
};
exports.sync = sync;
