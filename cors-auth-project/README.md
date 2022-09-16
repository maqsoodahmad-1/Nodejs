## Basic API's for CRUD operations
**API's in the nodejs where i performed the CRUD operation on the user**
## Requirements for the project 
-***Node.js installed***
-***npm working***
-***Mongodb uri***
-***Postman for hitting the api's***
### Description
**1)-> Created the api for user registeration where email id will be unique for every user.**
**2)-> User password is hashed using the bcrypt js module of node and hashed password is stored**
**in the database.**
**3)-> Authorization has also been kept using the jwt token so that only authorized user can access some routes.**
**4)-> Api for user login has been created.**
**5)->Session is also maintained using the express-session module of the node js.**
**6)->Mongo db is used as a database.**
#### How to run the project in your local system
**1)-> Make a fork and make a clone of the project in your local system.**
**2)-> Run the following command ***npm i*** so that all the dependencies listed in the package.json are installed.**
**3)-> You also need to install the nodemon using the command ***npm i -g nodemon*** to install the nodemon globally or just ***npm i nodemon*** to install the it locally**
**Till time you have all the basic dependencies installed now make the .dot env file and Enter the following details in the file**
**-API_PORT --> port on which you want to serve your server.**
**-MONGO_URI --> uri of your mongo atlas or mongosh.**
**-TOKEN_KEY --> any string used for generating the token .**
**-secret --> Secret for session creation string**
**now all the setup us done you can run the project by entering the following command ***npm run dev*** project should work by displaying the message similer to server listening on the port --- and successfully connect to the database  **
#### How to make api call using postman