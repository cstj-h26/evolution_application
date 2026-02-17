import {
    contextBridge,
    ipcRenderer
} from 'electron';


contextBridge.exposeInMainWorld("electronAPI", {
    // COmmunication sychrone
    getAppInfo: () => ipcRenderer.sendSync('get-app-info'),

    // Communication asynchrone
    onTaskResult: (callback: (result: any) => void ) => {
        ipcRenderer.on('task-result', (_, result) => callback(result))
    },

    performTask: (data: any) => ipcRenderer.send("perform-task", data),

    calculate: (a: number, b: number) => ipcRenderer.invoke('calculate', {a,b}),
});
