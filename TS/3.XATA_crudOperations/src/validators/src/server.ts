import express, { Express, Request, Response, NextFunction } from "express";
import { body, matchedData, query, validationResult } from "express-validator";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import {
  CustomRequest,
  resolveUserByIndex,
  UserData,
} from "./middlewares/resolveUserByIndex";
import { userDataArray } from "./db/userData";
import {
  CustomError,
  errorHandler,
} from "./middlewares/errors/customErrorHandler";

dotenv.config();

// Inference
const app: Express = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

//midllewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded\

//user data
const userData: Array<UserData> = userDataArray;

//custom middleware
app.use((req, res, next) => {
  console.log(`This is a middleware example`);
  next();
});

// Get the current directory
const _dirname = path.resolve();

// Synchronously read the file
const eventData = readFileSync(
  path.join(_dirname, "src", "db", "eventsData.json"),
  "utf-8"
);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Handles data from event data
app.get("/api/events", (req: Request, res: Response) => {
  res.send(eventData);
});

//lets add a validator to our request to ensure thast name is noit empty
//http://localhost:3000/hello return Hello  undefined
//we will add validators to ensure person is not empty
//http://localhost:3000/hello?person=alamin
// validationResult() - Extracts the validation errors from a request and makes them available in a Result object.
app.get(
  "/hello",
  query("person", "This Query param is required").notEmpty(),
  (req: Request, res: Response) => {
    const error = validationResult(req);
    //isEmpty - @returns — true if there are no errors, false otherwise
    if (!error.isEmpty()) {
      //error.array() - Gets the validation errors as an array.
      res.status(400).json({ error: error.array() });
    } else {
      res.send(`Hello  ${req.query.person}`);
    }
  }
);

/**
 * 
 * {
    "error": [
        {
            "type": "field",
            "msg": "This Query param is required",
            "path": "person",
            "location": "query"
        }
    ]
}
 */

//matchedData()
//Extracts data validated and/or sanitized by express-validator from the request, and returns an object with them.
//escape - sanitizes input and avoid XSS
//without escape one can senbd html to the server http://localhost:3000/hello?person=<b>John</b>
//this should be avoid

//mathcedData - To help with this, you can use matchedData(), which automatically collects all data that express-validator has validated and/or sanitized as an object

app.get(
  "/helloSanitized",
  query("person", "This Query param is required").notEmpty().escape(),
  (req: Request, res: Response) => {
    const error = validationResult(req);
    //isEmpty - @returns — true if there are no errors, false otherwise
    if (!error.isEmpty()) {
      //error.array() - Gets the validation errors as an array.
      res.status(400).json({ error: error.array() });
    } else {
      //let collect the data of sanitized inputs error
      //we are trying to avoid repetiton of req.query.name1, req.query.name2., req.query.name.
      const data = matchedData(req);
      //      res.send(`Hello  ${req.query.person}`);
      console.log(data); // { person: 'Abel' }
      res.send(`Hello  ${data.person}`);
    }
  }
);

//validating query params
//http://localhost:3000/helloSanitized?filter=userName&value=al
app.get(
  "/api/v1/users",
  //use an array if you want to validate multiple values
  [
    //isString - Adds a validator to check if a value is a string.
    //withMessage - Sets the error message for the previous validator.
    query("filter")
      .isString()
      .withMessage("field must be a string"),
    query("value")
      .isString()
      .withMessage("field must be a string")
  ],
  (req: Request, res: Response) => {
    //const {query : {filter, value}} = req
    //validationResult - Extract the errors from the request
    const errors = validationResult(req);
    //we will extract errors if validation fails
    //isEmpty - @returns — true if there are no errors, false otherwise
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      // const data = matchedData(req)
      // if(data.filter && data.value)
      //or destructure
      const { filter, value } = matchedData(req) as {filter: keyof UserData, value: string};

      if (filter && value) {
        // check value is a string before .include
        const filteredUsers = userData.filter((user) => {
          const fieldValue = user[filter]

          if(typeof fieldValue === 'string') {
            return fieldValue.includes(value)
          } else {
            return false
          }
        })
        // res.send(userData.filter((user) => user[filter].includes(value)));
        res.send(filteredUsers)
      } else {
        res.send(userData);
      }
    }
  }
);

//http://localhost:3000/api/v1/users?filter=userName&value=al
/**
 * [
    {
        "userID": 1,
        "userName": "alamin",
        "displayName": "alamin254"
    }
]
 */

//re-writing it with middleware
app.get(
  "/api/v1/users/:id",
  resolveUserByIndex(userData),
  (req: CustomRequest, res: Response) => {
    if (req.userFoundIndex !== undefined) {
      const user = userData[req.userFoundIndex];
      res.status(201).json({
        message: "success",
        data: user,
      });
    } else {
      res.status(200).json({
        message: "User not found",
      });
    }
  }
);

//POST Request
app.post(
  "/api/v1/users",
  [
    body("userName")
      .notEmpty()
      .withMessage("username cannot be empty")
      .isLength({ min: 5, max: 12 })
      .withMessage("username must be between 5 and 12 characters")
      .isString()
      .withMessage("username must be string")
      .trim(), //trims white spaces
    body("displayName").notEmpty().withMessage("dispaly name cannot be empty"),
  ],

  (req: Request, res: Response) => {
    //lets destrure the income body req
    //const body = req.body
    //const userName = req.body.userName
    const { body } = req;

    const errors = validationResult(req)
    //we will extract errors if validation fails
    //isEmpty - @returns — true if there are no errors, false otherwise
    if(!errors.isEmpty()) {
         res.status(400).json({errors: errors.array()})
    }

    //if the userData is empty, the id will be 1 else we will add 1  to ther length
    const newID =
      userData.length > 0 ? userData[userData.length - 1].userID + 1 : 1;

    //push the object data to userData
    // const newData = { userID: newID, ...body };
    const newData:UserData = matchedData(req)
    const newUser = { newID, ...newData}
    userData.push(newUser);

    res.status(201).json({
      message: "Successfull post",
      payload: newData,
    });
  }
);


/**
 * 
 * Typescript usage
The matchedData function signature accepts passing a Generic Type as the return type.

The default type is Record<string, any>.
 */
app.post(
  '/contact-us',
  [body('email').isEmail(), body('message').notEmpty(), body('phone').optional()],
  (req:Request, res:Response) => {
    const resultData = validationResult(req);
    if (!resultData.isEmpty()) {
      // handle validation errors
       res.send('Please fix the request');
    }
    const result = matchedData<{
      email: string;
      message: string;
      phone?: string;
    }>(req);
  },
);

app.put(
  "/api/v1/users/:id",
  resolveUserByIndex(userData),
  (req: CustomRequest, res: Response) => {
    if (req.userFoundIndex !== undefined) {
      userData[req.userFoundIndex] = { userID: req.parsedId, ...req.body };
      res.status(202).json({
        message: "Data Successfully Updated",
      });
    } else {
      res.status(200).json({
        message: "User not found",
      });
    }
  }
);

//PATCH - only the fields need to be changed wuill be in the request body
app.patch(
  "/api/v1/users/:id",
  resolveUserByIndex(userData),
  (req: CustomRequest, res: Response) => {
    if (req.userFoundIndex !== undefined) {
      userData[req.userFoundIndex] = {
        ...userData[req.userFoundIndex],
        ...req.body,
      };
      res.send(200);
    } else {
      res.status(200).json({
        message: "User not found",
      });
    }
  }
);

//delete
//PATCH - only the fields need to be changed wuill be in the request body
app.delete(
  "/api/v1/users/:id",
  resolveUserByIndex(userData),
  (req: CustomRequest, res: Response) => {
    //use splice to delete from the array
    if (req.userFoundIndex !== undefined) {
      userData.splice(req.userFoundIndex, 1);
      //return the status back to client
      res.status(200).json({
        message: "Data deleted successfully",
      });
    } else {
      res.status(200).json({
        message: "User not found",
      });
    }
  }
);

//catch all not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error("Not Found");
  error.status = 404;
  //next() //to enable the error to be passed
  //make sure the error is passed inside next
  next(error);
});

//use custom middleware error
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(
    `[server]: Server TypeScript is running at http://localhost:${port} 😂😂😂😂`
  );
});
