<p align="center"><img src="https://github.com/mayajs/maya/blob/main/logo.svg"></p>
<h1 align="center">MayaJS common modules</h1>

## Installation

```sh
npm i @mayajs/common
```

## Decorators

- [GET](#get)
- [POST](#post)
- [PATCH](#patch)
- [PATCH](#put)
- [DELETE](#delete)

## Validations

- [Check](#check)
  - [isNumber](#isnumber)
  - [isBoolean](#isboolean)
  - [isString](#isstring)
  - [isAddress](#isaddress)
  - [isRegExp](#isregexp)
  - [isDate](#isdate)
  - [isEmail](#isemail)
  - [isArray](#isarray)
  - [isPassword](#ispassword)
  - [includes](#includes)
  - [minLength](#minlength)
  - [maxLength](#maxlength)
  - [notEmpty](#notempty)
  - [required](#required)

# METHOD DECORATORS

This are functions that defines what function to be used in a route method inside a `controller`.

## Usage

Before using a decorator you must first import it from `@mayajs/common` module.

```ts
import { Get, Post, Put, Patch, Delete } from "@mayajs/common";
```

You can use a method decorator like calling a normal function with the exception of adding an `@` sign before the function name. The route path has a default value of `"/"`.

```ts
@Get()
function(){
    // Do some GET stuff here
}
```

You can also provides additional parameters that includes the `path` and `middlewares` for that specific route.

```ts
@Get({ path: "/", middlewares: [] })
function(){
    // Route logic
}
```

> Note: `middlewares` are **OPTIONAL**

You can also just provide a string denoting the name of the route.

```ts
@Get("/")
function(){
    // Route logic
}
```

You can also just provide an array of middleware and its path will have a default value of `"/"` as the route name.

```ts
@Get([middlewares])
function(){
    // Route logic
}
```

## GET

This is a decorator function is for creating a **GET METHOD ROUTE**. GET request is used to retreive a resource.

```ts
import { Get } from "@mayajs/common";
```

## POST

This is a decorator function is for creating a **POST METHOD ROUTE**. POST requests are used to send data to the API sever to create a resource.

```ts
import { Post } from "@mayajs/common";
```

## PUT

This is a decorator function is for creating a **PUT METHOD ROUTE**. PUT requests are used to replace a resource.

```ts
import { Put } from "@mayajs/common";
```

## PATCH

This is a decorator function is for creating a **PATCH METHOD ROUTE**. PATCH is similar to POST and PUT but used only to apply partial modifications to a resource.

```ts
import { Patch } from "@mayajs/common";
```

## DELETE

This is a decorator function is for creating a **DELETE METHOD ROUTE**. DELETE request is used to delete the resource at the specified URL.

```ts
import { Delete } from "@mayajs/common";
```

# VALIDATIONS

## Check

This is a function used for validating fields for `BODY` and `PARAMS` of a request.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("age") // Name of the fields to be checked. `defaults` to check the `body` of the request.
     .isNumber() // Checks if the field is a number
     .minLength(5) // Checks if the field has a minimum length of 5
     .maxLength(10) // Checks if the field has a maximum length of 10
     .notEmpty() // Checks if the field is not empty
     .required(), // Checks if the field is present or not undefined
] })
function(){}
```

## isNumber

This is a validation function that is used along with `Check`. This function checks if the field is a `number` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("age").isNumber(),
] })
function(){}
```

## isBoolean

This is a validation function that is used along with `Check`. This function checks if the field is a `boolean` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("islogin").isBoolean(),
] })
function(){}
```

## isString

This is a validation function that is used along with `Check`. This function checks if the field is a `string` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("password").isString(),
] })
function(){}
```

## isAddress

This is a validation function that is used along with `Check`. This function checks if the field is a `valid address` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("address").isAddress(),
] })
function(){}
```

## isRegExp

This is a validation function that is used along with `Check`. This function accepts a RegExp and checks if the field will match the regex. If the test fails it will send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("password").isRegExp(/^[A-Za-z0-9.,\s]*$/),
] })
function(){}
```

## minLength

This is a validation function that is used along with `Check`. This function accepts an argument which is a number and checks if the field length is greater than or equal to the parameter. If the field length is not greater than or equal to the parameter it will send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("password").minLength(5),
] })
function(){}
```

## maxLength

This is a validation function that is used along with `Check`. This function accepts an argument which is a number and checks if the field length is less than or equal to the parameter. If the field length is not less than or equal to the parameter it will send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("password").maxLength(10),
] })
function(){}
```

## isDate

This is a validation function that is used along with `Check`. This function checks if the field is a valid `date` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("date").isDate(),
] })
function(){}
```

## isEmail

This is a validation function that is used along with `Check`. This function checks if the field is a valid `email` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("email").isEmail(),
] })
function(){}
```

## isPassword

This is a validation function that is used along with `Check`. This function checks if the field is a valid `password` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("password").isPassword(),
] })
function(){}
```

## notEmpty

This is a validation function that is used along with `Check`. This function checks if the field is not empty and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("password").notEmpty(),
] })
function(){}
```

## required

This is a validation function that is used along with `Check`. This function checks if the field is not `undefined` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("user").required(),
] })
function(){}
```

## isArray

This is a validation function that is used along with `Check`. This function checks if the field is an `array` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("user").isArray(),
] })
function(){}
```

## includes

This is a validation function that is used along with `Check`. This function accepts an array of values and checks if the field or fields items values is included on the `array` and send a validation error response if its not.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("user").includes<string>(["cats", "dogs"]),
] })
function(){}
```
