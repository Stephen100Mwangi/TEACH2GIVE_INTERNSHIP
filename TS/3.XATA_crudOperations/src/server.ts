import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { validateCreateStudent, validateUpdateStudent, validateIdParam } from '../validateData/validator'; // Adjust the path as needed
import { getXataClient } from "./xata";
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json'; // Ensure you have a swagger.json file

dotenv.config();

// Initialize Express app
const app: Express = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

// Define interfaces for request bodies
interface CreateStudent {
  name: string;
  age: number;
  grade: string;
  password: string;
  dateOfBirth: string;
  isActive: boolean;
  email: string;
}

interface UpdateStudent {
  name?: string;
  age?: number;
  grade?: string;
  password?: string;
  dateOfBirth?: string;
  isActive?: boolean;
  email?: string;
}

// Middlewares
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use(cors({
  origin: 'http://your-frontend-domain.com', // Replace with your frontend's domain
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
})); // CORS
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes."
})); // Rate limiting
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Helper function to omit sensitive fields
const omitSensitiveFields = (student: any) => {
  const { password, ...safeStudent } = student;
  return safeStudent;
};

// POST Request - Register a new student
app.post("/api/register", validateCreateStudent, async (req: Request, res: Response, next: NextFunction) => {
  const { name, age, grade, password, dateOfBirth, isActive, email } = req.body;

  const client = getXataClient();

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newStudent = await client.db.students.create({
      name,
      age,
      grade,
      password: hashedPassword,
      dateOfBirth,
      isActive,
      email
    });

    const safeStudent = omitSensitiveFields(newStudent);

    res.status(201).json({ message: "Student created successfully", newStudent: safeStudent });
  } catch (error) {
    console.error(error);
    next(error); // Pass to centralized error handler
  }
});

// GET Request - Get all students
app.get("/api/users", async (req: Request, res: Response, next: NextFunction) => {
  const client = getXataClient();
  try {
    const students = await client.db.students.getAll();
    const safeStudents = students.map(omitSensitiveFields);
    if (safeStudents.length < 1) {
      res.status(200).json({ message: "No students found in the database.", students: safeStudents });
    } else {
      res.status(200).json({ message: "All students retrieved successfully", students: safeStudents });
    }
  } catch (error) {
    console.error(error);
    next(error); // Pass to centralized error handler
  }
});

// GET Request - Get a single student by id
app.get("/api/users/:id", validateIdParam, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const client = getXataClient();

  try {
    const studentFound = await client.db.students.read(id);
    if (!studentFound) {
      res.status(404).json({ message: "Student not found" });
    } else {
      const safeStudent = omitSensitiveFields(studentFound);
      res.status(200).json({ message: "Student found successfully", studentFound: safeStudent });
    }
  } catch (error) {
    console.error(error);
    next(error); // Pass to centralized error handler
  }
});

// PUT Request - Replace the entire student resource
app.put('/api/users/:id', validateIdParam, validateCreateStudent, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, age, grade, password, dateOfBirth, isActive, email } = req.body;
  const client = getXataClient();

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password

    const updatedUser = await client.db.students.update(id, {
      name,
      age,
      grade,
      password: hashedPassword,
      dateOfBirth,
      isActive,
      email
    });

    const safeUser = omitSensitiveFields(updatedUser);

    res.status(200).json({ message: "User updated successfully", user: safeUser });
  } catch (error) {
    console.error(error);
    next(error); // Pass to centralized error handler
  }
});

// PATCH Request - Update specific fields of a student
app.patch('/api/users/:id', validateIdParam, validateUpdateStudent, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, age, grade, password, dateOfBirth, isActive, email } = req.body;
  const client = getXataClient();

  // Build the update object dynamically based on the request body
  const updateData: Partial<UpdateStudent> = {};
  if (name !== undefined) updateData.name = name;
  if (age !== undefined) updateData.age = age;
  if (grade !== undefined) updateData.grade = grade;
  if (password !== undefined) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }
  if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
  if (email !== undefined) updateData.email = email;
  if (isActive !== undefined) updateData.isActive = isActive;

  try {
    const updatedUser = await client.db.students.update(id, updateData);
    const safeUser = omitSensitiveFields(updatedUser);
    res.status(200).json({ message: "User updated successfully", user: safeUser });
  } catch (error) {
    console.error(error);
    next(error); // Pass to centralized error handler
  }
});

// DELETE Request - Delete a student by id
app.delete('/api/users/:id', validateIdParam, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const client = getXataClient();

  try {
    await client.db.students.delete(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error); // Pass to centralized error handler
  }
});

// Centralized error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(
    `[server]: Server TypeScript is running at http://localhost:${port} 👍`
  );
});
