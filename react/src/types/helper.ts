export const createCursorParams = (pageParam: number | null, limit: number): URLSearchParams => {
    const params = new URLSearchParams();
    if (pageParam) params.append('cursor', pageParam.toString());
    params.append('limit', limit.toString());

    return params;
}

export const createPaginateParams = (query: string, page: number, per_page: number): URLSearchParams => {
    const params = new URLSearchParams();
    params.append('query', query);
    params.append('per_page', per_page.toString());
    params.append('page', page.toString());

    return params;
}