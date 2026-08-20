import { test, expect } from '@playwright/test'
import SendVerificationMail from '../../../features/userApis/mail/sendVerificationMail.class'

test.describe("Sending verification mail", () => {
    test.skip("successfull send of mail", async ({ request }) => {
        const inputData = {
            "email": "expiredLink123@gmail.com"
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const sendMailResponse = await sendVerificationMail.sendSignupMail(inputData);
        expect(sendMailResponse.response.status()).toBe(200);
        expect(sendMailResponse.body.success).toBeTruthy();
        expect(sendMailResponse.body.message).toContain("sent");
    });

    test.skip("email sending limit exceeded", async ({ request }) => {
        const inputData = {
            "email": "expiredLink123@gmail.com"
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const sendMailResponse = await sendVerificationMail.sendSignupMail(inputData);
        expect(sendMailResponse.response.status()).toBe(429);
        expect(sendMailResponse.body.success).toBeFalsy();
        expect(sendMailResponse.body.message).toContain("limit exceeded");
    });

    test("email already verified", async ({ request }) => {
        const inputData = {
            "email": "user1@gmail.com"
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const sendMailResponse = await sendVerificationMail.sendSignupMail(inputData);
        expect(sendMailResponse.response.status()).toBe(200);
        expect(sendMailResponse.body.success).toBeTruthy();
        expect(sendMailResponse.body.message).toContain("already verified");
    });

    test("unnregistered email", async ({ request }) => {
        const inputData = {
            "email": "user@gmail.com"
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const sendMailResponse = await sendVerificationMail.sendSignupMail(inputData);
        expect(sendMailResponse.response.status()).toBe(404);
        expect(sendMailResponse.body.success).toBeFalsy();
        expect(sendMailResponse.body.message).toContain("not found");
    });

    test("empty email", async ({ request }) => {
        const sendVerificationMail = new SendVerificationMail(request);
        const sendMailResponse = await sendVerificationMail.sendSignupMail({});
        expect(sendMailResponse.response.status()).toBe(400);
        expect(sendMailResponse.body.success).toBeFalsy();
        expect(sendMailResponse.body.message).toContain("empty");
    })
})