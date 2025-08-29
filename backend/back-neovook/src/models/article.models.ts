export type articleCreateBodyDto = {
    title : string;
    body: string ; 
    create_at: Date;
    id_user_who_post: string;
}
export type articleDeleteBodyDto = {
    id_post: string
}

export type articleUpdateBodyDto = {
    id_post: string
    title : string;
    body: string ; 
    edit_at: Date;
}
export type getArticle = {
    id_post : string
    title : string 
    body : string 
    update_at: Date 
    edit_at : Date
    id_user_who_post : string
}