function loadVideos(text)
{
    const matches = text.match(/<<video [^ ]+?>>/g);
    if (matches)
    {
        for (const match of matches)
        {
            text = text.replace(match, `</br><iframe class="youtube" src="${match.slice(8, -2)}" frameborder="0" allowfullscreen></iframe></br>`);
        }
    }
    return text;
}