# bookmark
Application to create and track reading lists for users.

## Purpose
Allows the avid reader to find books and add them to a personal reading list, tracking completion status and category. Demonstrates use of Sequelize, Handlebars, Express, and more.

## Local Installation
### .env setup
When locally hosted, Bookmarks requires a .env file to contain MYSQL database information, and an API key for Google Books. Include the following information as environment variables:
```
MYSQLDB_URL=mysql://<username>:<password>@localhost:<port>/<database>
PORT=<port>
GBOOKS_API_KEY=<google books api key>
```

### Database setup
You may use the Sequelize Command Line Interface to establish a MYSQL database and populate it with the included migrations and seeds. Refer to the Sequelize documentation for more information, but the basic procedure is as follows:
```
$ sequelize db:create
$ sequelize db:migrate
$ sequelize db:seed:all
```

You may also include some test seeds with an additional CLI line:
```
$ sequelize db:seed:all --seeders-path "seeders/test"
```
This procedure will create `database_db`.

## Usage
Upon logging in with a freshly created account, the user will have an empty "reading list" and the opportunity to search for books via the Google API. Books may then be added to the reading list.
![add-to-list](screenshots/add-to-list.png "Adding to the reading list.")
The book will have "completion status" and "category" fields available to them once in the reading list.
![reading-list-book](screenshots/reading-list-book.png "Adding to the reading list.")
Click on the current status or category to change it. The reading list may then be filtered by status or category.
![tag-changing](screenshots/tag-changing.png "Adding to the reading list.")
- When a book is assigned "Deleted" status, it is removed from all list views unless the user specifically chooses to view "Deleted" books only. In this view, "Deleted" books are also granted a "Trash" button, which will remove the book from the reading list completely. (It may be found again in the "book search" area if desired.)
![trash-button](screenshots/trash-button.png "Adding to the reading list.")

## Credits
- Matt Haddock
- Denton Kerr
- Elaina Swann

