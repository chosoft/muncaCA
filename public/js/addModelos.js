'use strict'
const btnAdd = document.getElementById('addLider')

btnAdd.onclick = async (e) =>{
    try{
        const { value } = await Swal.mixin({
                                input: 'text',
                                confirmButtonText: 'Siguiente &rarr;',
                                showCancelButton: true,
                                progressSteps: ['1', '2', '3']
                            }).queue([
                                {
                                    title: 'Nombre de el lider',
                                    text: 'Minimo 3 caracteres y maximo 30',
                                    inputPlaceholder: 'Nombre'
                                },
                                {
                                    title: 'Correo',
                                    text: 'Ingreas uno valido',
                                    inputPlaceholder: 'correo@lider.com',
                                    input:'email'
                                },
                                {
                                    title: 'Telefono',
                                    text: 'Numero de telefono colombiano',
                                    inputPlaceholder: '3161234567'
                                }
                              ])
        if(value.length === 3){
            const div = document.createElement('div')
            const idReference = Date.now()
            div.className = 'liderCard'
            div.id = idReference
            const liderCard =   `<div>
                                    <span>${value[0]}</span>
                                    <span>${value[1]}</span>
                                    <span>${value[2]}</span>
                                </div>
                                <button id="${idReference}-btn" targetToDelete="${idReference}">
                                    X
                                </button> `
            div.setAttribute('data-lider',`${value[0]}-${value[1]}-${value[2]}`)
            div.innerHTML = liderCard
            document.getElementById('appender').append(div)

            document.getElementById(`${idReference}-btn`).onclick = async (e) => {
                try {
                    const divToDelete = document.getElementById(e.currentTarget.attributes[1].value)
                    document.getElementById('appender').removeChild(divToDelete)
                } catch (err) {
                    console.error(err)
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text:'error al realizar la accion'
                    })
                }
            }
            
        }else{

        }
    }catch(err){
        console.error(err)
        Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error a la hora de realizar esta accion'
        })
    }
}

const senderBtn = document.getElementById('submitModel')

senderBtn.onclick = async (e) => {
    try {
        const obj = {
            colegio: document.getElementById('colegio').value,
            modelo: document.getElementById('modelo').value,
            ubicacion: document.getElementById('ubicacion').value,
            email: document.getElementById('email').value
        }

        const lideres = await getDataLideres()

        if(lideres.length <= 0){
            Swal.fire({
                title: 'Ey!',
                text:'Por favor añade al menos un lider y verificaque los datos sean correctos',
                icon: 'warning',
            })
        }else{
            obj.lideres = lideres
            const { data } = await axios.post('/modelos',obj)
            if(data === 'ok'){  
                Swal.fire({
                    title: 'Bien hecho!',
                    icon: 'success',
                    text: 'Se a añadido el modelo de forma correcta'
                })
                setTimeout(() => {
                    window.location.href = '/modelos'

                },1500)
            }else{
                Swal.fire({
                    title: 'Ey!',
                    icon: 'warning',
                    text: 'Por favor revisa que no hayan campos nulos ni datos incorrectos como numeros de telefonos'
                })
            }
        }
    } catch (err) {
        Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error a la hora de añadir el modelo',
            icon: 'error'
        })
    }
}

function getDataLideres(){
    return new Promise(async (resolve, reject) => {
        const childNodesAppender = document.getElementById('appender').childNodes
        if(childNodesAppender.length <= 0){
            resolve([])
        }else{
            let finalArray = []
            
            childNodesAppender.forEach((lider,index) => {
                const dataEmbbed = lider.attributes[2].value.split('-')
                finalArray.push({
                    nombre:dataEmbbed[0],
                    email:dataEmbbed[1],
                    phone:dataEmbbed[2]
                })
                if(index+1 === childNodesAppender.length){
                    resolve(finalArray)
                }else{

                }
            })
        }

    })    
}