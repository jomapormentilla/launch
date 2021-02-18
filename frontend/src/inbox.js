class Inbox {
    static get html() {
        let data = {
            users: (array) => {
                document.querySelector(".user-list").innerHTML = ``
                for (let user of array) {
                    document.querySelector(".user-list").innerHTML += `<li data-id="${ user.id }">${ user.name }</li>`
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

    static handleListClick = e => {
        if (e.target.nodeName === "LI") {
            for (let item of document.querySelectorAll("li")) {
                item.classList.remove("message-active")
            }
            e.target.classList.add("message-active")
            let user = User.all.find(u => u.id == e.target.dataset.id)
            
            this.renderMessages(user)
        }
    }

    static renderMessages = (user, e) => {
        let messages = Message.with(user)

        let html = ``

        for (let message of messages) {
            if (message.sender === current_user) {
                html += `
                    <div class="flex message-sender">
                        <div style="text-align: right;">
                        <p style="color: #aaa; text-align: center;">${ message.sent_date }</p>
                        ${ message.content }
                        </div>
                    </div>
                `
            } else {
                html += `
                    <div class="flex message-receiver">
                        <div>
                        <p style="color: #aaa; text-align: center;">${ message.sent_date }</p>
                        ${ message.content }
                        </div>
                    </div>
                `
            }
        }

        if (messages.length === 0) {
            document.querySelector(".message-content").innerHTML = `<div class="flex">You have not started a conversation with this ${ user.name }.</div>`
        } else {
            document.querySelector(".message-content").innerHTML = html
            document.querySelector(".message-content").scrollTop = document.querySelector(".message-content").scrollHeight;
        }
    }

    static handleNewMessage = e => {
        e.preventDefault()

        let user = User.all.find(u => u.id == document.querySelector(".message-active").dataset.id)

        let data = {
            content: e.target.children[0].value,
            sender_id: current_user.id,
            receiver_id: user.id
        }

        MessageApi.createMessage(data)
        e.target.reset()
    }

    static render() {
        content.innerHTML = `
            <div class="flex col" style="width: 100%;">
                <h1 style="color: #fff; text-align: center;">${ current_user.name }'s Inbox</h1>
                <input type="search" class="user-search" placeholder="Search for a user...">
                <div class="flex" id="inbox-container">
                    <div class="flex user-list"></div>
                    <div class="flex message-container">
                        <div class="flex col message-content"><div>Select a user to start a conversation</div></div>
                        <form class="flex message-textarea" id="new-message-form">
                            <textarea></textarea>
                            <button type="submit"><i class="bi bi-cursor-fill" style="font-size: 25px;"></i></button>
                        </form>
                    </div>
                </div>
            </div>
        `

        // Manipulations
        this.html.users(User.sortby("firstName").filter(u => u.id !== current_user.id))

        // Event Listeners
        document.querySelector(".user-search").addEventListener("keyup", this.html.filter)
        document.querySelector(".user-list").addEventListener("click", this.handleListClick)
        document.getElementById("new-message-form").addEventListener("submit", this.handleNewMessage)
    }
}