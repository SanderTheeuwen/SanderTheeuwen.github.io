function loadVideo(text)
{
    const matches = text.match(/<<video [^ ]*>>/g);
    if (matches)
    {
        matches.forEach(match =>
        {
            text = text.replace(match, `</br><iframe width="420" height="315" src="${match.slice(8, -2)}" frameborder="0" allowfullscreen></iframe></br>`);
        });
    }
    return text;
}