function loadImage(text, projectName)
{
    var path = "/projects/" + projectName + "/images/";

    const matches = text.match(/<<image \d*\.[a-z]*>>/g);
    if (matches)
    {
        matches.forEach(match =>
        {
            text = text.replace(match, `</br><img src="${path + match.slice(8, -2)}" alt="Image cannot be loaded"/></br>`);
        });
    }
    return text;
}