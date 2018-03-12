import _ from 'lodash';

import {fetchResource, errorOnFetch} from './fetch';

export const LOADED_CATEGORY = "LOADED_CATEGORY";
export const SELECT_CATEGORY = "SELECT_CATEGORY";

export const selectCategory = (category_id) => ({
    type: SELECT_CATEGORY,
    category_id: !_.isEmpty(category_id) ? parseInt(category_id, 10) : category_id,
});

export const loadCategories = () => ((dispatch) => {
    fetchResource('categories').then(
        response => dispatch(loadedCategories(response.data)),
        error => dispatch(errorOnFetch(error))
    )
});

const loadedCategories = (categories) => ({
    type: LOADED_CATEGORY,
    categories,
});
