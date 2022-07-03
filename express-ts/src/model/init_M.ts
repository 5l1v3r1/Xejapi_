import { db } from '../utils/utils'

class initilaze {
    init = async () => {

        const User_table = db.query(`
        CREATE TABLE IF NOT EXISTS users 
        (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(30) NOT NULL UNIQUE,
            email VARCHAR(30) NOT NULL UNIQUE,
            password VARCHAR(50)  NOT NULL  ,
            re_password VARCHAR(50)  NOT NULL,
            biography VARCHAR(100) DEFAULT 'Hello i am any pepole'
        
        )`)

        const Post_table = db.query(`
        CREATE TABLE IF NOT EXISTS posts 
            (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                userid INT(6)  NOT NULL,
                title VARCHAR(100) NOT NULL, 
                content VARCHAR(30) NOT NULL)
            `)

        const Comment_table = db.query(`
            CREATE TABLE IF NOT EXISTS comments 
            (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                userid INT(6)  NOT NULL,
                postid INT(6)  NOT NULL, 
                content VARCHAR(30) NOT NULL,
                date VARCHAR(30) NOT NULL
            )`
        )

        const Like_table = db.query(`
            CREATE TABLE IF NOT EXISTS likes
            (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                userid INT(6)  NOT NULL,
                postid INT(6)  NOT NULL,
                _like   INT(6)  NOT NULL DEFAULT 0
            )`
        )

        const Reply_comment = db.query(`
        CREATE TABLE IF NOT EXISTS reply_comments
        (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            userid INT(6) NOT NULL,
            replied_commentid INT(6)  NOT NULL,
            content VARCHAR(255) NOT NULL 
        )`
        )


    }
}
export = new initilaze();
