import { DatabaseContext } from '../instance';

export default {
    identifier: '08_intialLifesIndex',

    async up({ regular: { db } }: DatabaseContext): Promise<void> {
        await db.collection('life').createIndex({ firstName: 1, lastName: 1 }, { unique: true });
    },
};
