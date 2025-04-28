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

        if (!productData)
        {
            throw "Product is not published";
        }

        // Set title and description
        document.getElementById("product-name").innerHTML = projectName + "</br>" + productData.name;
        document.getElementById("product-description").innerHTML = productData.description;

        // Product preview/link
        const preview = document.getElementById("product-preview");
        const link = getProductPreview(productData, projectName);
        preview.appendChild(link);

        // Stakeholders
        const stakeholdersDiv = document.getElementById("product-stakeholders");
        productData.stakeholders.forEach(group =>
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
            group.people.forEach(person =>
            {
                const li = document.createElement("li");
                li.textContent = person;
                list.appendChild(li);
            });

            groupElement.appendChild(list);
            stakeholdersDiv.appendChild(groupElement);
        });

    }
    catch (error)
    {
        console.error("Error loading product:", error);
        document.getElementById("product-title").textContent = "Failed to load product";
    }
});
