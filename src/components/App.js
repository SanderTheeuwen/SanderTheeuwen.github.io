import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { GetProjects, GetProducts, GetDevlogs } from "Data/projects/FakeRepository.js";
import { GetProjects, GetProducts, GetDevlogs } from "Js/API.js";
import { Project } from "Pages/Project.js";

//Pages
import { Home } from "Pages/Home.js";
import { AboutMe } from "Pages/AboutMe.js";
//import { Product } from "Pages/Product.js";
//import { Devlog } from "Pages/Devlog.js";
import { LoginSignup } from "Pages/LoginSignup.js";

//Components
import { CNavbar } from "Components/CNavbar.js";
import { CColorModeSwitch } from "Components/CColorModeSwitch.js";
import { CLoginSignup } from "Components/CLoginSignup.js";
import { CLogo } from "Components/CLogo.js";

import "Css/pages/App.css";

class App extends React.Component
{
    constructor()
    {
        super();
        console.clear();
        this.state = { projects: undefined, products: undefined, devlogs: undefined };
    }

    componentDidMount()
    {
        GetProjects().then(projects => 
            {
                if (projects)
                {
                    this.setState({ projects: projects[0] });
                }
            })
        GetProducts().then(products =>
            {
                if (products)
                {
                    this.setState({ products: products[0] });
                }
            })
        GetDevlogs().then(devlogs =>
            {
                if (devlogs)
                {
                    this.setState({ devlogs: devlogs[0] });
                }
            })
    }

    #getProjectRoutes()
    {
        if (!this.state.projects)
        {
            return null;
        }

        return this.state.projects.map(project => 
        {
            console.log(project);
            console.log(project.name);
            return <Route exact path={"/projects/" + project.name.replace(" ", "-")} element={<Project project={project} />} key={project.name} />
        })
    }

    render()
    {
        return (
            <div className="app">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home projects={ this.state.projects }/>} />
                        <Route exact path="/aboutme" element={<AboutMe />} />
                        <Route exact path="/loginsignup" element={<LoginSignup />} />
                        <Route exact path="/test" element={<CLogo color="#f00" />} />
                        {
                            this.#getProjectRoutes()
                        }
                    </Routes>
                </Router>
                {<CNavbar />}
                {<CLoginSignup />}
                {<CColorModeSwitch />}
            </div>
        );
    }
}

export { App };