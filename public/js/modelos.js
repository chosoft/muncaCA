'use strict'

const allModeloBtns = document.querySelectorAll('.delete')

allModeloBtns.forEach(btn => {
    btn.onclick = async (e) =>{
        try {
            const deleteKey = e.currentTarget.attributes[1].value
            const verification = deleteKey ? true : false
            if(verification){
                const { isConfirmed } = await Swal.fire({
                                            title: 'Cuidado!',
                                            text: 'Si borras este modelo no se podra recuperar',
                                            icon: 'warning',
                                            showCancelButton: true
                                        })
                if(isConfirmed){
                    const { data } = await axios({
                                                method: 'DELETE',
                                                url: `/modelos?deleteKey=${deleteKey}`,
                                                data:{}
                                            })
                    console.log(data)
                    if(data === 'ok'){
                        Swal.fire({
                            title: 'Bien hecho!',
                            text: 'Se ha eliminado el modelo de forma correcta',
                            icon: 'success'
                        })

                        setTimeout(() =>{
                            window.location.reload()
                        },1500)
                    }else{
                    throw new Error('apiFail')
                    }
                }else{
    
                }
            }else{
                throw new Error('notvalidKeey')
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error a la hora de eliminar el modelo',
                icon: 'error'
            })
        }
    }
})


