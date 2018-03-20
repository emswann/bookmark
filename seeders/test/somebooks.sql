USE books_db;

INSERT INTO library (title, author, genre, url) VALUES
	("Weaveworld", "Clive Barker", "Fantasy/Horror", "https://www.whocares.com"),
  ("The Necronomicon", "Abdul Alhazred", "Self-Help", "https://www.hell.org"),
  ("The Holy Bible", "Man", "Fiction", "https://www.eternalsalvationoryourmoneyback.com"),
  ("Gaia: A New Look At Life On Earth", "J.E. Lovelock", "Earth Science", "https://www.alivingworld.org"),
  ("The New York City Cab Driver's Joke Book", "Jim Pietsch", "Humor", "https://www.hahaha.com"),
  ("World War Z", "Max Brooks", "Fiction", "https://www.betterthanthemovie.com"),
  ("A Brief History of Time", "Stephen Hawking", "Science", "https://www.gangsta.com"),
  ("The Long, Dark Tea Time of the Soul", "Douglas Adams", "Humor/Fiction", "https://www.holisticdriving.com")
;

INSERT INTO reading_list (UserId, LibraryId, CategoryId, StatusId) VALUES
	("1", "1", "1", "1"),
  ("1", "2", "2", "3"),
  ("1", "3", "4", "4"),
  ("1", "4", "2", "1"),
  ("1", "5", "3", "2"),
  ("1", "6", "4", "3"),
  ("1", "7", "1", "2"),
  ("1", "8", "1", "1")
;
  