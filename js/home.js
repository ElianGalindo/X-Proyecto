let loggedUser = {}
const nombre = document.getElementById('nombreUsuario')
const perfilUser = document.getElementById('usuario')
const postContainer = document.getElementById('postUsuarios')
const postCard = document.getElementById('cardPost').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
    loadUser()
    loadPost()
    postContainer.addEventListener('click', handleRepost);
})

const handleRepost = (event) => {
    const repostBtn = event.target.closest('#repostBtn');
    if (repostBtn) {
        // Obtener el post asociado al botón "Repostear"
        const post = repostBtn.closest('.card');
        if (post) {
            // Obtener el contenido del post para la ventana modal
            const postTitle = post.querySelector('.card-title').textContent;
            const postSubtitle = post.querySelector('.card-subtitle').textContent;
            const postText = post.querySelector('.card-text').textContent;
            const postDate = post.querySelector('.fecha').textContent;

            // Actualizar el contenido de la ventana modal con el post
            const repostModalContent = document.querySelector('#repostModal .postOriginal');
            repostModalContent.innerHTML = 
            `
            <div class="" style="width: 100%;" data-idpost="">
                <div style="display: flex;">
                    <div style="width:45px;">
                        <div style="width:30px; height:50px;border-radius:50%; margin-left:10px; margin-top:10px;">
                         <img src="https://www.lavozdegalicia.es/default/2017/04/03/00121491220255837800973/Foto/twitterrc.jpg" alt="profile" 
                            style="width: 30px; height: 30px; border-radius: 50%;">
                        </div>
                    </div>
                    <div class="card-body" style="width: 300px;">
                        <div style="display: flex;">
                        <div><h5 class="card-title" style="font-size: 17px;">${postTitle}</h5></div>
                        <div style="margin-left:10px; margin-top:2px;"><h6 class="card-subtitle mb-2 text-muted" style="font-size: 16px;">${postSubtitle}</h6></div>
                        <div style="margin-left:10px;"><p class="fecha text-muted" style="font-size: 16px;">${postDate}</p></div>
                        </div>
                        <p class="card-text" style="font-size: 15px;">${postText}</p>
                    </div>
                    
                </div>
                <div style="margin-left: 55px;"><p style="font-size: 16px;">Respondiendo a <span  style="color: #1DA1F2; font-size: 14px;">${postSubtitle}</span></p></div>
            </div>           
            `
        }
    }
};

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
            const inputidUser2 = document.getElementById('idUsuario2')
            inputidUser2.value = loggedUser.usuario
            perfilUser.innerHTML = loggedUser.usuario 
            nombre.innerHTML = loggedUser.nombre
        })
    }
  
}