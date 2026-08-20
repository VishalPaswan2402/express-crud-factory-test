class Login {
    constructor(request, inputData) {
        this.request = request;
        this.inputData = inputData;
    }
    async loginUser() {
        const apiUrl = "http://localhost:3000/user/login";
        const response = await this.request.post(apiUrl, {
            data: this.inputData
        });
        const body = await response.json();
        return { response, body };
    }
}

export default Login;