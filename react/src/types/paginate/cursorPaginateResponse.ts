export type CursorPaginateResponse<T> = {
    data: T[];
    next_cursor: string | null;
    prev_cursor: string | null;
    has_more: boolean;
}

export type CursorPaginateRequest = {
    pageParam: number | null;
    limit: number;
}
