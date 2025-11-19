function processText(text, projectName)
{
    return loadElements(loadSources(loadDocuments(loadVideos(loadImages(text, projectName)), projectName)));
}

document.addEventListener("DOMContentLoaded", async function ()
{
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get("project");
    const devlogFileName = urlParams.get("devlog");
    const devlogPath = `/projects/${projectName}/devlogs/${devlogFileName}.json`;

    if (!devlogPath)
    {
        document.getElementById("devlog-title").textContent = "Devlog not found";
        return;
    }

    try
    {
        const response = await fetch(devlogPath);
        const devlogData = await response.json();

        if (!devlogData.published)
        {
            throw "Devlog is not published";
        }

        // Set title and dates
        document.getElementById("devlog-title").innerHTML = projectName + "</br>" + devlogData.name;
        document.getElementById("devlog-dates").innerHTML = `Dates</br>${devlogData.dates.join("</br>")}`;

        // Set goal
        document.getElementById("devlog-goalName").innerHTML = processText(devlogData.goalName, projectName);
        document.getElementById("devlog-goal").innerHTML = processText(devlogData.goal, projectName);

        // Set approach
        const approachList = document.getElementById("devlog-approach");
        for (const entry of devlogData.approach)
        {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong class="researchType">${entry.researchType}</strong>
                <strong>${entry.researchMethod}</strong>
                </br>
                <div class="approach-text">${processText(entry.text, projectName) }</div>`;
            approachList.appendChild(listItem);
        }

        // Set normal learning outcomes
        if (devlogData.normalLearnings.length != 0)
        {
            const normalLearningList = document.getElementById("devlog-normal-learning");
            for (const outcome of devlogData.normalLearnings)
            {
                const listItem = document.createElement("li");
                listItem.textContent = outcome;
                normalLearningList.appendChild(listItem);
            }
        }
        else
        {
            document.getElementById("devlog-normal-learning-section").className = "hidden";
        }

        // Set special learning outcomes
        if (devlogData.specialLearnings.length != 0)
        {
            const specialLearningList = document.getElementById("devlog-special-learning");
            for (const outcome of devlogData.specialLearnings)
            {
                const listItem = document.createElement("li");
                listItem.textContent = outcome;
                specialLearningList.appendChild(listItem);
            }
        }
        else
        {
            document.getElementById("devlog-special-learning-section").className = "hidden";
        }

        // Set result, validation, and contribution
        document.getElementById("devlog-result").innerHTML = processText(devlogData.result, projectName);
        document.getElementById("devlog-validation").innerHTML = processText(devlogData.validation, projectName);
        document.getElementById("devlog-contribution").innerHTML = processText(devlogData.contribution, projectName);

    } 
    catch (error)
    {
        console.error("Error loading devlog:", error);
        document.getElementById("devlog-title").textContent = "Error Loading Devlog";
    }
});
