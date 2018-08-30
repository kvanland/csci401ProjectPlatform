## Client Documentation

- [Technology Selection Process](#technology-selection-process)
- [Set Up](#set-up)
- [Running the Application](#running-the-application)
- [Code](#code)
  * [Organization](#organization)
  * [Navigation](#navigation)
  * [Pulling Data from Server](#pulling-data-from-server)
  * [Updating the Database](#updating-the-database)
- [Some Helpful Links](#some-helpful-links)

### Technology Selection Process

- **Language:** [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript, since we implemented the frontend using React and most members on the team were already familiar with it.
- **Frameworks/Libraries:** 
  * [React](https://projects.spring.io/spring-boot/): An efficient, component-based library which would automatically update views based on changing data.
  * [React Bootstrap](https://react-bootstrap.github.io/): Helped us build a professional, aesthetic interface. Our wireframes were made using Bootstrap elements, making it a natural choice for actual development. 
  * [React DnD](http://react-dnd.github.io/react-dnd/): Drag and Drop components for React that were used to implement Student Project Ranking and Admin Project Matching pages. This was chosen for its ease of use and detailed documentation available.
  * [Yarn](https://yarnpkg.com/en/): Packaged our code and increased development speed when testing in only the frontend.

### Set Up
- Clone from the [CSCI 401 Project Platform Github repository](https://github.com/joanhong/csci401-project). 
- Install yarn using [Homebrew](https://brew.sh/): `brew install yarn`
- Use `npm install` for react-bootstrap, react-dnd, and react-datepicker (or simply `npm update` to update all)
- Open the **client** folder in an IDE (we recommend [Visual Studio Code](https://code.visualstudio.com/))

### Running the Application
- In a separate tab in Terminal, run the client with `yarn start`
- Navigate to localhost:3000 in your browser

### Code
src/

#### Organization

The **client/src/** folder is split further into components and scenes, modeled off of [this article](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1).

- **Components**:
  * Place any reusable React components here so that they will be accessible from any scene.
  * Since each user type had such different functionality, this folder was not ultimately used.
- **Scenes**: Organizes by feature, in our case, by user type and then by page.

#### Navigation
- In each user type folder is a **[UserType]Navigation.tsx** file which contains the React component for the navigation bar. It uses Routes and a BrowserRouter from react-router-dom to handle navigation.
- The **index.tsx** is the highest-level React component for each page, and is mapped to by each **[UserType]Navigation.tsx** component in the import statements. For example:
```javascript
import ProjectProposal from './ProjectProposal/index';
```
- In the `render()` function, use LinkContainers from react-router-bootstrap and Routes wrapped within a `<BrowserRouter>` (see [client/src/scenes/stakeholder/StakeholderNavigation.tsx](https://github.com/joanhong/csci401-project/blob/master/client/src/scenes/stakeholder/StakeholderNavigation.tsx) for an example)

#### Pulling Data from Server
"That's so fetch"

- Include a `launch()` function in your React component, and add the line `this.launch = this.launch.bind(this);` to the constructor.
- In the function, use `fetch()` to navigate to navigate to the corresponding URL defined in the server code. Receive the response in JSON, then update the state appropriately.
```javascript
fetch('http://localhost:8080/projects/assignment')
  .then(response => response.json())
  .then(data => this.setState({projects: data}));
```
- Note: The JSON response must in a format compatible with `projects`. The naming for items in the JSON output must match the naming of the properties in the React component:
```javascript
export type Project = {
  projectId: number;
  projectName: string;
  minSize: number;
  maxSize: number;
  members: Array<StudentInfo>;
};
```

#### Updating the Database
- Use an `XMLHttpRequest()` and POST to send JSON data back to the server.
- Instantiate a request: `var request = new XMLHttpRequest();`
- Set credentials: `request.withCredentials = true;`
- Navigate to the appropriate URL: `request.open('POST', 'http://localhost:8080/projects/assign-to-students');`
- Convert data to JSON: `var data = JSON.stringify(this.state.projects);`
- Set the headers and send the request:
```javascript
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
request.setRequestHeader('Cache-Control', 'no-cache');
request.send(data);
```
- See [client/src/scenes/admin/ProjectMatching/index.tsx](https://github.com/joanhong/csci401-project/blob/master/client/src/scenes/admin/ProjectMatching/index.tsx) for an example.

### Some Helpful Links
- [Fetch Requests to pull data from REST API](https://facebook.github.io/react-native/docs/network.html)
- [Intro to React Tutorial](https://reactjs.org/tutorial/tutorial.html)
