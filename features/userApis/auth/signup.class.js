class Signup {
    constructor(request, inputData) {
        this.request = request;
        this.inputData = inputData;
    }
    async signupUser() {
        const signupApi = "http://localhost:3000/user/signup";
        const response = await this.request.post(signupApi, {
            data: this.inputData
        });
        const body = await response.json();
        return { response, body };
    }
};

export default Signup;