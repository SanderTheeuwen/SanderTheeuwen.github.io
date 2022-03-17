import { Link } from "react-router-dom";
import React from "react";

import "Css/pages/Home.css";

class Home extends React.Component
{

    #renderProjects()
    {
        if (!this.props.projects || this.props.projects.length === 0)
        {
            return null;
        }

        return this.props.projects.map(project => this.#renderProject(project))
    }

    #renderProject(project) 
    {
        return (
            <Link to={("/projects/" + project.name).replace(" ", "-")} key={project.name}>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
                {/* <img className="projectteaser" src={require("/public/images/" + project.name + "/AAA Teaser.png")} alt="Project Teaser"/> */}
            </Link>
        );
    }

    render() 
    {
        return (
            <div className="page">
                <div className="section quick-about-me">
                    <img className="section background dark" src={require("Media/images/backgrounds/Background1.jpg")} alt=""/>
                    <h4>Hi, I am Sander Theeuwen</h4>
                    <p>
                        I am an enthusiastic programmer, currently studying game design at Fontys in Eindhoven, Netherlands. 
                        I really enjoy coding projects, as it is very satisfying to see the direct result of what I do. 
                        In my free time, I work on hobby projects.
                    </p>
                    <img src={require("Media/images/Me.png")} alt="Sander Theeuwen"/>
                </div>
                {/* <div className="section top-project">
                    <img className="section background dark" src={require("Media/images/backgrounds/Background1.jpg")} alt=""/>
                    <div className="description">
                        <h1>Top Project</h1>
                        <p>
                            My top project will show up here.
                        </p>
                    </div>
                    <img src={require("Media/images/TopProject.png")} alt="Top project thumbnail"/>
                </div> */}
                <div className="section project-list">
                    <img className="section background dark" src={require("Media/images/backgrounds/Background1.jpg")} alt=""/>
                    <h1>Projects</h1>
                    {
                        this.#renderProjects()
                    }
                </div>
            </div>
        );
    }
}

export { Home };