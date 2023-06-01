import { getDatabaseContext } from '../../../database';
import { GraphQLLife, GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['listLives'] = async (root, args) => {
    const { collections } = await getDatabaseContext();
    const temp = await collections.life.find().toArray();
    const response: Array<GraphQLLife> = [];
    temp.forEach(x => {
        const data: GraphQLLife = {
            ...x,
            birthDay: x.birthDay.toISOString(),
            id: x._id,
        };
        response.push(data);
    });

    return response;
};

export default query;
