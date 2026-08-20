class ViewPostDetails {
    constructor(request) {
        this.request = request;
    }
    async viewUserPost(input) {
        const apiUrl = `http://localhost:3000/user/post/${input.userId}/${input.postId}/get-post`;
        const response = await this.request.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${input.token}`
            }
        });
        const body = await response.json();
        return { response, body };
    };

    async viewAllPost(input) {
        const apiUrl = `http://localhost:3000/user/post/${input.userId}/all-post?page=${input.page}&limit=10`;
        const response = await this.request.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${input.token}`
            }
        });
        const body = await response.json();
        return { response, body }
    };

    async viewSharedPost(postId) {
        const apiUrl = `http://localhost:3000/user/post/${postId}/view/shared-post`;
        const response = await this.request.get(apiUrl);
        const body = await response.json();
        return { response, body };
    }
};

export default ViewPostDetails;