The Curl Commands for Postman

Get all cards:

curl --location 'http://localhost:3000/cards'
--data ''

Get all missions:
curl --location 'http://localhost:3000/cards?type=Missions'

Get all assessment cards
curl --location 'http://localhost:3000/cards?type=Assessment%20cards'

Get a single card

curl --location 'http://localhost:3000/cards/15'

Post data (with example)
curl --location 'http://localhost:3000/cards/'
--header 'Content-Type: application/json'
--data '{
  "card-id": "15",
  "card-type": "Mission",
  "card-name": "hehe",
  "card-category": "Category of the mission",
  "card-description": "Description of the mission",
  "card-details": "Details about the mission"
}'

update data:
curl --location --request PUT 'http://localhost:3000/cards/15'
--header 'Content-Type: application/json'
--data '{
  "card-id": "15",
  "card-type": "Mission",
  "card-name": "Updated Mission Name",
  "card-description": "Updated description",
  "card-details": "Updated details",
  "card-category": "Updated category"
}'

Delete data:
curl --location --request DELETE 'http://localhost:3000/cards/11'
--data ''
