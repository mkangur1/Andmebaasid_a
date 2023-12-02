import { IUser } from './components/users/usersModels';
import {IStatus} from './components/statuses/statusesModels';
import {IManufacturer} from './components/manufacturer/manufacturerModels';
import {ISpare} from './components/spares/sparesModels';

interface IDatabase {
  logs: string[];
  users: IUser[ ];
  statuses: IStatus[];
  spares: ISpare[];
  manufacturer: IManufacturer[];
}

const db: IDatabase = {
  logs: [],
  users: [ ],
  statuses: [],
  spares: [],
  manufacturer: []
};

export { db, ISpare };
