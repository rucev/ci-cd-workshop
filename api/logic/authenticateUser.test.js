import { after, describe } from "mocha"
import { data } from "../data/index.js"
import 'dotenv/config'
import authenticateUser from "./authenticateUser.js"
import { expect } from "chai"
import { errors } from "common"
import bcrypt from "bcrypt"

describe('authenticateUser', () => {
    before(async () => {
        await data.connect(process.env.MONGODB_URI_TEST);
    });

    afterEach(async () => {
        await data.User.deleteMany();
    })

    after(async () => {
        await data.disconnect()
    });

    it('should login a user with correct credentials', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = `Password${Math.random()}`;

        const cryptPassword = bcrypt.hashSync(password, 10);

        const userData = { email, password: cryptPassword };

        const user = await data.User.create(userData);

        const userId = await authenticateUser(email, password);

        expect(userId).to.equal(user._id.toString())
    });

    it('should fail on user not found', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = `Password${Math.random()}`;

        try {
            await authenticateUser(email, password);
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ExistenceError);
            expect(error.message).to.equal('user not found');
        }
    });

    it('should fail on wrong credentials', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = `Password${Math.random()}`;

        const cryptPassword = bcrypt.hashSync(password, 10);

        const user = { email, password: cryptPassword };

        await data.User.create(user);

        try {
            await authenticateUser(email, 'not the correct password');
        } catch (error) {
            expect(error).to.be.instanceOf(errors.AuthError);
            expect(error.message).to.equal('wrong credentials');
        }
    });

    it('should fail on invalid email type', async () => {
        const email = Math.floor(Math.random() * 999);
        const password = `Password${Math.random()}`;

        try {
            await authenticateUser(email, password)
        } catch (error) {
            expect(error).to.be.instanceOf(TypeError);
            expect(error.message).to.equal('email is not a string');
        }
    });

    it('should fail on invalid email format', async () => {
        const email = `NotAnEmail${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;

        try {
            await authenticateUser(email, password)
        } catch (error) {
            expect(error).to.be.instanceOf(errors.FormatError);
            expect(error.message).to.equal('email format is not valid');
        }
    });


    it('should fail on empty email', async () => {
        const email = '';
        const password = `Password${Math.random()}`;

        try {
            await authenticateUser(email, password)
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError);
            expect(error.message).to.equal('email is empty');
        }

    });

    it('should fail on invalid password type', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = Math.random();

        try {
            await authenticateUser(email, password)
        } catch (error) {
            expect(error).to.be.instanceOf(TypeError);
            expect(error.message).to.equal('password is not a string');
        }
    });

    it('should fail on password to short', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = 'hi';

        try {
            await authenticateUser(email, password)
        } catch (error) {
            expect(error).to.be.instanceOf(RangeError);
            expect(error.message).to.equal('password length lower than 4 characters');
        }
    });

    it('should fail on empty password', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = ' ';

        try {
            await authenticateUser(email, password)
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError);
            expect(error.message).to.equal('password is empty');
        }
    });
});