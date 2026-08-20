import {test,expect} from '@playwright/test'
import Login from '../../../features/userApis/auth/login.class.js'
import ViewPostDetails from '../../../features/postApis/viewPostDetails/viewPost.class.js';

test.describe("View your post details",()=>{
    test("successfull view of post",async({request})=>{
        const loginInput={
            username:"user1",
            password:"user1Password#123"
        };
        const login=new Login(request,loginInput);
        const loginResponse=await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const viewInput={
            userId:loginResponse.body.data._id,
            token:loginResponse.body.accessToken,
            postId:"6a86ea531d3b4b4450d09b8f"
        }
        const viewPostDetails=new ViewPostDetails(request);
        const viewResponse=await viewPostDetails.viewUserPost(viewInput);
        expect(viewResponse.response.status()).toBe(200);
        expect(viewResponse.body.data.author).toBe(loginResponse.body.data._id);
    });

    test("invalid postId",async({request})=>{
        const loginInput={
            username:"user1",
            password:"user1Password#123"
        };
        const login=new Login(request,loginInput);
        const loginResponse=await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const viewInput={
            userId:loginResponse.body.data._id,
            token:loginResponse.body.accessToken,
            postId:"7a86ea531d3b4b4450d09b8f"
        }
        const viewPostDetails=new ViewPostDetails(request);
        const viewResponse=await viewPostDetails.viewUserPost(viewInput);
        expect(viewResponse.response.status()).toBe(404);
        expect(viewResponse.body.message).toContain("not found");
    });

    test("invalid userId",async({request})=>{
        const loginInput={
            username:"user1",
            password:"user1Password#123"
        };
        const login=new Login(request,loginInput);
        const loginResponse=await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const viewInput={
            userId:"7a87ea531d3b4b4450d09b8f",
            token:loginResponse.body.accessToken,
            postId:"7a86ea531d3b4b4450d09b8f"
        }
        const viewPostDetails=new ViewPostDetails(request);
        const viewResponse=await viewPostDetails.viewUserPost(viewInput);
        expect(viewResponse.response.status()).toBe(403);
        expect(viewResponse.body.message).toContain("not authorized");
    });

    test("invalid token",async({request})=>{
        const viewInput={
            userId:"6a852e67221df4d4c662ebdf",
            token:"fyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhODUyZTY3MjIxZGY0ZDRjNjYyZWJkZiIsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3ODcyMjg1NjQsImV4cCI6MTc4NzIzMjE2NH0.HohpaVKL9fUgsAc1OKOd-kOdPh3x7lP_1q_X-pFU6nk",
            postId:"7a86ea531d3b4b4450d09b8f"
        }
        const viewPostDetails=new ViewPostDetails(request);
        const viewResponse=await viewPostDetails.viewUserPost(viewInput);
        expect(viewResponse.response.status()).toBe(401);
        expect(viewResponse.body.message).toContain("Invalid authentication");
    });
})