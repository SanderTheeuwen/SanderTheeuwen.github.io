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
            var downloadText;
            switch (type)
            {
                case "docx":
                    downloadText = `Download Word document`;
                    break;
                case "csv":
                case "xlsx":
                    downloadText = `Download spreadsheet`;
                    break;
                default:
                    downloadText = `Download ${type} document`;
                    break;
            }
            switch (type)
            {
                default:
                    element = `</br><a class="link" href="${filePath}" target="_blank">${downloadText}</a></br>`
                    break;
            }
            text = text.replace(match, element);
        }
    }
    return text;
}