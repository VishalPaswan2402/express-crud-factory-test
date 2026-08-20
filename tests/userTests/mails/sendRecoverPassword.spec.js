import { test, expect } from '@playwright/test'
import SendVerificationMail from '../../../features/userApis/mail/sendVerificationMail.class'

test.describe("Send recover password mail", () => {
    test.skip("successful send of mail", async ({ request }) => {
        const userData = {
            usernameOrEmail: "duplicateUser"
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const mailResponse = await sendVerificationMail.sendRecoverPasswordMail(userData);
        expect(mailResponse.response.status()).toBe(200);
        expect(mailResponse.body.success).toBeTruthy();
        expect(mailResponse.body.message).toContain("sent");
    });

    test("unregistered username or email", async ({ request }) => {
        const userData = {
            usernameOrEmail: "duplicateUsers"
        }
        const sendVerificationMail = new SendVerificationMail(request);
        const mailResponse = await sendVerificationMail.sendRecoverPasswordMail(userData);
        expect(mailResponse.response.status()).toBe(404);
        expect(mailResponse.body.success).toBeFalsy();
        expect(mailResponse.body.message).toContain("not found");
    });

    test("empty username or email", async ({ request }) => {
        const sendVerificationMail = new SendVerificationMail(request);
        const mailResponse = await sendVerificationMail.sendRecoverPasswordMail({});
        expect(mailResponse.response.status()).toBe(400);
        expect(mailResponse.body.success).toBeFalsy();
        expect(mailResponse.body.message).toContain("empty");
    });
})