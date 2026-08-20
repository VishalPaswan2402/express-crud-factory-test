class SendVerificationMail {
    constructor(request) {
        this.request = request;
    };

    async sendSignupMail(signupdata) {
        const apiUrl = "http://localhost:3000/user/signup/send-verification";
        const response = await this.request.post(apiUrl, {
            data: signupdata
        });
        const body = await response.json();
        return { response, body };
    };

    async sendDestroyMail(destroyData) {
        const apiUrl = `http://localhost:3000/user/${destroyData.userId}/delete-account/send-verification`;
        const response = await this.request.post(apiUrl, {
            headers: {
                Authorization: `Bearer ${destroyData.token}`
            },
            data: destroyData.data
        });
        const body = await response.json();
        return { response, body };
    };

    async sendRecoverPasswordMail(userData) {
        const apiUrl = "http://localhost:3000/user/forgot-password";
        const response = await this.request.post(apiUrl, {
            data: {
                usernameOrEmail: userData.usernameOrEmail
            }
        });
        const body = await response.json();
        return { response, body };
    }
}

export default SendVerificationMail;