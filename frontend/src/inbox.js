class Inbox {
    static get html() {
        let data = {
            users: (array) => {
                document.querySelector(".user-list").innerHTML = ``
                for (let user of array) {
                    document.querySelector(".user-list").innerHTML += `<li id="user-${ user.id }" data-id="${ user.id }">${ this.html.seen(user) }${ user.name }</li>`
                }
            },

            filter: (e) => {
                let term = e.target.value
                let arr = User.search(term)
                this.html.users(arr)
            },

            seen: (user) => {
                let count = Message.unseen(user).length
                if (count > 0 && user !== current_user) {
                    return `<span class="message-unseen">${ count }</span> &nbsp;`
                } else {
                    return ``
                }
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

            setTimeout(()=>{
                document.getElementById("new-message-textarea").disabled = false
                document.getElementById("new-message-textarea").focus()
            },500)

            let user = User.all.find(u => u.id == e.target.dataset.id)
            
            this.renderMessages(user)
            if (e.target.childElementCount > 0) {
                e.target.children[0].remove()
                Message.markAsSeen(user)
            }

            setTimeout(()=>{ document.getElementById("inbox-count").innerHTML = Message.unseen_total() },1000)
        }
    }

    static renderMessages = (user) => {
        let messages = Message.with(user)
        Message.markAsSeen(user)

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
                    <div class="flex message-receiver" data-id="${ user.id }">
                        <div>
                        <p style="color: #aaa; text-align: center;">${ message.sent_date }</p>
                        ${ message.content }
                        </div>
                    </div>
                `
            }
        }

        if (messages.length === 0) {
            document.querySelector(".message-content").innerHTML = `<div class="flex message-receiver" data-id="${ user.id }"><br>The beginning of your conversation with ${ user.name }.</div>`
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
                        <div class="flex col message-content"><div>Select a user to view conversation</div></div>
                        <form class="flex message-textarea" id="new-message-form">
                            <textarea disabled id="new-message-textarea"></textarea>
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