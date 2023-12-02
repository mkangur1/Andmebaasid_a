import { FieldPacket, ResultSetHeader } from 'mysql2';
import { IUser, INewUser } from './usersModels';
import hashServices from '../helpers/hashServices';
import database from '../../database';

const usersServices = {
  getUsers: async (): Promise<IUser[] | undefined> => {
    try {
      const [users]: [IUser[], FieldPacket[]] = await database.query('SELECT id, firstName, lastName, email, role FROM users;');
      return users;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
  getUserById: async (id: number): Promise<IUser> => {
    const [user]: [IUser[], FieldPacket[]] = await database.query('SELECT id, firstName, lastName, email, role FROM users WHERE id = ?;', [id]);
    return user[0];
  },
  getUserByEmail: async (email: string): Promise<IUser | undefined> => {
    const [user]: [IUser[], FieldPacket[]] = await database.query('SELECT * FROM users WHERE email = ? AND deletedDate IS NULL;', [email]);
    return user[0];
  },
  createUser: async (newUser: INewUser) => {
    const hashedPassword = await hashServices.hashPassword(newUser.password);
    const user = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: hashedPassword,
      role: 'User',
    };
    const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('INSERT INTO users SET ?;', [user]);
    return result.insertId;
  },
  deleteUser: async (id: number): Promise<boolean> => {
    try {
      const [result]: [ResultSetHeader, FieldPacket[]] = await database.query('UPDATE users SET deletedDate = ? WHERE id = ?;', [new Date(), id]);

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

export default usersServices;
