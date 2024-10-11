import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

// Inference
const app: Express = express();
const port = process.env.PORT || 3000; // Default to port 3000 if not specified

//Define interfaces for request bodies
interface CreateStudent{
  name:String,
  age:Number,
  grade:String
}

interface UpdateStudent{
  name?:String,
  age?:Number,
  grade?:String
}

//Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Generated with CLI
import { getXataClient } from "./xata";


//routing params
//POST Request
app.post("/api/register",async(req:Request,res:Response)=>{
  const {name,age,grade} = req.body;

  if(!name || !grade || !age){
    res.status(400).json({message:"All fields are required"})
  }else{

  const client = getXataClient();

  try {
    const newStudent = await client.db.students.create({name,Age:age,Grade:grade});
    res.status(201).json({message:"Student created successfully",newStudent})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"})
  }
}

})

//GET Request
// GET all
app.get("/api/users",async (req:Request,res:Response) => {
  const client = getXataClient();
  try {
    const students = await client.db.students.getAll();
    if (students.length < 1) {
      res.status(204).json({message:"No students found in the database.",students})
    }else{
      res.status(200).json({message:"All students retrieved successfully",students})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"});    
  }
})


//GET Request
//GET a single student by id
app.get("/api/users/:id",async (req:Request,res:Response) => {
  const {id} = req.params;
  const client = getXataClient();

  try {
    const studentFound = await client.db.students.read(id);
    if (!studentFound) {
      res.status(404).json({message:"Student NOT found"})
    }else{
      res.status(200).json({message:"Student found successfully",studentFound});
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"});    
  }
})

//PUT requests - will replace the entire resource, 
// the body has everything even if not modified
app.put('/api/users/:id',async (req:Request,res:Response) => {
  const {id} = req.params;
  const {name,age,grade,password,dateOfBirth,isActive,email} = req.body;
  const client = getXataClient();

  try {
    const updatedUser = await client.db.students.update(id,{name,age,grade,password,dateOfBirth,isActive,email});
    res.status(200).json({message:"User updated successfully",user: updatedUser})
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"})
  }
});

// PATCH requests - only the fields that need to be changed will be in the request body
app.patch('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name,age,grade,password,dateOfBirth,isActive,email } = req.body;
  const client = getXataClient();

  // Build the update object dynamically based on the request body
  const updateData: any = {};
  if (name !== undefined) updateData.name = name;
  if (age !== undefined) updateData.age = age;
  if (grade !== undefined) updateData.grade = grade;
  if (password !== undefined) updateData.password = password;
  if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
  if (email !== undefined) updateData.email = email;
  if (isActive !== undefined) updateData.isActive = isActive;

  // If no fields are provided in the request body, return a bad request response
  if (Object.keys(updateData).length === 0) {
    res.status(400).json({ message: "No valid fields provided for update" });
  }

  try {
    const updatedUser = await client.db.students.update(id, updateData);
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//delete
// DELETE method deletes an item based on id
app.delete('/api/users/:id',async (req:Request,res:Response) => {
  const {id} = req.params;
  const client = getXataClient();

  try {
    await client.db.students.delete(id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"})
  }
})


// Start the server
app.listen(port, () => {
  console.log(
    `[server]: Server TypeScript is running at http://localhost:${port} 👍`
  );
});