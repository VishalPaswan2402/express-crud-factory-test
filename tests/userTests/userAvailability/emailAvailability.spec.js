import {test,expect} from '@playwright/test'
import IsUsernameOrEmailAvailable from '../../../features/userApis/userAvailability/isUsernameAvailable.class';

test.describe("Check for email availability",()=>{
    test("email available",async({request})=>{
        const inputData={
            email:"availableemail@gmail.com"
        };
        const isUsernameOrEmailAvailable=new IsUsernameOrEmailAvailable(request);
        const usernameResponse=await isUsernameOrEmailAvailable.isEmailAvailable(inputData);
        expect(usernameResponse.response.status()).toBe(200);
        expect(usernameResponse.body.success).toBeTruthy();
    });

    test("email already exist",async({request})=>{
        const inputData={
            email:"user1@gmail.com"
        };
        const isUsernameOrEmailAvailable=new IsUsernameOrEmailAvailable(request);
        const usernameResponse=await isUsernameOrEmailAvailable.isEmailAvailable(inputData);
        expect(usernameResponse.response.status()).toBe(409);
        expect(usernameResponse.body.success).toBeFalsy();
    });

    test("missing email",async({request})=>{
        const isUsernameOrEmailAvailable=new IsUsernameOrEmailAvailable(request);
        const usernameResponse=await isUsernameOrEmailAvailable.isEmailAvailable({});
        expect(usernameResponse.response.status()).toBe(400);
        expect(usernameResponse.body.success).toBeFalsy();
    });

    test("invalid email",async({request})=>{
        const inputData={
            email:"user1gmailcom"
        };
        const isUsernameOrEmailAvailable=new IsUsernameOrEmailAvailable(request);
        const usernameResponse=await isUsernameOrEmailAvailable.isEmailAvailable({});
        expect(usernameResponse.response.status()).toBe(400);
        expect(usernameResponse.body.success).toBeFalsy();
    });
})