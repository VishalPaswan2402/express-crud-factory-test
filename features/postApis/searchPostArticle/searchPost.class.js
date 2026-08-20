class SearchPostArticle {
    constructor(request) {
        this.request = request;
    }

    async searchPost(input) {
        const apiUrl = `http://localhost:3000/user/post/${input.userId}/search?text=${input.search}&page=1&limit=10`;
        const response = await this.request.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${input.token}`
            }
        });
        const body =await response.json();
        return { response, body };
    }
}
export default SearchPostArticle;