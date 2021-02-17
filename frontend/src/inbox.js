class Inbox {
    static get html() {
        let data = {
            users: () => {
                for (let user of User.sort.alphabetical()) {
                    document.querySelector(".user-list").innerHTML += `<li>${ user.name }</li>`
                }
            }
        }
        return data
    }

    static render() {
        content.innerHTML = `
            <div class="flex col">
                <h2>${ current_user.name }'s Inbox</h2>
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

        this.html.users()
    }
}