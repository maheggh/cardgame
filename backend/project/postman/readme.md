Your query collection should be stored in this folder. Feel free to edit this file should you need to add any comment.

Get all cards
{{host}}/cards

Get all missions
{{host}}/cards?type=Missions

Get all assessment cards
{{host}}/cards?type=Assessment cards

Get single card

{{host}}/cards/15



Post card example:
{{host}}/cards/

{

  "card-id":"15",

  "card-type":"Mission",

  "card-name":"hehe",

  "card-category":"Category of the mission",

  "card-description":"Description of the mission",

  "card-details":"Details about the mission"

}


update card example:
{{host}}/cards/15

{

  "card-id":"15",

  "card-type":"Mission",

  "card-name":"Updated Mission Name",

  "card-description":"Updated description",

  "card-details":"Updated details",

  "card-category":"Updated category"

}

Delete card example:

{{host}}/cards/11

Sources used:

Learn Postman in 15 Minutes

https://www.youtube.com/watch?v=ypKHnRmPOUk&t=33s



How to build node js crud app with mongoose and mongodb:
https://medium.com/@skhans/how-to-build-a-basic-node-js-crud-app-with-mongoose-and-mongodb-3e958a36001d


APIs for Beginners 2023 - How to use an API (Full Course / Tutorial)

https://www.youtube.com/watch?v=WXsD0ZgxjRw
