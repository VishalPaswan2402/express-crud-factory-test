import { test, expect } from '@playwright/test'
import Login from '../../../features/userApis/auth/login.class';

test.describe("Login user", () => {
    test("successfull login with valid data", async ({ request }) => {
        const inputData = {
            "username": "user1",
            "password": "user1Password#123"
        }
        const login = new Login(request, inputData);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        expect(loginResponse.body.success).toBeTruthy();
        expect(loginResponse.body.accessToken).toBeTruthy();
        expect(loginResponse.body.refreshToken).toBeTruthy();
    });

    test("incorrect password", async ({ request }) => {
        const inputData = {
            "username": "user1",
            "password": "password"
        }
        const login = new Login(request, inputData);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(401);
        expect(loginResponse.body.success).toBeFalsy();
        expect(loginResponse.body.message).toContain("incorrect");
    });

    test("unregistered username", async ({ request }) => {
        const inputData = {
            "username": "unregisteredUser",
            "password": "password"
        }
        const login = new Login(request, inputData);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(404);
        expect(loginResponse.body.success).toBeFalsy();
        expect(loginResponse.body.message).toBe("User not found.");
    });

    test("empty username or password", async ({ request }) => {
        const inputData = {
            "password": "password"
        }
        const login = new Login(request, inputData);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(400);
        expect(loginResponse.body.success).toBeFalsy();
        expect(loginResponse.body.message).toContain("required");
    });

    test("empty whole body", async ({ request }) => {
        const login = new Login(request, {});
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(400);
        expect(loginResponse.body.success).toBeFalsy();
        expect(loginResponse.body.message).toContain("empty");
    });

    test("unverified user login", async ({ request }) => {
        const inputData = {
            "username": "expiredLink",
            "password": "expiredLinkPassword#123"
        }
        const login = new Login(request, inputData);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        expect(loginResponse.body.success).toBeTruthy();
        expect(loginResponse.body.message).toContain("verify your email");
    });
})