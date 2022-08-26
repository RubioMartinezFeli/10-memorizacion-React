import React, { useState,useEffect } from 'react'

/*Clase 1: usamos React.memo(funcion a renderizar)
  todo nuestro componente principal esta envuelto en la funcion React.memo()
  conseguimos con este metodo evitar renderizaciones innecesarias
  se queda memorizado el componente que aplicamos React.memo() 
  a no ser que se efectue algún cambio en éste*/

/* Vamos a hacer una peticion asincrona Ajax a una api (reqres in) */

export const Empleados = React.memo(({page = 1, mensaje}) => {

    const [empleados, setEmpleados] = useState([]);

    //Si se modifica page se ejecuta useEffect
    useEffect(()=>{
            conseguirEmpleados();
        },[page]);

    useEffect(()=>{
      console.log("Se ha renderizado el componente Empleado")
    },[empleados])

    mensaje();

    //Función asincrona peticion ajax
    const conseguirEmpleados = async() => {
        const url = "https://reqres.in/api/users?page="+page;
        const peticion = await fetch(url)
        const {data: empleados} = await peticion.json();
        setEmpleados(empleados);
        console.log("Se ejecutó la petición ajax");
    }

  return (
    <div>
        <ul className='empleados'>
           {empleados.length >= 1 &&
           empleados.map(empleado => {
                return <li key={empleado.id}>
                     {empleado.first_name + " " + empleado.last_name}
                </li>
           })}     
        </ul>
    </div>
  );
}
);
