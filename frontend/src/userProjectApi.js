class UserProjectApi {
    static url = baseUrl + `/user_projects`

    static addUserToProject(data) {
        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(this.url, configObj)
            .then(res => res.json())
            .then(this.handleUpdate)
    }

    static handleUpdate = data => {
        if (!!data.error) {
            Error.render(data.error)
        }
    }
}