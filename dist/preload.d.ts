declare global {
    interface Bridge {
        getState: typeof getState;
        forward: typeof forward;
    }
    interface Window {
        ElectronValtioBridge: Bridge;
    }
    const ElectronValtioBridge: Bridge;
}
declare const getState: <T>(subscriber: (path: string[], value: any) => void) => T;
declare const forward: (path: string[], value: any) => void;
export {};
