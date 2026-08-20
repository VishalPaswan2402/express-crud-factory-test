class AddEditPost {
    constructor(request) {
        this.request = request;
    }
    async addNewPost(input) {
        const apiUrl = `http://localhost:3000/user/post/${input.userId}/new-post`;
        const response = await this.request.post(apiUrl, {
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            data: input.body
        });
        const body = await response.json();
        return { response, body };
    }
}

export default AddEditPost;