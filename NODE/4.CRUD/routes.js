// Initialize constants
import {randomUUID} from 'crypto';
import toDos from './db';
const toDoListData = [...toDos];

//1. Create a server
import http from 'http';

const server = http.createServer ();
const listener = (req, res) => {
  //   router (req, res);
};

//2. Listen to server
const PORT = 3500;
server.listen (PORT, () => {
  console.log (`Server running well on PORT http://localohost:${PORT}`);
});

const router = async (req, res) => {
  //.3 Creating Routes
  // *** Create a custom response
  const {url, method} = req;
  const responseOutput = (statusCode, data) => {
    res.setHeader ('Content-Type', 'application/json');
    res.writeHead (statusCode);
    res.end (JSON.stringify (data));
  };

  // Fetch all toDos
  if (url === '/api/toDos' && method === 'GET') {
    if (toDoListData.length > 0) {
      return responseOutput (200, toDoListData);
    } else {
      return responseOutput (400, {message: 'No ToDos Found'});
    }
  }

  // Fetch toDo by Id
  if (url.match (/\/api\/toDos\/\d+/) && method === 'GET') {
    const splitURL = url.split ('/');
    const targetId = url.length - 1;
    const id = parseInt (splitURL[targetId]);

    const myToDo = toDoListData.find (toDo => toDo.id === id);

    if (!myToDo) {
      return responseOutput (400, {message: 'No ToDo item found'});
    } else {
      return responseOutput (
        200,
        {
          message: 'Todo item found successfully',
        },
        myToDo
      );
    }
  }

  // Delete todo item by id
  if (url.match (/\/api\/toDos\/\d+/) && method === 'DELETE') {
    const splitURL = url.split ('/');
    const targetId = url.length - 1;
    const id = parseInt (splitURL[targetId]);

    const toDoDeleted = toDoListData.find (toDo => toDo.id === id);
    if (!toDoDeleted) {
      return responseOutput (400, {message: 'No to found'});
    } else {
      const remainingToDos = toDoListData.filter (
        eachToDo => eachToDo.id !== id
      );

      return responseOutput (
        200,
        {
          message: `Item of id ${id} deleted successfully`,
        },
        remainingToDos
      );
    }
  }

  // Create a new TODO
  if (url === '/api/toDos/new' && method === 'POST') {
    let body = '';
    req.on ('data', chunk => {
      body += chunk.toString ();
    });

    req.on ('end', () => {
      const {title, description, completed} = req.body;
      const id = randomUUID ();

      const newToDoItem = {
        id,
        title,
        description,
        completed: false,
      };

      toDoListData.push (newToDoItem);
      return responseOutput (
        201,
        {
          message: 'To created successfully',
        },
        newToDoItem
      );
    });
  }

  //Update toDo by id
  if (url.match (/\/api\/toDos\/\d+/) && method === 'PUT') {
    const splitURL = url.split ('/');
    const targetId = url.length - 1;
    const id = parseInt (splitURL[targetId]);

    const body = '';
    req.on ('data', chunk => {
      body += chunk.toString ();
    });

    const toDoToUpdate = toDoListData.find (toDo => toDo.id === id);
    if (!toDoToUpdate) {
      return responseOutput (404, {message: 'ToDo NOT found'});
    }

    req.on ('end', chunk => {
      // Destructure object properties from DB
      const {title, description, completed} = JSON.parse (body);

      const updateData = {title, description, completed};

      const todoIndex = toDoListData.findIndex (todo => todo.id === id);

      if (todoIndex === -1) {
        return responseOutput (404, {message: 'Todo NOT found'});
      } else {
        const updatedToDo = {...toDoListData[todoIndex], ...updateData};
        toDoListData[todoIndex] = updatedToDo;
        return responseOutput (
          201,
          {
            message: 'ToDo updated successfully',
          },
          updatedToDo
        );
      }
    });
  }

  if (url.match (/\/api/) && method === 'GET') {
    return responseOutput (200, {
      message: 'Welcome to CRUD operations',
    });
  }
};
