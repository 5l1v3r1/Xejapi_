> ### HEY IF YOU SEE ANY ERROR PLEASE SAY ME

My api contain those, for now:  
Login,  
Register,  
Post,  
Comment,  
Reply comment,  
Like,  
Follow,  
Block,  
Upload a photo, _and with its subproccess_

**how to will we use:**  
note: returns "ok:true" if the result is reached, else msg or error

> **for register:**  
> request to -> api/preproccess/register-user, {username, email, password, re_password}  
> request to -> api/preproccess/login-user, {username, password}

> **for post:**  
> request to -> api/post/post-create, {userid, title, content}  
> request to -> api/post/post-delete, {postid}  
> request to -> api/post/post-update, {postid, title, content}  
> request to -> api/post/like-post,  {userid, postid}

> **for comment:**  
> request to -> api/comment/comment-create, {userid, content}  
> request to -> api/comment/comment-update, {commentid, content}  
> request to -> api/comment/comment-delete, {commentid}

> **for replycomment:**  
> request to -> api/recomment/recomment-create, {userid, replied_commentid, content}  
> request to -> api/recomment/recomment-delete, {recommentid}

> **for notification:**  
> **NOTE:** type parameter can take those (like_post, recomment, follow). For example, like_post is equal to the string of 'x user liked your post'  
> request to -> api/preproccess/notification-create, {sourceID, affectedID, type, redirectID, has_it_been_read}  
  request to -> api/notification/notification-delete, {notificationid}  
> request to -> api/notification/notification-update,  {notificationid}

> **for follow, block, etc:**  
> request to -> api/preproccess/block-user, {blockingID, blockedUserID}  
> request to -> api/preproccess/follow-user,  {followingID, followedUserID}

> **How we can get data in db:**  
> request to -> api/get-data/get-db,  {table_name} = which are you want info of table write it name

> **these specific queries using for getting specific any data:**  
> id = table self id  
> request to -> api/get-data/get-users,  userid}  
> request to -> api/get-data/get-follows, {id}  
> request to -> api/get-data/get-likes, {id}  
> request to -> api/get-data/get-blocked, {id}  
> request to -> api/get-data/get-notification, {id}  
> request to -> api/get-data/get-posts, {userid or id}  
> request to -> api/get-data/get-comments, {userid or id}  
> request to -> api/get-data/get-recomments, {userid or id}
