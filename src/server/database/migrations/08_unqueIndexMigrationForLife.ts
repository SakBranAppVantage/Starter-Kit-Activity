import { DatabaseContext } from '../instance';

export default {
    identifier: '08_unqueIndexMigrationForLife',

    async up({ regular: { db } }: DatabaseContext): Promise<void> {
        await db.collection('migrations').createIndex({ firstName: 1, lastName: 1 }, { unique: true });
    },
};
