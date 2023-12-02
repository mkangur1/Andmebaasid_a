import { RowDataPacket } from 'mysql2';

interface ISpare extends RowDataPacket {
  id: number;
  name: string;
  manufacturer: string;
  code: string;
  type: string;
  volume: number;
  age: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
}

export {ISpare};
