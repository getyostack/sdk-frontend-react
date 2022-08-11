export interface PagedResultInfo {
    currentPage: number; // 1-based
    totalPages: number;
    totalCount: number;
    pageSize: number;
}