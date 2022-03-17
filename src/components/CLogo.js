import React from "react";

import "Css/pages/CLogo.css";

class CLogo extends React.Component
{
    #logoSize;

    render() 
    {
        this.#logoSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--logo--size"));
        return (
            <div className="logo">
                <div className="s__container">
                    <canvas id="canvas__s__top" className="canvas__s__part" height={this.#logoSize / 3} width={this.#logoSize / 2} />
                    <canvas id="canvas__s__middle" className="canvas__s__part" height={this.#logoSize / 3} width={this.#logoSize / 2} />
                    <canvas id="canvas__s__bottom" className="canvas__s__part" height={this.#logoSize / 3} width={this.#logoSize / 2} />
                </div>
                <canvas id="canvas__t" className="canvas__t" height={this.#logoSize} width={this.#logoSize / 2} />
            </div>
        );
    }

    componentDidMount()
    {
        this.#drawLogo();
    }

    #sleep(time)
    {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async #drawLogo()
    {
        this.#drawS();
        this.#drawT();
        this.#drawCircle();
    }

    async #drawS()
    {
        let topContext = document.getElementById("canvas__s__top").getContext("2d");
        let bottomContext = document.getElementById("canvas__s__bottom").getContext("2d");

        let centerX = this.#logoSize / 4;
        let centerY = this.#logoSize / 6;
        console.log("X: " + centerX + ", Y: " + centerY);

        topContext.strokeStyle = this.props.color;
        bottomContext.strokeStyle = this.props.color;

        this.#drawSpiral(topContext, centerX, centerY, Math.PI * (5 / 8), .02, false, true, false);//1.9 - 2.05
        this.#drawSpiral(bottomContext, centerX, centerY, Math.PI * (5 / 8), .02, false, false, true);
    }

    async #drawT()
    {

    }

    async #drawCircle()
    {

    }
   
    async #drawSpiral(context, centerX, centerY, size, scale, reversed, mirrorX, mirrorY)
    {
        context.beginPath();
       let counter = reversed ? size * 100 : 0;
       let maxIterations = reversed ? 0 : size * 100;
       let scaleX = mirrorX ? scale * -1 : scale;
       let scaleY = mirrorY ? scale * -1 : scale;
       while (true)
       {
         let angle = 0.1 * counter;
         let x = (1 + angle) * Math.cos(angle) * counter * scaleX + centerX;
         let y = (1 + angle) * Math.sin(angle) * counter * scaleY + centerY;
         context.lineTo(x, y);
         context.stroke();
         await this.#sleep(10);
         
         if (reversed)
         {
             counter--;
             if (counter < 0)
                 break;
         }
         else
         {
             counter++;
             if (counter > maxIterations)
                 break;
         }
       }
    }
}

export { CLogo };