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
		{ name: "Ratings", description: "Rating routes" }
	],
	"paths": {

		//CARD PATHS
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
					"200": {
						"description": "Card created successfully"
					},
					"500": {
						"description": "Could create new card"
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
						"description": "Could not get total ammount of cards"
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
						"description": "Error not delete card"
					}
				}
			},
		},

		//USER PATHS
		"/users": {
			"get": {
				tags: ["Users"],
				"summary": "All users",
				"description": "Replies with all users",
				"operationId": "allUsers",
				"responses": {
					"200": {
						"description": "successful operation"
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
					"200": {
						"description": "successful operation"
					}
				}
			}
		},
		"/users/{id}": {
			"get": {
				tags: ["Users"],
				"summary": "single user",
				"description": "responds with single user info",
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
						"description": "successful operation"
					}
				}
			},
			"patch": {
				tags: ["Users"],
				"summary": "update user",
				"description": "updates a specified user",
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
						"description": "successful operation"
					}
				}
			},
			"delete": {
				tags: ["Users"],
				"summary": "delete user",
				"description": "deletes the specified user",
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
						"description": "successful operation"
					}
				}
			}
		},
		"/users/name/{id}": {
			"get": {
				tags: ["Users"],
				"summary": "single user name",
				"description": "replies with the users name. Used on the schemes page to get (only relevant) about a schemes creator",
				"operationId": "singleUserName",
				"parameters": [{
					"name": "id",
					"in": "path",
					"schema": {
						"type": "string",
						"example": "663cb0082c8dd8a812738f08"
					}
				}],
				"responses": {
					"200": {
						"description": "successful operation"
					}
				}
			}
		},
		"/users/login": {
			"post": {
				tags: ["Users"],
				"summary": "Log In",
				"description": "Log In",
				"operationId": "logIn",
				"requestBody": {
					"content": {
						"application/json": {
							"schema": {
								"type": "object",
								"properties": {
									"email": {
										"type": "string",
										"example": "basicuser@example.com"
									},
									"password": {
										"type": "string",
										"example": "User1234"
									}
								}
							},
							"examples": {
								"Log In": {
									"value": {
										"email": "basicuser@example.com",
										"password": "User1234"
									}
								}
							}
						}
					}
				},
				"responses": {
					"200": {
						"description": "successful operation"
					}
				}
			}
		},
		"/users/logout": {
			"get": {
				tags: ["Users"],
				"summary": "log out",
				"description": "logs user out",
				"operationId": "logOut",
				"responses": {
					"200": {
						"description": "successful operation"
					}
				}
			}
		},
		"/users/status": {
			"get": {
				tags: ["Users"],
				"summary": "status",
				"description": "Replies with user authentication and role if authenticated.",
				"operationId": "status",
				"responses": {
					"200": {
						"description": "successful operation"
					}
				}
			}
		},
		"/users/total": {
			"get": {
				tags: ["Users"],
				"summary": "Total teachers",
				"description": "Gets the total ammount of teachers and replies with a number",
				"operationId": "totalTeachers",
				"responses": {
					"200": {
						"description": "successful operation"
					}
				}
			}
		},
		"/users/token": {
			"get": {
				tags: ["Users"],
				"summary": "Refresh",
				"description": "Checks if the users auth-token is expired and if their refresh token is valid, assigns a new auth-token",
				"operationId": "refresh",
				"responses": {
					"200": {
						"description": "successful operation"
					}
				}
			}
		},
		"/users/account": {
			"get": {
				tags: ["Users"],
				"summary": "Own ID",
				"description": "Gets the users own ID. this is used when editing the users account",
				"operationId": "ownId",
				"responses": {
					"200": {
						"description": "successful operation"
					}
				}
			}
		},

		//SCHEME PATHS
		"/assscheme": {
			"get": {
				tags: ["Schemes"],
				"summary": "All schemes",
				"description": "All schemes",
				"operationId": "allSchemes",
				"responses": {
					"200": {
						"description": "successful operation"
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
					"200": {
						"description": "successful operation"
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
						"description": "successful operation"
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
						"description": "successful operation"
					}
				}
			}
		},

		//RATING PATHS
		"/ratings": {
			"get": {
				tags: ["Ratings"],
				"summary": "All cards",
				"description": "All cards",
				"operationId": "allCards",
				"responses": {
					"200": {
						"description": "successful operation"
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
					"200": {
						"description": "successful operation"
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
						"description": "successful operation"
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
						"description": "successful operation"
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
					}
				}
			}
		}
	}
}
module.exports = swaggerDocumentation