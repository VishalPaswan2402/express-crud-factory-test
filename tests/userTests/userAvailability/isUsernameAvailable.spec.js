import {test,expect} from '@playwright/test'
import IsUsernameOrEmailAvailable from '../../../features/userApis/userAvailability/isUsernameAvailable.class';

test.describe("Check for username availability",()=>{
    test("username available",async({request})=>{
        const inputData={
            username:"availableUser"
        };
        const isUsernameOrEmailAvailable=new IsUsernameOrEmailAvailable(request);
        const usernameResponse=await isUsernameOrEmailAvailable.isUsernameAvailable(inputData);
        expect(usernameResponse.response.status()).toBe(200);
        expect(usernameResponse.body.success).toBeTruthy();
    });

    test("username already exist",async({request})=>{
        const inputData={
            username:"user1"
        };
        const isUsernameOrEmailAvailable=new IsUsernameOrEmailAvailable(request);
        const usernameResponse=await isUsernameOrEmailAvailable.isUsernameAvailable(inputData);
        expect(usernameResponse.response.status()).toBe(409);
        expect(usernameResponse.body.success).toBeFalsy();
    });

    test("missing username",async({request})=>{
        const isUsernameOrEmailAvailable=new IsUsernameOrEmailAvailable(request);
        const usernameResponse=await isUsernameOrEmailAvailable.isUsernameAvailable({});
        expect(usernameResponse.response.status()).toBe(400);
        expect(usernameResponse.body.success).toBeFalsy();
    })
})