export interface Register {
    username: string,
    email: any,
    password: any,
    re_password: any
};


export interface Login {
    username: string,
    password: string,

}

export interface Post {
    userid: number,
    title: any,
    content: any


}

export interface Comment {
    userid: number,
    postid: number,
    content: string,
    date: any
}
export interface Reply_comment {
    userid: number,
    replied_commentid: number,
    content: string,

}
export interface Like {
    userid: number,
    postid: number,
    _like: number
}
