# server

In this repository, there is a server-side using Node JS and a client-side using React Native. The server side is suitable for Android\IOS apps like [this](https://github.com/adi-ben-yehuda/LookMatcher). 

## General Information

### Create a new user
The client sends the following details to the server: email, first name, last name, password and password verification. If the email does not exist in the user table in the DB, then a new record will be created in the user table with the details of the new user. If the email exists then send an appropriate error message to the customer.

### Login
The client sends the email and password that the user entered in the application to the server. If they exist in the user table the server will generate a JWT and include it in the response. The server will then answer with a 200 status code, and the client will move the user to the home screen. The user attaches the token to the Authorization header when making subsequent requests to the server, allowing the server to verify the user's identity without requiring them to re-enter their credentials. If the details do not exist in the user table then an appropriate error message will be returned to the client.

### Password reset by sending an email

### Editing personal details
The client sends the user's old email, the new email and a new full name that the user entered to the server. The server looks for the user in the users table according to the old email and updates the details. In addition, the client sends the user the current password and the new password. The server checks if the password is correct and if so, updates the user's password in the users table.

### Search for a garment
The client sends the options that the user has chosen to the server. For each combination of options from the fields gender, category, color, size and store, web scraping will be performed to the relevant website and items that answer the search query will be taken from this website. These items will be saved in the items table in the DB and sent to the customer. If the user searches again for a search combination that has already been searched before, web scraping will not be performed, but the information will be pulled directly from the DB and sent to the client.

### Item screen
The client sends the item the user selected to the server. The server performs web scraping to the site where the item appears and takes from there additional colors in which the item exists and all the images that show the item. This information is stored in the items table within the existing record for this item. The next time a user clicks on this item, the information will be pulled directly from the table without web scraping.

### Night scraping
Every search that is carried out is also saved in the daily searches table. Every night, the server goes through all the searches made that day and redraws web scraping for each search. For each returned item, the server checks if it appears in the items table. If so, checks if the price shown in the table matches the current price of the product. If not, update. If the item does not appear in the table at all, then it is added to the table. This is how we guarantee that the information appearing in the application is up-to-date.
In the initial run of the server, when the items table is empty, the server performs web scraping for popular searches that we defined in the popular searches table in the DB.

### Wishlist
When the user clicks a heart button for a particular item, the client sends that item along with the user's information to the server. The server adds this item to the wish list belonging to that user. In addition, when the user clicks the heart button again, the client forwards the request to the server and the server deletes the item from the user's wish list.

### Search stores

### Recommendations


## Installation

Before installing this project, you need to install on your computer:

- Git
- Python

Then open a terminal and clone the project:
```
git clone https://github.com/ShaharMosh/server.git
```
Before running this project, you need to install this Node.js and python libraries:
```
npm install express dotenv http cors body-parser axios nodemailer jsonwebtoken child_process fs mongodb mongoose node-cron cheerio playwright
```
```
pip install pandas random json sys sklearn pymongo bson
```

To run the server, write: 
```
node addAddresses.js
node addGeocode.js
node app.js
```

