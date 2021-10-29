'use strict';

const addBtn = document.getElementById('addAlert')

addBtn.onclick = async (e) => {
    try {
        const { value } = await Swal.fire({
                            title:'Añadir archivo',
                            text:'Seleciona un archivo para añadir',
                            input: 'file',
                            inputAttributes: {
                                'multiple':'true'
                            }
                        })
        const verification = value ? true : false
        if(verification){
            const docs = new FormData()
            Array.from(value).forEach(file => {
                docs.append('docs',file)
            })

            const { data } = await axios.post('/documentos',docs,{headers: { 'Content-Type': 'multipart/form-data' }})
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

const deleteBtns = document.querySelectorAll('.delete')

deleteBtns.forEach(deleteBtn => {
    deleteBtn.onclick = async (e) => {
        try {
            const deleteKey = e.currentTarget.attributes[1].value
            console.log(deleteKey)
            const { isConfirmed } = await Swal.fire({
                                            title:'Seguro?',
                                            icon: 'warning',
                                            showCancelButton: true,
                                            text: 'Cuidado esta accion no sera reversible'
                                        })
            if(isConfirmed){
                const { data } = await axios.delete('/documentos',{data:{deleteKey}})
                if(data === 'delete'){
                    Swal.fire({
                        title:'Bien hecho!',
                        text: 'El archivo se ha eliminado correctamente',
                        icon: 'success'
                    })
                    setTimeout(() =>{
                        window.location.reload()
                    },1500)
                }else{
                    console.log(data)
                    Swal.fire({
                        title:'Error',
                        icon:'error',
                        text: 'No se ha podido eliminar el archivo, intentalo despues'        
                    })
                }
            }else{
    
            }
        } catch (e) {
            console.log(e)
            Swal.fire({
                title:'Error',
                icon:'error',
                text: 'No se ha podido eliminar el archivo, intentalo despues'
            })
        }
    }
})