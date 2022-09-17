## Basic API's for CRUD operations
**API's in the nodejs where i performed the CRUD operation on the user**
## Requirements for the project. 
-***Node.js installed***  
-***npm working***  
-***Mongodb uri***  
-***Postman for hitting the api's***  
### Description
1)-> Created the api for user registeration where email id will be unique for every user.  
2)-> User password is hashed using the bcrypt js module of node and hashed password is stored in the database.   
3)-> Authorization has also been kept using the jwt token so that only authorized user can access some routes.   
4)-> Api for user login has been created.  
5)->Session is also maintained using the express-session module of the node js.
6)->Mongo db is used as a database.   
#### How to run the project in your local system  
1)-> Make a fork and make a clone of the project in your local system.  
2)-> Run the following command ***npm i*** so that all the dependencies listed in the package.json are installed.  
3)-> You also need to install the nodemon using the command ***npm i -g nodemon*** to install the nodemon globally or just ***npm i nodemon*** to install the it locally.  
Till time you have all the basic dependencies installed now make the .dot env file and Enter the following details in the file 
-API_PORT --> port on which you want to serve your server.  
-MONGO_URI --> uri of your mongo atlas or mongosh.  
-TOKEN_KEY --> any string used for generating the token .  
-secret --> Secret for session creation string  
now all the setup us done you can run the project by entering the following command   ***npm run dev*** project should work by displaying the message similer to server   listening on the port --- and successfully connect to the database  
***Note*** All the above commands should be run from the root of your project  
#### How to make api call using postman 
open a postman and  
1-> Make a post request to the ***localhost:Port/user/register***  
and in the body send the ***first_name, last_name, email, password*** with exactly the same names and you should see the user details in the response.Save the token for authorization purpose.  
***Note*** Port is the port number where your server is listening  
2-> Make another post request to the same url only by replacing the register by login and in the body send only the email and password and you get also the user in the response.  
3-> Make a get request to the same url by replacing the register with get/name, where name is the name of users that have been crearted with this name and provide the email for session management and you should get the list of user with the following name.  
4-> Make a patch request to the same url by replacing this time register with the update/email ,where email is the email of user whose name you want to update and the provide the name in the body that you want to set for the user .   
5-> Make the delete request to the localhost:port/user/delete/email, where email is the email of the user you want to delete.  
6-> Make the post request to the localhost:port/user/welcome and in the header provide the token of the user that is saved in the database who will be authorized with the following key name ***x-access-header***  