import { test, expect } from '@playwright/test';
import Login from '../../../features/userApis/auth/login.class.js'
import SearchPostArticle from '../../../features/postApis/searchPostArticle/searchPost.class.js';

test.describe("Search your post", () => {
    test("successfull found", async ({ request }) => {
        const loginInput = {
            username: "user1",
            password: "user1Password#123"
        };
        const login = new Login(request, loginInput);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const searchInput = {
            userId: loginResponse.body.data._id,
            search: "art",
            token: loginResponse.body.accessToken
        };
        const searchPostArticle = new SearchPostArticle(request);
        const searchResponse = await searchPostArticle.searchPost(searchInput);
        expect(searchResponse.response.status()).toBe(200);
        expect(searchResponse.body.success).toBeTruthy();
    });

    test("unauthorized user", async ({ request }) => {
        const loginInput = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginInput);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const searchInput = {
            userId: "5a852e67221df4d4c662ebdf",
            search: "text",
            token: loginResponse.body.accessToken,
        }
        const searchPostArticle = new SearchPostArticle(request);
        const searchResponse = await searchPostArticle.searchPost(searchInput);
        expect(searchResponse.response.status()).toBe(403);
        expect(searchResponse.body.message).toContain("not authorized");
    });
})