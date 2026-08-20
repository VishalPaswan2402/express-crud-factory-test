import { test, expect } from '@playwright/test'
import Signup from '../../../features/userApis/auth/signup.class';

test.describe("Signup verification", () => {
    test.skip("for unique username and email with all valid input fields", async ({ request }) => {
        const inputData = {
            username: "user1",
            fullname: "fullUser1",
            email: "user1@gmail.com",
            password: "user1Password#123",
            confirmPassword: "user1Password#123"
        };
        const signup = new Signup(request, inputData);
        const signupResponse = await signup.signupUser();
        expect(signupResponse.response.status()).toBe(200);
        expect(signupResponse.body.success).toBeTruthy();
    });

    test("for invalid password", async ({ request }) => {
        const inputData = {
            username: "user1",
            fullname: "fullUser1",
            email: "user1@gmail.com",
            password: "password101",
            confirmPassword: "password123"
        }
        const signup = new Signup(request, inputData);
        const signupResponse = await signup.signupUser();
        expect(signupResponse.response.status()).toBe(400);
        expect(signupResponse.body.success).toBeFalsy();
    });

    test("for empty details", async ({ request }) => {
        const inputData = {
            username: "",
            fullname: "fullUser1",
            email: "user1@gmail.com",
            password: "password123#",
            confirmPassword: "password123#"
        }
        const signup = new Signup(request, inputData);
        const signupResponse = await signup.signupUser();
        expect(signupResponse.response.status()).toBe(422);
        expect(signupResponse.body.success).toBeFalsy();
    });

    test("for mismatch password", async ({ request }) => {
        const inputData = {
            username: "user1",
            fullname: "fullUser1",
            email: "user1@gmail.com",
            password: "passworD123#",
            confirmPassword: "password123#"
        }
        const signup = new Signup(request, inputData);
        const signupResponse = await signup.signupUser();
        expect(signupResponse.response.status()).toBe(422);
        expect(signupResponse.body.success).toBeFalsy();
    });

    test("for duplicate username or email with all other valid input fields", async ({ request }) => {
        const inputData = {
            username: "duplicateUser",
            fullname: "fullUser1",
            email: "user1@gmail.com",
            password: "passworD123#",
            confirmPassword: "passworD123#"
        }
        const signup = new Signup(request, inputData);
        const signupResponse = await signup.signupUser();
        expect(signupResponse.response.status()).toBe(409);
        expect(signupResponse.body.success).toBeFalsy();
    });
});