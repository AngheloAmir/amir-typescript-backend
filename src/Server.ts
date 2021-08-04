import cookieParser from 'cookie-parser';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import mainroutes from './routes';
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

import helmet from 'helmet';
if (process.env.NODE_ENV === 'production') {
    app.use(helmet()); 
}

app.use('/api', mainroutes);

import StatusCodes from 'http-status-codes';
const { BAD_REQUEST } = StatusCodes;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(BAD_REQUEST);
    return res.json({
        error: err.message,
    });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/
const viewsDir = path.join(__dirname, 'views');
const staticDir = path.join(__dirname, 'public');
app.set('views', viewsDir);
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

export default app;
