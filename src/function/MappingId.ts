import {usersType, viewBlogModel, viewPostModel} from "../types";


export function noIdBlog(array: Array<viewBlogModel> ) {

    return array.map((blog) => {


        return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    })
}
export function idBlog(blog: viewBlogModel )  {
    return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership

    }
}

export function noIdPosts(array: Array<viewPostModel> ) {

    return array.map((post) => {


        return {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt ,

        }
    })
}

export function noIdPost(post: viewPostModel )  {
    return {
        id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt ,

    }
}



export  function vievQueryP(items: any, sortBy: string, limit: string | number,
                            pageNum: string | number, sortDirection: string, totalCount: number ) {
    let [number, size] = [+pageNum - 1, +limit]





    return  {
        pagesCount: Math.ceil(totalCount / size),
        page: +pageNum,
        pageSize: +limit,
        totalCount: totalCount,
        items: items
    }
}

export function viewUsers(getUsers: any) {
    return getUsers.map((user: any) => {
        return {
            id: user._id,
            login: user.login,
            email: user.email,
            createdAt: user.createdAt
        }
    })

}

export function viewComments(getComments: any) {
    return getComments.map((comments: any) => {
        return {
            id: comments._id,
            content: comments.content,
            commentatorInfo: comments.commentatorInfo,
            createdAt: comments.createdAt
        }
    })

}

export function viewUser(getUser: any) {
        return {
            id: getUser._id,
            login: getUser.login,
            email: getUser.email,
            createdAt: getUser.createdAt
        }
}
export function vievUserModel(user: any) {

    return {
        email: user.email,
        login: user.login,
        userId: user._id.toString()
    };

}

export function vievUserModelForComments(user: any) {

    return {

        userLogin: user.login,
        userId: user._id.toString()
    };

}
export function viewComment(comment: any) {
    return {
        id: comment._id,
        content: comment.content,
        commentatorInfo: comment.commentatorInfo,
        createdAt: comment.createdAt
    }
}