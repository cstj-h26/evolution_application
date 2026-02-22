export interface ElectronAPI {
    getAppInfo: () => any;
    performTask: (data: any) => Promise<void>;
    onTaskResult: (callback: (result: any) => void) => void;
    calculate: (a: number, b: number) => Promise<number>;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}