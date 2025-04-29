document.addEventListener("DOMContentLoaded", async function ()
{
    loadProject();
});

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

        loadProducts(projectName);
        loadDevlogs(projectName);
    }
    catch (error)
    {
        console.error("Error loading project:", error);
    }
}

async function loadProducts(projectName)
{
    const response = await fetch(`${window.location.origin}/generated/products-paths.json`);

    // Filter products based on project
    const productsPaths = (await response.json()).filter((productPath) => productPath.path.startsWith("projects/" + projectName));

    const productList = document.getElementById("products-list");
    for (const productPath of productsPaths)
    {
        const productFileName = productPath.path.slice(productPath.path.lastIndexOf('/') + 1, -5);// -5 to remove ".json"
        const productData = await (await fetch("/" + productPath.path)).json();

        if (productData.published)
        {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="product.html?project=${projectName}&product=${productFileName}">${productData.name}</a>`;
            productList.appendChild(listItem);
        }
    }
}

async function loadDevlogs(projectName)
{
    const response = await fetch(`${window.location.origin}/generated/devlogs-paths.json`);

    // Filter devlogs based on project
    const devlogsPaths = (await response.json()).filter((devlogPath) => devlogPath.path.startsWith("projects/" + projectName));

    const devlogList = document.getElementById("devlogs-list");
    for (const devlogPath of devlogsPaths)
    {
        const devlogFileName = devlogPath.path.slice(devlogPath.path.lastIndexOf('/') + 1, -5);// -5 to remove ".json"
        const devlogData = await (await fetch("/" + devlogPath.path)).json();

        if (devlogData.published)
        {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<a href="devlog.html?project=${projectName}&devlog=${devlogFileName}">${devlogData.name}</a>`;
            devlogList.appendChild(listItem);
        }
    }
}