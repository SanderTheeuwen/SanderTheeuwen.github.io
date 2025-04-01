document.addEventListener("DOMContentLoaded", async function ()
{
    const projectContainer = document.getElementById("projectCards");

    async function loadProjectCards()
    {
        try
        {
            console.log(window.location.origin);
            const response = await fetch(window.location.origin + "/projects/project_paths.json");
            const projectPaths = await response.json();

            for (const projectName of projectPaths)
            {
                const projectResponse = await fetch(window.location.origin + "/projects/" + projectName + "/project.json");
                const projectData = await projectResponse.json();

                const projectCard = document.createElement("a");
                projectCard.classList.add("project-card");
                projectCard.href = `project.html?name=${projectData.title}`; // Adjusted for linking
                projectCard.target = "_blank"; // Opens in a new tab

                projectCard.innerHTML = `
                    <img src="${projectData.image}" alt="${projectData.title} picture">
                    <h3>${projectData.title}</h3>
                    <p>${projectData.description}</p>
                `;

                projectContainer.appendChild(projectCard);
            }
        } catch (error)
        {
            console.error("Error loading project cards:", error);
        }
    }

    loadProjectCards();
});
