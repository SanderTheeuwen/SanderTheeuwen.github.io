async function GetProjects()
{
    let projects = [];
    try
    {
        const response = await fetch("http://localhost:8080/projects/false",
        {
            method: "GET",
            mode: "cors",
            headers: {
              accept: 'application/json',
            }
        });
        projects.push(await response.json());
        if (!response.ok)
        {
            throw new Error(response.statusText);
        }
        return projects;
    }
    catch (exception)
    {
        console.error(exception);
    }
}

async function GetProject(projectId)
{
    try
    {
        const response = await fetch("http://localhost:8080/projects/" + projectId + "/true",
        {
            methods: "GET",
            mode: "no-cors"
        });
        const data = await response.json();

        if (!response.ok)
        {
            throw new Error(response.statusText);
        }
        return data;
    }
    catch (exception)
    {
        console.error(exception);
    }
}

async function GetDevlogs(projectId)
{
    let devlogs = [];
    try
    {
        const response = await fetch("http://localhost:8080/projects/" + projectId + "devlogs/true",
        {
            methods: "GET"
        });
        devlogs.push(await response.json());

        if (!response.ok)
        {
            throw new Error(response.statusText);
        }
        return devlogs;
    }
    catch (exception)
    {
        console.error(exception);
    }
}

async function GetProducts(projectId)
{
    let products = [];
    try
    {
        const response = await fetch("http://localhost:8080/projects/" + projectId + "products/true",
        {
            methods: "GET"
        });
        products.push(await response.json());

        if (!response.ok)
        {
            throw new Error(response.statusText);
        }
        return products;
    }
    catch (exception)
    {
        console.error(exception);
    }
}

export { GetProjects, GetProject, GetDevlogs, GetProducts }