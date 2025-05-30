import { after, describe } from "mocha"
import { data } from "../data/index.js"
import 'dotenv/config'
import retrieveUser from "./retrieveUser.js"
import { expect } from "chai"
import { errors } from "common"

describe('retrieveUser', () => {
    before(async () => {
        await data.connect(process.env.MONGODB_URI_TEST);
    });

    afterEach(async () => {
        await data.User.deleteMany();
    })

    after(async () => {
        await data.disconnect()
    });

    it('should get user by id with valid userId', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = `Password${Math.random()}`;

        const user = { email, password };

        const createdUser = await data.User.create(user);

        const fetchedUserEmail = await retrieveUser(createdUser._id.toString());

        expect(fetchedUserEmail).to.be.a('string');
        expect(fetchedUserEmail).to.equal(user.email);
    });

    it('should fail on user not found', async () => {
        const id = (new data.ObjectId()).toString();
        try {
            await retrieveUser(id);
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on invalid id type', async () => {
        const invalidId = 1234;
        try {
            await retrieveUser(invalidId);
        } catch (error) {
            expect(error).to.be.instanceOf(TypeError);
            expect(error.message).to.equal('userId is not a string');
        }
    });

    it('should fail on empty id', async () => {
        const emptyId = '   ';
        try {
            await retrieveUser(emptyId);
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError);
            expect(error.message).to.equal('userId is empty');
        }
    });

});