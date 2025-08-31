export type getallArticle = {
  id_post: string;
  title: string;
  body: string;
  update_at: Date;
  edit_at: Date;
  id_user_who_post: string;
};
export type oneArticle = {
  id_post: string;
  title: string;
  body: string;
  update_at: Date;
  edit_at: Date;
  id_user_who_post: userWhoPost;
};

export type articleUpdateBodyDto = {
    id_post: string | undefined
    title : string;
    body: string ; 
    edit_at: Date;
}

export type userWhoPost = {
  avatar: string;
  email: string;
  id_user: string;
  isActive: boolean;
  name: string;
};
