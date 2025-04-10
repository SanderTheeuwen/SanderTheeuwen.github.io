document.addEventListener("DOMContentLoaded", async function ()
{
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get("project");
    const devlogFileName = urlParams.get("devlog");
    const devlogPath = `/projects/${projectName}/devlogs/${devlogFileName}.json`

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
        document.getElementById("devlog-title").innerHTML = projectName + "</br>" + devlogData.name;
        document.getElementById("devlog-dates").innerHTML = `Dates</br>${devlogData.dates.join("</br>")}`;

        // Set goal
        document.getElementById("devlog-goalName").innerHTML = loadElements(loadVideo(loadImage(devlogData.goalName, projectName)));
        document.getElementById("devlog-goal").innerHTML = loadElements(loadVideo(loadImage(devlogData.goal, projectName)));

        // Set approach
        const approachList = document.getElementById("devlog-approach");
        devlogData.approach.forEach(entry =>
        {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong class="researchType">${entry.researchType}</strong>
                <strong>${entry.researchMethod}</strong>
                </br>
                <div class="approach-text">${loadElements(loadSource(loadVideo(loadImage(entry.text, projectName))))}</div>`;
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
        document.getElementById("devlog-result").innerHTML = loadElements(loadVideo(loadImage(devlogData.result, projectName)));
        document.getElementById("devlog-validation").innerHTML = loadElements(loadVideo(loadImage(devlogData.validation, projectName)));
        document.getElementById("devlog-contribution").innerHTML = loadElements(loadVideo(loadImage(devlogData.contribution, projectName)));

    } 
    catch (error)
    {
        console.error("Error loading devlog:", error);
        document.getElementById("devlog-title").textContent = "Error Loading Devlog";
    }
});
