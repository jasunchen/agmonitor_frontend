import React from 'react';
import Navbar from "../shared/Navbar"
import './background.css'
import Footer from "../shared/Footer"

function AboutPage (props) {

    return (
        <div className = "overlay">   
           <div className="sr middle">
             <img src="https://agmonitor.com/wp-content/uploads/2020/09/answers-agdata.png" alt=""/>
             <img className="arrow" src="https://agmonitor.com/wp-content/uploads/2020/09/arrow.png" alt=""/>
             <img src="https://agmonitor.com/wp-content/uploads/2020/09/answers-SaaS.png" alt=""/>
             <img className="arrow" src="https://agmonitor.com/wp-content/uploads/2020/09/arrow.png" alt=""/>
             <img src="https://agmonitor.com/wp-content/uploads/2020/09/answers-answers.png" alt=""/>
           </div>
          <div className="middle-next">
            <span className="bold">Background</span>
            <br/> <br/>
            Solar energy can only generate power during the day, which introduces fluctuation into the grid. Energy usage during the day can be cheaper because of excess solar generation, whereas usage during the night can be more expensive because of higher demand. Microgrid owners face the problem of having to decide when to activate their variable load, or perhaps don’t want to decide at all. This can lead to inefficiencies in energy usage, waste money, and contribute to unnecessary greenhouse gas emissions depending on when power is used. Optimizing usage requires operators to have the relevant knowledge and foresight to smartly manage their resources.
            <br/> <br/>
            <span className="bold">Existing Solutions</span>
            <br/> <br/>
            In the current market, there are a few solutions that attempt to address this issue. Multiple companies like AgMonitor encourage shifting energy usage away from peak hours by sending price signals to the customer, indicating when they can potentially save on utility costs by either turning things off or changing when they turn on. This directly influences human behavior, which requires the customer to be involved in shifting energy usage. There is also currently research into smart charging and several pilot programs that attempt to implement smart charging programs, where grid information from the utility company is used to remotely manage when electric vehicles charge. These programs are not available to the wide public yet, and furthermore centralize control once again. Not to mention, a bottom-up approach from the microgrid perspective is better able to capture specific energy generation and needs. Optimizing on the macrogrid from the utility perspective doesn’t necessarily guarantee optimization on the microgrid.
            <br/> <br/>
            <span className="bold">Project Specification</span>
            <br/> <br/>
            Our objective is to make energy management easy for microgrid owners. We expect our users to range from business owners to homeowners. The project will specifically focus on creating  a user-friendly tool that can effectively manage energy assets and variable load with minimal effort and knowledge required from the individual. Furthermore, this tool must constantly balance potentially competing interests such as reducing cost, integrating more renewable energy, and maintaining resiliency in the grid. While we focus our project mainly around the usage of electric vehicles, we hope to be able to generalize our solution to multiple forms of variable load in the larger context of a microgrid. Our product will have to be able to balance between maximizing renewable energy usage, saving cost for the user, and ensuring that bad weather or shut offs do not cause critical failures.

            Our team goals are to:
            (i) Develop a web application to manage the impact energy storage (ES) and electric vehicle (EV) assets in the context of a micro-grid
            (ii) Implement an algorithm that maximizes the usage of local renewable energy and reduces the reliance on the California grid at times of peak load (4-9 pm)
            (iii) Validate the implementation of the web application on real-world use cases such as farms

            Our project makes a couple of assumptions. While historical data and statistics can be used to make predictions for utility grid generation and usage because of the scale, sufficient data might not exist at the microgrid level. Furthermore, there is an extremely wide range of data sources as different utility providers and manufacturers might provide data in different ways. Integrating these different data streams into our application is outside our scope, but we can assume that given enough resources and time we would be able to.
          </div>
        </div>

    );
};

export default AboutPage;