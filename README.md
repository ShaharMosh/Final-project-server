# server

In this repository, there is a server-side using Node JS and a client-side using React Native. The server side is suitable for Android\IOS apps like [this](https://github.com/adi-ben-yehuda/LookMatcher). 

## General Information

### Create a new user
The client sends the following details to the server: email, first name, last name, password and password verification. If the email does not exist in the user table in the DB, then a new record will be created in the user table with the details of the new user. If the email exists then send an appropriate error message to the customer.

### Login
The client sends the email and password that the user entered in the application to the server. If they exist in the user table then the server will answer 200 and the client will move the user to the home screen. If the details do not exist in the user table then an appropriate error message will be returned to the client.

### Search for a garment
The client sends the options that the user has chosen to the server. For each combination of options from the fields gender, category, color, size and store, web scraping will be performed to the relevant website and items that answer the search query will be taken from this website. These items will be saved in the items table in the DB and sent to the customer. If the user searches again for a search combination that has already been searched before, web scraping will not be performed, but the information will be pulled directly from the DB and sent to the client.

### Item screen
The client sends the item the user selected to the server. The server performs web scrapping to the site where the item appears and takes from there additional colors in which the item exists and all the images that show the item. This information is stored in the items table within the existing record for this item. The next time a user clicks on this item, the information will be pulled directly from the table without web scraping.

### Night scrapping

