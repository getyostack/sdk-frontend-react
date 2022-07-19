export interface PagedResult<T=any> {
    results: T[];
    page: PagedResultInfo;
}

export interface PagedResultInfo {
    currentPage: number; // 1-based
    totalPages: number;
    totalCount: number;
    pageSize: number;
}