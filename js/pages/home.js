const projectContainer = document.getElementById("projectCards"); 

function sort()
{
    switch (document.getElementById("sort").textContent)
    {
        case "A - Z":
            document.getElementById("sort").textContent = "Z - A";
            loadProjectCards("name", true);
            break;
        case "Z - A":
            document.getElementById("sort").textContent = "Old - New";
            loadProjectCards("year", false);
            break;
        case "Old - New":
            document.getElementById("sort").textContent = "New - Old";
            loadProjectCards("year", true);
            break;
        case "New - Old":
            document.getElementById("sort").textContent = "A - Z";
            loadProjectCards("name", false);
            break;
    }
}

document.addEventListener("DOMContentLoaded", async function ()
{
    loadProjectCards("year", true);
});

async function loadProjectCards(filter, reversed)
{
    projectContainer.innerHTML = ``;

    try
    {
        const response = await fetch(`/generated/projects-paths.json`);
        const projectPaths = await response.json();
        const projects = [];

        for (const projectPath of projectPaths)
        {
            const projectResponse = await fetch(`/${projectPath.path}/project.json`);
            const projectData = await projectResponse.json();
            projectData.id = projectPath.path.substring(9);

            // Make project visible if editing and unpublished
            if (!projectData.published && !window.isLocal)
            {
                continue;
            }

            projects.push(projectData);
        }

        // Sort
        projects.sort(function(a, b)
        {
            if (a.name == "Miscellaneous")
            {
                return 1;
            }
            switch (filter)
            {
                case "name":
                    if (a.name > b.name)
                    {
                        return 1;
                    }
                    else
                    {
                        if (a.name === b.name)
                        {
                            return 0;
                        }
                        else
                        {
                            return -1;
                        }
                    }
                case "year":
                    if (a.year > b.year)
                    {
                        return 1;
                    }
                    else
                    {
                        if (a.year === b.year)
                        {
                            return 0;
                        }
                        else
                        {
                            return -1;
                        }
                    }
            }
        });
        if (reversed)
        {
            projects.reverse();
        }

        // Display
        for (const project of projects)
        {
            const projectCard = document.createElement("a");
            projectCard.classList.add("project-card");
            if (!project.published)
            {
                projectCard.classList.add("unpublished");
            }
            projectCard.href = `project.html?project_id=${project.id}`; // Adjusted for linking

            /*
            <h3>Name</h3>
            <p>Date</p>
            <p>Description</p>
            <img project image>
            */

            projectCard.innerHTML = `<h3>${project.name}</h3>`;
            if (project.year && project.year != "-")
            {
                projectCard.innerHTML += `<p class="date">${project.year}</p>`;
            }
            projectCard.innerHTML += `<p>${project.description}</p>`;
            if (project.image)
            {
                projectCard.innerHTML += `<img src="/projects/${project.id}/images/${project.image}" alt="${project.name} picture">`
            }

            projectContainer.appendChild(projectCard);
        }
    }
    catch (error)
    {
        console.error("Error loading project cards:", error);
    }
}