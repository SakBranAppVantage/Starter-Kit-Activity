import { ObjectId } from 'mongodb';

export type Life = {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    fullName: string;
    birthDay: Date;
    title: string;
    description: string;
    hobbies: string[];
};
