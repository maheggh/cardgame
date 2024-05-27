const swaggerDocumentation = {
    "openapi": "3.0.3",
    "info": {
        "title": "Super Assessor API",
        "version": "1.0.0",
        "contact": {}
    },

    //server options
    "servers": [{
        "url": "http://localhost:3000/api"
    }],

    //TAGS (categories)
    "tags": [
        { name: "Users", description: "User routes" },
        { name: "Cards", description: "Card routes" },
        { name: "Schemes", description: "Scheme routes" },
        { name: "Ratings", description: "Rating routes" },
        { name: "Icons", description: "Icon routes" },
        { name: "Bookmarks", description: "Bookmark routes" }
    ],
    "paths": {
        // User endpoints
        "/users": {
            "get": {
                tags: ["Users"],
                "summary": "All users",
                "description": "Replies with all users",
                "operationId": "allUsers",
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "post": {
                tags: ["Users"],
                "summary": "Create user",
                "description": "Creates a new user",
                "operationId": "createUser",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "department": {
                                        "type": "string",
                                        "example": "department of design"
                                    },
                                    "email": {
                                        "type": "string",
                                        "example": "2BravoJ@example.com"
                                    },
                                    "name": {
                                        "type": "string",
                                        "example": "Johnny"
                                    },
                                    "password": {
                                        "type": "string",
                                        "example": "Admin1234"
                                    },
                                    "position": {
                                        "type": "string",
                                        "example": "Teacher"
                                    },
                                    "surname": {
                                        "type": "string",
                                        "example": "Bravo"
                                    },
                                    "university": {
                                        "type": "string",
                                        "example": "NTNU"
                                    }
                                }
                            },
                            "examples": {
                                "Create user": {
                                    "value": {
                                        "department": "department of design",
                                        "email": "2BravoJ@example.com",
                                        "name": "Johnny",
                                        "password": "Admin1234",
                                        "position": "Teacher",
                                        "surname": "Bravo",
                                        "university": "NTNU"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "User created successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Email already exists"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/users/{id}": {
            "get": {
                tags: ["Users"],
                "summary": "Single user",
                "description": "Responds with single user info",
                "operationId": "singleUser",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "6616691fbcbe4af4b1d62823"
                    },
                    "description": "The user ID"
                }],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Could not find user. User not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "patch": {
                tags: ["Users"],
                "summary": "Update user",
                "description": "Updates a specified user",
                "operationId": "updateUser",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "department": {
                                        "type": "string",
                                        "example": "department of design"
                                    },
                                    "email": {
                                        "type": "string",
                                        "example": "dandev2@example.com"
                                    },
                                    "name": {
                                        "type": "string",
                                        "example": "Danny"
                                    },
                                    "position": {
                                        "type": "string",
                                        "example": "TA"
                                    },
                                    "surname": {
                                        "type": "string",
                                        "example": "Devito"
                                    },
                                    "university": {
                                        "type": "string",
                                        "example": "NMBU"
                                    }
                                }
                            },
                            "examples": {
                                "update user": {
                                    "value": {
                                        "department": "department of design",
                                        "email": "dandev2@example.com",
                                        "name": "Danny",
                                        "position": "TA",
                                        "surname": "Devito",
                                        "university": "NMBU"
                                    }
                                }
                            }
                        }
                    }
                },
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "65e9c1382acecb5e7cf30bdc"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "User updated successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Could not update user. User not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "delete": {
                tags: ["Users"],
                "summary": "Delete user",
                "description": "Deletes the specified user",
                "operationId": "deleteUser",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "65f33f3584177d58909d7c03"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "User deleted successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Could not delete user. User not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },

        // Cards endpoints
        "/cards": {
            "get": {
                tags: ["Cards"],
                "summary": "All cards",
                "description": "All cards",
                "operationId": "allCards",
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "500": {
                        "description": "Could not retrieve all cards"
                    }
                }
            },
            "post": {
                tags: ["Cards"],
                "summary": "create new card",
                "description": "create new card",
                "operationId": "createNewCard",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "card-category": {
                                        "type": "string",
                                        "example": "new category"
                                    },
                                    "card-description": {
                                        "type": "string",
                                        "example": "this is a test card"
                                    },
                                    "card-details": {
                                        "type": "string",
                                        "example": "some details"
                                    },
                                    "card-id": {
                                        "type": "number",
                                        "example": 9994
                                    },
                                    "card-name": {
                                        "type": "string",
                                        "example": "cool new card"
                                    },
                                    "card-type": {
                                        "type": "string",
                                        "example": "Assessment"
                                    }
                                }
                            },
                            "examples": {
                                "create new card": {
                                    "value": {
                                        "card-category": "new category",
                                        "card-description": "this is a test card",
                                        "card-details": "some details",
                                        "card-id": 9994,
                                        "card-name": "cool new card",
                                        "card-type": "Assessment"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Card created successfully"
                    },
                    "500": {
                        "description": "Could not create new card"
                    }
                }
            }
        },
        "/cards/total": {
            "get": {
                tags: ["Cards"],
                "summary": "Total cards",
                "description": "Total cards",
                "operationId": "totalCards",
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "500": {
                        "description": "Could not get total amount of cards"
                    }
                }
            }
        },
        "/cards/types": {
            "get": {
                tags: ["Cards"],
                "summary": "Total card types",
                "description": "Total card types",
                "operationId": "totalCardTypes",
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "500": {
                        "description": "Could not get number of card types"
                    }
                }
            }
        },
        "/cards/{id}": {
            "get": {
                tags: ["Cards"],
                "summary": "specific card",
                "description": "specific card",
                "operationId": "specificCard",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "65e9c13f2acecb5e7cf30be3"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "404": {
                        "description": "Card not found"
                    },
                    "500": {
                        "description": "Could not get card"
                    }
                }
            },
            "patch": {
                tags: ["Cards"],
                "summary": "update card",
                "description": "update card",
                "operationId": "updateCard",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "card-category": {
                                        "type": "string",
                                        "example": "new category"
                                    },
                                    "card-description": {
                                        "type": "string",
                                        "example": "this is a test card"
                                    },
                                    "card-details": {
                                        "type": "string",
                                        "example": "some details"
                                    },
                                    "card-id": {
                                        "type": "number",
                                        "example": 9994
                                    },
                                    "card-name": {
                                        "type": "string",
                                        "example": "cool new cardsssss"
                                    },
                                    "card-type": {
                                        "type": "string",
                                        "example": "Assessment"
                                    }
                                }
                            },
                            "examples": {
                                "update card": {
                                    "value": {
                                        "card-category": "new category",
                                        "card-description": "this is a test card",
                                        "card-details": "some details",
                                        "card-id": 9994,
                                        "card-name": "cool new cardsssss",
                                        "card-type": "Assessment"
                                    }
                                }
                            }
                        }
                    }
                },
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "65e9c13f2acecb5e7cf30be3"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Card updated successfully"
                    },
                    "404": {
                        "description": "Card not found"
                    },
                    "500": {
                        "description": "Could not update card"
                    }

                }
            },
            "delete": {
                tags: ["Cards"],
                "summary": "delete card",
                "description": "delete card",
                "operationId": "deleteCard",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "663cd28d0fcab6676bbb4e01"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Card deleted successfully"
                    },
                    "404": {
                        "description": "Card not found"
                    },
                    "500": {
                        "description": "Error could not delete card"
                    }
                }
            },
        },

        // Cards Bulk Insert
        "/cards/bulk": {
            "post": {
                tags: ["Cards"],
                "summary": "Bulk insert cards",
                "description": "Uploads multiple cards in bulk",
                "operationId": "bulkInsertCards",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "cards": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/Card"
                                        }
                                    }
                                }
                            },
                            "examples": {
                                "bulkInsertCards": {
                                    "value": {
                                        "cards": [
                                            {
                                                "card-id": 9994,
                                                "card-type": "Assessment",
                                                "card-name": "cool new card",
                                                "card-description": "this is a test card",
                                                "card-details": "some details",
                                                "card-category": "new category",
                                                "card-icon": "https://example.com/icon.png"
                                            },
                                            {
                                                "card-id": 9995,
                                                "card-type": "Quiz",
                                                "card-name": "another cool card",
                                                "card-description": "this is another test card",
                                                "card-details": "more details",
                                                "card-category": "test category",
                                                "card-icon": "https://example.com/icon2.png"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Cards uploaded successfully"
                    },
                    "500": {
                        "description": "Error uploading cards"
                    }
                }
            }
        },

        // Ratings endpoints
        "/ratings": {
            "get": {
                tags: ["Ratings"],
                "summary": "All ratings",
                "description": "All ratings",
                "operationId": "allRatings",
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "500": {
                        "description": "Could not retrieve all ratings"
                    }
                }
            },
            "post": {
                tags: ["Ratings"],
                "summary": "create new rating",
                "description": "create new rating",
                "operationId": "createNewRating",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "scheme": {
                                        "type": "string",
                                        "example": "663cde83259410deda3e9291"
                                    },
                                    "score": {
                                        "type": "number",
                                        "example": 1
                                    }
                                }
                            },
                            "examples": {
                                "create new rating": {
                                    "value": {
                                        "scheme": "663cde83259410deda3e9291",
                                        "score": 1
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Rating created successfully"
                    },
                    "500": {
                        "description": "Could not create new rating"
                    }
                }
            }
        },
        "/ratings/{id}": {
            "get": {
                tags: ["Ratings"],
                "summary": "specific rating",
                "description": "specific rating",
                "operationId": "specificRating",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "6644f7357775e2424ca4cf5c"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "404": {
                        "description": "Rating not found"
                    },
                    "500": {
                        "description": "Could not get rating"
                    }
                }
            },
            "patch": {
                tags: ["Ratings"],
                "summary": "update rating",
                "description": "update rating",
                "operationId": "updateRating",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "score": {
                                        "type": "number",
                                        "example": 3
                                    }
                                }
                            },
                            "examples": {
                                "update rating": {
                                    "value": {
                                        "score": 3
                                    }
                                }
                            }
                        }
                    }
                },
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "66172f1e6f6ee7c2ecf727d6"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Rating updated successfully"
                    },
                    "404": {
                        "description": "Rating not found"
                    },
                    "500": {
                        "description": "Could not update rating"
                    }
                }
            },
            "delete": {
                tags: ["Ratings"],
                "summary": "delete rating",
                "description": "delete rating",
                "operationId": "deleteRating",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "663cd28d0fcab6676bbb4e01"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Rating deleted successfully"
                    },
                    "404": {
                        "description": "Rating not found"
                    },
                    "500": {
                        "description": "Could not delete rating"
                    }
                }
            }
        },
        "/ratings/avg/{id}": {
            "get": {
                tags: ["Ratings"],
                "summary": "ratings avg",
                "description": "ratings avg",
                "operationId": "ratingsAvg",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "663cde83259410deda3e9291"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "204": {
                        "description": "No ratings found for this scheme"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },

        // Icon endpoints
        "/icons": {
            "get": {
                tags: ["Icons"],
                "summary": "All icons",
                "description": "Replies with all icons",
                "operationId": "allIcons",
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Icon"
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "post": {
                tags: ["Icons"],
                "summary": "Create icon",
                "description": "Creates a new icon",
                "operationId": "createIcon",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "iconURL": {
                                        "type": "string",
                                        "example": "https://example.com/icon.png"
                                    }
                                }
                            },
                            "examples": {
                                "Create icon": {
                                    "value": {
                                        "iconURL": "https://example.com/icon.png"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Icon created successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Icon"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/icons/{id}": {
            "get": {
                tags: ["Icons"],
                "summary": "Single icon",
                "description": "Responds with single icon info",
                "operationId": "singleIcon",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "6616691fbcbe4af4b1d62823"
                    },
                    "description": "The icon ID"
                }],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Icon"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Could not find icon. Icon not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "patch": {
                tags: ["Icons"],
                "summary": "Update icon",
                "description": "Updates a specified icon",
                "operationId": "updateIcon",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "iconURL": {
                                        "type": "string",
                                        "example": "https://example.com/icon.png"
                                    }
                                }
                            },
                            "examples": {
                                "update icon": {
                                    "value": {
                                        "iconURL": "https://example.com/icon.png"
                                    }
                                }
                            }
                        }
                    }
                },
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "65e9c1382acecb5e7cf30bdc"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Icon updated successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Icon"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Could not update icon. Icon not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "delete": {
                tags: ["Icons"],
                "summary": "Delete icon",
                "description": "Deletes the specified icon",
                "operationId": "deleteIcon",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "65f33f3584177d58909d7c03"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Icon deleted successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Icon"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Could not delete icon. Icon not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },

        // Bookmarks endpoints
        "/bookmarks": {
            "post": {
                tags: ["Bookmarks"],
                "summary": "Create bookmark",
                "description": "Creates a new bookmark",
                "operationId": "createBookmark",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "scheme": {
                                        "type": "string",
                                        "example": "663cde83259410deda3e9291"
                                    }
                                }
                            },
                            "examples": {
                                "Create bookmark": {
                                    "value": {
                                        "scheme": "663cde83259410deda3e9291"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Bookmark created successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Bookmark"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/bookmarks/{id}": {
            "get": {
                tags: ["Bookmarks"],
                "summary": "Single bookmark",
                "description": "Responds with single bookmark info",
                "operationId": "singleBookmark",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "6616691fbcbe4af4b1d62823"
                    },
                    "description": "The bookmark ID"
                }],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Bookmark"
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Could not find bookmark. Bookmark not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "delete": {
                tags: ["Bookmarks"],
                "summary": "Delete bookmark",
                "description": "Deletes the specified bookmark",
                "operationId": "deleteBookmark",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "65f33f3584177d58909d7c03"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Bookmark deleted successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Bookmark"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Could not delete bookmark. Bookmark not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/bookmarks/user/{id}": {
            "get": {
                tags: ["Bookmarks"],
                "summary": "All user bookmarks",
                "description": "Replies with all bookmarks for a user",
                "operationId": "allUserBookmarks",
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Bookmark"
                                    }
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Could not find bookmarks. Bookmarks not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/bookmarks/check/{id}": {
            "get": {
                tags: ["Bookmarks"],
                "summary": "Check if scheme is bookmarked",
                "description": "Checks if a scheme is bookmarked by the user",
                "operationId": "checkBookmark",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "663cde83259410deda3e9291"
                    },
                    "description": "The scheme ID"
                }],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "bookmarked": {
                                            "type": "boolean"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "204": {
                        "description": "Could not find bookmark. Bookmark not found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },

        // Assessment Scheme endpoints
        "/assscheme": {
            "get": {
                tags: ["Schemes"],
                "summary": "All schemes",
                "description": "All schemes",
                "operationId": "allSchemes",
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "500": {
                        "description": "Could not retrieve all schemes"
                    }
                }
            },
            "post": {
                tags: ["Schemes"],
                "summary": "Create scheme",
                "description": "Create scheme",
                "operationId": "createScheme",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "card-artefact": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30bf9"
                                    },
                                    "card-assessor": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30be8"
                                    },
                                    "card-context": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c20"
                                    },
                                    "card-format": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c13"
                                    },
                                    "card-mission-one": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c3d"
                                    },
                                    "card-mission-three": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c3e"
                                    },
                                    "card-mission-two": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c39"
                                    },
                                    "card-timing": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c31"
                                    },
                                    "card-who-is": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30be3"
                                    },
                                    "scheme-creator": {
                                        "type": "string",
                                        "example": "6616691fbcbe4af4b1d62823"
                                    },
                                    "scheme-name": {
                                        "type": "string",
                                        "example": "New Scheme 22222"
                                    }
                                }
                            },
                            "examples": {
                                "Create scheme": {
                                    "value": {
                                        "card-artefact": "65e9c13f2acecb5e7cf30bf9",
                                        "card-assessor": "65e9c13f2acecb5e7cf30be8",
                                        "card-context": "65e9c13f2acecb5e7cf30c20",
                                        "card-format": "65e9c13f2acecb5e7cf30c13",
                                        "card-mission-one": "65e9c13f2acecb5e7cf30c3d",
                                        "card-mission-three": "65e9c13f2acecb5e7cf30c3e",
                                        "card-mission-two": "65e9c13f2acecb5e7cf30c39",
                                        "card-timing": "65e9c13f2acecb5e7cf30c31",
                                        "card-who-is": "65e9c13f2acecb5e7cf30be3",
                                        "scheme-creator": "6616691fbcbe4af4b1d62823",
                                        "scheme-name": "New Scheme 22222"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Scheme created successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Scheme"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/assscheme/{id}": {
            "get": {
                tags: ["Schemes"],
                "summary": "Single scheme",
                "description": "Single scheme",
                "operationId": "singleScheme",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "664f9ca9a23f3905a8f625e8"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "successful operation"
                    },
                    "404": {
                        "description": "Scheme not found"
                    },
                    "500": {
                        "description": "Could not get scheme"
                    }
                }
            },
            "patch": {
                tags: ["Schemes"],
                "summary": "Update scheme",
                "description": "Update scheme",
                "operationId": "updateScheme",
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "card-artefact": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30bf9"
                                    },
                                    "card-assessor": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30be8"
                                    },
                                    "card-context": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c20"
                                    },
                                    "card-format": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c13"
                                    },
                                    "card-mission-one": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c3d"
                                    },
                                    "card-mission-three": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c3e"
                                    },
                                    "card-mission-two": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c39"
                                    },
                                    "card-timing": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30c31"
                                    },
                                    "card-who-is": {
                                        "type": "string",
                                        "example": "65e9c13f2acecb5e7cf30be3"
                                    },
                                    "scheme-name": {
                                        "type": "string",
                                        "example": "New Scheme 2"
                                    }
                                }
                            },
                            "examples": {
                                "Update scheme": {
                                    "value": {
                                        "card-artefact": "65e9c13f2acecb5e7cf30bf9",
                                        "card-assessor": "65e9c13f2acecb5e7cf30be8",
                                        "card-context": "65e9c13f2acecb5e7cf30c20",
                                        "card-format": "65e9c13f2acecb5e7cf30c13",
                                        "card-mission-one": "65e9c13f2acecb5e7cf30c3d",
                                        "card-mission-three": "65e9c13f2acecb5e7cf30c3e",
                                        "card-mission-two": "65e9c13f2acecb5e7cf30c39",
                                        "card-timing": "65e9c13f2acecb5e7cf30c31",
                                        "card-who-is": "65e9c13f2acecb5e7cf30be3",
                                        "scheme-name": "New Scheme 2"
                                    }
                                }
                            }
                        }
                    }
                },
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "663cdb755fb1dc9c55674b98"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Scheme updated successfully",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Scheme"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Scheme not found"
                    },
                    "500": {
                        "description": "Could not update scheme"
                    }
                }
            },
            "delete": {
                tags: ["Schemes"],
                "summary": "Delete scheme",
                "description": "Delete scheme",
                "operationId": "deleteScheme",
                "parameters": [{
                    "name": "id",
                    "in": "path",
                    "schema": {
                        "type": "string",
                        "example": "65e9c13f2acecb5e7cf30be3"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "Scheme deleted successfully"
                    },
                    "404": {
                        "description": "Scheme not found"
                    },
                    "500": {
                        "description": "Could not delete scheme"
                    }
                }
            }
        },

        // Add other endpoints here...
    },
    "components": {
        "schemas": {
            "User": {
                "type": "object",
                "properties": {
                    "department": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "password": {
                        "type": "string"
                    },
                    "position": {
                        "type": "string"
                    },
                    "surname": {
                        "type": "string"
                    },
                    "university": {
                        "type": "string"
                    }
                }
            },
            "Card": {
                "type": "object",
                "properties": {
                    "card-id": {
                        "type": "number"
                    },
                    "card-type": {
                        "type": "string"
                    },
                    "card-name": {
                        "type": "string"
                    },
                    "card-description": {
                        "type": "string"
                    },
                    "card-details": {
                        "type": "string"
                    },
                    "card-category": {
                        "type": "string"
                    },
                    "card-icon": {
                        "type": "string"
                    }
                }
            },
            "Rating": {
                "type": "object",
                "properties": {
                    "scheme": {
                        "type": "string"
                    },
                    "score": {
                        "type": "number"
                    }
                }
            },
            "Icon": {
                "type": "object",
                "properties": {
                    "iconURL": {
                        "type": "string"
                    }
                }
            },
            "Bookmark": {
                "type": "object",
                "properties": {
                    "scheme": {
                        "type": "string"
                    }
                }
            },
            "Scheme": {
                "type": "object",
                "properties": {
                    "scheme-name": {
                        "type": "string"
                    },
                    "card-who-is": {
                        "type": "string"
                    },
                    "card-assessor": {
                        "type": "string"
                    },
                    "card-artefact": {
                        "type": "string"
                    },
                    "card-format": {
                        "type": "string"
                    },
                    "card-context": {
                        "type": "string"
                    },
                    "card-timing": {
                        "type": "string"
                    },
                    "card-mission-one": {
                        "type": "string"
                    },
                    "card-mission-two": {
                        "type": "string"
                    },
                    "card-mission-three": {
                        "type": "string"
                    },
                    "creator": {
                        "type": "string"
                    }
                }
            }
        }
    }
};

module.exports = swaggerDocumentation;
