import { config } from '../config'
import { createConnection, QueryError, RowDataPacket } from "mysql2";

const db: any = createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port
});


 function is_valid_email(email: string){
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(email);
  }


export { is_valid_email, db };

