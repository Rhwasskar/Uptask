import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar){
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        console.log(urlProyecto);
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás restaurarlo una vez eliminado",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!'
        }).then((result) => {
                if (result.value) {
                    //enviar peticion a Axios
                    const url = `${location.origin}/proyectos/${urlProyecto}`;
                    
                    axios.delete(url, {params: {urlProyecto}})
                        .then(function(respuesta){
                            console.log(respuesta.data);
                            Swal.fire(
                                'Eliminado!',
                                respuesta.data,
                                'success'
                            );
                            setTimeout(()=>{
                                        window.location.href = '/';            
                                    },2500);
                        })
                        .catch(()=> {
                            Swal.fire({
                                type:'error',
                                title: ' hubo un error',
                                text:' No se pudo eliminar el Proyecto'

                            });
                        })      
                    
                }
       

        })
    });
};


