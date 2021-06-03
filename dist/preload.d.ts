declare global {
    interface Bridge {
        getState: typeof getState;
    }
    interface Window {
        ElectronValtioBridge: Bridge;
    }
    const ElectronValtioBridge: Bridge;
}
declare const getState: <T>(subscriber: (path: string[], value: any) => void) => T;
export {};
