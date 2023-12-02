import { RowDataPacket } from 'mysql2';

interface IManufacturer extends RowDataPacket {
  id: number;
  name: string;
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
}

export {IManufacturer};
