import { Request, Response, NextFunction } from 'express';

// Types for request validation
interface ValidationError {
  field: string;
  message: string;
}

// Helper functions for validation
const isValidString = (value: any): boolean => 
  typeof value === 'string' && value.trim().length > 0;

const isValidNumber = (value: any): boolean => 
  !isNaN(Number(value)) && Number.isInteger(Number(value));

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidDate = (date: string): boolean => {
  const timestamp = Date.parse(date);
  return !isNaN(timestamp);
};

const isValidPassword = (password: string): boolean =>{
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[\w!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
}

const isValidUsername = (name:string): boolean =>
    typeof name === 'string' && name.trim.length > 0 && name.trim.length < 20

// Middleware for validating create student request
export const validateCreateStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: ValidationError[] = [];
  const { name, age, grade, password, dateOfBirth, isActive, email } = req.body;

  // Validate required fields
  if (!isValidString(name)) {
    errors.push({ field: 'name', message: 'Name is required and must be a string' });
  }

  if (!isValidEmail(email)) {
    errors.push({field:'email',message:'Invalid email - Must be in the form someone@gmail.com'})
  }

  if (!isValidNumber(age)) {
    errors.push({ field: 'age', message: 'Age is required and must be a number' });
  } else if (Number(age) < 1 || Number(age) > 150) {
    errors.push({ field: 'age', message: 'Age must be between 1 and 150' });
  }

  if (!isValidString(grade)) {
    errors.push({ field: 'grade', message: 'Grade is required and must be a string' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

// Middleware for validating update student request
export const validateUpdateStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: ValidationError[] = [];
  const { name, age, grade, email, dateOfBirth, isActive } = req.body;

  // Validate optional fields if they are present
  if (name !== undefined && !isValidString(name)) {
    errors.push({ field: 'name', message: 'Name must be a string' });
  }

  if (age !== undefined) {
    if (!isValidNumber(age)) {
      errors.push({ field: 'age', message: 'Age must be a number' });
    } else if (Number(age) < 1 || Number(age) > 150) {
      errors.push({ field: 'age', message: 'Age must be between 1 and 150' });
    }
  }

  if (grade !== undefined && !isValidString(grade)) {
    errors.push({ field: 'grade', message: 'Grade must be a string' });
  }

  if (email !== undefined && !isValidEmail(email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (dateOfBirth !== undefined && !isValidDate(dateOfBirth)) {
    errors.push({ field: 'dateOfBirth', message: 'Invalid date format' });
  }

  if (isActive !== undefined && typeof isActive !== 'boolean') {
    errors.push({ field: 'isActive', message: 'isActive must be a boolean' });
  }

  // Validate that at least one field is provided for update
  if (Object.keys(req.body).length === 0) {
    errors.push({ 
      field: 'body', 
      message: 'At least one field must be provided for update' 
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors 
    });
  }

  next();
};

// Middleware for validating ID parameter
export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!isValidString(id)) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: [{ field: 'id', message: 'Invalid ID parameter' }]
    });
  }

  next();
};