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
> request to -> api/preproccess/register-user - requirement data {username, email, password, re\_password}  
> request to -> api/preproccess/login-user - requirement data {username, password}
<hr width="70%" color="blue" noshade>

> **for post:**  
> request to -> api/post/post-create - requirement data {userid, title, content}  
> request to -> api/post/post-delete - requirement data {postid}  
> request to -> api/post/post-update - requirement data {postid, title, content}  
> request to -> api/post/like-post - requirement data {userid, postid}
<hr width="70%" color="blue" noshade>

> **for comment:**  
> request to -> api/comment/comment-create - requirement data {userid, content}  
> request to -> api/comment/comment-update - requirement data {commentid, content}  
> request to -> api/comment/comment-delete - requirement data {commentid}
<hr width="70%" color="blue" noshade>

> **for replycomment:**  
> request to -> api/recomment/recomment-create - requirement data {userid, replied\_commentid, content}  
> request to -> api/recomment/recomment-delete - requirement data {recommentid}
<hr width="70%" color="blue" noshade>

> **for notification:**  
> request to -> api/preproccess/notification-create - requirement data {sourceID, affectedID, type, redirectID, has\_it\_been\_read}  
> type parameter can take those (like\_post, recomment, follow). For example, like\_post is equal to the string of 'x user liked your post'  
> request to -> api/notification/notification-delete - requirement data {notificationid}  
> request to -> api/notification/notification-update - requirement data {notificationid}
<hr width="70%" color="blue" noshade>

> **for follow, block, etc:**  
> request to -> api/preproccess/block-user - requirement data {blockingID, blockedUserID}  
> request to -> api/preproccess/follow-user - requirement data {followingID, followedUserID}
<hr width="70%" color="blue" noshade>

> **How we can get data in db:**  
> request to -> api/get-data/get-db - requirement data {table\_name} = which are you want info of table write it name
<hr width="70%" color="blue" noshade>

> **these specific queries using for getting specific any data:**  
> id = table self id  
> request to -> api/get-data/get-users - requirement data {userid}  
> request to -> api/get-data/get-follows - requirement data {id}  
> request to -> api/get-data/get-likes - requirement data {id}  
> request to -> api/get-data/get-blocked - requirement data {id}  
> request to -> api/get-data/get-notification - requirement data {id}  
> request to -> api/get-data/get-posts - requirement data {userid or id}  
> request to -> api/get-data/get-comments - requirement data {userid or id}  
> request to -> api/get-data/get-recomments - requirement data {userid or id}
<hr width="70%" color="blue" noshade>
