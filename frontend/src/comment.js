class Comment {
    static all = []
    
    constructor({id, content, user_id, commentable_type, commentable_id}) {
        this.id = id
        this.content = content
        this.user = user_id
        this.type = commentable_type
        this.typeId = commentable_id

        Comment.all.push(this)
    }
}