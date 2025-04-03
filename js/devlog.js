document.addEventListener("DOMContentLoaded", async function ()
{
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get("project");
    const devlogName = urlParams.get("devlog");
    const devlogPath = `/projects/${projectName}/devlogs/${devlogName}.json`

    if (!devlogPath)
    {
        document.getElementById("devlog-title").textContent = "Devlog Not Found";
        return;
    }

    try
    {
        const response = await fetch(devlogPath);
        const devlogData = await response.json();

        if (!devlogData.published)
        {
            throw "Devlog is private";
        }

        // Set title and dates
        document.getElementById("devlog-title").textContent = projectName + ": " + devlogName;
        document.getElementById("devlog-dates").innerHTML = `Dates</br>${devlogData.dates.join("</br>")}`;

        // Set goal
        document.getElementById("devlog-goal").textContent = devlogData.goal;

        // Set approach
        const approachList = document.getElementById("devlog-approach");
        devlogData.approach.forEach(entry =>
        {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong class="researchType">${entry.researchType}</strong> <strong>${entry.researchMethod}</strong></br>${loadSource(entry.text)}`;
            approachList.appendChild(listItem);
        });

        // Set normal learning outcomes
        if (devlogData.normalLearnings)
        {
            const normalLearningList = document.getElementById("devlog-normal-learning");
            devlogData.normalLearnings.forEach(outcome =>
            {
                const listItem = document.createElement("li");
                listItem.textContent = outcome;
                normalLearningList.appendChild(listItem);
            });
        }

        // Set special learning outcomes
        if (devlogData.specialLearnings)
        {
            const specialLearningList = document.getElementById("devlog-special-learning");
            devlogData.specialLearnings.forEach(outcome =>
            {
                const listItem = document.createElement("li");
                listItem.textContent = outcome;
                specialLearningList.appendChild(listItem);
            });
        }

        // Set result, validation, and contribution
        document.getElementById("devlog-result").innerHTML = loadVideo(loadImage(devlogData.result, projectName));
        document.getElementById("devlog-validation").textContent = devlogData.validation;
        document.getElementById("devlog-contribution").textContent = devlogData.contribution;

    } 
    catch (error)
    {
        console.error("Error loading devlog:", error);
        document.getElementById("devlog-title").textContent = "Error Loading Devlog";
    }
});
