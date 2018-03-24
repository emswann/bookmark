# Bookmark Database Tables

## user
  * id       - auto increment
  * email    - varchar, not null
  * password - varchar, not null

## category
  * id   - auto increment
  * name - varchar, default = Not Assigned
  
  Seeded values - Not Assigned, Vacation, Work, School, Bathroom, Easy, Hard

## status
  * id   - auto increment
  * name - varchar, default = Not Started
  
  Seeded values - Not Started, In Progress, Completed, Deleted

## library
  * id     - auto increment
  * title  - varchar, not null
  * author - varchar, not null
  * genre  - varchar, allow nulls
  * img - varchar, allow nulls
  * url    - varchar, allow nulls

## reading_list
  * id         - auto increment
  * UserId     - int, foreign key to user(id)
  * LibraryId  - int, foreign key to library(id)
  * CategoryId - int, foreign key to category(id)
  * StatusId   - int, foreign key to status(id)


NOTE: All tables will use the default setting to add create/update timestamps.
      Database will use freezeTableName: true option to preserve original name and not make plural with s.
      Database will use operatorsAliases: false option to improve security.

EXAMPLE:

## user 
  1 | test@hotmail.com | <encrypted password> (Seed file will be created to insert this dummy test user.) 

## category
  1 | Not Assigned
  2 | Vacation
  3 | Work
  4 | School
  5 | Bathroom
  6 | Easy
  7 | Hard

## status
  1 | Not Started
  2 | In Progress
  3 | Completed
  4 | Deleted

## library
  1 | Stephen King | The Stand | horror | https://books.google.com/books?isbn=038552885X

## reading_list
  1 | 1 | 1 | 2 | 2

  For: test@hotmail.com, The Stand, Vacation, In Progress