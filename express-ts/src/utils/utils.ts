import config from '../config'
import { createConnection, QueryError, RowDataPacket } from "mysql2";

const db: any = createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    port: config.db.port
});

//let email: any = "example@gmail.com"
function is_valid_email(email: any) {
    if (!email)
        return false;

    if (email.length > 100)
        return false;

    let indent = email.indexOf('@');
    let arr = ["@", "g", "m", "a", "i", "l", ".", "c", "o", "m"];

    for (let i = 0; i < 10; i++) {

        console.log(email[i + indent])
        if (email[i + indent] != arr[i]) {
            console.log('heja')
            return false;
        }
        else {
            console.log('hejax')
            return true;
        }
    }



}
 


export { is_valid_email, db };

