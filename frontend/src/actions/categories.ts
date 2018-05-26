import * as _ from 'lodash';

import {errorOnFetch, fetchResource} from './fetch';

export const LOADED_CATEGORY = "LOADED_CATEGORY";
export const SELECT_CATEGORY = "SELECT_CATEGORY";

export const selectCategory = (categoryId: any) => ({
    category_id: !_.isEmpty(categoryId) ? parseInt(categoryId, 10) : categoryId,
    type: SELECT_CATEGORY,
});

export const loadCategories = () => ((dispatch: any) => (
    fetchResource('categories').then(
        (response: any) => dispatch(loadedCategories(response.data)),
        (error: any) => dispatch(errorOnFetch(error))
    )
));

const loadedCategories = (categories: any) => ({
    categories,
    type: LOADED_CATEGORY,
});
