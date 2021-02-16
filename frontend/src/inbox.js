class Inbox {
    static get html() {
        let data = {
            users: () => {
                for (let user of User.all) {
                    document.querySelector(".user-list").innerHTML += `<li>${ user.name }</li>`
                }
            }
        }
        return data
    }

    static render() {
        content.innerHTML = `
            <div class="flex" id="inbox-container" style="width: 100%; border: solid 1px #aaa;">
                <div class="flex user-list" style="flex: 1; background-color: #fff;"></div>
                <div class="flex message-container">
                    <div class="flex message-content">test test</div>
                    <div class="flex message-textarea">
                        <textarea>Testing</textarea>
                        <button>Send</button>
                    </div>
                </div>
            </div>
        `

        this.html.users()
    }
}