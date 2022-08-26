import React, { useCallback, useEffect, useState } from 'react'
import { Empleados } from './Empleados'

export const Gestion = () => {

    /* Clase 1: En cada cambio del estado nombre, se renderiza de nuevo el componente
       Gestion porque estamos rederizando el valor del estado nombre, el problema es
       que el componente Empleado también de renderiza de nuevo porque esta dentro de
       Gestión vamos a usar la memorización para que esto no ocurra, para eso usamos 
       React.memo(funcion a renderizar del propio componente) en el coponente que no queremos que renderize (Empleados)*/ 

    const [nombre, setNombre] = useState();
    const [pageState, setPageState] = useState(1);

    useEffect(()=>{
      console.log("Vista Gestión Actualizada ");
    },[nombre, pageState]);

    const asignarGestor = e =>{
        setNombre(e.target.value);
    }

    /* Vamos a hacer un ejemplo on useCallback es muy parecido a useMemo
        pero este nos permite memorizar funciones, enviamos este metodo como prop
        a el componente Empleados y al ejecutarlo observamos que el metodo se 
        ejecuta cada vez que se renderiza Empleados, si no queremos que 
        esto ocurra usamos useCallback, el metodo se memoriza y no es renderizada
         de nuevo. useCallback recibe dos parametros 
         useCallback(función de callback y dependencia). La dependencia indica la
          variable que en caso de cambiar de valor o estado desecadenará la
          ejecución de la función anclada al useCallback
          useCallback(()=>{función;},[dependencia]) useEffect y useMemo 
          funcionan igual*/

    const mostrarMensaje = useCallback(() => {
      console.log("Hola quetal soy un mensaje desde el componente Empleados !!");
    }, [pageState]);

  return (
    <div>
        <h1>Nombre del gestor: {nombre}</h1>
        <input 
            type='text' 
            onChange={asignarGestor}
            placeholder='Introduce tu nombre de gestor'>
        </input>

        <h2>Listado de empleados: </h2>
        <p>Los usuarios son gestionados por: {nombre} y vienen de jsonplaceholder</p>

        <Empleados page={pageState} mensaje={mostrarMensaje}/>

        <button onClick={()=>(setPageState(1))}>Página 1</button>
        <button onClick={()=>(setPageState(2))}>Página 2</button>
    </div>
  )
}
