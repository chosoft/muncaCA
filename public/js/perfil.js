'use strict';

const addBtn = document.getElementById('imgClick')

addBtn.onclick = async (e) => {
    try {
        const { value } = await Swal.fire({
                            title:'Añadir archivo',
                            text:'Seleciona un archivo para añadir',
                            input: 'file',
                            inputAttributes: {
                                'accepts':'image/*'
                            }
                        })
        const verification = value ? true : false
        if(verification){
            const img = new FormData()
            img.append('img',value)
            const { data } = await axios.put('/perfil?action=img',img,{headers: { 'Content-Type': 'multipart/form-data' }})
            if(data === 'ok'){
                Swal.fire({
                    title: 'Bien hecho!',
                    text: 'Se han subido todos los archivos',
                    icon: 'success'
                })
                setTimeout(() =>{
                    window.location.reload()
                },1500)
            }else{
                Swal.fire({
                    title:'Error',
                    text: 'No se ha podido añadir el archivo, intentalo despues',
                    icon: 'error',
                })        
            }
        }else{

        }
    } catch (e) {
        console.log(e)
        Swal.fire({
            title:'Error',
            text: 'No se ha podido añadir el archivo, intentalo despues',
            icon: 'error',
        })
    }
}

const changeUsernameBtn = document.getElementById('btnUsername')

changeUsernameBtn.onclick = async (e) => {
    try {
        const username = document.getElementById('username').value
        const verification = (username.length >=3 &&  username.length <=30) ? true : false
        if(verification){
            const { data } = await axios.put('/perfil?action=username', {username})
            if(data === 'ok'){
                Swal.fire({
                    title: 'Bien hecho!',
                    text: 'El nombre de usuario se ha cambiado con exito',
                    icon:'success'
                })
                setTimeout(() =>{
                    window.location.reload()
                },1500)
            }else{
                Swal.fire({
                    title:'Error',
                    text: 'No se ha podido cambiar el nombre de usuario, puede que este ya este en uso',
                    icon: 'error'
                })        
            }
        }else{
            Swal.fire({
                title: 'Ey!',
                text: 'El nombre de usuario debe tener entre 3 y 30 caracteres',
                icon: 'warning',
            })
        }
    } catch (e) {
        Swal.fire({
            title:'Error',
            text: 'No se ha podido cambiar el nombre de usuario',
            icon: 'error'
        })
    }
}

const btnPassword = document.getElementById('btnPassword')

btnPassword.onclick = async (e) => {
    try {
        console.log('entro')
        const password = document.getElementById('password').value
        const verification = (password.length >= 8) ? true : false
        if(verification){
            const { data } = await axios.put('/perfil?action=password',{password})
            if(data === 'ok'){
                Swal.fire({
                    title: 'Bien hecho!',
                    text: 'Tu contraseña se ha cambiado correctamente',
                    icon: 'success'
                })
                setTimeout(() =>{
                    window.location.href = 'exit'
                },1500)
            }else{
                Swal.fire({
                    title:'Error',
                    text: 'No se ha podido cambiar tu contraseña',
                    icon: 'error'
                })        
            }
        }else{
            Swal.fire({
                title:'Ey!',
                text: 'La contraseña debe contener numeros letras y minimo 8 caracteres',
                icon: 'warning'
            })    
        }
    } catch (e) {
        Swal.fire({
            title:'Error',
            text: 'No se ha podido cambiar tu contraseña',
            icon: 'error'
        })
    }
}