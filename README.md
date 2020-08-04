# json-receiver
Save and consult a json in database

# API GUIDE for Json Receiver

# Index

[Intro to API documentation](#intro-to-api-documentation)

[Requests](#requests)

[Response Status](#response-status)

[Authentication](#authentication)

  [How to get token](#how-to-get-token)

[JSON Methods](#json-methods)

[POST JSON](#post-json)

[GET JSON](#get-json)

# Intro to API documentation

The purpose of this API is to receive JSON that contains any information. The JSON to receive must be in valid JSON format whatever the structure is.

# Requests

The API is based on REST principles. Data resources are accessed via standard HTTP requests to an API endpoint. Web API uses appropriate HTTP verbs for each action:

| **METHOD** | **ACTION** |
| --- | --- |
| _GET_ | Retrieves resources |
| _POST_ | Creates resources |
| _PUT_ | Changes and/or replaces resources or collections |
| _DELETE_ | Deletes resources |

In this case for JSON data purposes, methods PUT and DELETE are not available.

For POST methods you need to add the request header:

**Content-Type: application/json**

The API will receive the data in JSON type to handle it.

# Response Status

Web API will response a JSON with a message that could be:

- Unauthorized

{ &quot;message&quot;: &quot;Unauthorized&quot; }

- Action confirmed

{ &quot;message&quot;: &quot;JSON created&quot; }

- Regular Error Object

{ &quot;error&quot;: {…} }

Also web API uses the following response status codes, as defined in the RFC 2616 and RFC 6585:

| _STATUS CODE_ | _DESCRIPTION_ |
| --- | --- |
| _200_ | OK - The request has succeeded. The client can read the result of the request in the body and the headers of the response. |
| _201_ | Created - The request has been fulfilled and resulted in a new resource being created. |
| _304_ | Not Modified. |
| _400_ | Bad Request - The request could not be understood by the server due to malformed syntax. The message body will contain more information. |
| _401_ | Unauthorized - The request requires user authentication or, if the request included authorization credentials, authorization has been refused for those credentials. |
| _403_ | Forbidden - The server understood the request, but is refusing to fulfill it. |
| _404_ | Not Found - The requested resource could not be found. This error can be due to a temporary or permanent condition. |
| _500_ | Internal Server Error. |
| _502_ | Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server. |
| _503_ | Service Unavailable - The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again. |

# Authentication

All requests to Web API require authentication. This is achieved by sending a valid authorization access token in the request header.

In addition to the json type header, you need to add the Authorization header with the value of the token that is generated when you log in to the API with your user and password:

| _KEY_ | _VALUE_ |
| --- | --- |
| **Content-Type** (only needed for POST and PUT methods) | application/json |
| **Authorization** | your\_token |

## How to get token

To get the token you need to log in the API in the following path:

| _URL_ | http:// **ASSIGNED\_IP** /api/login |
| --- | --- |
| _Method_ | POST |
| _Headers_ | Content-Type: application/json |
| _Body_ | {&quot;user&quot;: &quot; **your\_user**&quot;,&quot;password&quot;: &quot; **your\_password**&quot;} |
| _Responses_ | **200** :{&quot;token&quot;: &quot;eyJhbGciOiJIU5cC1pbiI6MSwiaW…&quot;}  OR{&quot;message&quot;: &quot;User not found&quot;}  **400** :{&quot;message&quot;: &quot;Incorrect data received&quot;}  **401** :{&quot;message&quot;: &quot;Incorrect password&quot;} |

Once you get the token, this is the one you should use for POST and GET JSON methods from the API. **This token is only valid for 8 hours** , when the time ends you must log in again and get a new token to access the methods again.

# JSON Methods

To POST and GET JSONs you need to use the following paths.

## POST JSON

| _URL_ | http:// **ASSIGNED\_IP** /api/json |
| --- | --- |
| _Method_ | POST |
| _Headers_ | Content-Type: application/jsonAuthorization: **your\_token** |
| _Body_ | {&quot;json\_data&quot;: **a\_valid\_json\_structure** }Example: {&quot;json\_data&quot;: {&quot;key&quot;: 123, &quot;user&quot;: &quot;test&quot;}} |
| _Responses_ | **201** :{&quot;message&quot;: &quot;JSON created&quot;}  **400** :{&quot;message&quot;: &quot;Incorrect data received&quot;}  **401** :{&quot;message&quot;: &quot;Unauthorized&quot;} |

## GET JSON

The GET method returns all the JSONs created.

| _URL_ | http:// **ASSIGNED\_IP** /api/json |
| --- | --- |
| _Method_ | GET |
| _Headers_ | Content-Type: application/jsonAuthorization: **your\_token** |
| _Body_ |   |
| _Responses_ | **200** :[Array\_of\_JSONs]   **401** :{&quot;message&quot;: &quot;Unauthorized&quot;} |
