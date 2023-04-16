export const getPaginationValues = (query: any) => {
    return {
         pageSize:  typeof(query.pageSize) == "string" ? query.pageSize : 10,
         sortBy: typeof(query.sortBy) == "string" ? query.sortBy : 'createdAt',
         pageNum: typeof(query.pageNumber) == "string" ? query.pageNumber : 1,
         sortDirection: typeof(query.sortDirection) == "string" ? query.sortDirection : 'desc',
         searchLoginTerm: typeof(query.searchLoginTerm) == "string" ? query.searchLoginTerm : null,
         searchEmailTerm: typeof(query.searchEmailTerm) == "string" ? query.searchEmailTerm : null,

    }
}

