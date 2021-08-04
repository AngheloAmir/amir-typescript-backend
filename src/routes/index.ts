/*
    A simple base routes
*/

import { Router, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
const { OK } = StatusCodes;

const userRouter = Router();
userRouter.get('/test', (req: Request, res: Response) => {
    return res.status(OK).send('you are in the test!');
});
export default userRouter;
