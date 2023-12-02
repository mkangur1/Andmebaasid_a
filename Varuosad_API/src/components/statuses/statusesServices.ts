import { FieldPacket } from 'mysql2';
import { IStatus } from './statusesModels';
import database from '../../database';

const statusesServices = {
  getStatuses: async (): Promise<IStatus[] | undefined> => {
    try {
      const [statuses]: [IStatus[], FieldPacket[]] = await database.query('SELECT * FROM statuses;');
      return statuses;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  getStatusById: async (id: number): Promise<IStatus | undefined> => {
    try {
      const [status]: [IStatus[], FieldPacket[]] = await database.query('SELECT * FROM statuses WHERE id = ?;', [id]);
      return status[0];
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
};

export default statusesServices;
