```mermaid
---
title: Animal example
---
classDiagram


    class User{
        +int id_user
        +String name
        +String email
        +String avatar
        +text post
        -text password
        +toJson()
        +fromJson()
    }
    class Post{
        +int id_post
        +string autor
        +date date
        +String title
        +text content

        +int id_user_who_post
        +toJson()
        +fromJson()
    }

    class ManageUser{
        +User user
        +editUser(int id_user)
        +createuser()
    }
    class ManagePost{
        +Post post
        -editPost(id_user, post)
        -deletePost(id_user, post)
    }
    class ManageLike{
        +Like like
        +bool islikePost(id_like, id_user, id_post)
    }
    class Like{
        +int id_like
        +int id_user
        +int id_post
        +toJson()
        +fromJson()
    }
     
````