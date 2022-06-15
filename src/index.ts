/*
    https://galavtg.herokuapp.com/
*/
import '../env/startInitEnv';
import app from './Server';
import Logger from 'jet-logger';

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    Logger.info('Express server started on port: ' + port);
});
