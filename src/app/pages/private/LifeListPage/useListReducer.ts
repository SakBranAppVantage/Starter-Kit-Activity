import { useReducer } from 'react';
import { SortingOrder, LifeSortingRule, LifeSortingField } from '../../../api';
import { pageReducer, PageState, PageAction } from '../../../components/PaginatedTable';

type State = PageState & {
    sort: LifeSortingRule;
};

type Action = PageAction & { sort: LifeSortingRule };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        default:
            return pageReducer(state, action);
    }
};

const useListReducer = () =>
    useReducer(reducer, {
        // default pagination
        page: 1,
        pageSize: 10,

        // default sorting
        sort: {
            field: LifeSortingField.FirstName,
            order: SortingOrder.Asc,
        },
    });

export default useListReducer;
