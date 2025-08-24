export type articleCreateBodyDto = {
    title : string;
    body: string ; 
    create_at: Date;
    id_user_who_post: string;
}
export type articleDeleteBodyDto = {
    id_post: string
}