import { FieldPacket, ResultSetHeader } from 'mysql2';
import { ISpare } from './sparesModels';
import database from '../../database';

const sparesServices = {
  getSpares: async (): Promise<ISpare[] | undefined> => {
    try {
      const [spares]: [ISpare[], FieldPacket[]] = await database.query('SELECT * FROM spares WHERE deletedDate IS NULL;');
      return spares;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  getSparesById: async (id: number): Promise<ISpare | undefined> => {
    try {
      const [spares]: [ISpare[], FieldPacket[]] = await database.query('SELECT * FROM spares WHERE id = ? AND deletedDate IS NULL;', [id]);
      return spares[0];
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  createSpare: async (
    name: string,
    manufacturer: string,
    code: string,
    type: string,
    volume: number,
    age: string,
  ): Promise<number | undefined> => {
    try {
      const spareWithoutId: Omit<ISpare, 'id'> = {
        name,
        manufacturer,
        code,
        type,
        volume,
        age,
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
      };

      const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('INSERT INTO spares SET ?;', [spareWithoutId]);

      const insertedId = result.insertId;

      
      const [createdSpare]: [ISpare[], FieldPacket[]] = await database.query('SELECT * FROM spares WHERE id = ?;', [insertedId]);

      return createdSpare[0]?.id || undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  deleteSpare: async (id: number): Promise<boolean> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE spares SET deletedDate = ? WHERE id = ?;', [new Date(), id]);

      if (result.affectedRows > 0) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },


updateSpare: async (
    id: number,
    name: string,
    manufacturer: string,
    code: string,
    type: string,
    volume: number,
    age: string,
  ): Promise<boolean> => {
    try {
      const updatedSpare: Omit<ISpare, 'id'> = {
        name,
        manufacturer,
        code,
        type,
        volume,
        age,
        updatedDate: new Date(),
      };

      const [result]: [ResultSetHeader, FieldPacket[]] = await database.query(
        'UPDATE spares SET ? WHERE id = ? AND deletedDate IS NULL;',
        [updatedSpare, id]
      );

      if (result.affectedRows > 0) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default sparesServices;
