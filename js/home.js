document.addEventListener("DOMContentLoaded", async function ()
{
    const projectContainer = document.getElementById("projectCards");

    async function loadProjectCards()
    {
        try
        {
            const response = await fetch(`${window.location.origin}/generated/projects-paths.json`);
            const projectPaths = await response.json();

            for (const projectPath of projectPaths)
            {
                const projectResponse = await fetch(`${window.location.origin}/${projectPath.path}/project.json`);
                const projectData = await projectResponse.json();

                if (!projectData.published)
                {
                    continue;
                }
                const projectCard = document.createElement("a");
                projectCard.classList.add("project-card");
                projectCard.href = `project.html?project_id=${projectData.id}`; // Adjusted for linking

                if (!projectData.image)
                {
                    projectCard.innerHTML = `
                        <h3>${projectData.name}</h3>
                        <p>${projectData.description}</p>
                    `;
                }
                else
                {
                    projectCard.innerHTML = `
                        <img src="${window.location.origin}/projects/${projectData.id}/images/${projectData.image}" alt="${projectData.name} picture">
                        <h3>${projectData.name}</h3>
                        <p>${projectData.description}</p>
                    `;
                }

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
