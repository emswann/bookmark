# Bookmark Database Tables

## user
  * id             - auto increment
  * username       - varchar, not null
  * password       - varchar, not null
  * login_attempts - int, default = 0 (may or may not need)

## category
  * id   - auto increment
  * name - varchar, not null
  
  Seeded values - Vacation, Work, School, Bathroom, Easy, Hard

## status
  * id   - auto increment
  * name - varchar, not null
  
  Seeded values - Not Started, In Progress, Completed, Deleted

## library
  * id     - auto increment
  * title  - varchar, not null
  * author - varchar, not null
  * genre  - varchar, allow nulls (need to verify what is on API)
  * url    - varchar, allow nulls (need to verify what is on API)

## reading_list
  * id         - auto increment
  * UserId     - int, foreign key to user(id)
  * LibraryId  - int, foreign key to library(id)
  * CategoryId - int, foreign key to category(id)
  * StatusId   - int, foreign key to status(id)


NOTE: All tables will use the default setting to add create/update timestamps.
      Database will use freezeTableName: true option to preserve original name and not make plural with s.
      Database will use operatorsAliases: false option to improve security.

*** Need to add validation and any additional constraints ***

EXAMPLE:

## user 
  1 | test | test (Seed file will be created to insert this dummy test user.) 

## category
  1 | Vacation
  2 | Work
  3 | School
  4 | Bathroom
  5 | Easy
  6 | Hard

## status
  1 | Not Started
  2 | In Progress
  3 | Completed
  4 | Deleted

## library
  1 | Stephen King | The Stand | horror | https://books.google.com/books?isbn=038552885X

## reading_list
  1 | 1 | 1 | 1 | 2

  For: test, The Stand, Vacation, In Progress

