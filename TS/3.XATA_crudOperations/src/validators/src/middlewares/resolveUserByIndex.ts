import { NextFunction, Response, Request } from "express";
import { request } from "http";

type UserData = {
  readonly xata_id: string;
  readonly name: string;
  readonly age: number;
  readonly grade: string;
};

// extend Request Object to include userFoundIndex
interface CustomRequest extends Request {
  userFoundIndex?: number;
  parsedId?:string;
}

const resolveUserByIndex = (userData: Array<UserData>) => {
    //pass your parameter needed to your midddleware
    //return a callback function of your with your functionality
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const {
      params: { id },
    } = req;
    const parsedID =id;

    const {body} = req

    const findIndex = userData.findIndex(
      (userObj) => userObj.xata_id === parsedID
    );

    if (findIndex === -1) {
      res.status(404).json({
        message: "User unavailable",
      });
    } else {
      //bind the foundIndex into the request
      req.userFoundIndex = findIndex;
      req.parsedId = id
      req.body = body
      next(); // passes the function to the next middleware
    }
  };
};

export { resolveUserByIndex, CustomRequest, UserData };
