# Note Book Api using Node, GraphQL, Express
A social notebook application called "Notes". Users can create account, write notes in plain text or Markdown, edit their note, view a feed of other users' notes, "favorite" the notes of other users.

## FEATUERS
1. Users will be able to create notes, as well as read, update and delete notes they have created
2. Users will be able to view a feed of notes created by other users, and read individual notes created by others.
3. Users will be able to favorites notes of other users as well as retrieve a list of information of other users.

## AUTHENTICATION AND AUTHORIZAION
1. Bcrypt (for encrypting passwords)
2. JSON WEB TOKENS (to generate and validate tokens)

## SECURITY AND MIDDLEWARE
1. Helmet (for adjusting HTTP headers to be more secure and protect from common web vulnerabilities)

## DEVELOPMENT ENVIRONMENT
1. Node.js (for developing services using Express)
2. MongoDB (for Database)
3. GraphQL  (for querying and mutating data from server)
4. Prettier (for formatting code)
5. ESLint (for checking quality of code)

## Getting Started
```bash
git clone https://github.com/Hamzaahmed95/notes_api_graphql.git
cd notes_api_grapql
npm install 
npm start
# check http://localhost:4000/api
```

## DEPLOYED API
1. MONGODB ATLAS (DEPLOYED DATABASE)
2. HEROKU (DEPLOYED APPLICATION)

You can check the api using the following command:
```bash
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ notes { id } }" }' https://hamzaahmednotes.herokuapp.com/api
```
## APPRECIATION 
1. This project has been developed by the help of Adam D.Scott's JavaScript Everywhere book! This is an amazing book for especially full stack developer.





