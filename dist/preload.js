"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var getState = function (subscriber) {
    var state = electron_1.ipcRenderer.sendSync('ev-get-state');
    electron_1.ipcRenderer.on('ev-forward', function (_, path, value) {
        subscriber(path, value);
    });
    return JSON.parse(state);
};
var bridge = {
    getState: getState,
};
try {
    electron_1.contextBridge.exposeInMainWorld('ElectronValtioBridge', bridge);
}
catch (_a) {
    window.ElectronValtioBridge = bridge;
}
