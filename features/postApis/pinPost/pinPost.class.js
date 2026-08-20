class PinPostArticle {
    constructor(request) {
        this.request = request;
    }

    async pinPost(input) {
        const apiUrl = `http://localhost:3000/user/post/${input.userId}/${input.postId}/pin-post`;
        const response = await this.request.patch(apiUrl, {
            headers: {
                Authorization: `Bearer ${input.token}`
            }
        });
        const body = await response.json();
        return { response, body };
    }
}

export default PinPostArticle;