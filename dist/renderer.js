"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRenderer = void 0;
var vanilla_1 = require("valtio/vanilla");
var setup_1 = require("./setup");
var sync_1 = require("./sync");
var setupRenderer = function () {
    var store;
    var state = ElectronValtioBridge.getState(function (path, value) {
        sync_1.sync(store, path, value);
    });
    store = setup_1.setup(vanilla_1.proxy(state), function (path, value) {
        ElectronValtioBridge.forward(path, value);
    });
    return store;
};
exports.setupRenderer = setupRenderer;
