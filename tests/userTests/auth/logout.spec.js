import { test, expect } from '@playwright/test'
import Login from '../../../features/userApis/auth/login.class.js'
import Logout from '../../../features/userApis/auth/logout.class.js'

test.describe("Logout user", () => {
    test("successfull logout", async ({ request }) => {
        const loginData = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginData);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const logoutData = {
            userId: loginResponse.body.data._id,
            token: loginResponse.body.accessToken
        }
        const logout = new Logout(request);
        const logoutResponse = await logout.logoutUser(logoutData);
        expect(logoutResponse.response.status()).toBe(200);
        expect(logoutResponse.body.message).toContain("logged out");
        expect(logoutResponse.body.success).toBeTruthy();
    });

    test("invalid userID", async ({ request }) => {
        const logoutData = {
            userId: "123020",
            token: "loginResponse.body.accessToken"
        }
        const logout = new Logout(request);
        const logoutResponse = await logout.logoutUser(logoutData);
        expect(logoutResponse.response.status()).toBe(400);
        expect(logoutResponse.body.message).toContain("Invalid user ID");
        expect(logoutResponse.body.success).toBeFalsy();
    });

    test("unauthorized access", async ({ request }) => {
        const loginData = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginData);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const logoutData = {
            userId: "7a852e67221df4d4c662ebdf",
            token: loginResponse.body.accessToken
        }
        const logout = new Logout(request);
        const logoutResponse = await logout.logoutUser(logoutData);
        expect(logoutResponse.response.status()).toBe(403);
        expect(logoutResponse.body.message).toContain("not authorized");
        expect(logoutResponse.body.success).toBeFalsy();
    })
})