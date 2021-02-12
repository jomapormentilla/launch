class DepartmentApi {
    static getDepartments() {
        fetch(baseUrl + `/departments`)
            .then(res => res.json())
            .then(data => {
                for (let dept of data) {
                    let d = new Department(dept)
                }
            })
    }
}