import { test, expect } from '@playwright/test'
import Login from '../../../features/userApis/auth/login.class.js'
import AddEditPost from '../../../features/postApis/addAndEditPost/addEdit.class.js'

test.describe("Add new post article", () => {
    test("successfully added post", async ({ request }) => {
        const loginInput = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginInput);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const postData = {
            body: {
                title: "newPostTitle",
                description: "newPostDescription"
            },
            userId: loginResponse.body.data._id,
            token: loginResponse.body.accessToken
        };
        const addEditPost = new AddEditPost(request);
        const addResponse = await addEditPost.addNewPost(postData);
        expect(addResponse.response.status()).toBe(201);
        expect(addResponse.body.success).toBeTruthy();
        expect(addResponse.body.data.isPinned).toBeFalsy();
    });

    test("invalid userId", async ({ request }) => {
        const loginInput = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginInput);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const postData = {
            body: {
                title: "newPostTitle",
                description: "newPostDescription"
            },
            userId: "7a852e67221df4d4c662ebdf",
            token: loginResponse.body.accessToken
        };
        const addEditPost = new AddEditPost(request);
        const addResponse = await addEditPost.addNewPost(postData);
        expect(addResponse.response.status()).toBe(403);
        expect(addResponse.body.success).toBeFalsy();
        expect(addResponse.body.message).toContain("not authorized");
    });

    test("empty body", async ({ request }) => {
        const loginInput = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginInput);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const postData = {
            body: {},
            userId: loginResponse.body.data._id,
            token: loginResponse.body.accessToken
        };
        const addEditPost = new AddEditPost(request);
        const addResponse = await addEditPost.addNewPost(postData);
        expect(addResponse.response.status()).toBe(400);
        expect(addResponse.body.success).toBeFalsy();
        expect(addResponse.body.message).toContain("empty");
    });

    test("title or description is missing", async ({ request }) => {
        const loginInput = {
            username: "user1",
            password: "user1Password#123"
        }
        const login = new Login(request, loginInput);
        const loginResponse = await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const postData = {
            body: {
                title: "postTitle"
            },
            userId: loginResponse.body.data._id,
            token: loginResponse.body.accessToken
        };
        const addEditPost = new AddEditPost(request);
        const addResponse = await addEditPost.addNewPost(postData);
        expect(addResponse.response.status()).toBe(400);
        expect(addResponse.body.success).toBeFalsy();
        expect(addResponse.body.message).toContain("required");
    })
})