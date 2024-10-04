import http from 'http'
import morgan from 'morgan'
import chalk from 'chalk';
import router from './routes.js';

// how to use chalk for debugging 
// console.log(chalk.red(`Hello test👍👍` ));
// console.log(chalk.blue(`failed tests` ));

// CRUD - CREATE, READ, UPDATE AND DELETE


//listner function
// const listner = (req, res) => {}
//create server
const server = http.createServer( (req, res) => {
    router(req,res)
})
// listne to the server 
const PORT = 3000
const HOST = 'localhost'
server.listen(PORT, HOST, () => {
    console.log(chalk.red(`Server running at port: ${PORT}` ));
})
