function loadSources(text)
{
    const matches = text.match(/<<source [^>]*>>/g);
    if (matches)
    {
        for (const match of matches)
        {
            text = text.replace(match, `<p class="source"> ${match.slice(8, -2)} </p>`);
        }
    }
    return replaceLinks(text);
}

function replaceLinks(text)
{
    const matches = text.match(/https?:\/\/[^\s]+/g);
    if (matches)
    {
        for (const match of matches)
        {
            // To filter out videos in the devlog
            if (text[text.indexOf(match) - 1] != "\"")
            {
                text = text.replace(match, `<a href="${match}">${match}</a>`);
            }
        }
    }
    return text;
}