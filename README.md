# &#x1F4E1; NHL Radar
Author: https://github.com/christopherrobin

Description: NHL Radar, the NHL team and player profile application.

NHL Radar is a Next.js app initially created using `create-next-app`. It includes React v18, Material UI v5 (+custom themes), ESLint (+custom config), Dark Mode feature + ToggleSwitch, + misc custom/generic components.

## System Requirements

* [Node.js 12.22.0](https://nodejs.org/en/)  or later

## Getting Started
#### Initial Setup
Clone Repository: `git clone https://github.com/christopherrobin/nhl-radar.git`

Open cloned folder: `cd nhl-radar`

Install: `yarn && yarn run build`

Run application: `yarn run dev`

#### Testing
Playwright uses the development server to run tests. To start the server, run `yarn run build && yarn run dev`

Then, in a separate terminal window, run the e2e tests: `yarn run test:e2e`

TODO: _Add more tests, unit tests with Jest would be nice._

## Usage Details

_Note: default `<baseURL>` for local development is `http://localhost:3000/`_

Landing page, allows users to select a team to view: `<baseURL>/`

Team Details Page: `<baseURL>/team/<teamId>`

Example, Chicago Blackhawks Team Page: `http://localhost:3000/team/16`

Player Details Page: `<baseURL>/player/<playerId>`

Example, Connor McDavid Player Details Page: `http://localhost:3000/player/8478402`

## Features
*Team Selection Page*
![TeamSelection](https://user-images.githubusercontent.com/464211/194859153-64fade4e-dcdf-446c-b00b-1a44fe25317d.png)

*Team Details Page*
![TeamDetails](https://user-images.githubusercontent.com/464211/194820682-ccc2d94c-6894-4560-85f5-beb975ca6d7a.png)

*Player Details Page*
![PlayerDetails](https://user-images.githubusercontent.com/464211/194820705-e68d01ee-ecd1-46be-9732-16895385f5c4.png)

*Dark Mode with Theme Toggle Switch*
![DarkMode](https://user-images.githubusercontent.com/464211/194820247-6b540cbc-7a74-4a1e-8347-fafd9123f96c.png)

*Player and Attributes Search*
![PlayerSearch](https://user-images.githubusercontent.com/464211/194820414-7aa2ce47-8c93-4c5b-9530-407c64a2f9b7.png)


*Sortable and filterable rosters*
![ColumnSortOptions](https://user-images.githubusercontent.com/464211/194820069-adf66c6a-c4df-4c36-8830-aafab268932c.png)


*Mobile-friendly, 100% responsive design*

<img src="https://user-images.githubusercontent.com/464211/194821190-9aa9180f-06f1-40bb-828f-5439867daec1.png" width="300"> <img src="https://user-images.githubusercontent.com/464211/194821644-7a9ede98-e447-4da5-b9d6-e7d2fb15d46a.png" width="300">


## About the Author
Hi, I'm Christopher. (https://github.com/christopherrobin)

#### Software Engineer, Musician, Privacy and Blockchain Advocate
I'm a Software Engineer living in Indianapolis and I've been writing code for over 20 years. My primary focus is creating componentized front end technology that is clean, reusable, and resilient while translating complex business requirements into technical specifications.

https://www.christopherrobinreynolds.com/

 [![Gmail Badge](https://img.shields.io/badge/-ChristopherRobinReynolds@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:ChristopherRobinReynolds@gmail.com)](mailto:ChristopherRobinReynolds@gmail.com)
 [![Twitter](https://img.shields.io/badge/-M4THBL45T3R-1DA1F2?style=flat-square&logo=Twitter&logoColor=white)](https://twitter.com/M4THBL45T3R) [![Linkedin](https://img.shields.io/badge/-Linkedin-0072b1?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/christopherrr/) 

 
Donate a ???? or ???

**Bitcoin (BTC)**: `3CysFL4oE7v2Qq1SF6S7Hq1pGu9n9XGBxW`

**Ethereum (ETH)**: `0x957BCD286a3Db6A93Ba0E6529b0Be5f0032440f9`
