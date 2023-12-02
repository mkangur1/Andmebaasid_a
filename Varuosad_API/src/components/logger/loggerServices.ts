import { db } from '../../db';

const loggerServices = {
    logEvent: (event: string) => {
        db.logs.push(event);
    },
    getLogs: () => {
        return db.logs;
    }
}

export default loggerServices;
