import React from "react";

import "Css/CNavbar.css";

class CNavbar extends React.Component 
{
    constructor() 
    {
        super();
        this.state = { collapsed: false };
    }

    #toggleCollapse() 
    {
        let navbar = document.getElementById("navbar");
        navbar.classList.toggle("navbar--expanded");
        navbar.classList.toggle("navbar--collapsed");

        let button = document.getElementById("arrow");
        button.classList.toggle("arrow--left");
        button.classList.toggle("arrow--right");

        this.setState({ collapsed: !this.state.collapsed });
    }

    render() 
    {
        return (
            <div className="navbar navbar--collapsed" id="navbar">
                <div className="container" onClick={this.#toggleCollapse.bind(this)}>
                    <div className="arrow arrow--right" id="arrow">
                    </div>
                </div>
                <div className="list" id="list">
                    <h2>Dashboard</h2>
                    <nav>
                        <details>
                            <summary>Industry Project</summary>
                            <p onClick={() => window.open("Pages/Aboutme.js")}>Dev: Unity Flexible List</p>
                        </details>
                    </nav>
                </div>
            </div>
        )
    }
}

export { CNavbar };