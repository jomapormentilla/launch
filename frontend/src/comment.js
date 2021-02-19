class Comment {
    static all = []
    
    constructor({id, content, commentable_type, commentable_id}) {
        this.id = id
        this.content = content
        this.type = commentable_type
        this.typeId = commentable_id

        Comment.all.push(this)
    }
}