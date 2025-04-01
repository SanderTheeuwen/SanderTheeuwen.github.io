const fs = require("fs");
const path = require("path");

const projectsDir = path.join(__dirname, "projects");
const projectsPathsFile = path.join(__dirname, "projects-paths.json");
const devlogsPathsFile = path.join(__dirname, "devlogs-paths.json");
const productsPathsFile = path.join(__dirname, "products-paths.json");

function generateProjectPaths()
{
    const projects = [];
    const devlogs = [];
    const products = [];

    // Read the "projects" directory
    fs.readdirSync(projectsDir, { withFileTypes: true }).forEach((dir) =>
    {
        if (dir.isDirectory())
        {
            // Add project path
            const projectPath = `projects/${dir.name}/`;
            projects.push({ title: dir.name, path: projectPath });

            // Look for devlogs in the "devlogs" folder inside the project
            const devlogsDir = path.join(projectsDir, dir.name, "devlogs");
            if (fs.existsSync(devlogsDir))
            {
                fs.readdirSync(devlogsDir).forEach((file) =>
                {
                    if (file.endsWith(".json"))
                    {
                        // Add devlog path
                        devlogs.push({ project: dir.name, path: `${projectPath}devlogs/${file}` });
                    }
                });
            }

            // Look for products in the "products" folder inside the project
            const productsDir = path.join(projectsDir, dir.name, "products");
            if (fs.existsSync(productsDir))
            {
                fs.readdirSync(productsDir).forEach((file) =>
                {
                    if (file.endsWith(".json"))
                    {
                        // Add product path
                        products.push({ project: dir.name, path: `${projectPath}products/${file}` });
                    }
                });
            }
        }
    });

    // Save to JSON files
    fs.writeFileSync(projectsPathsFile, JSON.stringify(projects, null, 2));
    fs.writeFileSync(devlogsPathsFile, JSON.stringify(devlogs, null, 2));
    fs.writeFileSync(productsPathsFile, JSON.stringify(products, null, 2));

    console.log("✅ Projects JSON files generated successfully!");
}

// Run the function
generateProjectPaths();