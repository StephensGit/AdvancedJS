# Dublin Coffee Guide
## Advanced Javascript project 2

### This is a MERN stack application, which was an ongoing project as part of a 4th year advanced javascript module on the Creative Computing course @ IADT. 
The aim of this project was to develop a full stack application using MongoDB, Express, React and Node.js (MERN). This project also uses Bootstrap for styling, implements redux for state management and uses authentication to restrict access to certain parts of the site depending on the type of user. The purpose of the app is to allow users to find information about independent coffee shops in Dublin. For a coffee shop owner it allows them to register and then input information such as the coffee shop name, location, opening hours, website and contact information. They can edit or delete their coffee shop details and account at any time afterwards. For a user who just wants to find out information about a coffee shop, they don’t need an account,  they can just view all the information regardless.

## Live project
[View the live project here](https://radiant-temple-45233.herokuapp.com/)

## User Profile
The application is being developed with the intention of helping independent coffee shop owners promote their shops. Therefore there are two types of users who will interact with the application. The first user is a coffee shop owner who wishes to create an account and submit information about their shop. The second user is a coffee enthusiast who is trying to find information about local independent coffee shops around Dublin.
Below is a list of user stories for both types of users. User stories are all the functionality that the application should be able to do from a user’s perspective.

### User Stories – Coffee Shop Owner
As a user, I want to be able to be able to register an account on the
application, so to add information for my coffee shop.
As a user, I want to be able to be able to login to my account on the
application, so I can edit my coffee shop information.
As a user, I want to be able to be able to login to my account on the
application, so I can delete my coffee shop information.
As a user, I want to be able to view all available coffee shops on the website,
so that I can find a coffee shop.
As a user, I want to be able to view an individual coffee shop on the
application, so that I can find more information about that coffee shop.
User Stories – Coffee Enthusiast
As a user, I want to be able to view all available coffee shops on the website,
so that I can find a coffee shop.
As a user, I want to be able to view an individual coffee shop on the
application, so that I can find more information about that coffee shop.

## Design
React applications allow the developer to split the web page up into individual components and these components are arranged in a hierarchy.

### Wireframes - components
![alt text](https://github.com/StephensGit/AdvancedJS/edit/master/images/Code1.png "DB Setup")
### Wireframes – Design

## Implementation
This chapter explains briefly all the main features of the application that were required of the project. Screenshots are supplemented where necessary to further explain.

### Mongo DB
Mongo Db is a NoSQL database that stores documents in collections. Typically documents would be referred as tables in an SQL database. Mongo DB enforces no data schema or relations unlike an SQL database and it is easily integrated into a Node/Express environment. For this project Mongoose was used. The database is hosted in the cloud using MongoDB Atlas, therefore a MongoDB Atlas account was created before any coding began.
### Node.js
Node.js is a host environment for Javascript. It essentially allows for Javascript to
be run outside of the browser. It is used to build web servers to handle incoming
requests, interact with databases and to also send back responses.
 ### Express
 Express.js is a framework for Node.js that allows developing server side code for
 web applications much easier.
### React
React is based upon component design and React applications are built using a
collection of components. Components are self-contained, components can share
its assets to other components using ‘export’, and acquire assets from other
components using ‘import’.

### DB Setup
With this application, the backend was created first. Below shows the
folder structure for the project. The config folder has a ‘db.js’ file that contains all
the required code to make the connection to the database. It is then imported into
the server.js file and called to make the connection.

 ### Database Schema
Above in the models folder contains two files that contain the database
schema. The two entities are coffee and user.
The below image shows a screenshot of the database in MongoDB
containing the two collections coffees and users. Every coffee shop should be
associated with a user. This is done by creating a reference to the user in the
Coffee model which is shown in a code snippet below.
<img width="486" alt="fig3" src="https://user-images.githubusercontent.com/45046901/106365495-f16c0b00-632d-11eb-9b7b-de26faf57e9a.png">
<img width="507" alt="DB" src="https://user-images.githubusercontent.com/45046901/106365498-f761ec00-632d-11eb-9f07-891e2309aec4.png">
Therefore, within the coffees collection below in figure 4, each document
references a user with a specific ObjectId that is retrieved from the users
collection. Figure 5 below shows a screenshot of a user document from the users
collection. As you can see, the ObjectId for user in figure 4 is referencing the user
‘Stephen Moran’ seen in figure 5.
<img width="508" alt="45" src="https://user-images.githubusercontent.com/45046901/106365548-3b54f100-632e-11eb-93b1-3d05f9d1da12.png">


### Server API Endpoints
In figure 2 above on page 8 in the routes/apis folder contains all the REST api
endpoints to allow the server to be used to perform CRUD operations. It is
broken up by resource which is briefly explained below. Also below is a table
outlining all the endpoints for this application and the action they carry out.

auth.js – This handles getting a JSON web token for authentication

coffees.js – This handles all the routes that has anything to do with the coffee
shops in the database, so fetching them, adding new coffee shops, editing existing

users.js – This handles registering new users and logging in.

need an image here

Below shows a snippet of code from the coffee.js file. This is a get request to fetch
all the coffee shops within the database. It takes the Coffee model and uses the
find method to retrieve all the coffee shops, also being used is the populate
method which in this case allows you to add the name of the user to the query.

### JWT Authentication (register/login)
Authentication is used to protect certain routes from users who should not have
access to them. In this application when a user registers, a JSON web token is
returned. This token can then be used to authenticate(login) and access protected
routes. A JSON web token can be broken down into 3 parts: Token Type, payload
and the signature. The payload is the most important part, it’s the data that you
want to send within the token. So if a user is registering on this app, it would be
the user’s name, email and password. Then this payload can be used to identify the
user and allow them access to certain routes, for example in this application a
logged in user should only be allowed to edit and delete functionality of their own
coffee shop and no other shops.

 ### Middleware
 Inside the middleware folder contains the code that allows to send the JSON web
 token back to authenticate an access protected route. A screenshot of the folder
 structure highlighting this file is below in figure 2.
 
 ### React Router, Links, Route
React Router allows the application to navigate without the page ever refreshing. It
uses component structure to call components that display the appropriate
information. React router is not part of React, it has to be installed separately. This
is done through the command line by entering npm i react-router-dom. It also
needs to be imported at the top of file. The Browser router component needs to
be the highest parent allowing it to pass down all its props to all of its children
(entire application). Figure 8 below shows a screen shot from the app.js file of
Browser Router and all the components within it.

Links are used instead of typical <a> tags. In this application they are used in the
Navbar component as seen in figure 9 on the next page. This allows the user to
navigate from the home URL to the register URL or the login URL without a
page refresh.
  
Since components are functions, they can be referenced. Route references the path and passes the component as a prop. This can be seen above in figure 8 on page 13. React router does partial matching so ‘exact’ is used to disable the partial matching for a route and ensure the route of an path is an exact match to the current URL. So above in figure 8 “ exact” is added to the home route so it only matches on “/”.

### Redux
Redux is a popular JavaScript library for managing the state of an application.
Managing the state in big applications gets more complicated as the application
grows, that’s why state management libraries like Redux are used. Redux has three
main parts: 1) Actions, 2) Reducers, 3) Store.
Store – The store holds the state of the application, and there should be only one
store per application. A code snippet from the store.js file is below and briefly
explained.

**Redux** has a create store function which is used for creating the application’s store.
It accepts 3 arguments, the first is the root reducer which combines all the
reducers and is found in the reducers folder in the file ‘index.js’. The second
argument is the initial state and lastly for the third argument
composeWithDevTools is used as the dev tools extension is being used. This
argument takes in the applyMiddleware and uses the spread operator and adds the
middleware variable created. It is then imported into the app.js file seen in the code
snippet below, also used is Provider which connects redux and React because
redux is separate from React. Following this you must ensure everything is
wrapped in a Provider tag as seen in figure 10 below. This way all the components
created can access app level state.

**Actions** – Actions are vanilla JavaScript objects that describe what happened,
however they don’t describe how the app state changes. Actions are
dispatched(sent) to the store instance whenever you want to update the state of the
application. Redux requires the action objects to contain a type field which is used
to describe the kind of action being dispatched. It should also be a constant that
you export from a file.
**Reducers** – Reducers are functions that define how the app state changes, they
will recalculate the new app state. Whenever an action is dispatched to the store,
the action gets passed to the reducer. It takes two arguments, the previous app
state, the action being dispatched and then returns the new app state. So basically
the reducer will calculate the state of our app based on the action dispatched.
Below in figure 11 is a diagram to try and explain the data flow in Redux.

 So if an event is triggered and the state updates, here’s an example of what
 happens:
 
* An action gets dispatched to the store with store.dispatch() method
* Then Redux passes down the dispatched action to the reducer
* The redux store then saves the new state that is returned by the reducer
* The UI will be updated accordingly
 
### Functional Components/Hooks
For this project functional components were used throughout the application. This
allowed for hooks to be used. Hooks basically allow you to use local state and
other React features without writing a class. They are special components that
allow you to hook onto React state and lifecycle features inside function
components. For this application two hooks in particular were used, useState( )
and the useEffect( ). The useState( ) hook lets you add a React state to a functional
component. Below shows an example of useState( ) being used in the register
component and a brief explanation of how it is being used.

useState( ) returns a pair of values in an array, the current state and a function that
updates it. In this example formData is the current state and the setFormData is
the function that will update the state when a user registers. When useState( ) is
called above, it declares a state variable ‘formData’ and is given the value of
whatever argument is being passed into useState( ). So in this case, it is setting the
values for the form to empty strings. Setting the initial state for formData in a
typical class component would like the code below.

### URL Parameters
URL Parameters are parameters whose values are set dynamically in a page’s URL.
This allows a route to render the same component while passing that component
the dynamic portion of the URL so it can change based off it. One example of it
being used in this application is when a user wants to view an individual coffee
shop’s info. The Object_Id of the coffee shop is added to the URL so the application 
can identify which coffee shop to display.

### Bootstrap
In order to style the application, a combination of custom CSS and Bootstrap has
been used. To use Bootstrap the CDN is included inside the index.html file. The
application is fully responsive and has been tested on Mac, and android devices
with no issues.

### Type Checks
Prop types acts as a validation for properties that a component should have. React
allows you to define Prop types and also set them to be required or not.

### Fragments
A problem when developing this application was when rendering a list of nodes,
they always must be enclosed in a parent element. This forces an extra div to be
used, however this sometimes caused problems in the structure of the DOM
elements especially when using Bootstrap. A solution for this was to use React
Fragments. They allow you to group a list of children without adding extra nodes
to the DOM.

### Heroku
Hosted on Heroku

## Quick Start
To get this project started
* Clone the repository:

* git clone https://github.com/StephensGit/AdvancedJS.git

*Then Enter the folder: cd AdvancedJS

**Then run the following commands**

* npm install
*This installs any dependencies needed to run the project*

*npm run dev
*Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.*
