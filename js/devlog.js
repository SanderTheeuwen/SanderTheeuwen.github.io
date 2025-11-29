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

        // Title
        if (devlogData.name)
        {
            document.getElementById("section-devlog-title").innerHTML = projectName + "</br>" + devlogData.name;
        }
        else
        {
            document.getElementById("section-devlog-title").className = "hidden";
        }

        // Dates
        if (devlogData.dates.length != 0)
        {
            document.getElementById("section-devlog-dates").innerHTML = `Dates</br>${devlogData.dates.join("</br>")}`;
        }
        else
        {
            document.getElementById("section-devlog-dates").className = "hidden";
        }

        // Goal
        if (!devlogData.goalName && !devlogData.goal)
        {
            document.getElementById("section-devlog-goal").className = "hidden";
        }
        else
        {
            // Name
            if (devlogData.goalName)
            {
                document.getElementById("devlog-goalName").innerHTML = processText(devlogData.goalName, projectName);
            }

            // Description
            if (devlogData.goal)
            {
                document.getElementById("devlog-goal").innerHTML = processText(devlogData.goal, projectName);
            }
        }

        // Approach
        if (devlogData.approach.length != 0)
        {
            const approachList = document.getElementById("devlog-approach");
            for (const entry of devlogData.approach)
            {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                <strong class="researchType">${entry.researchType}</strong>
                <strong>${entry.researchMethod}</strong>
                </br>
                <div class="approach-text">${processText(entry.text, projectName)}</div>`;
                approachList.appendChild(listItem);
            }
        }
        else
        {
            document.getElementById("section-devlog-approach").className = "hidden";
        }

        // Normal learning outcomes
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
            document.getElementById("section-devlog-learnings-normal").className = "hidden";
        }

        // Special learning outcomes
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
            document.getElementById("section-devlog-learnings-special").className = "hidden";
        }

        // Result
        if (devlogData.result)
        {
            document.getElementById("devlog-result").innerHTML = processText(devlogData.result, projectName);
        }
        else
        {
            document.getElementById("section-devlog-result").className = "hidden";
        }

        // Validation
        if (devlogData.validation)
        {
            document.getElementById("devlog-validation").innerHTML = processText(devlogData.validation, projectName);
        }
        else
        {
            document.getElementById("section-devlog-validation").className = "hidden";
        }

        // Contribution
        if (devlogData.contribution)
        {
            document.getElementById("devlog-contribution").innerHTML = processText(devlogData.contribution, projectName);
        }
        else
        {
            document.getElementById("section-devlog-contribution").className = "hidden";
        }

    } 
    catch (error)
    {
        console.error("Error loading devlog:", error);
        document.getElementById("devlog-title").textContent = "Error Loading Devlog";
    }
});
