import { test, expect } from '@playwright/test'
import VerifyVerificationMail from '../../../features/userApis/mail/verifyVerificationMail.class'

test.describe("verify recover password link/OTP", () => {
    test.describe("verify link", () => {
        test.skip("successfull verification of link", async ({ request }) => {
            const updatedData = {
                token: "validMailToken",
                password: "newPassword#123",
                confirmPassword: "newPassword#123"
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordLinkMail(updatedData);
            expect(verificationResponse.response.status()).toBe(200);
            expect(verificationResponse.body.success).toBeTruthy();
            expect(verificationResponse.body.message).toContain("updated");
        });

        test("password not match", async ({ request }) => {
            const updatedData = {
                token: "validMailToken",
                password: "newPassword#123",
                confirmPassword: "newPassword@123"
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordLinkMail(updatedData);
            expect(verificationResponse.response.status()).toBe(422);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("must match");
        });

        test("invalid password", async ({ request }) => {
            const updatedData = {
                token: "validMailToken",
                password: "newpassword123",
                confirmPassword: "newpassword123"
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordLinkMail(updatedData);
            expect(verificationResponse.response.status()).toBe(400);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("include uppercase");
        });

        test("password missing", async ({ request }) => {
            const updatedData = {
                token: "validMailToken",
                password: "Password123#"
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordLinkMail(updatedData);
            expect(verificationResponse.response.status()).toBe(400);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("required");
        });

        test("token missing", async ({ request }) => {
            const updatedData = {
                password: "Password123#",
                confirmPassword: "Password123#"
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordLinkMail(updatedData);
            expect(verificationResponse.response.status()).toBe(400);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("token is missing");
        });

        test.skip("expired token", async ({ request }) => {
            const updatedData = {
                token: "expiredToken",
                password: "Password123#",
                confirmPassword: "Password123#"
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordLinkMail(updatedData);
            expect(verificationResponse.response.status()).toBe(410);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("expired");
        });

        test("invalid token", async ({ request }) => {
            const updatedData = {
                token: "12345",
                password: "Password123#",
                confirmPassword: "Password123#"
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordLinkMail(updatedData);
            expect(verificationResponse.response.status()).toBe(404);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("Invalid token");
        });
    });

    test.describe("verify OTP", () => {
        test.skip("successfull verification of OTP", async ({ request }) => {
            const inputData = {
                otp: "12345",
                email: "user@gmail.com",
                password: "newPassword@123",
                confirmPassword: "newPassword@123",
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordOTPMail(inputData);
            expect(verificationResponse.response.status()).toBe(200);
            expect(verificationResponse.body.success).toBeTruthy();
            expect(verificationResponse.body.message).toContain("updated");
        });

        test("password missing", async ({ request }) => {
            const inputData = {
                otp: "12345",
                email: "user@gmail.com",
                confirmPassword: "newPassword@123",
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordOTPMail(inputData);
            expect(verificationResponse.response.status()).toBe(400);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("required");
        });

        test("invalid password", async ({ request }) => {
            const inputData = {
                otp: "12345",
                email: "user@gmail.com",
                password: "newPassword123",
                confirmPassword: "newPassword@123",
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordOTPMail(inputData);
            expect(verificationResponse.response.status()).toBe(400);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("include");
        });

        test("missmatch password", async ({ request }) => {
            const inputData = {
                otp: "12345",
                email: "user@gmail.com",
                password: "newPassword123@",
                confirmPassword: "newPassword@123",
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordOTPMail(inputData);
            expect(verificationResponse.response.status()).toBe(422);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("must match");
        });

        test("missing OTP or email", async ({ request }) => {
            const inputData = {
                email: "user@gmail.com",
                password: "newPassword@123",
                confirmPassword: "newPassword@123",
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordOTPMail(inputData);
            expect(verificationResponse.response.status()).toBe(400);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("required");
        });

        test("expired OTP", async ({ request }) => {
            const inputData = {
                otp: "12345",
                email: "user1@gmail.com",
                password: "newPassword@123",
                confirmPassword: "newPassword@123",
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordOTPMail(inputData);
            expect(verificationResponse.response.status()).toBe(410);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("expired");
        });

        test.skip("invalid OTP", async ({ request }) => {
            const inputData = {
                otp: "12345",
                email: "user1@gmail.com",
                password: "newPassword@123",
                confirmPassword: "newPassword@123",
            }
            const verifyVerificationMail = new VerifyVerificationMail(request);
            const verificationResponse = await verifyVerificationMail.verifyRecoverPasswordOTPMail(inputData);
            expect(verificationResponse.response.status()).toBe(422);
            expect(verificationResponse.body.success).toBeFalsy();
            expect(verificationResponse.body.message).toContain("Incorrect");
        });
    })
})