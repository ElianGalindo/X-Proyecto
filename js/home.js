let loggedUser = {}
const titulo = document.getElementById('userBlog')
const postContainer = document.getElementById('postUsuarios')
const postCard = document.getElementById('cardPost').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    loadUser()
    loadPost()
})

const loadPost = async () => {
    const posts = await fetch('./Backend/Files/loadPost.php')
    const items = await posts.json()
    dibujaPosts(items.MESSAGE)
    
}

const dibujaPosts = posts => {
    postContainer.innerHTML=''
    posts.forEach((item) => {
        postCard.querySelector('.card-title').textContent = item.titulo
        postCard.querySelector('.card-subtitle').textContent = item.idUsuario
        postCard.querySelector('.card-text').textContent = item.mensaje
        postCard.querySelector('.fecha').textContent = item.fecha

        const clone = postCard.cloneNode(true)
        /*clone.querySelector('.card').dataset.idpost = item.idUsuario;

        // Agregar manejador de eventos para el botón de repostear
        const btnRepostear = clone.querySelector('.btnRepostear');
        btnRepostear.addEventListener('click', () => {
            const idPostOriginal = item.idUsuario;
            const idPostOriginalInput = document.getElementById('idPostOriginal');
            idPostOriginalInput.value = idPostOriginal;
        });*/
        fragment.appendChild(clone)
    })
    postContainer.appendChild(fragment)
}

const loadUser = () => {
    const url = window.location.search
    const params = new URLSearchParams(url)
    const usuario = params.get('usuario')
    console.log('$$$ usuario => ', usuario)

    if(usuario){
        const sendData = {
            usuario
        }
        fetch('./Backend/Files/home.php', {
            method: 'POST', 
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (response) =>{
            const user = await response.json()
            loggedUser = user.MESSAGE
            const inputIdUser = document.getElementById('idUsuario')
            inputIdUser.value = loggedUser.usuario
         
            
        })
    }
  
}