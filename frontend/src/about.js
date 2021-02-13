class About {
    static render() {
        let data = `
            <div class="flex" style="justify-content: center; width: 100%;">
                <div style="max-width: 500px;">
                    <h1>Thanks for using Launch</h1>
                    <p>Launch is a project management productivity tool with features that include:</p>
                    <ul>
                        <li>create new Projects</li>
                        <li>build your team</li>
                        <li>create tasks
                            <li>assign team members to tasks</li>
                            <li>set a deadline for tasks</li>
                        </li>
                        <li>monitor progress via a dashboard overview</li>
                        <li>communicate with team members via a built-in inbox</li>                
                        <li>browse other projects</li>                
                        <li>request to join a team/project</li>                
                    </ul>
                    <p>Launch will remind you when a deadline is approaching, and it will also give you an approximated completion date for your project. Once all tasks have been completed, then all that's left to do is to <b>LAUNCH IT</b>!</p>
                    <p>Happy Collaborating =)</p>
                </div>
            </div>
        `

        content.innerHTML = data
    }
}