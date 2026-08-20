import { test, expect } from '@playwright/test'
import VerifyVerificationMail from '../../../features/userApis/mail/verifyVerificationMail.class'

test.describe("Verify sended email for signup", () => {
    test.describe("OTP mail verification", () => {
        test.skip("successfull verification of OTP", async ({ request }) => {
            const otpData = {
                "otp": "123",
                "email": "user1@gmail.com"
            }
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupOTPMail(otpData);
            expect(verifyResponse.response.status()).toBe(201);
            expect(verifyResponse.body.success).toBeTruthy();
        });

        test.skip("invalid OTP", async ({ request }) => {
            const otpData = {
                "otp": "123",
                "email": "user12@gmail.com"
            }
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupOTPMail(otpData);
            expect(verifyResponse.response.status()).toBe(422);
            expect(verifyResponse.body.success).toBeFalsy();
        });

        test("missing OTP or email from body", async ({ request }) => {
            const otpData = {
                "otp": "123"
            }
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupOTPMail(otpData);
            expect(verifyResponse.response.status()).toBe(400);
            expect(verifyResponse.body.success).toBeFalsy();
        });

        test("missing whole body", async ({ request }) => {
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupOTPMail({});
            expect(verifyResponse.response.status()).toBe(400);
            expect(verifyResponse.body.success).toBeFalsy();
        });

        test("unregistered email", async ({ request }) => {
            const otpData = {
                "otp": "123",
                "email": "unregistered@gmail.com"
            }
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupOTPMail(otpData);
            expect(verifyResponse.response.status()).toBe(404);
            expect(verifyResponse.body.success).toBeFalsy();
        });

        test.skip("verification OTP expired", async ({ request }) => {
            const otpData = {
                "otp": "123",
                "email": "expiredLink123@gmail.com"
            }
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupOTPMail(otpData);
            expect(verifyResponse.response.status()).toBe(410);
            expect(verifyResponse.body.success).toBeFalsy();
        });
    });

    test.describe("Signup mail link verification", () => {
        test.skip("successfull verification of link", async ({ request }) => {
            const linkData = {
                "token": "validToken"
            }
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupLinkMail(linkData);
            expect(verifyResponse.response.status()).toBe(201);
            expect(verifyResponse.body.success).toBeTruthy();
        });

        test("invalid verification link", async ({ request }) => {
            const linkData = {
                "token": "invalidToken"
            }
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupLinkMail(linkData);
            expect(verifyResponse.response.status()).toBe(404);
            expect(verifyResponse.body.success).toBeFalsy();
        });

        test("missing verification link", async ({ request }) => {
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupLinkMail({});
            expect(verifyResponse.response.status()).toBe(400);
            expect(verifyResponse.body.success).toBeFalsy();
        });

        test.skip("verification link expired", async ({ request }) => {
            const linkData={
                "token":"472f890ad5b85bf4c1cbe26fc167f85e3864680d059365d96c648d11e2aa3a59dda42061cea47cf66ee2a01b6c457516a213a237fe12797ff11cb8eac0a4c122156372029769a3c11149a2ac45cb2587cd5ab51696340f32c39ddedb0a0648c0a18e75c8"
            }
            const verifyEmail = new VerifyVerificationMail(request);
            const verifyResponse = await verifyEmail.verifySignupLinkMail(linkData);
            expect(verifyResponse.response.status()).toBe(410);
            expect(verifyResponse.body.success).toBeFalsy();
        });
    })
})