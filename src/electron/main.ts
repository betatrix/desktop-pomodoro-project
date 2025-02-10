import {app, BrowserWindow} from 'electron';
import path from 'path';
import { isDev } from './util.js';

console.log('NODE_ENV:', process.env.NODE_ENV);

app.on('ready', () => {


    const mainWindow = new BrowserWindow({
        width: 500,
        height: 700,
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123/');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
});