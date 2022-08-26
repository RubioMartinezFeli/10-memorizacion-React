import React, { useMemo, useState } from 'react'

export const Tareas = () => {

    const [tareas, setTareas] = useState([]);
    const [contador, setContador] = useState(500);

    const añadirTarea = e => {  
        e.preventDefault();

        setTareas(tarea => [...tarea, e.target.nombre.value]);
    } 

    const eliminarTarea = id => {

        /* Filtrar tareas para borrar la que no quiero
         .map() (id) crea un indica con cada iteracion
         .filter() (indice) también crea in indice con cada iteración
         .filter() va a comparar id y indice y el que sea diferente 
         , es decir si se cumple la condición el elemento se mantiene en el array,
         , sino se elimina */

        let nuevas_tareas = tareas.filter( (tarea, indice) => indice !== id );
        /*console.log(nuevas_tareas);*/

        //Cuardar nuevo listado de tareas en el estado
        setTareas(nuevas_tareas); 
    }

    const sumarAlContador = e => {
        setContador(contador + 1);
    }

    const contadores_pasados = acomulacion => {
        for(let i = 0; i<= acomulacion; i++){
            console.log("Ejecutando aomulación de contadores pasados...");
        }

        return `Contador manual de la tarea ${contador}` 
    }

    const memoContadores = useMemo(() => contadores_pasados(contador), [contador])

  return (
    <div className='tareas-container'>
        <h1>Mis tareas</h1>

        <form onSubmit={añadirTarea}>
            <input type='text' name='nombre' placeholder='Nombre' />
            <input type= 'submit' value='Añadir' name='añadir'/>
        </form>

        <h3>{memoContadores}</h3>

        <h3>Lista de tareas</h3>
        <button onClick={ () => sumarAlContador() }>Sumar</button>


        <ul>
            {
                tareas.map((tarea, indice) => {
                    return (
                        <li key={indice}>
                            {tarea}
                            &nbsp;
                            {/* OJO!! como enviamos los parámetros a la función */}
                            <button onClick={ () => eliminarTarea(indice) }>X</button>
                        </li>)
                })
            }
        </ul>   
    </div>
 )
}
