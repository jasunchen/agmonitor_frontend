import React from 'react';
import "../../css/About.css"
import microgrid from "../../assets/microgrid.png";

function AboutPage (props) {

    return (
        <div className = "overlay">   
           <img className="banner" src={microgrid} alt=""/>

          <div className="middle-next">
            <br/> <br/>
            <h3> Background</h3>
            <p>
            Installing solar and battery assets creates microgrids that can be managed independently. Solar energy can only generate power during the day, which often means that energy usage during the day is cheaper. Certain energy assets do not have to be activated all the time, so shifting their load is one strategy to optimize cost, reduce inefficiencies, and even avoid unnecessarily contributing to greenhouse gas emissions. However, knowing when to move usage can be difficult or an excessive burden, This can lead to inefficiencies in energy usage, waste money, and contribute to unnecessary greenhouse gas emissions depending on when power is used. . Thus, our project Optimizing usage requires operators to have the seeks to provide microgrid operators the relevant knowledge and foresight to smartly manage their resources.
            </p>
            <h3> Existing Solutions </h3>
            <p>
            In the current market, there are a few solutions that attempt to address this issue. Multiple companies like AgMonitor encourage shifting energy usage away from peak hours by sending price signals to the customer, indicating when they can potentially save on utility costs by either turning things off or changing when they turn on. This directly influences human behavior, which requires the customer to be involved in shifting energy usage. There is also currently research into smart charging and several pilot programs that attempt to implement smart charging programs, where grid information from the utility company is used to remotely manage when electric vehicles charge. These programs are not available to the wide public yet, and furthermore centralize control once again. Not to mention, a bottom-up approach from the microgrid perspective is better able to capture specific energy generation and needs. Optimizing on the macrogrid from the utility perspective doesn’t necessarily guarantee optimization on the microgrid.
            </p>
            <h3> Project Specification </h3>
            
            <p>
            Our objective is to make energy management easy for microgrid owners. We expect our users to range from business owners to homeowners. The project will specifically focus on creating  a user-friendly tool that can effectively manage energy assets and variable load with minimal effort and knowledge required from the individual. Furthermore, this tool must constantly balance potentially competing interests such as reducing cost, integrating more renewable energy, and maintaining resiliency in the grid. While we focus our project mainly around the usage of electric vehicles, we hope to be able to generalize our solution to multiple forms of variable load in the larger context of a microgrid. Our product will have to be able to balance between maximizing renewable energy usage, saving cost for the user, and ensuring that bad weather or shut offs do not cause critical failures.

            Our team goals are to:
            (i) Develop a web application to manage the impact energy storage (ES) and electric vehicle (EV) assets in the context of a micro-grid
            (ii) Implement an algorithm that maximizes the usage of local renewable energy and reduces the reliance on the California grid at times of peak load (4-9 pm)
            (iii) Validate the implementation of the web application on real-world use cases such as farms

            Our project makes a couple of assumptions. While historical data and statistics can be used to make predictions for utility grid generation and usage because of the scale, sufficient data might not exist at the microgrid level. Furthermore, there is an extremely wide range of data sources as different utility providers and manufacturers might provide data in different ways. Integrating these different data streams into our application is outside our scope, but we can assume that given enough resources and time we would be able to.
            </p>
          </div>
        </div>

    );
};

export default AboutPage;