# TO Do List API



## API ENDPOINT

| methode| endpoint    | fucntion | Parameter & body
| ------- | -------- | ------- | ------- |
|GET| /getpost  | get all post from database||
|GET| /getpost/:id | get post by id | id |
|POST| /createpost | Create post TO DO LIST | title, description, deadline | 
|DELETE| /deletepost/:id | delete post by id | id |
|PUT| /check/:id | checkbox indicator | id |
|PUT| /updatepost/:id | update post by id | id, title, description, deadline, categoryId |
|POST| /login | for get Json Web token for post update delete | username, password |
|REGISTER| /register | Register for user | username, password, email |
|POST| /createcategory | Creating Category for post | name |
|GET| /getcategory | Get all category from database | |
|DELETE| /deletecategory/:id |  Deleting cateogry by id | id |
|GET| /getpostbycategory/:id | Get post by category by id | id |
