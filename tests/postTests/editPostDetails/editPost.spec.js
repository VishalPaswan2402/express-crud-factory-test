import { test, expect } from "@playwright/test";
import Login from '../../../features/userApis/auth/login.class.js'
import ViewPostDetails from "../../../features/postApis/viewPostDetails/viewPost.class.js";
import EditPostDetails from "../../../features/postApis/editPostDetails/editPost.class.js";

test.describe("Edit saved posts", () => {
    test("successfully updated", async ({ request }) => {
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
            const editInput = {
                userId: loginResponse.body.data._id,
                postId: allPostResponse.body.data.data[0]._id,
                token: loginResponse.body.accessToken,
                data: {
                    title: `updatedTitle ${Date.now()}`,
                    description: `updatedDescription ${Date.now()}`
                }
            }
            const editPostDetails = new EditPostDetails(request);
            const editResponse = await editPostDetails.editPost(editInput);
            expect(editResponse.response.status()).toBe(200);
            expect(editResponse.body.message).toContain("updated");
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
        const editInput = {
            userId: loginResponse.body.data._id,
            postId: "5a852e67221df4d4c662ebdf",
            token: loginResponse.body.accessToken,
            data: {
                title: `updatedTitle ${Date.now()}`,
                description: `updatedDescription ${Date.now()}`
            }
        }
        const editPostDetails = new EditPostDetails(request);
        const editResponse = await editPostDetails.editPost(editInput);
        expect(editResponse.response.status()).toBe(404);
        expect(editResponse.body.message).toContain("not found");
    });

    test("missing title or description", async ({ request }) => {
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
            const editInput = {
                userId: loginResponse.body.data._id,
                postId: allPostResponse.body.data.data[0]._id,
                token: loginResponse.body.accessToken,
                data: {
                    // title: `updatedTitle ${Date.now()}`,
                    description: `updatedDescription ${Date.now()}`
                }
            }
            const editPostDetails = new EditPostDetails(request);
            const editResponse = await editPostDetails.editPost(editInput);
            expect(editResponse.response.status()).toBe(400);
            expect(editResponse.body.message).toContain("required");
        }
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
            const editInput = {
                userId: "5a852e67221df4d4c662ebdf",
                postId: allPostResponse.body.data.data[0]._id,
                token: loginResponse.body.accessToken,
                data: {
                    title: `updatedTitle ${Date.now()}`,
                    description: `updatedDescription ${Date.now()}`
                }
            }
            const editPostDetails = new EditPostDetails(request);
            const editResponse = await editPostDetails.editPost(editInput);
            expect(editResponse.response.status()).toBe(403);
            expect(editResponse.body.message).toContain("not authorized");
        };
    });
})