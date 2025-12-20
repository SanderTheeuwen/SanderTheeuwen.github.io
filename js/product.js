document.addEventListener("DOMContentLoaded", async function ()
{
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get("project");
    const productFileName = urlParams.get("product");
    const productPath = `/projects/${projectName}/products/${productFileName}.json`;

    if (!productPath)
    {
        document.getElementById("product-name").textContent = "Product not found";
        return;
    }

    try
    {
        const response = await fetch(productPath);
        const productData = await response.json();

        if (!productData.published)
        {
            document.getElementById("product-name").innerHTML = "Product is not published";
            document.getElementById("section-product-description").className = "hidden";
            document.getElementById("section-product-stakeholders").className = "hidden";
            document.getElementById("section-product-preview").className = "hidden";
            throw "Product is not published";
        }

        // Set title and description
        document.getElementById("product-name").innerHTML = projectName + "</br>" + productData.name;
        if (productData.description)
        {
            document.getElementById("product-description").innerHTML = productData.description;
        }
        else
        {
            document.getElementById("section-product-description").className = "hidden";
        }

        // Stakeholders
        if (productData.stakeholders.length != 0)
        {
            const stakeholdersDiv = document.getElementById("product-stakeholders");
            for (const group of productData.stakeholders)
            {
                /*
                <div>
                    <h3>Type</h3>
                    <ul>
                        <li>Person A</li>
                        <li>Person B</li>
                    </ul>
                </div>
                */
                const groupElement = document.createElement("div");
                const title = document.createElement("h3");
                title.textContent = group.type;
                groupElement.appendChild(title);

                const list = document.createElement("ul");
                for (const person of group.people)
                {
                    const li = document.createElement("li");
                    li.textContent = person;
                    list.appendChild(li);
                }

                groupElement.appendChild(list);
                stakeholdersDiv.appendChild(groupElement);
            }
        }
        else
        {
            document.getElementById("section-product-stakeholders").className = "hidden";
        }

        // Product preview/link
        if (productData.type && productData.fileName)
        {
            const preview = document.getElementById("product-preview");
            const link = getDocumentPreview(productData, projectName);
            preview.appendChild(link);
        }
        else
        {
            document.getElementById("section-product-preview").className = "hidden";
        }
    }
    catch (error)
    {
        console.error("Error loading product:", error);
        document.getElementById("product-title").textContent = "Failed to load product";
    }
});
