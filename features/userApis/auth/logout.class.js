class Logout {
    constructor(request) {
        this.request = request;
    }
    async logoutUser(inputData) {
        const apiUrl = `http://localhost:3000/user/${inputData.userId}/logout`;
        const response = await this.request.post(apiUrl, {
            headers: {
                Authorization: `Bearer ${inputData.token}`
            }
        });
        const body = await response.json();
        return { response, body };
    }
}
export default Logout;