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
				tags:["Cards"],
				"summary": "All cards",
				"description": "All cards",
				"operationId": "allCards",
				"responses": {
					"200": {
						"description": ""
					}
				}
			},
			"post": {
				tags:["Cards"],
				"summary": "create new card",
				"description": "create new card",
				"operationId": "createNewCard",
				"parameters": [{
					"name": "auth-token",
					"in": "header",
					"schema": {
						"type": "string",
						"example": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE2NjkxZmJjYmU0YWY0YjFkNjI4MjMiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTI3NjgxNTIsImV4cCI6MTcxMjc2OTA1Mn0.80Ik-G4RSzi4De_YWfnDImpy6mFVcQo2B1tebsPWxLI"
					}
				}],
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
						"description": ""
					}
				}
			}
		},
		"/cards/total": {
			"get": {
				tags:["Cards"],
				"summary": "Total cards",
				"description": "Total cards",
				"operationId": "totalCards",
				"responses": {
					"200": {
						"description": ""
					}
				}
			}
		},
		"/cards/types": {
			"get": {
				tags:["Cards"],
				"summary": "Total card types",
				"description": "Total card types",
				"operationId": "totalCardTypes",
				"responses": {
					"200": {
						"description": ""
					}
				}
			}
		},
		"/cards/{id}": {
			"get": {
				tags:["Cards"],
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
						"description": ""
					}
				}
			},
			"patch": {
				tags:["Cards"],
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
						"description": ""
					}
				}
			},
			"delete": {
				tags:["Cards"],
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
						"description": ""
					}
				}
			},
		},

		//USER PATHS
        "/users": {
            "get": {
				tags:["Users"],
                "summary": "All users",
                "description": "Replies with all users",
                "operationId": "allUsers",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            },
            "post": {
				tags:["Users"],
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
                        "description": ""
                    }
                }
            }
        },
        "/users/{id}": {
            "get": {
				tags:["Users"],
                "summary": "single user",
                "description": "responds with single user info",
                "operationId": "singleUser",
				"parameters": [{
					"name": "id",
					"in": "path",
					"schema": {
						"type": "string",
						"example": "6616691fbcbe4af4b1d62823"
					}
				}],
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            },
            "patch": {
				tags:["Users"],
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
                        "description": ""
                    }
                }
            },
            "delete": {
				tags:["Users"],
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
                        "description": ""
                    }
                }
            }
        },
        "/users/name/{id}": {
            "get": {
				tags:["Users"],
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
                        "description": ""
                    }
                }
            }
        },
        "/users/login": {
            "post": {
				tags:["Users"],
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
                        "description": ""
                    }
                }
            }
        },
        "/users/logout": {
            "get": {
				tags:["Users"],
                "summary": "log out",
                "description": "logs user out",
                "operationId": "logOut",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/users/status": {
            "get": {
				tags:["Users"],
                "summary": "status",
                "description": "Replies with user authentication and role if authenticated.",
                "operationId": "status",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/users/total": {
            "get": {
				tags:["Users"],
                "summary": "Total teachers",
                "description": "Gets the total ammount of teachers and replies with a number",
                "operationId": "totalTeachers",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/users/token": {
            "get": {
				tags:["Users"],
                "summary": "Refresh",
                "description": "Checks if the users auth-token is expired and if their refresh token is valid, assigns a new auth-token",
                "operationId": "refresh",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        },
        "/users/account": {
            "get": {
				tags:["Users"],
                "summary": "Own ID",
                "description": "Gets the users own ID. this is used when editing the users account",
                "operationId": "ownId",
                "responses": {
                    "200": {
                        "description": ""
                    }
                }
            }
        }
	}
}
module.exports = swaggerDocumentation