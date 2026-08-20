class EditPostDetails {
    constructor(request) {
        this.request = request;
    };

    async editPost(input) {
        const apiUrl = `http://localhost:3000/user/post/${input.userId}/${input.postId}/edit-post`;
        const response = await this.request.patch(apiUrl, {
            headers: {
                Authorization: `Bearer ${input.token}`
            },
            data: input.data
        });
        const body = await response.json();
        return { response, body };
    }
}

export default EditPostDetails;