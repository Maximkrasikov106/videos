export let DB:TypesVid[] = [
    {
        id:123123,
        title: 'memasd',
        author: 'kek',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: '2023-02-08T10:06:24.387Z',
        publicationDate: '2023-02-09T10:06:24.387Z',
        availableResolutions: ['P144']
    }
]

export function setDB_Blogs (newBlog:BlogsType[]) {
    DB_Blogs = newBlog
}

export let DB_Blogs:BlogsType[] = [

        {
            id: "232",
            name: "mem4uk",
            description: 'asdasdasd',
            websiteUrl: "https://kek.org"
        }
]

export type BlogsType =  {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export type TypesVid = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions:string[]
}