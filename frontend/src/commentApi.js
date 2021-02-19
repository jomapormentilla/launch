class CommentApi {
    static url = baseUrl + '/comments'

    static getComments() {
        fetch(this.url)
            .then(res => res.json())
            .then(data => {
                for (let comment of data) {
                    let _comment = Comment.all.find(c => c.id === comment.id)
                    if (!_comment) { new Comment(comment) }
                }
            })
    }

    static createComment(data) {
        let commentInfo = {
            content: data.content,
            commentable_id: data.id,
            commentable_type: data.type,
            user_id: current_user.id
        }

        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(commentInfo)
        }

        fetch(this.url, configObj)
            .then(res => res.json())
            .then(data => {
                if(!!data.error) {
                    Error.render(data.error)
                } else {
                    let task = Task.all.find(t => t.id === data.commentable_id)
                    new Comment(data)
                    Task.backlogContainer.comments(task)
                    document.getElementById("task-comment-form").reset()
                }
            })
    }
}