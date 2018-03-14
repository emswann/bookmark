# Bookmark Database Tables

## user
  * id       - auto increment
  * username - varchar, not null
  * password - varchar, not null
  * login_attempts?

## ref_category
  * id   - auto increment
  * name - varchar, not null
  
  Seeded values - vacation, work, school, bathroom, easy, hard

## ref_status
  * id   - auto increment
  * name - varchar, not null
  
  Seeded values - not started, in progress, completed, deleted

## library
  * id     - auto increment
  * title  - varchar, not null
  * author - varchar, not null
  * genre  - varchar, allow nulls (need to verify what is on API)
  * url    - varchar, allow nulls (need to verify what is on API)

## reading_list
  * id         - auto increment
  * user_id    - int, foreign key to user(id)
  * library_id - int, foreign key to library(id)
  * category   - int, foreign key to ref_category(id)
  * status     - int, foreign key to ref_status(id)


NOTE: All tables will use the default setting to add create/update timestamps.
      All tables will use freezeTableName: true option to preserve original name and not make plural with s.

*** Need to add validation and any additional constraints ***

EXAMPLE:

## user 
  1 | johnsmith | 123456 

## ref_category
  1 | vacation
  2 | work
  3 | school
  4 | bathroom
  5 | easy
  6 | hard

## ref_status
  1 | not started
  2 | in progress
  3 | completed
  4 | deleted

## library
  1 | Stephen King | The Stand | horror | https://books.google.com/books?isbn=038552885X

## reading_list
  1 | 1 | 1 | 1 | 2

  For: johnsmith, The Stand, vacation, in progress

