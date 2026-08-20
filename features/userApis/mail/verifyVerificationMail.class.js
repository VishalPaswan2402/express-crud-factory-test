class VerifyVerificationMail {
    constructor(request) {
        this.request = request;
    };

    async verifySignupOTPMail(data) {
        const apiUrl = "http://localhost:3000/user/signup/otp/verify-email";
        const response = await this.request.post(apiUrl, {
            data: data
        });
        const body = await response.json();
        return { response, body };
    };

    async verifySignupLinkMail(data) {
        const apiUrl = "http://localhost:3000/user/signup/link/verify-email";
        const response = await this.request.post(apiUrl, {
            data: data
        });
        const body = await response.json();
        return { response, body };
    };

    async verifyDestroyLinkMail(data) {
        const apiUrl = "http://localhost:3000/user/delete-account/link/verify-email";
        const response = await this.request.post(apiUrl, {
            data: data
        });
        const body = await response.json();
        return { response, body };
    };

    async verifyDestroyOTPMail(data) {
        const apiUrl = `http://localhost:3000/user/${data.userId}/delete-account/otp/verify-email`;
        const response = await this.request.post(apiUrl, {
            headers: {
                Authorization: `Bearer ${data.token}`
            },
            data: data.body
        });
        const body = await response.json();
        return { response, body };
    };

    async verifyRecoverPasswordLinkMail(data) {
        const apiUrl = "http://localhost:3000/user/reset-password/link/verify-email";
        const response = await this.request.post(apiUrl, {
            data: data
        });
        const body = await response.json();
        return { response, body };
    };

    async verifyRecoverPasswordOTPMail(data) {
        const apiUrl = "http://localhost:3000/user/reset-password/otp/verify-email";
        const response = await this.request.post(apiUrl, {
            data: data
        });
        const body = await response.json();
        return { response, body };
    };
}

export default VerifyVerificationMail;