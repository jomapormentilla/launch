class CommentApi {
    static getComments() {
        fetch(baseUrl + '/comments')
            .then(res => res.json())
            .then(data => {
                for (let comment of data) {
                    let _comment = Comment.all.find(c => c.id === comment.id)
                    if (!_comment) { new Comment(comment) }
                }
            })
    }
}