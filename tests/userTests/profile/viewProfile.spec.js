import { test, expect } from '@playwright/test'
import Login from '../../../features/userApis/auth/login.class'
import ViewProfile from '../../../features/userApis/profile/viewProfile.class';

test("successful retrival of data", async ({ request }) => {
    const loginData = {
        username: "user1",
        password: "user1Password#123"
    }
    const login = new Login(request, loginData);
    const loginResponse = await login.loginUser();
    expect(loginResponse.response.status()).toBe(200);
    const viewData = {
        accessToken: loginResponse.body.accessToken,
        userId: loginResponse.body.data._id
    }
    const viewProfile = new ViewProfile(request, viewData);
    const viewProfileResponse = await viewProfile.userProfile();
    expect(viewProfileResponse.response.status()).toBe(200);
    expect(viewProfileResponse.body.data._id).toBe(loginResponse.body.data._id);
    expect(viewProfileResponse.body.success).toBeTruthy();
});

