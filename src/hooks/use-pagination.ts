import {useState} from "react";

export interface PaginationProps {
    boundaryCount?: number; // how many digits to display adjacent to the start and end page number
    siblingCount?: number; // how many digits to display to either side of current page
    totalPages?: number; // total number of pages
    page?: number; // the current page
    defaultPage?: number;
    disabled?: boolean;
    hideNextButton?: boolean;
    hidePrevButton?: boolean;
    showFirstButton?: boolean;
    showLastButton?: boolean;
    onChange?: (page: number, event: any) => void;
}

export function usePagination(props: PaginationProps): PaginationItemProps[] {
    const {
        boundaryCount = 1,
        siblingCount = 1,
        totalPages = 1,
        defaultPage = 1,
        disabled = false,
        hideNextButton = false,
        hidePrevButton = false,
        showFirstButton = false,
        showLastButton = false,
        onChange: onChange,
    } = props;

    const [page, setPage] = useState(props.page || defaultPage);

    const handleClick = (event: any, currentPage: number|null) => {
        if (currentPage) {
            setPage(currentPage);
            if (onChange) {
                onChange(currentPage, event);
            }
        }
    };

    const range = (start: number, end: number) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i);
    };

    const startPages = range(1, Math.min(boundaryCount, totalPages));
    const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

    const siblingsStart = Math.max(
        Math.min(
            // Natural start
            page - siblingCount,
            // Lower boundary when page is high
            totalPages - boundaryCount - siblingCount * 2 - 1,
        ),
        // Greater than startPages
        boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
        Math.max(
            // Natural end
            page + siblingCount,
            // Upper boundary when page is low
            boundaryCount + siblingCount * 2 + 2,
        ),
        // Less than endPages
        endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
    );

    // Basic list of items to render
    // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
    const itemList = [
        ...(showFirstButton ? ['first'] : []),
        ...(hidePrevButton ? [] : ['previous']),
        ...startPages,

        // Start ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...(siblingsStart > boundaryCount + 2
            ? ['start-ellipsis']
            : boundaryCount + 1 < totalPages - boundaryCount
                ? [boundaryCount + 1]
                : []),

        // Sibling pages
        ...range(siblingsStart, siblingsEnd),

        // End ellipsis
        // eslint-disable-next-line no-nested-ternary
        ...(siblingsEnd < totalPages - boundaryCount - 1
            ? ['end-ellipsis']
            : totalPages - boundaryCount > boundaryCount
                ? [totalPages - boundaryCount]
                : []),

        ...endPages,
        ...(hideNextButton ? [] : ['next']),
        ...(showLastButton ? ['last'] : []),
    ];

    // Map the button type to its page number
    const buttonPage = (type: string) => {
        switch (type) {
            case 'first':
                return 1;
            case 'previous':
                return page - 1;
            case 'next':
                return page + 1;
            case 'last':
                return totalPages;
            default:
                return null;
        }
    };

    const items: PaginationItemProps[] = itemList.map((item) => {
        return typeof item === 'number'
            ? {
                onClick: (event: any) => {
                    handleClick(event, item);
                },
                type: 'page',
                page: item,
                selected: item === page,
                disabled,
                'aria-current': item === page ? 'true' : undefined,
            }
            : {
                onClick: (event: any) => {
                    handleClick(event, buttonPage(item));
                },
                type: item,
                page: buttonPage(item),
                selected: false,
                disabled:
                    disabled ||
                    (item.indexOf('ellipsis') === -1 &&
                        (item === 'next' || item === 'last' ? page >= totalPages : page <= 1)),
            };
    });

    return items;
}

export interface PaginationItemProps {
    onClick: (event: any) => void;
    type: 'page' | 'first' | 'last' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis' | string | null;
    page: number|null;
    selected: boolean;
    disabled: boolean;
}