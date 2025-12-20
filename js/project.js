document.addEventListener("DOMContentLoaded", async function ()
{
    loadProject();
});

async function loadProject()
{
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("project_id"); // Get project name from URL

    if (!projectId)
    {
        document.body.innerHTML = `<h1>Project ${projectId} not found</h1>`;
        return;
    }

    try
    {
        var response = await fetch(`${window.location.origin}/projects/${projectId}/project.json`);
        const projectData = await response.json();

        document.getElementById("project-title").textContent = projectData.name;
        if (!projectData.image)
        {
            document.getElementById("project-image").className = "hidden";
        }
        else
        {
            document.getElementById("project-image").src = `${window.location.origin}/projects/${projectId}/images/${projectData.image}`;
        }
        document.getElementById("project-description").textContent = projectData.description;

        loadProducts(projectId);
        loadDevlogs(projectId);
    }
    catch (error)
    {
        console.error("Error loading project:", error);
    }
}

async function loadProducts(projectId)
{
    const response = await fetch(`${window.location.origin}/generated/products-paths.json`);

    // Filter products based on project
    const productsPaths = (await response.json()).filter((productPath) => productPath.path.startsWith("projects/" + projectId + "/"));

    if (productsPaths.length == 0)
    {
        document.getElementById("section-project-products").className = "hidden";
    }
    else
    {
        const productList = document.getElementById("products-list");
        for (const productPath of productsPaths)
        {
            const productFileName = productPath.path.slice(productPath.path.lastIndexOf('/') + 1, -5);// -5 to remove ".json"
            const productData = await (await fetch("/" + productPath.path)).json();

            if (productData.published)
            {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="product.html?project=${projectId}&product=${productFileName}">${productData.name}</a>`;
                productList.appendChild(listItem);
            }
        }
    }
}

async function loadDevlogs(projectId)
{
    const response = await fetch(`${window.location.origin}/generated/devlogs-paths.json`);

    // Filter devlogs based on project
    const devlogsPaths = (await response.json()).filter((devlogPath) => devlogPath.path.startsWith("projects/" + projectId + "/"));

    if (devlogsPaths.length == 0)
    {
        document.getElementById("section-project-devlogs").className = "hidden";
    }
    else
    {
        const devlogList = document.getElementById("devlogs-list");
        for (const devlogPath of devlogsPaths)
        {
            const devlogFileName = devlogPath.path.slice(devlogPath.path.lastIndexOf('/') + 1, -5);// -5 to remove ".json"
            const devlogData = await (await fetch("/" + devlogPath.path)).json();

            if (devlogData.published)
            {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="devlog.html?project=${projectId}&devlog=${devlogFileName}">${devlogData.name}</a>`;
                devlogList.appendChild(listItem);
            }
        }
    }
}