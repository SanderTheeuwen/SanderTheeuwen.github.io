function loadImages(text, projectId)
{
    var path = `/projects/${projectId}/images/`;

    const matches = text.match(/<<image .+?\.[a-z]+>>/g);
    if (matches)
    {
        for (const match of matches)
        {
            text = text.replace(match, `</br><img class="entry-image" src="${path + match.slice(8, -2)}" alt="Image cannot be loaded"/></br>`);
        }
    }
    return text;
}