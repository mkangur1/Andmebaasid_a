import { FieldPacket, ResultSetHeader } from 'mysql2';
import { IManufacturer } from './manufacturerModels';
import database from '../../database';

const manufacturersServices = {
  getManufacturers: async (): Promise<IManufacturer[] | undefined> => {
    try {
      const [manufacturers]: [IManufacturer[], FieldPacket[]] = await database.query('SELECT * FROM manufacturers WHERE deletedDate IS NULL;');
      return manufacturers;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  getManufacturersById: async (id: number): Promise<IManufacturer | undefined> => {
    try {
      const [manufacturers]: [IManufacturer[], FieldPacket[]] = await database.query('SELECT * FROM manufacturers WHERE id = ? AND deletedDate IS NULL;', [id]);
      return manufacturers[0];
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  createManufacturer: async (
    name: string,
    title: string,
    description: string
  ): Promise<number | undefined> => {
    try {
      const manufacturerWithoutId: Omit<IManufacturer, 'id'> = {
        name,
        title,
        description,
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
      };

      const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('INSERT INTO manufacturers SET ?;', [manufacturerWithoutId]);

      const insertedId = result.insertId;

      const [createdManufacturer]: [IManufacturer[], FieldPacket[]] = await database.query('SELECT * FROM manufacturers WHERE id = ?;', [insertedId]);

      return createdManufacturer[0]?.id || undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
  deleteManufacturer: async (id: number): Promise<boolean> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE manufacturers SET deletedDate = ? WHERE id = ?;', [new Date(), id]);

      if (result.affectedRows > 0) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  updateManufacturer: async (
    id: number,
    name: string,
    title: string,
    description: string
  ): Promise<boolean> => {
    try {
      const updatedManufacturer: Omit<IManufacturer, 'id'> = {
        name,
        title,
        description,
        updatedDate: new Date(),
      };

      const [result]: [ResultSetHeader, FieldPacket[]] = await database.query(
        'UPDATE manufacturers SET ? WHERE id = ? AND deletedDate IS NULL;',
        [updatedManufacturer, id]
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

export default manufacturersServices;
