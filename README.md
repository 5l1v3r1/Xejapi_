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
Notification,
Upload a photo, _and with its subproccess_

**how to will we use:**  
note: returns "ok:true" if the result is reached, else msg or error
<hr width="70%" color="blue" noshade>

**FOR TEST:**

![image](https://user-images.githubusercontent.com/74791506/180266722-4bab41de-b854-4f0b-99ac-9a233818e788.png)
<hr width="70%" color="blue" noshade>

**RESPONSE:**

![image](https://user-images.githubusercontent.com/74791506/180266762-f1d62c3d-4b27-4e9d-b2c1-2ea19d079a9c.png)
<hr width="70%" color="blue" noshade>

> **for register:**  
> request to -> api/preproccess/register-user - requirement data {username, email, password, re_password}  
> request to -> api/preproccess/login-user - requirement data {username, password}
<hr width="70%" color="blue" noshade>

> **for post:**  
> request to -> api/preproccess/post-create - requirement data {userid, title, content}  
> request to -> api/post/post-delete - requirement data {postid}  
> request to -> api/post/post-update - requirement data {postid, title, content}  
> request to -> api/post/like-post - requirement data {userid, postid}
<hr width="70%" color="blue" noshade>

> **for comment:**  
> request to -> api/Preproccess/comment-create - requirement data {userid, content}  
> request to -> api/comment/comment-update - requirement data {commentid, content}  
> request to -> api/comment/comment-delete - requirement data {commentid}
<hr width="70%" color="blue" noshade>

> **for replycomment:**  
> request to -> api/Preproccess/recomment-create - requirement data {userid, replied_commentid, content}  
> request to -> api/recomment/recomment-delete - requirement data {recommentid}
<hr width="70%" color="blue" noshade>

> **for notification:**  
> type parameter can take those (like_post, recomment, follow). For example, like_post is equal to the string of 'x user liked your post'  
> request to -> api/preproccess/notification-create - requirement data {sourceID, affectedID, type, redirectID, has_it_been_read}  
> request to -> api/notification/notification-delete - requirement data {notificationid}  
> request to -> api/notification/notification-update - requirement data {notificationid}
<hr width="70%" color="blue" noshade>

> **for follow, block, etc:**  
> request to -> api/preproccess/block-user - requirement data {blockingID, blockedUserID}  
> request to -> api/preproccess/follow-user - requirement data {followingID, followedUserID}
<hr width="70%" color="blue" noshade>

> **How we can get data in db:**  
> request to -> api/get-data/get-db - requirement data {table_name} = which are you want info of table write it name
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
