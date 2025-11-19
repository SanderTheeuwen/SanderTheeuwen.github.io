function getDocumentPreview(productData, projectName)
{
    const link = document.createElement("a");
    link.href = `/projects/${projectName}/documents/${productData.fileName}`;
    link.target = "_blank";

    switch (productData.type)
    {
        case "word":
            link.textContent = `Download ${productData.type} document`;
            break;
        case "pdf":
            link.textContent = `Open document in new window`;
            const iframe = document.createElement("iframe");
            iframe.className = "embed";
            iframe.src = `/projects/${projectName}/documents/${productData.fileName}`;
            link.append(iframe);
            break;
        case "image":
            const image = document.createElement("img");
            image.className = "embed";
            image.src = `/projects/${projectName}/documents/${productData.fileName}`;
            image.alt = `An image of ${productData.title}`;
            link.appendChild(image);
            break;
        case "video":
            const video = document.createElement("iframe");
            video.classList.add("embed");
            video.classList.add("youtube");
            video.allowFullscreen = true;
            video.src = productData.fileName;
            return video;
        case "link":
            link.href = productData.fileName;
            link.textContent = "Link";
            break;
    }

    return link;
}