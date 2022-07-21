# Xejapi_

    HEY IF YOU SEE ANY ERROR PLEASE SAY ME

My api contain those, for now:
Login,
Register,
Post,
Comment,
Reply comment,
Like,
Follow,
Block, Notification, Upload a photo, and with its subproccess.

how to will we use:
NOTE: returns "ok:true" if the result is reached, else msg or error and USE POST METHOD FOR ALL ROUTE

TEST REQUEST:

image

RESPONSE:

image

    for register:
    request to -> api/preproccess/register-user, requirement data {username, email, password, re_password}
    request to -> api/preproccess/login-user, requirement data {username, password}

    for post:
    request to -> api/post/post-create, requirement data {userid, title, content}
    request to -> api/post/post-delete, requirement data {postid}
    request to -> api/post/post-update, requirement data {postid, title, content}
    request to -> api/post/like-post, requirement data {userid, postid}

    for comment:
    request to -> api/comment/comment-create, requirement data {userid, content}
    request to -> api/comment/comment-update, requirement data {commentid, content}
    request to -> api/comment/comment-delete, requirement data {commentid}

    for replycomment:
    request to -> api/recomment/recomment-create, requirement data {userid, replied_commentid, content}
    request to -> api/recomment/recomment-delete, requirement data {recommentid}

    for notification:
    NOTE: type parameter can take those (like_post, recomment, follow). For example, like_post is equal to the string of 'x user liked your post'

    request to -> api/preproccess/notification-create, requirement data: {sourceID, affectedID, type, redirectID, has_it_been_read}
    request to -> api/notification/notification-delete, requirement data {notificationid}
    request to -> api/notification/notification-update, requirement data {notificationid}

    for follow, block, etc:
    request to -> api/preproccess/block-user, requirement data {blockingID, blockedUserID}
    request to -> api/preproccess/follow-user, requirement data {followingID, followedUserID}

    How we can get data in db:
    request to -> api/get-data/get-db, requirement data {table_name} = which are you want info of table write it name

    these specific queries using for getting specific any data:
    id = table self id
    request to -> api/get-data/get-users, requirement data {userid}
    request to -> api/get-data/get-follows, requirement data {id}
    request to -> api/get-data/get-likes, requirement data {id}
    request to -> api/get-data/get-blocked, requirement data {id}
    request to -> api/get-data/get-notification, requirement data {id}
    request to -> api/get-data/get-posts, requirement data {userid or id}
    request to -> api/get-data/get-comments, requirement data {userid or id}
    request to -> api/get-data/get-recomments, requirement data {userid or id}
