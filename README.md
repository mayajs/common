<p align="center"><img src="https://github.com/mayajs/maya/blob/master/maya.svg"></p>
<h1 align="center">MayaJS common modules</h1>

## Installation

```sh
npm i @mayajs/common
```

## Functions

### Decorators

- [GET](#get)
- [POST](#post)
- [PATCH](#patch)
- [DELETE](#delete)

### Validations

- [Check](#check)
  - [isNumber](#isnumber)
  - [isBoolean](#isboolean)
  - [isString](#isstring)
  - [isAddress](#isaddress)
  - [isRegExp](#isregexp)
  - [isDate](#isdate)
  - [isEmail](#isemail)
  - [isPassword](#ispassword)
  - [minLength](#minlength)
  - [maxLength](#maxlength)
  - [notEmpty](#notempty)
  - [required](#required)

# Decorators

## GET

This is a decorator function is for creating a GET METHOD ROUTE. GET request is used to retreive data from a server at the specified resource.

### Import

```javascript
import { Get } from "@mayajs/common";
```

### Usage

```javascript
@Get({ path: "/", middlewares: [] })
function(){
    // Do some GET stuff here
}
```

## POST

This is a decorator function is for creating a POST METHOD ROUTE. POST requests are used to send data to the API sever to create or udpate a resource. The data sent to the server is stored in the request body of the HTTP request.

### Import

```javascript
import { Post } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [] })
function(){
    // Do some POST stuff here
}
```

## PATCH

This is a decorator function is for creating a PATCH METHOD ROUTE. is similar to POST and PUT but used only apply partial modifications to the resource.

### Import

```javascript
import { Patch } from "@mayajs/common";
```

### Usage

```javascript
@Patch({ path: "/", middlewares: [] })
function(){
    // Do some PATCH stuff here
}
```

## DELETE

This is a decorator function is for creating a DELETE METHOD ROUTE. DELETE request is used to delete the resource at the specified URL.

### Import

```javascript
import { Delete } from "@mayajs/common";
```

### Usage

```javascript
@Delete({ path: "/", middlewares: [] })
function(){
    // Do some DELETE stuff here
}
```

# Validations

## Check

This is a function used for checking fields for BODY and PARAMS in a request.

### Import

```javascript
import { Check } from "@mayajs/common";
```

### Usage

```javascript
@Post({ path: "/", middlewares: [
     Check("users"),
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
     Check("prize").isNumber(),
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
     Check("prize").isBoolean(),
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
     Check("prize").isString(),
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
     Check("prize").isAddress(),
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
     Check("prize").isRegExp(/^[A-Za-z0-9.,\s]*$/),
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
     Check("prize").minLength(5),
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
     Check("prize").maxLength(10),
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
     Check("prize").isDate(),
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
     Check("prize").isEmail(),
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
     Check("prize").isPassword(),
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
     Check("prize").notEmpty(),
] })
function(){}
```
