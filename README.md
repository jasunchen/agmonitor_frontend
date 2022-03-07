# SmartGrid - Frontend
- Computer Science Capstone 
- UC Santa Barbara 
- AgMonitor 

## Summary
### Motivation
- Power shutoffs are frequent, impacting millions of customers yearly.
- SOLAR+STORAGE systems provide a cost-effective way to weather power shutoffs.
- Used efficiently, SOLAR+STORAGE can reduce greenhouse emissions to fight climate change.
- Current microgrid auto-management tools are based on human-engineered heuristics, which lack the flexibility to provide personalized recommendations.

### Research Questions
- What should the battery threshold be?
- How should you schedule flexible loads?

### Solution
- Interpretable AI-optimized personal energy management recommendations.
- Historical microgrid usage visualization.

## Setup
### System Overview
Our system is comprised of the following technologies:
- React
- Javascript
- Highcharts
- React Datagrid
- Auth0

### Prerequisites
None.

### Installation
See package.json for a full list of libraries.


### Deployment
- START: docker-compose up -d --build 
- STOP: docker-compose stop 

## Specs
### Functionality
1. As a potential customer, I can find a brief digest about the software to understand the product.
2. As a new user, I can sign up for a new account at the homepage.
3. As a customer user, I can log in and log out on the website to ensure my personal data is secure.
4. As an internal developer, I can upload a CSV file of data so I can use the data for optimization.
5. As a user, I can download a CSV file of data (after data-cleaning).
6. As an internal engineer, I can transform customer data to provide data processing for convenience.
7. As a customer user, I can see my energy data usage summary on the home page after I logged in.
8. As a data scientist, I can look into and edit my raw data for my energy usage to correct errors.
9. As a customer user, I can explore my energy data for a better understanding of my energy usage.
10. As an internal engineer, I can find an algorithm to help users optimize their microgrid effectively.
11. As a developer, I can provide improvements to customers’ energy usage from their historical data.
12. As a customer user, I can opt into receiving notifications for energy optimization recs.
13. As a customer user, I can configure different assets to correctly align consumption/usage data.
14. As a customer user, I can see the percent of power each asset consumed/generated.
15. As a customer user, I can add constraints to the optimizations to prevent not applicable recs.
16. As a customer user, I can configure my profile page.
17. As an internal developer, I can integrate Tesla Powerwall data into our existing database.
18. As a customer user, I can compare Tesla Powerwall data and the optimization differences.
19. As a user, I can add/delete assets on the dashboard so I can control assets I want to optimize.
20. As a user, I can link my variable assets so its charging/discharging is automatically controlled.

### Known Issues
TODO

### License
Apache 2.0
