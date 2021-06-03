"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMain = void 0;
var valtio_1 = require("valtio");
var electron_1 = require("electron");
var setup_1 = require("./setup");
var sync_1 = require("./sync");
var setupMain = function (initialObject) {
    var store = valtio_1.proxy(initialObject);
    electron_1.ipcMain.on('ev-forward', function (_, path, value) {
        return sync_1.sync(store, path, value);
    });
    electron_1.ipcMain.on('ev-get-state', function (event) {
        event.returnValue = JSON.stringify(valtio_1.snapshot(store));
    });
    return setup_1.setup(store, function (path, value) {
        return electron_1.webContents
            .getAllWebContents()
            .forEach(function (contents) { return contents.send('ev-forward', path, value); });
    });
};
exports.setupMain = setupMain;
