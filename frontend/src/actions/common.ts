export const SELECT_DATERANGE = "SELECT_DATERANGE";

export const selectDateRange = (dateRange: any) => ((dispatch: any) => dispatch({
    dateRange,
    type: SELECT_DATERANGE,
}));
