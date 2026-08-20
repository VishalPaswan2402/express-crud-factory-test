import { test, expect } from "@playwright/test"
import RefreshToken from "../../../features/userApis/auth/refreshToken.class"
import Login from "../../../features/userApis/auth/login.class"

test.describe("Generate refresh token for user", () => {
    test("successfully token generated", async ({ request }) => {
        const loginData = {
            "username": "user1",
            "password": "user1Password#123"
        }
        const login = new Login(request, loginData);
        const loginResponse = await login.loginUser()
        expect(loginResponse.response.status()).toBe(200);
        const inputData = {
            token: {
                refreshToken: loginResponse.body.refreshToken
            },
            userId: loginResponse.body.data._id,
        }
        const refreshToken = new RefreshToken(request);
        const tokenResponse = await refreshToken.generateToken(inputData);
        expect(tokenResponse.response.status()).toBe(200);
        expect(tokenResponse.body.success).toBeTruthy();
        expect(tokenResponse.body.message).toContain("refreshed");
        expect(tokenResponse.body.accessToken).toBeTruthy();
        expect(tokenResponse.body.refreshToken).toBeTruthy();
    });

    test("missing refreshToken", async ({ request }) => {
        const inputData = {
            userId: "6a852e67221df4d4c662ebdf",
        }
        const refreshToken = new RefreshToken(request);
        const tokenResponse = await refreshToken.generateToken(inputData);
        expect(tokenResponse.response.status()).toBe(401);
        expect(tokenResponse.body.success).toBeFalsy();
        expect(tokenResponse.body.message).toContain("missing");
    });

    test("unauthorized user", async ({ request }) => {
        const loginData = {
            "username": "user1",
            "password": "user1Password#123"
        }
        const login = new Login(request, loginData);
        const loginResponse = await login.loginUser()
        expect(loginResponse.response.status()).toBe(200);
        const inputData = {
            token: {
                refreshToken: loginResponse.body.refreshToken
            },
            userId: "7a852e67221df4d4c662ebdf",
        }
        const refreshToken = new RefreshToken(request);
        const tokenResponse = await refreshToken.generateToken(inputData);
        expect(tokenResponse.response.status()).toBe(401);
        expect(tokenResponse.body.success).toBeFalsy();
        expect(tokenResponse.body.message).toContain("Unauthorized");
    })
})