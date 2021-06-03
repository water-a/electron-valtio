"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
var setup = function (initialObject, onSet, path) {
    if (path === void 0) { path = []; }
    var baseObject = Array.isArray(initialObject)
        ? []
        : Object.create(Object.getPrototypeOf(initialObject));
    return new Proxy(baseObject, {
        get: function (_, prop) {
            var accessed = initialObject[prop];
            if (typeof prop !== 'symbol' &&
                (typeof accessed === 'object' || typeof accessed === 'function') &&
                accessed != null) {
                return exports.setup(accessed, onSet, __spreadArray(__spreadArray([], path), [prop]));
            }
            return initialObject[prop];
        },
        set: function (_, prop, value) {
            onSet(__spreadArray(__spreadArray([], path), [prop]), value);
            // @ts-ignore
            initialObject[prop] = value;
            return true;
        },
    });
};
exports.setup = setup;
