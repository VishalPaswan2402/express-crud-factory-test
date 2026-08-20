import { test, expect } from '@playwright/test'
import Login from '../../../features/userApis/auth/login.class'
import SendVerificationMail from '../../../features/userApis/mail/sendVerificationMail.class'

test.describe("Send destroy user verification mail", () => {
    test.skip("Successfully sended", async ({ request }) => {
        const loginData = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginData);
        const loginResponse = await login.loginUser();
        const destroyInput = {
            userId: loginResponse.body.data._id,
            data: { email: loginResponse.body.data.email },
            token: loginResponse.body.accessToken
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const destroyResponse = await sendVerificationMail.sendDestroyMail(destroyInput);
        console.log(destroyResponse.body);
        expect(destroyResponse.response.status()).toBe(200);
        expect(destroyResponse.body.data.email).toBe(loginResponse.body.data.email);
        expect(destroyResponse.body.success).toBeTruthy();
    });

    test("invalid token", async ({ request }) => {
        const destroyInput = {
            userId: "6a852e67221df4d4c662ebdf",
            data: { email: "user1@gmail.com" },
            token: "invalidToken"
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const destroyResponse = await sendVerificationMail.sendDestroyMail(destroyInput);
        expect(destroyResponse.response.status()).toBe(401);
        expect(destroyResponse.body.success).toBeFalsy();
        expect(destroyResponse.body.message).toContain("Invalid authentication token");
    });

    test.skip("verification request limit exceed", async ({ request }) => {
        const loginData = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginData);
        const loginResponse = await login.loginUser();
        const destroyInput = {
            userId: loginResponse.body.data._id,
            data: { email: loginResponse.body.data.email },
            token: loginResponse.body.accessToken
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const destroyResponse = await sendVerificationMail.sendDestroyMail(destroyInput);
        expect(destroyResponse.response.status()).toBe(429);
        expect(destroyResponse.body.success).toBeFalsy();
        expect(destroyResponse.body.message).toContain("limit exceeded");
    });

    test("empty email", async ({ request }) => {
        const loginData = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginData);
        const loginResponse = await login.loginUser();
        const destroyInput = {
            userId: loginResponse.body.data._id,
            data: {},
            token: loginResponse.body.accessToken
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const destroyResponse = await sendVerificationMail.sendDestroyMail(destroyInput);
        expect(destroyResponse.response.status()).toBe(400);
        expect(destroyResponse.body.success).toBeFalsy();
        expect(destroyResponse.body.message).toContain("cannot be empty");
    })
})