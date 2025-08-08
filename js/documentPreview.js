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
    }

    return link;
}