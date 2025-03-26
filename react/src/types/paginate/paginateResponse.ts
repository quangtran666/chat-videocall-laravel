export type PaginateResponse<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export type PaginateRequest = {
    query: string;
    per_page?: number;
    page?: number;
}
