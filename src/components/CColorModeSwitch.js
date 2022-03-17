import React from "react";

import "Css/CColorModeSwitch.css";

class CColorModeSwitch extends React.Component 
{
    constructor() 
    {
        super();
        this.state = { colormode: "dark" };
    }

    #toggleColorMode() 
    {
        let newColormode = this.state.colormode === "light" ? "dark" : "light";

        document.documentElement.style.setProperty("--colorpalette__background", getComputedStyle(document.documentElement).getPropertyValue("--colorpalette__background--" + newColormode));
        document.documentElement.style.setProperty("--colorpalette__navbar", getComputedStyle(document.documentElement).getPropertyValue("--colorpalette__navbar--" + newColormode));
        document.documentElement.style.setProperty("--colorpalette__navbar__arrow", getComputedStyle(document.documentElement).getPropertyValue("--colorpalette__navbar__arrow--" + newColormode));
        document.documentElement.style.setProperty("--colorpalette__heading", getComputedStyle(document.documentElement).getPropertyValue("--colorpalette__heading--" + newColormode));
        document.documentElement.style.setProperty("--colorpalette__normal-text", getComputedStyle(document.documentElement).getPropertyValue("--colorpalette__normal-text--" + newColormode));
        document.documentElement.style.setProperty("--colorpalette__text-shadow", getComputedStyle(document.documentElement).getPropertyValue("--colorpalette__text-shadow--" + newColormode));

        const backgroundElements = document.getElementsByClassName("background");
        Array.from(backgroundElements).forEach(backgroundElement => 
        {
            backgroundElement.classList.toggle("light");
            backgroundElement.classList.toggle("dark");
        });

        let colormodeSwitchButton = document.getElementById("colormodeswitch__button");
        colormodeSwitchButton.classList.toggle("colormode--dark");
        colormodeSwitchButton.classList.toggle("colormode--light");
        
        this.setState({ colormode: newColormode });
    }

    render()
    {
        return (
            <div className="colormodeswitch" onClick={this.#toggleColorMode.bind(this)}>
                <div className="colormode--light" id="colormodeswitch__button"></div>
            </div>
        );
    }
}

export { CColorModeSwitch };