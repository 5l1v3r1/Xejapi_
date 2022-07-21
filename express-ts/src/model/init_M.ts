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
            biography VARCHAR(100) DEFAULT 'Hello i am any pepole',
            photo VARCHAR(40) DEFAULT 'default_photo'
        
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
                userID INT(6)  NOT NULL,
                postID INT(6)  NOT NULL,
                _status  INT(6) NOT NULL DEFAULT 1
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

        const Follow_ups = db.query(`
        CREATE TABLE IF NOT EXISTS follow_ups
        (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            followingID INT(6)  NOT NULL,
            followedUserID  INT(6) NOT NULL,
            _status  INT(6) NOT NULL DEFAULT 1
            
         )`
        )
        const Block_ups = db.query(`
        CREATE TABLE IF NOT EXISTS block_ups
        (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            blockingID INT(6)  NOT NULL,
            blockedUserID INT(6) NOT NULL,
            _status  INT(6) NOT NULL DEFAULT 1
            
         )`
        )
        
       
        const Notification_ups = db.query(`
        CREATE TABLE IF NOT EXISTS notification 
        (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            sourceID INT(6)  NOT NULL,
            affectedID INT(6)  NOT NULL,
            type VARCHAR(40) NOT NULL,
            redirectID INT(6) NOT NULL,
            has_it_been_read  INT(6) NOT NULL DEFAULT 0
            
         )`
        ) 
    }
}
export = new initilaze();
