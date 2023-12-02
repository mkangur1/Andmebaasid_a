import { RowDataPacket } from 'mysql2';

interface IStatus extends RowDataPacket {
  id: number;
  status: 'Olemas' | 'Otsas';
}

export {IStatus};
