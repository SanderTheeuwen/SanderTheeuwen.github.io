const fs = require("fs");
const path = require("path");

const projectsDir = path.join(__dirname, "projects");
const projectsPathsFile = path.join(__dirname, "generated", "projects-paths.json");
const projects = [];
const objects = []; // [{ name: "devlogs", entries: [{ project: "X", path: "Y" }] }]

function readProjects()
{
    // Read the "projects" directory
    fs.readdirSync(projectsDir, { withFileTypes: true }).forEach(dir =>
    {
        if (dir.isDirectory())
        {
            // Add project path
            console.log(`-- Project ${dir.name}`);
            projects.push({ title: dir.name, path: `projects/${dir.name}` });
        }
    });
}

function readEntries()
{
    getEntries("products");
    getEntries("devlogs");
}

function getEntries(entryName)
{
    const entries = [];
    projects.forEach(project =>
    {
        // Look for entries in the "entryName" folder inside the project
        const entryDir = path.join(projectsDir, project.title, entryName);

        if (fs.existsSync(entryDir))
        {
            fs.readdirSync(entryDir).forEach((file) =>
            {
                if (file.endsWith(".json"))
                {
                    // Add devlog path
                    console.log(`---- ${project.title} - ${entryName} - ${file}`);
                    entries.push({ project: project.title, path: `projects/${project.title}/${entryName}/${file}` });
                }
            });
        }
    });
    objects.push({ name: entryName, entries: entries});
}

function writeProjectPaths()
{
    // Save to JSON files
    fs.writeFileSync(projectsPathsFile, JSON.stringify(projects, null, 2));
    objects.forEach(object =>
    {
        const objectPath = path.join(__dirname, "generated", `${object.name}-paths.json`);
        console.log(`--Writing ${object.name}`);
        fs.writeFileSync(objectPath, JSON.stringify(object.entries, null, 2));
    });
}

// Read
console.log("Reading projects");
readProjects();
console.log("Reading entries");
readEntries();
console.log("✅ Reading successful\n")


// Write
console.log("Writing project paths");
writeProjectPaths();
console.log("Writing entry paths");
console.log("✅ Writing successful\n");