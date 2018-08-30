## Server Documentation

- [Technology Selection Process](#technology-selection-process)
- [Set Up](#set-up)
  * [Connect to MySQL Database](#connect-to-mysql-database)
- [Running the Application](#running-the-application)
  * [Initial Database Population](#initial-database-population)
- [Code](#code)
  * [Existing REST API Routes](#existing-rest-api-routes)
    + [Projects](#projects)
    + [Users](#users)
  * [Application Start](#application-start)
  * [Java Web Token Authentication](#java-web-token-authentication)
  * [Controller](#controller)
  * [Service](#service)
  * [Model](#model)
  * [Repository](#repository)
  * [Util](#util)
  * [Send Emails](#send-emails)
- [Some Helpful Links](#some-helpful-links)

### Technology Selection Process

- **Language:** Java was selected because everyone in the group is familiar with it. Not all members were comfortable with other possibilities such as Python or Node.js.
- **Framework:** [Spring Boot](https://projects.spring.io/spring-boot/) was selected because it is one of the most popular Java frameworks for web backend development. This implements a RESTful API.

### Set Up
- Clone from the [CSCI 401 Project Platform Github repository](https://github.com/joanhong/csci401-project). 
- Download [Spring Tool Suite](https://spring.io/tools/sts/all), which should feel familiar because it's built on Eclipse. 
- Import as a Git project. 
- Note: Please use a different IDE for client code or look for a TypeScript plugin. You will be very sad if you try to use plain STS for frontend code :(

#### Connect to MySQL Database 
- Create and start an empty database and schema using the command line or MySQLWorkbench. 
- Set the username and password for the connection.
- Change **src/main/resources/application.properties** file with this database information (URL, username, password) and set edit permissions (create, update, etc.) to connect. The URL would be formatted like: jdbc:mysql://localhost:PORT/SCHEMA_NAME.
- The first time you populate the database tables, you should set spring.jpa.hibernate.ddl-auto to "create" and set to "update" after. **Setting to create will wipe the database.**

### Running the Application
- One way is to:
`Right click server > Run As > Spring Boot App` 
- Alternatively: 
`Run > Run Configurations > Spring Boot App` and create a new run configuration that sets server as the project and capstone.PlatformApplication as the Main Type.
- Once the run configuration is set up, you can start by pressing the green play button.

#### Initial Database Population
- We can programmatically populate the database. To add an admin  with username "admin@usc.edu" and password "admin", navigate to the URL "localhost:8080/users/init". This code is in package *capstone.controller* in UserController.java.
- To populate the database with some sample students and projects, navigate to URL "localhost:8080/projects/init".  

### Code
src/main/java

#### Existing REST API Routes

##### Projects

Type | Route | Description
---- | ----- | -----------
GET | /projects/init | Initialize database tables with sample students and projects taken from Spring 2018 data
GET | /projects | Get all projects
GET | /projects/{email} | Get all projects that a stakeholder owns
GET | /projects/{email}/{projectId} | Get one project that a stakeholder owns
GET | /projects/student/{email} | Get a student's project
GET | /projects/{projectId}/students | Get all students on a project
GET | /projects/{projectId}/stakeholder | Get stakeholder on a project
GET | /projects/assignment | Run project matching algorithm and get matchings
POST | /projects/assign-to-students | Assign projects to students
POST | /projects/{email}/submit-ranking | Submit project ranking for a student
POST | /projects/save/{email} | Save a new project and attach a stakeholder to that project
POST | /projects/pending/{projectId} | Set status of project to Pending Approval
POST | /projects/approve/{projectId} | Set status of project to Approved
POST | /projects/reject/{projectId} | Set status of project to Rejected
POST | /projects/change/{projectId} | Set status of project to Changes Requested

##### Users

Type | Route | Description
---- | ----- | -----------
GET | /users/init | Initialize database with admin with username "admin@usc.edu" and password "admin"
GET | /users | Get all users
GET | /users/{email} | Get one user with given email
GET | /users/stakeholders | Get all stakeholders
GET | /users/students | Get all students
POST | /users/update-info | Update info for a user
POST | /users/admin-registration | Register an admin
POST | /users/student-registration | Register a student
POST | /users/stakeholder-registration | Register a stakeholder
POST | /users/student-emails-registration | Register valid student emails from admin side and send invitation emails
POST | /users/login | Handles login attempt for any user

#### Application Start

- In package *capstone* is PlatformApplication.java. This kicks off the entire Spring Application. In this class, you can enable "filters" that performs some action for a request to and/or a response from a resource. For example, the JWT Filter allows you to require JWT authentication for specified URLs. 
- This is automatically wired in to the application via the @Bean annotation. These tags are very important throughtout the server code in connecting the Spring application.

#### Java Web Token Authentication

- In package *capstone.controller* is JwtFilter.java. This filter performs a JWT authentication check on a request to a resource. If the request does not contain the correct token, the request is denied. 
- Note: If the number of filters grow, feel free to create a new package such as *capstone.filters* to further organize. 

#### Controller
- In package *capstone.controller* are the Controllers. A controller specifies the REST API URLs for the client to GET and POST to, and converts the client's request into a meaningful response.
- Denoted by a @RestController tag.
- @Autowired tags are used to automatically create instances of entities such as services.
- Can specify type of request with @GetMapping or @PostMapping annotation.
- Each endpoint requires a @CrossOrigin annotation with the client's URL. There is probably a better way to manage this than manually adding onto each method. This will need to be researched when the app goes in production and there are many clients.

#### Service
- In package *capstone.service* are the Services. A service contains business logic that you would like to use across multiple controllers. For example, if the Project controller needs to manipulate both Project and User data, it would @Autowire the ProjectService and UserService to call business logic for both resources.
- A service manages a Repository, which translates MySQL data into Java Objects and vice versa.

#### Model
- In package *capstone.model* are the Models. A model specifies the Java Object representation of the data we want saved in the database. Spring Data JPA takes these Java Object representations and translates them into MySQL data tables.
- @Id denotes the variable we want to use as an ID for a row in the data table. @GeneratedValue denotes that this ID is automatically generated when added to the table (this starts at 1 and increments).
- Pay attention to how you name variables in each model class. These names will directly translate into names in the database unless specified through a tag. Each variable must have a getter and setter (can automatically generate these by `right clicking in the file > Source > Generate Getters and Setters`).
- @Transient tag specifies variables that are needed for business logic but not necessary to store in the database.
- You can create relationships between objects by tags such as @OneToOne. For example, a Student can have a Project reference, and by using the @OneToOne tag, the database saves this relationship by creating a column in Student of Project ID.

#### Repository  
- In package *capstone.repository* are the [Spring Repositories](https://docs.spring.io/spring-data/jpa/docs/1.4.3.RELEASE/reference/html/jpa.repositories.html). For each table that you'd like to create in the MySQL database, create a corresponding Interface that extends JpaRepository. This JpaRepository is the sauce that connects the Java Objects and MySQL database entries. By extending JpaRepository, you get some convenient functions for accessing data in the database.
- For example, for a User object that has attributes "email" and "userId", you could create a UserBaseRepository (it is a UserBaseRepository since the Student, Stakeholder, and Admin types inherit from User, so we should create repositories for each user type).
- **Saving to the database:** In order to save users (create entries in the database), we can use the built in **save** method. Use the @Autowire tag to automatically allow a Service or Controller access to the database methods. For example, in UserService, we could @Autowire the StudentRepository so that we can call repository functions from our Service layer. 
- **Getting from the database:** In order to search and get Users in our database, we could create the following functions in UserBaseRepository:
```java
    User findByEmail(String email);
    User findByUserId(Long userId);
```
- By following the **findByAttributeName** pattern, it automatically creates methods that will get all data points in the database that match, and return it as a Java Object.
- **Other Queries to the database:** For other methods that are not already built in, we can create queries to the database. For example we could modify a Deliverable's status that matches a certain ID with the following:
```java
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Deliverable d SET d.status = :status WHERE d.id = :id")
    @Transactional
    void setStatusForId(@Param("status") String status, @Param("id") Long id);
```

#### Util
- **Constants:** Put any constants that you want to use throughout your application here. If there's a typo somewhere you only have to look through one file :)
- **EncryptPassword:** Password encryption/decryption implementation.
- **ProjectAssignment:** The project matching algorithm that matches students to projects is implemented here. See separate documentation for details.

#### Send Emails
- First, modify the src/main/resources/application.properties file with the appropriate username and password for the email account (set up to use Gmail) that you'd like to send emails from.
- In a Service or Controller class, @Autowire EmailService. EmailService allows you to send an email from the account that you specified in the application.properties file. By calling the following, you can send an email with a specific subject and message to a given email:
```java
    emailService.sendEmail("subject", "message", "emailto@usc.edu");
```

### Some Helpful Links
- [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
- [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
- [Spring Boot Tutorial - Javatpoint](https://www.javatpoint.com/spring-boot-tutorial)
- [Build a Flexible CRUD App with Spring Boot in 20 Minutes - Okta/Stormpath](https://stormpath.com/blog/tutorial-crud-spring-boot-20-minutes)
- [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [Introduction to JSON Web Tokens](https://jwt.io/introduction/)
