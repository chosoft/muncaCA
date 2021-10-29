'use strict'

const buttonSubmit = document.getElementById('submit')

buttonSubmit.onclick = async(e) => {
    try {
        e.target.disabled = true
        const action = e.currentTarget.attributes[1].value
        const verification = action ? true : false
        const validActions = ['login','register']
        if(verification && validActions.includes(action)){
            if(action === validActions[0]){
                const email = document.getElementById('email').value
                const password = document.getElementById('password').value
                e.currentTarget.innerText = 'Espera...'              
                const { data } = await axios.post(`/?mode=${action}`,{email,password})
                e.target.innerText = 'Ingresar'
                e.target.disabled = false
                if(data === 'ok'){
                    Swal.fire({
                        title: 'Bien hecho!',
                        text: 'Logueado exitosamente, seras direccionado en breves',
                        icon:'success'
                    })
                    setTimeout(() =>{
                        window.location.href = '/modelos'
                    },1500)
                }else{
                    Swal.fire({
                        title: 'Ey!',
                        text: 'Los datos ingresados son erroneos',
                        icon: 'warning'
                    })
                }
            }else{
                const username = document.getElementById('username').value
                const email = document.getElementById('email').value
                const password = document.getElementById('password').value
                const passwordConfirmation = document.getElementById('passwordConfirmation').value
                let phone = parseInt(document.getElementById('phone').value)
                e.currentTarget.innerText = 'Espera...'
                if(phone !== NaN && (phone+"").length === 10){
                    phone = phone+""
                    const registerObj = {username,email,password,passwordConfirmation,phone}
                    const { data } = await axios.post(`/?mode=${action}`,registerObj)
                    e.target.innerText = 'Ingresar'
                    console.log(data)
                    if(data === 'ok'){
                        Swal.fire({
                            title: 'Bien hecho!',
                            icon: 'success',
                            text: 'Bien hecho, podras iniciar sesion en breves'
                        })
                        setTimeout(() =>{
                            window.location.href = '/'
                        },1500)
                    }else{
                        Swal.fire({
                            title: 'Uops...',
                            icon: 'warning',
                            text: 'No te has podido registrar, intentalo mas tarde'
                        })    
                    }
                }else{
                    Swal.fire({
                        title: 'Uops...',
                        icon: 'error',
                        text: 'El numero de telefono debe ser un numero y tener 10 digitos'
                    })
                }
            }
        }else{
            throw new Error('notValidAction')
        }
    } catch (e) {
        console.error(e)
        Swal.fire({
            title: 'Uops...',
            icon: 'error',
            text: 'Ha ocurrido un error desconocido intentalo mas tarde'
        })
    }
}

