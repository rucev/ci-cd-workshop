import { after, describe } from "mocha"
import { data } from "../data/index.js"
import 'dotenv/config'
import registerUser from "./registerUser.js"
import { expect } from "chai"
import { errors } from "common"
import bcrypt from "bcrypt"

describe('registerUser', () => {
    before(async () => {
        await data.connect(process.env.MONGODB_URI_TEST);
    });

    afterEach(async () => {
        await data.User.deleteMany();
    })

    after(async () => {
        await data.disconnect()
    });

    it('should create a user', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = `Password${Math.random()}`;


        await registerUser(email, password);

        const createdUser = await data.User.findOne({ email });

        const match = await bcrypt.compare(password, createdUser.password);

        expect(createdUser.email).to.equal(email);
        expect(match).to.equal(true);
    });

    it('should fail on user already registered', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = `Password${Math.random()}`;


        await registerUser(email, password);

        try {
            await registerUser(email, password);
        } catch (error) {
            expect(error).to.be.instanceOf(errors.DuplicityError);
            expect(error.message).to.equal(`user with email ${email} already exists`);
        }
    });

    it('should fail on invalid email type', async () => {
        const email = Math.floor(Math.random() * 999);
        const password = `Password${Math.random()}`;

        try {
            await registerUser(email, password);
        } catch (error) {
            expect(error).to.be.instanceOf(TypeError);
            expect(error.message).to.equal(`email is not a string`);
        }
    });

    it('should fail on empty email', async () => {
        const email = '';
        const password = `Password${Math.random()}`;

        try {
            await registerUser(email, password);
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError);
            expect(error.message).to.equal(`email is empty`);
        }
    });

    it('should fail on incorrect email format', async () => {
        const email = `User${Math.floor(Math.random() * 999)}`;
        const password = `Password${Math.random()}`;

        try {
            await registerUser(email, password);
        } catch (error) {
            expect(error).to.be.instanceOf(errors.FormatError);
            expect(error.message).to.equal('email format is not valid');
        }
    });

    it('should fail on invalid password type', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = Math.random();

        try {
            await registerUser(email, password);
        } catch (error) {
            expect(error).to.be.instanceOf(TypeError);
            expect(error.message).to.equal('password is not a string');
        }
    });

    it('should fail on password to short', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = 'hi';

        try {
            await registerUser(email, password);
        } catch (error) {
            expect(error).to.be.instanceOf(RangeError);
            expect(error.message).to.equal('password length lower than 4 characters');
        }
    });

    it('should fail on empty password', async () => {
        const email = `User${Math.floor(Math.random() * 999)}@mail.com`;
        const password = '    ';

        try {
            await registerUser(email, password);
        } catch (error) {
            expect(error).to.be.instanceOf(errors.ContentError);
            expect(error.message).to.equal('password is empty');
        }
    });
});