import {test,expect} from '@playwright/test'
import Login from '../../../features/userApis/auth/login.class'
import ViewPostDetails from '../../../features/postApis/viewPostDetails/viewPost.class'

test.describe("Get all posts",()=>{
    test("successfull retrival of posts",async({request})=>{
        const loginInput={
            username:"user1",
            password:"user1Password#123"
        }
        const login=new Login(request,loginInput);
        const loginResponse=await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const inputValue={
            userId:loginResponse.body.data._id,
            token:loginResponse.body.accessToken,
            page:1
        }
        const viewPostDetails=new ViewPostDetails(request);
        const allPosts=await viewPostDetails.viewAllPost(inputValue);
        expect(allPosts.response.status()).toBe(200);
        expect(allPosts.body.message).toContain("fetched");
    });

    test("invalid userId",async({request})=>{
        const loginInput={
            username:"user1",
            password:"user1Password#123"
        }
        const login=new Login(request,loginInput);
        const loginResponse=await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const inputValue={
            userId:"5a852e67221df4d4c662ebdf",
            token:loginResponse.body.accessToken,
            page:1
        }
        const viewPostDetails=new ViewPostDetails(request);
        const allPosts=await viewPostDetails.viewAllPost(inputValue);
        expect(allPosts.response.status()).toBe(403);
        expect(allPosts.body.message).toContain("not authorized");
    });

    test("invalid token",async({request})=>{
        const inputValue={
            userId:"6a852e67221df4d4c662ebdf",
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhODUyZTY3MjIxZGY0ZDRjNjYyZWJkZiIsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE3ODcyMzQyMjgsImV4cCI6MTc4NzIzNzgyOH0.W4xxIE8A5Xej40z0QBQSw0zNgvVF5ycNYlAOa_8vtWN",
            page:1
        }
        const viewPostDetails=new ViewPostDetails(request);
        const allPosts=await viewPostDetails.viewAllPost(inputValue);
        expect(allPosts.response.status()).toBe(401);
        expect(allPosts.body.message).toContain("Invalid authentication");
    });

    test("page number exceed from range",async({request})=>{
        const loginInput={
            username:"user1",
            password:"user1Password#123"
        }
        const login=new Login(request,loginInput);
        const loginResponse=await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const inputValue={
            userId:loginResponse.body.data._id,
            token:loginResponse.body.accessToken,
            page:10000
        }
        const viewPostDetails=new ViewPostDetails(request);
        const allPosts=await viewPostDetails.viewAllPost(inputValue);
        expect(allPosts.response.status()).toBe(404);
        expect(allPosts.body.message).toContain("page not found");
    });

    test("invalid page number",async({request})=>{
        const loginInput={
            username:"user1",
            password:"user1Password#123"
        }
        const login=new Login(request,loginInput);
        const loginResponse=await login.loginUser();
        expect(loginResponse.response.status()).toBe(200);
        const inputValue={
            userId:loginResponse.body.data._id,
            token:loginResponse.body.accessToken,
            page:0
        }
        const viewPostDetails=new ViewPostDetails(request);
        const allPosts=await viewPostDetails.viewAllPost(inputValue);
        expect(allPosts.response.status()).toBe(400);
        expect(allPosts.body.message).toContain("Invalid page");
    });
})