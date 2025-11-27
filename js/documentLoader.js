function loadDocuments(text, projectName)
{
    var path = `/projects/${projectName}/documents/`;

    const matches = text.match(/<<document [a-z ]*\.[a-z]*>>/gi);/* <<document Example.pdf>> */
    if (matches)
    {
        for (const match of matches)
        {
            const type = match.slice(match.lastIndexOf('.') + 1, -2);
            const fileName = match.slice(11, -2);
            const filePath = path + fileName;

            var element;
            switch (type)
            {
                case "csv":
                case "xlsx":
                    console.log("Test");
                    element = `</br><a class="link" href="${filePath}" target="_blank">Download ${type} document</a></br>`
                break;
            }
            text = text.replace(match, element);
        }
    }
    return text;
}