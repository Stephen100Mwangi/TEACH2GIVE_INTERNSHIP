import { Request, Response, NextFunction } from "express";

// User data type with proper readonly properties for immutability
type UserData = {
    readonly xata_id: string;
    readonly name: string;
    readonly age: number;
    readonly grade: string;
};

// Extended request interface with proper typing
interface CustomRequest extends Request {
    userIndex?: number;
    parsedId?: string; // Changed from parseId to parsedId for clarity
}

/**
 * Middleware to resolve user by their ID from a user data array
 * @param userData Array of user data to search through
 * @returns Express middleware function
 */
const resolveUserByIndex = (userData: readonly UserData[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction): void => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ message: "User ID is required" });
                return;
            }

            // Find index of user
            const userIndex = userData.findIndex(user => user.xata_id === id);

            if (userIndex === -1) {
                res.status(404).json({ message: "User does not exist" });
                return;
            }

            // Attach data to request object
            req.userIndex = userIndex;
            req.parsedId = id;

            next();
        } catch (error) {
            // Handle unexpected errors
            console.error('Error in resolveUserByIndex middleware:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
};

export { resolveUserByIndex, CustomRequest, UserData };