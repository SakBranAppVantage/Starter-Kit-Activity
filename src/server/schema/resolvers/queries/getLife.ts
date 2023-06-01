import { ObjectId } from 'mongodb';
import { getDatabaseContext } from '../../../database';
import { GraphQLLife, GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['getLife'] = async (root, args: { id: string }) => {
    const { collections } = await getDatabaseContext();
    const temp = await collections.life.findOne({ _id: new ObjectId(args.id) });
    const response: GraphQLLife = {
        ...temp,
        birthDay: temp.birthDay.toISOString(),
        id: temp._id,
    };

    return response;
};

export default query;
