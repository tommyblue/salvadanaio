export const SELECT_CATEGORY = "SELECT_CATEGORY";

export const selectCategory = (category_id) => ({
    type: SELECT_CATEGORY,
    category_id,
});
