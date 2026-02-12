export interface ElectronAPI {
    getAppInfo: () => any;
    performTask: (data: any) => Promise<void>;
    onTaskResult: (callback: (result: any) => void) => void;
}

declare global {
    interface Window {
        electronAPI: ElectronAPI;
    }
}