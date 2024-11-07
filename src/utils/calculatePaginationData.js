export const calculatePaginationData = ({page, perPage, totalItems}) => {
    const totalPages = Math.ceil(totalItems / perPage);
    const hasNextPage = page < totalPages;
    const hasPreviosPage = page > 1;

    return {
        page,
        perPage,
        totalItems,
        totalPages,
        hasNextPage,
        hasPreviosPage,
    };
};
