import { test, expect } from '@playwright/test'
import Login from '../../../features/userApis/auth/login.class';
import ViewPostDetails from '../../../features/postApis/viewPostDetails/viewPost.class';
import PinPostArticle from '../../../features/postApis/pinPost/pinPost.class';
import TrashDeletePostArticle from '../../../features/postApis/trashAndDeletePost/trashDeletePost.class';

test.describe("Delete post articles", () => {
    test("successfully deleted post", async ({ request }) => {
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
            const deleteInput = {
                userId: loginResponse.body.data._id,
                postId: allPostResponse.body.data.data[0]._id,
                token: loginResponse.body.accessToken,
            }
            const deletePostArticle = new TrashDeletePostArticle(request);
            const deleteResponse = await deletePostArticle.deletePost(deleteInput);
            expect(deleteResponse.response.status()).toBe(200);
            expect(deleteResponse.body.message).toContain("deleted");
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
        const deleteInput = {
            userId: loginResponse.body.data._id,
            postId: "5a852e67221df4d4c662ebdf",
            token: loginResponse.body.accessToken,
        }
        const deletePostArticle = new TrashDeletePostArticle(request);
        const deleteResponse = await deletePostArticle.deletePost(deleteInput);
        expect(deleteResponse.response.status()).toBe(404);
        expect(deleteResponse.body.message).toContain("not found");
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
            const deleteInput = {
                userId: "5a852e67221df4d4c662ebdf",
                postId: allPostResponse.body.data.data[0]._id,
                token: loginResponse.body.accessToken,
            }
            const deletePostArticle = new TrashDeletePostArticle(request);
            const deleteResponse = await deletePostArticle.deletePost(deleteInput);
            expect(deleteResponse.response.status()).toBe(403);
            expect(deleteResponse.body.message).toContain("not authorized");
        };
    });
})