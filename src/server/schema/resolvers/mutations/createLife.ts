/* eslint-disable no-console */
import { ObjectId } from 'mongodb';
import { Life, getDatabaseContext } from '../../../database';
import { isDuplicateErrorOnFields } from '../../../utils/common';
import { InvalidInput } from '../../errors';
import { GraphQLLife, GraphQLMutationResolvers } from '../definitions';

const mutation: GraphQLMutationResolvers['createLife'] = async (
    root,
    { firstName, lastName, title, description, birthDay, hobbies },
    { getTranslations }
) => {
    const { collections } = await getDatabaseContext();
    const { t } = await getTranslations(['errors']);
    const parsedBirthDay = new Date(birthDay);

    const newLife: Life = {
        _id: new ObjectId(),
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        title,
        description,
        birthDay: parsedBirthDay,
        hobbies,
    };
    try {
        await collections.life.insertOne(newLife);
        console.log('THis is error');
    } catch (error) {
        if (isDuplicateErrorOnFields(error, 'firstName', 'lastName')) {
            throw new InvalidInput({ message: t('Duplicate first name and last name.') });
        }
        throw error;
    }

    const response: GraphQLLife = {
        ...newLife,
        id: newLife._id,
        birthDay: newLife.birthDay.toISOString(),
    };

    return response;
};

export default mutation;
