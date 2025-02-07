import {app, BrowserWindow} from 'electron';
import path from 'path';
import { isDev } from './util.js';

console.log('NODE_ENV:', process.env.NODE_ENV);

app.on('ready', () => {


    const mainWindow = new BrowserWindow({/* insert configure here like width */});
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123/');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
});