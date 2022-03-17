import React from "react";
import { Link } from "react-router-dom";
//import { GetProducts, GetDevlogs } from "Data/projects/FakeRepository.js";
import { GetProducts, GetDevlogs } from "Js/API.js";

import "Css/pages/Project.css";

class Project extends React.Component
 {
    #renderStakeholders(project) 
    {
        if (project.stakeHolders) 
        {
            return (
                <>
                    <h2>Stakeholders</h2>
                    {
                        project.stakeHolders.map(stakeHolder => 
                        {
                            return <p key={stakeHolder}>- {stakeHolder}</p>;
                        })
                    }
                </>
            );
        }
    }

    #renderProduct(product)
    {
        return (
            <Link to={("/projects/" + this.props.project.name + "/products/" + product.name).replace(" ", "-")} key={product.name}>
                <p>{product.name}</p>
            </Link>
        );
    }

    #renderDevlog(devlog)
    {
        return (
            <Link to={("/projects/" + this.props.project.name + "/devlogs/" + devlog.name).replace(" ", "-")} key={devlog.name}>
                <p>{devlog.name}</p>
            </Link>
        );
    }

    render()
    {
        let products = GetProducts(this.props.project.id);
        let devlogs = GetDevlogs(this.props.project.id);
        return (
            <div className="page">
                <h1>{this.props.project.name}</h1>        
                <h2>Start date</h2>
                <p>{this.props.project.startDate}</p>
                <h2>End date</h2>
                <p>{this.props.project.endDate}</p>
                {
                    this.#renderStakeholders(this.props.project)
                }
                <h2>Products</h2>
                {
                    products.map(product => this.#renderProduct(product))
                }
                <h2>Devlogs</h2>
                {
                    devlogs.map(devlog => this.#renderDevlog(devlog))
                }
            </div>
        );
    }
}

export { Project };