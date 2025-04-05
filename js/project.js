document.addEventListener("DOMContentLoaded", async function ()
{
    async function loadProject()
    {
        const params = new URLSearchParams(window.location.search);
        const projectName = params.get("project"); // Get project name from URL

        if (!projectName)
        {
            document.body.innerHTML = `<h1>Project ${projectName} not found</h1>`;
            return;
        }

        try
        {
            var response = await fetch(`${window.location.origin}/projects/${projectName}/project.json`);
            const projectData = await response.json();

            document.getElementById("project-title").textContent = projectData.name;
            document.getElementById("project-image").src = projectData.image;
            document.getElementById("project-description").textContent = projectData.description;

            response = await fetch(`${window.location.origin}/devlogs-paths.json`);

            // Filter devlogs based on project
            const devlogsPaths = (await response.json()).filter((devlogPath) => devlogPath.path.startsWith("projects/" + projectName));

            const devlogList = document.getElementById("devlogs-list");
            for (const devlogPath of devlogsPaths)
            {
                const devlogResponse = await fetch("/" + devlogPath.path);
                const devlogFilename = devlogPath.path.slice(devlogPath.path.lastIndexOf('/') + 1, -5);
                const devlogData = await devlogResponse.json();
                
                if (devlogData.published)
                {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="devlog.html?project=${projectName}&devlog=${devlogFilename}">${devlogData.name}</a>`;
                    devlogList.appendChild(listItem);
                }
            }
        } catch (error)
        {
            console.error("Error loading project:", error);
        }
    }

    loadProject();
});