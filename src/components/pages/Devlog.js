import React from "react";

class Devlog extends React.Component
{
    #mediaRegex = /<<[0-9a-zA-Z\s.]+>>/g;

    #renderApproach()
    {
        return this.props.devlog.approach.map(approach =>
        {
            return (//Category - sub category - items
                <div key={approach.name}>
                    <h3>{approach.name}</h3>
                    {
                        approach.items.map(category =>
                        {
                            return (
                                <div key={category.name}>
                                    <h4>{category.name}</h4>
                                    {
                                        category.items?.map(item => <p key={item}>{item}</p>)
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            );
        })
    }

    #renderLearnings()
    {
        if (this.props.devlog.learnings || this.props.devlog.specialLearnings)
        {
            let returnValue = [<h2 key={this.props.devlog.learnings}>What I learned</h2>];
            if (this.props.devlog.specialLearnings)
            {
                returnValue.push(this.props.devlog.specialLearnings.map(learning =>
                {
                    return <p key={learning}> ! {learning}</p>
                }));
            }
            if (this.props.devlog.learnings)
            {
                returnValue.push(this.props.devlog.learnings.map(learning =>
                {
                    return <p key={learning}> - {learning}</p>
                }));
            }
            return returnValue;
        }
    }

    #renderResult()
    {

    }

    #renderSources()
    {
        let matches = this.props.devlog.result.match(this.#mediaRegex);
        if (matches.length)
        {
            let sources = [];
            matches.forEach(match =>
            {
                if (match.startsWith("<<image"))
                {
                    sources.push(<img src={"/images/" + this.props.projectname + "/" + match.replace("<<image ", "").replace(">>", "")} alt="source" key={match} />);
                }
                else if (match.startsWith("<<video"))
                {
                    sources.push(
                        <video key={match} width="400" controls>
                            <source src={"/videos/" + this.props.projectname + "/" + match.replace("<<video ", "").replace(">>", "")} type="video/mp4" />
                        </video>
                    );
                }
                else
                {
                    console.error("Found source notation in devlog \"" + this.props.devlog.name + "\", " + match + ". Is this meant to be a source?");
                    return null;
                }
            });
            return sources;
        }
    }

    render()//published, name, dates, goal, approach (name, items (name, items)), normal diamonds, special diamonds, result, validation, nextStep
    {
        return (
            <div className="page">
                <div className="left">
                    <h1>{this.props.projectname} - {this.props.devlog.name}</h1>
                    <h2>Dates</h2>
                    {
                        this.props.devlog.dates.map(date => <p key={date}>{date}</p>)
                    }
                    <h2>Goal</h2>
                    <p>{this.props.devlog.goal}</p>
                    <h2>My approach</h2>
                    {
                        this.#renderApproach()
                    }
                    {
                        this.#renderLearnings()
                    }
                    <h2>Result</h2>
                    {
                        this.#renderResult()
                    }
                    <h2>Validation</h2>
                    <p>{this.props.devlog.validation}</p>
                    <h2>Next step</h2>
                    <p>{this.props.devlog.nextStep}</p>
                </div>
                <div className="right">
                    {
                        this.#renderSources()
                    }
                </div>
            </div>
        );
    }
}

export { Devlog };