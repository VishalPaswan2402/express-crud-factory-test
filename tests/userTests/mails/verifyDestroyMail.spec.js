import { test, expect } from '@playwright/test'
import VerifyVerificationMail from '../../../features/userApis/mail/verifyVerificationMail.class'
import Login from '../../../features/userApis/auth/login.class';

test.describe("Verify destroy user mail link/OTP", () => {
    test.describe("verify using link", () => {
        test.skip("successful verification", async ({ request }) => {
            const destroyToken = {
                token: "destroyToken"
            }
            const verifyDestroyToken = new VerifyVerificationMail(request);
            const destroyResponse = await verifyDestroyToken.verifyDestroyLinkMail(destroyToken);
            expect(destroyResponse.response.status()).toBe(200);
            expect(destroyResponse.body.success).toBeTruthy();
            expect(destroyResponse.body.message).toContain("deleted");
        });

        test("invalid token", async ({ request }) => {
            const destroyToken = {
                token: "destroyToken"
            }
            const verifyDestroyToken = new VerifyVerificationMail(request);
            const destroyResponse = await verifyDestroyToken.verifyDestroyLinkMail(destroyToken);
            expect(destroyResponse.response.status()).toBe(404);
            expect(destroyResponse.body.success).toBeFalsy();
            expect(destroyResponse.body.message).toContain("Invalid token");
        });

        test("empty token", async ({ request }) => {
            const verifyDestroyToken = new VerifyVerificationMail(request);
            const destroyResponse = await verifyDestroyToken.verifyDestroyLinkMail({});
            expect(destroyResponse.response.status()).toBe(400);
            expect(destroyResponse.body.success).toBeFalsy();
            expect(destroyResponse.body.message).toContain("empty");
        });

        test.skip("expired token", async ({ request }) => {
            const destroyToken = {
                token: "destroyToken"
            }
            const verifyDestroyToken = new VerifyVerificationMail(request);
            const destroyResponse = await verifyDestroyToken.verifyDestroyLinkMail(destroyToken);
            expect(destroyResponse.response.status()).toBe(410);
            expect(destroyResponse.body.success).toBeFalsy();
            expect(destroyResponse.body.message).toContain("expired");
        });
    });
    test.describe("verify using OTP", () => {
        test.skip("successful verification", async ({ request }) => {
            const userData = {
                username: "user1",
                password: "user1Password#123"
            }
            const login = new Login(request, userData);
            const loginResponse = await login.loginUser();
            expect(loginResponse.response.status()).toBe(200);
            expect(loginResponse.body.success).toBeTruthy();
            const inputValues = {
                token: loginResponse.body.accessToken,
                userId: loginResponse.body.data._id,
                body: {
                    otp: "12345",
                    email: loginResponse.body.data.email
                }
            };
            const verifyDestroyOtp = new VerifyVerificationMail(request);
            const destroyOtpResponse = await verifyDestroyOtp.verifyDestroyOTPMail(inputValues);
            expect(destroyOtpResponse.response.status()).toBe(200);
            expect(destroyOtpResponse.body.success).toBeTruthy();
            expect(destroyOtpResponse.body.message).toContain("successfully");
        });

        test("invalid token", async ({ request }) => {
            const inputValues = {
                token: "invalidToken",
                userId: "6a85985c12543917a7c5754d",
                body: {
                    otp: "12345",
                    email: "user@gmail.com"
                }
            };
            const verifyDestroyOtp = new VerifyVerificationMail(request);
            const destroyOtpResponse = await verifyDestroyOtp.verifyDestroyOTPMail(inputValues);
            expect(destroyOtpResponse.response.status()).toBe(401);
            expect(destroyOtpResponse.body.success).toBeFalsy();
            expect(destroyOtpResponse.body.message).toContain("Invalid");
        });

        test("empty body", async ({ request }) => {
            const userData = {
                username: "user1",
                password: "user1Password#123"
            }
            const login = new Login(request, userData);
            const loginResponse = await login.loginUser();
            expect(loginResponse.response.status()).toBe(200);
            expect(loginResponse.body.success).toBeTruthy();
            const inputValues = {
                token: loginResponse.body.accessToken,
                userId: loginResponse.body.data._id,
                body: {}
            };
            const verifyDestroyOtp = new VerifyVerificationMail(request);
            const destroyOtpResponse = await verifyDestroyOtp.verifyDestroyOTPMail(inputValues);
            expect(destroyOtpResponse.response.status()).toBe(400);
            expect(destroyOtpResponse.body.success).toBeFalsy();
            expect(destroyOtpResponse.body.message).toContain("empty");
        });

        test("missing OTP or email", async ({ request }) => {
            const userData = {
                username: "user1",
                password: "user1Password#123"
            }
            const login = new Login(request, userData);
            const loginResponse = await login.loginUser();
            expect(loginResponse.response.status()).toBe(200);
            expect(loginResponse.body.success).toBeTruthy();
            const inputValues = {
                token: loginResponse.body.accessToken,
                userId: loginResponse.body.data._id,
                body: {
                    email: loginResponse.body.data.email
                }
            };
            const verifyDestroyOtp = new VerifyVerificationMail(request);
            const destroyOtpResponse = await verifyDestroyOtp.verifyDestroyOTPMail(inputValues);
            expect(destroyOtpResponse.response.status()).toBe(400);
            expect(destroyOtpResponse.body.success).toBeFalsy();
            expect(destroyOtpResponse.body.message).toContain("required");
        });

        test.skip("invalid OTP", async ({ request }) => {
            const userData = {
                username: "user1",
                password: "user1Password#123"
            }
            const login = new Login(request, userData);
            const loginResponse = await login.loginUser();
            expect(loginResponse.response.status()).toBe(200);
            expect(loginResponse.body.success).toBeTruthy();
            const inputValues = {
                token: loginResponse.body.accessToken,
                userId: loginResponse.body.data._id,
                body: {
                    otp: "123123",
                    email: loginResponse.body.data.email
                }
            };
            const verifyDestroyOtp = new VerifyVerificationMail(request);
            const destroyOtpResponse = await verifyDestroyOtp.verifyDestroyOTPMail(inputValues);
            expect(destroyOtpResponse.response.status()).toBe(422);
            expect(destroyOtpResponse.body.success).toBeFalsy();
            expect(destroyOtpResponse.body.message).toContain("Incorrect");
        });

        test.skip("expired OTP", async ({ request }) => {
            const userData = {
                username: "user1",
                password: "user1Password#123"
            }
            const login = new Login(request, userData);
            const loginResponse = await login.loginUser();
            expect(loginResponse.response.status()).toBe(200);
            expect(loginResponse.body.success).toBeTruthy();
            const inputValues = {
                token: loginResponse.body.accessToken,
                userId: loginResponse.body.data._id,
                body: {
                    otp: "123456",
                    email: loginResponse.body.data.email
                }
            };
            const verifyDestroyOtp = new VerifyVerificationMail(request);
            const destroyOtpResponse = await verifyDestroyOtp.verifyDestroyOTPMail(inputValues);
            expect(destroyOtpResponse.response.status()).toBe(410);
            expect(destroyOtpResponse.body.success).toBeFalsy();
            expect(destroyOtpResponse.body.message).toContain("expired");
        });
    })
})