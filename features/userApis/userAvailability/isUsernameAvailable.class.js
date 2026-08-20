class IsUsernameOrEmailAvailable {
    constructor(request) {
        this.request = request;
    }
    async isUsernameAvailable(inputData) {
        const apiUrl = "http://localhost:3000/user/check/username";
        const response = await this.request.post(apiUrl, {
            data: inputData
        });
        const body = await response.json();
        return { response, body };
    };

    async isEmailAvailable(inputData) {
        const apiUrl = "http://localhost:3000/user/check/email";
        const response = await this.request.post(apiUrl, {
            data: inputData
        });
        const body = await response.json();
        return { response, body };
    }
}

export default IsUsernameOrEmailAvailable