import {test,expect} from '@playwright/test';
import ViewPostDetails from '../../../features/postApis/viewPostDetails/viewPost.class';

test.describe("View shared post articles",()=>{
    test("successfull view",async({request})=>{
        const postId="6a86ea531d3b4b4450d09b8f";
        const viewPostDetails=new ViewPostDetails(request);
        const viewResponse=await viewPostDetails.viewSharedPost(postId);
        expect(viewResponse.response.status()).toBe(200);
        expect(viewResponse.body.success).toBeTruthy();
    });

    test("post not found",async({request})=>{
        const postId="6a86ea531d3b4b4450d09b9f";
        const viewPostDetails=new ViewPostDetails(request);
        const viewResponse=await viewPostDetails.viewSharedPost(postId);
        expect(viewResponse.response.status()).toBe(404);
        expect(viewResponse.body.success).toBeFalsy();
    })
})