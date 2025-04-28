document.addEventListener("DOMContentLoaded", async function ()
{
    const projectContainer = document.getElementById("projectCards");

    async function loadProjectCards()
    {
        try
        {
            const response = await fetch(window.location.origin + "/projects-paths.json");
            const projectPaths = await response.json();

            for (const projectPath of projectPaths)
            {
                const projectResponse = await fetch(`${window.location.origin + "/" + projectPath.path}/project.json`);
                const projectData = await projectResponse.json();

                if (!projectData.published)
                {
                    continue;
                }
                const projectCard = document.createElement("a");
                projectCard.classList.add("project-card");
                projectCard.href = `project.html?project=${projectData.title}`; // Adjusted for linking
                projectCard.target = "_blank"; // Opens in a new tab

                projectCard.innerHTML = `
                    <img src="${projectData.image}" alt="${projectData.title} picture">
                    <h3>${projectData.title}</h3>
                    <p>${projectData.description}</p>
                `;

                projectContainer.appendChild(projectCard);
            }
        }
        catch (error)
        {
            console.error("Error loading project cards:", error);
        }
    }

    loadProjectCards();
});
