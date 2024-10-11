//express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
//npm install --save express-validator
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