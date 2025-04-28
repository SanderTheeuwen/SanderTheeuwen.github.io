function loadDocuments(text, projectName)
{
    var path = "/projects/" + projectName + "/documents/";

    const matches = text.match(/<<document [a-z]*\.[a-z]*>>/gi);/* <<document Example.pdf */
    if (matches)
    {
        matches.forEach(match =>
        {
            const type = match.slice(match.lastIndexOf('.') + 1, -2);
            const fileName = match.slice(11, -2);
            const filePath = path + fileName;

            console.log(type);
            console.log(filePath);
            var element;
            switch (type)
            {
                case "csv":
                    element = `</br><a class="link" href="${filePath}" target="_blank">Download ${type} document</a></br>`
                break;
            }
            text = text.replace(match, element);
            console.log(text);
        });
    }
    return text;
}