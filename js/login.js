let usuario

const btnLogin = document.getElementById('btnLogin')

//Boton para inicio de sesion
btnLogin.addEventListener('click', () => {
    const email = document.getElementById('email')
    const password = document.getElementById('password')

    if(email.value.trim() === '' || password.value.trim() === ''){
        //mandamos alerta
        activaAlerta('Los campos no pueden estar vacios')
        
    } else {
        //Intentamos logearnos 
        const sendData = {
            email: email.value,
            password: password.value
        }

        fetch('./Backend/Files/login.php', {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async(response) => {
           // console.log(await response.json())
           const respuesta = await response.json()
           if(respuesta.MESSAGE === 'No se encontro usuario') {
                activaAlerta('El usuario no existe en la BD')
           } else if(respuesta.MESSAGE === 'Contrasenias no coinciden'){
                activaAlerta('Las contrasenias no coincide con la BD')
           } else if (respuesta.MESSAGE === 'Success') {
            //redirigir a home
                usuario = respuesta.USUARIO['usuario']
                window.location.replace(`/crud-sistema/home.html?usuario=${usuario}`)
           }else {
                activaAlerta('Algo salio mal')
           }
        })
        .catch((error) => {
            console.log('$$ error => ', error)
        })
    }
})

const activaAlerta = mensaje => {
    const alerta = document.getElementsByClassName('alert')
        //console.log('alerta', alerta)
        alerta[0].innerHTML = mensaje
        alerta[0].classList.remove('show')
        alerta[0].classList.add('show')
        setTimeout(() => {
            alerta[0].classList.remove('show')
            alerta[0].classList.add('hide')
        },3000)
}