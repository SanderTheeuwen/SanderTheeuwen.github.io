function loadSource(text)
{
    const matches = text.match(/<<source [^>]*>>/g);
    if (matches)
    {
        matches.forEach(match =>
        {
            text = text.replace(match, `${match.slice(8, -2)}`);
        });
    }
    return replaceLinks(text);
}

function replaceLinks(text)
{
    const matches = text.match(/https?:\/\/[^\s]+/g);
    if (matches)
    {
        matches.forEach(match =>
        {
            text = text.replace(match, `<a href="${match}">${match}</a>`);
        });
    }
    return text;
}