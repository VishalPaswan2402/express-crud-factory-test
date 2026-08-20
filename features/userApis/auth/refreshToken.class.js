class RefreshToken {
    constructor(request) {
        this.request = request;
    }
    async generateToken(inputData) {
        const apiUrl = `http://localhost:3000/user/${inputData.userId}/refresh-token`;
        const response = await this.request.post(apiUrl, {
            data: inputData.token
        });
        const body = await response.json();
        return { response, body };
    }
};

export default RefreshToken;