class Inbox {
    static get html() {
        let data = {
            users: (array) => {
                document.querySelector(".user-list").innerHTML = ``
                for (let user of array) {
                    document.querySelector(".user-list").innerHTML += `<li>${ user.name }</li>`
                }
            },

            filter: (e) => {
                let term = e.target.value
                let arr = User.search(term)
                this.html.users(arr)
            }
        }
        return data
    }

    static render() {
        content.innerHTML = `
            <div class="flex col" style="width: 100%;">
                <h1 style="color: #fff; text-align: center;">${ current_user.name }'s Inbox</h1>
                <input type="search" class="user-search" placeholder="Search for a user...">
                <div class="flex" id="inbox-container">
                    <div class="flex user-list"></div>
                    <div class="flex message-container">
                        <div class="flex message-content"><div>test test</div></div>
                        <div class="flex message-textarea">
                            <textarea placeholder="Select a user to start a conversation"></textarea>
                            <button><i class="bi bi-cursor-fill" style="font-size: 25px;"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `

        // Manipulations
        this.html.users(User.sortby("firstName").filter(u => u.id !== current_user.id))

        // Event Listeners
        document.querySelector(".user-search").addEventListener("keyup", this.html.filter)
    }
}