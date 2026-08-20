class TrashDeletePostArticle {
    constructor(request) {
        this.request = request;
    }

    async trashPost(input) {
        const apiUrl = `http://localhost:3000/user/post/${input.userId}/${input.postId}/trash-post`;
        const response = await this.request.patch(apiUrl, {
            headers: {
                Authorization: `Bearer ${input.token}`
            }
        });
        const body = await response.json();
        return { response, body };
    };

    async deletePost(input) {
        const apiUrl = `http://localhost:3000/user/post/${input.userId}/${input.postId}/delete-post`;
        const response = await this.request.delete(apiUrl, {
            headers: {
                Authorization: `Bearer ${input.token}`
            }
        });
        const body = await response.json();
        return { response, body };
    }
}

export default TrashDeletePostArticle;