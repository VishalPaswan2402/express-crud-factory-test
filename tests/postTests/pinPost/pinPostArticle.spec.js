import { test, expect } from '@playwright/test'
import Login from '../../../features/userApis/auth/login.class';
import ViewPostDetails from '../../../features/postApis/viewPostDetails/viewPost.class';
import PinPostArticle from '../../../features/postApis/pinPost/pinPost.class';

test.describe("Pin post articles", () => {
    test("successfully pin post", async ({ request }) => {
        const loginInput = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginInput);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const allPostInput = {
            userId: loginResponse.body.data._id,
            token: loginResponse.body.accessToken,
            page: 1
        }
        const allPosts = new ViewPostDetails(request);
        const allPostResponse = await allPosts.viewAllPost(allPostInput);
        if (allPostResponse.body.data.data.length > 0) {
            const pinInput = {
                userId: loginResponse.body.data._id,
                postId: allPostResponse.body.data.data[0]._id,
                token: loginResponse.body.accessToken,
            }
            const pinPostArticle = new PinPostArticle(request);
            const pinResponse = await pinPostArticle.pinPost(pinInput);
            expect(pinResponse.response.status()).toBe(200);
            expect(pinResponse.body.message).toContain("pinned");
        }
    });

    test("post not found", async ({ request }) => {
        const loginInput = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginInput);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const pinInput = {
            userId: loginResponse.body.data._id,
            postId: "5a852e67221df4d4c662ebdf",
            token: loginResponse.body.accessToken,
        }
        const pinPostArticle = new PinPostArticle(request);
        const pinResponse = await pinPostArticle.pinPost(pinInput);
        expect(pinResponse.response.status()).toBe(404);
        expect(pinResponse.body.message).toContain("not found");
    });

    test("unauthorized user", async ({ request }) => {
        const loginInput = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginInput);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const allPostInput = {
            userId: loginResponse.body.data._id,
            token: loginResponse.body.accessToken,
            page: 1
        }
        const allPosts = new ViewPostDetails(request);
        const allPostResponse = await allPosts.viewAllPost(allPostInput);
        if (allPostResponse.body.data.data.length > 0) {
            const pinInput = {
                userId: "5a852e67221df4d4c662ebdf",
                postId: allPostResponse.body.data.data[0]._id,
                token: loginResponse.body.accessToken,
            }
            const pinPostArticle = new PinPostArticle(request);
            const pinResponse = await pinPostArticle.pinPost(pinInput);
            expect(pinResponse.response.status()).toBe(403);
            expect(pinResponse.body.message).toContain("not authorized");
        };
    });
})