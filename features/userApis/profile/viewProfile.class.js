class ViewProfile {
    constructor(request, data) {
        this.request = request;
        this.data = data;
    }
    async userProfile() {
        const apiUrl = `http://localhost:3000/user/${this.data.userId}/profile`;
        const response = await this.request.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${this.data.accessToken}`
            }
        });
        const body = await response.json();
        return { response, body };
    }
}

export default ViewProfile;