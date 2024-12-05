import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { messageManager } from './managers/messagesManager.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const PORT = 8080;

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.get('/', (req, res) =>{
    res.render('index');
});

const httpServer = app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// let messages = [];
const messages = new messageManager();
const io = new Server(httpServer);

io.on('connection', async (socket) => {
    console.log('usuario conectado');
    socket.emit('messageLogs', await messages.getMessages()); 
    socket.on('newUser', (data)=>{
        socket.broadcast.emit('newUser', data)
    });
    socket.on('message', async (data)=>{
        // messages.push(data);
        await messages.saveMessages(data);
        io.emit('messageLogs', await messages.getMessages());
    });
});