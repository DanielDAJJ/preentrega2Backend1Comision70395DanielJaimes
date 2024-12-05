const socket = io();

let user;

let chatBox = document.getElementById('chatBox');

Swal.fire({
    title: 'Identificate',
    text: 'Ingrese su nombre de usuario',
    input: 'text',
    inputValidator: (value) => {
        return !value && "Por favor ingresar el nombre de usuario"
    },
    allowOutsideClick: false,
}).then((result)=>{
    user = result.value;
    socket.emit('newUser', user)
});
chatBox.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
            if(chatBox.value.trim().length > 0){
                socket.emit('message', {user: user, message:chatBox.value});
                chatBox.value = '';
            }   
    }
});
socket.on('messageLogs', (data)=>{
    let messageLogs = document.getElementById('messageLogs');
    let messages = '';
    // console.log(data);
    data.forEach(messagelog => {
        messages = messages + `${messagelog.user} dice: ${messagelog.message}</br>`;
        messageLogs.innerHTML = `<p>${messages}</p>`;
    });
});
socket.on('newUser', (data)=>{
    Swal.fire({
        text: `${data} se ha conectado`,
        toast:true,
        position: 'top-right',
        timer: 2000
    })
});