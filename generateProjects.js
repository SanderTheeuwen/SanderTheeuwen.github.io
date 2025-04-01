const fs = require("fs");
const path = require("path");

const projectsDir = "./projects"; // Base directory for all projects

function generateProjectJson()
{
    // Get all projects
    const projects = fs.readdirSync(projectsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory()) // Only directories (i.e., projects)
        .map(dirent => dirent.name); //Get project names (folder names)

    projects.forEach(project => 
    {
        const projectDir = path.join(projectsDir, project);
        const projectJson = path.join(projectDir, "project.json");

        // Check if project.json exists
        if (fs.existsSync(projectJson))
        {
            // Read json
            const projectData = JSON.parse(fs.readFileSync(projectJson, "utf-8"));

            // Path to devlogs
            const devlogsDir = path.join(projectDir, "devlogs");

            if (fs.existsSync(devlogsDir))
            {
                // Get all devlogs
                const devlogs = fs.readdirSync(devlogsDir)
                    .filter(file => file.endsWith(".json"))
                    .map(file => ({
                        path: `devlogs/${file}` // Store the relative path to the devlog file
                    }));

                // Add devlogs to project data
                projectData.devlogs = devlogs;
            }

            // Write the updated project data back to project.json
            fs.writeFileSync(projectJson, JSON.stringify(projectData, null, 4), "utf-8");

            console.log(`Updated project.json for ${project}`);
        }
        else
        {
            console.log(`No project.json found for ${project}`);
        }
    });
}

generateProjectJson();