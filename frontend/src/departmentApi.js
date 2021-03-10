class DepartmentApi {
    static getDepartments() {
        fetch(baseUrl + `/departments`)
            .then(res => res.json())
            .then(data => {
                for (let dept of data) {
                    let _dept = Department.all.find(d => d.id === dept.id)
                    if (!_dept) { new Department(dept) }
                }
                document.querySelector('.loading').remove()
            })
    }
}