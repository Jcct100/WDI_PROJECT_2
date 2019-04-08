
## GA WDI-30 Project 2: 'Food Share'

### Introduction: 

Our second project was to build a full-stack RESTful application that includes authentication. 

### Concept:

Food Share is the name of my website. It is a directory of Food Banks in the UK. You can edit, delete, show and comment on the website. You have to register as a user in order to access some of the web pages and features such as adding comment to a post. Only the user created the foodbank can see the option to delete and edit their own post.

The inspiration of my idea comes from the time I was working at Citizen Advice Bureau as a Social Welfare Advisor where I often found people coming to us to direct them to the nearest food banks.

###  Libraries/Applications used:

1) Mongo /Mongoose

2) Express 

3) Gulp

4) Bluebird 

5) Node js

6) Babel

7) SASS 

8) Bootstrap

9) Method-override

10) Bcrypt

11) Embedded JavaScript

### What went well:

I only have about 5 days to build a full-stack RESTFul application that includes authentication. I've done all my planning ahead on the first day using Trello and managed to get a prototype working on the 3rd day as planned. Then I spent the next two days working on the style using Bootstrap and SASS.  

### Challenges:

I was having some problem rendering the show.ejs and index.ejs in views. At first I thought it was a syntax error because the header in the views was showing up but only the below weren't showing in the browser. 

` <h4><%= foodbank.address %></h4>`
`<p><%=  foodbank.phone   %></p>`
`<p><%=  foodbank.email   %></p>`
`<p><%=  foodbank.website %></p>` 

This led me to check the syntax first. After checking all the syntaxs were correct. I installed MongoCampus to check my database. I noticed there were two databases. I went back to my code and check the name of the database  in index.js and db/seeds.js. I found out that there is a typo in one of the name which resulted in creating two databases. After correcting the spelling mistake the problem was resolved. 

### Feature backlog:
If I have more time I would like to work more on the user experience side of the website. Another would be to add google Map API so it can display all the local food banks nearby, and adding a search bar so user can find local foodbanks by typing in their post code. 

### Final thoughts:

Overall I am very happy with this project. I only had 5 days to learn all the technologies required to build a full-stack RESTful application, I was able to apply everything I have learnt very quicky. 

 Throughout this project, I have found effective ways to learn new technologies and become better at following documentations online. Now graduated I feel more confidence in keeping up to date and learning new technologies.




