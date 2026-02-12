import {
    contextBridge,
    ipcRenderer
} from 'electron';


contextBridge.exposeInMainWorld("electronAPI", {
    // COmmunication sychrone

    getAppInfo: () => ipcRenderer.sendSync('get-app-info'),
    performTask: () => ipcRenderer.sendSync('')

    // Communication asynchrone
    onTaskResult: (callback: (result: any) => void ) => {
        ipcRenderer.on('task-result', (_, result) => callback(result))
    }

});
