Your query collection should be stored in this folder. Feel free to edit this file should you need to add any comment.

# Http requests:

/users POST:{
  "name": "Test",
  "surname": "User",
  "email": "test.user@example.com",
  "department": "Computer Science",
  "university": "Example University",
  "position": "Student"
}

/users GET

/users/:id GET

/users/:id DELETE

/missions GET (returns 3 random cards)

/assessment GET (returns 6 random cards, one of each category)

# terminal query to insert cards into db from json:

mongoimport --uri 'mongodb+srv://vegardstamadsen:E5rr7z1KUH9BWRdI@game.hwn65gj.mongodb.net/?retryWrites=true&w=majority&appName=game' -d game -c assessment-cards --file cards-db/Assessment.json --jsonArray

mongoimport --uri 'mongodb+srv://vegardstamadsen:E5rr7z1KUH9BWRdI@game.hwn65gj.mongodb.net/?retryWrites=true&w=majority&appName=game' -d game -c mission-cards --file cards-db/Mission.json --jsonArray
