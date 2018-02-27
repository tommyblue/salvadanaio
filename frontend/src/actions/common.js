export const SELECT_DATERANGE = "SELECT_DATERANGE";

export const selectDateRange = (dateRange) => ((dispatch) => dispatch({
    type: SELECT_DATERANGE,
    dateRange,
}));
