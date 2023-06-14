import { Filter, Sort, Collection } from 'mongodb';
import { getDatabaseContext, Life } from '../../../database';
import { getSortingValue, paginateAggregation } from '../../../utils/pagination';
import {
    GraphQLLifeFilteringRule,
    GraphQLLifeSortingRule,
    GraphQLPaginatedLifes,
    GraphQLQueryResolvers,
    LifeSortingField,
    Maybe,
} from '../definitions';

const getFilter = (rule?: Maybe<GraphQLLifeFilteringRule>) => {
    const filter: Filter<Life> = {};

    if (!rule) {
        return filter;
    }

    if (rule.firstName) {
        filter.firstName = 'firstName';
    }

    return filter;
};

const getSort = (rule?: Maybe<GraphQLLifeSortingRule>) => {
    // always sort by ID for consistency
    const sort: Sort = { _id: 1 };
    return sort;
    // if (!rule) {
    //     return sort;
    // }

    // switch (rule.field) {
    //     case LifeSortingField.firstname:
    //         return { firstname: getSortingValue(rule.order), ...sort };

    //     case LifeSortingField.lastname:
    //         return { lastname: getSortingValue(rule.order), ...sort };

    //     default:
    //         throw new Error('Sorting field not supported');
    // }
};

const query: GraphQLQueryResolvers['listLives'] = async (root, { pagination, sort, filter }) => {
    const { collections } = await getDatabaseContext();
    const response = await paginateAggregation(
        collections.life,
        [{ $match: getFilter(filter) }, { $sort: getSort(sort) }],
        pagination
    );

    const result: GraphQLPaginatedLifes = {
        count: response.count,
        items: response.items.map(item => ({
            ...item,
            id: item._id,
        })),
    };
    return result;
};

export default query;
