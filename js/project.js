document.addEventListener("DOMContentLoaded", async function ()
{
    async function loadProject()
    {
        const params = new URLSearchParams(window.location.search);
        const projectName = params.get("name"); // Get project name from URL

        if (!projectName)
        {
            document.body.innerHTML = "<h1>Project not found</h1>";
            return;
        }

        try
        {
            const response = await fetch(`../projects/${projectName}/project.json`);
            const projectData = await response.json();

            document.getElementById("project-title").textContent = projectData.name;
            document.getElementById("project-image").src = projectData.image;
            document.getElementById("project-description").textContent = projectData.description;

            const devlogList = document.getElementById("devlogs-list");
            for (const devlog of projectData.devlogs)
            {
                const devlogResponse = await fetch(`../projects/${projectName}/${devlog.path}`);
                const devlogData = await devlogResponse.json();

                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="devlog.html?name=${projectName}&log=${devlog.path}">${devlogData.name} - ${devlogData.date}</a>`;
                devlogList.appendChild(listItem);
            }
        } catch (error)
        {
            console.error("Error loading project:", error);
        }
    }

    loadProject();
});