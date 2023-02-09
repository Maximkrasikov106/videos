import exp from "constants";

export type CreateVideoModel = {
    title: string,
    author: string,
    availableResolutions: string[]
}


export type ChangeVideoModel = {
    title: string,
    author: string,
    canBeDownloaded: boolean,
    availableResolutions: string[],
    minAgeRestriction: number | null,
    publicationDate: string
}