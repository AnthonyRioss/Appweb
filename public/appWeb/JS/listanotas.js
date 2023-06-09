// Recuperar la tabla y el botón
const tabla = document.getElementById("miTabla");
const botonGuardar = document.getElementById("guardar");
const cargarcurso=document.getElementById('cargarcurso');





fetch('/api/obtenerListaCursos',{
  method:"POST",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({})
})
.then(response => response.json())
.then(res => {console.log(res)
  res=res.data
var comboBox=document.getElementById("comboBox");
res.map( opcion => {
  var option = document.createElement('option');
  option.value = opcion.CODIGO;
  option.textContent = opcion.Nombre;
  comboBox.appendChild(option);
});
})







cargarcurso.addEventListener("click",function(){
  let cur = document.getElementById('comboBox').value;
  fetch('/api/obtenerListaDePesos',{
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({curso:cur})
  })
  .then(response => response.json())
  .then(res => {
    console.log(res)
    res = res.data;
    let titulo = {
      "CODIGO": false,
      "Nombre": false,
      "Apellidos": false,
    }

    for(let i = 0 ; i< res.length;i++){
      titulo["Nota: "+res[i].nombre]=true;
    }
    
    const thead = document.querySelector('#miTabla thead tr');
    let contenido=" ";
    Object.keys(titulo).map(ti=>{
    contenido=contenido+`<th>${ti}</th>`
    })
    thead.innerHTML=contenido
    fetch('/api/obtenerListaDeAlumnosConNotas',{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({curso:cur})
    })
    .then(response => response.json())
    .then(res2 => {
      
      res2 = res2.data;
      console.log(res2)
      const tbody = document.querySelector('#miTabla tbody');
      let c = ""
      for(let i = 0 ; i< res2.length;i++){
        console.log(res2[i].CODIGO)
        let contenido="<tr> ";
        contenido=contenido+`<td><input 
        type="text" 
        value=${res2[i].CODIGO}
          disabled></input></td>`
        
        contenido=contenido+`<td><input 
        type="text" 
        value=${res2[i].Nombre}
        disabled></input></td>`
        contenido=contenido+`<td><input 
        type="text" 
        value=${res2[i].Apellidos}
        disabled></input></td>`
        for(let j = 0 ; j< res.length;j++){
          contenido=contenido+`<td>
          <input 
          type="number" 
          value=${res2[i].notas}
          ></input></td>`
          console.log(res2[i].notas.filter((e)=>{
            return e.nombre == res[i].nombre
          }))
        }
        contenido=contenido+'</tr>'
        c=c+contenido
      }
  
     
      tbody.innerHTML=c
      
    })
  })


  
  /*
  fetch('/api/obtenerListaDeAlumnosConNotas',{
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({curso:cur})
  })
  .then(response => response.json())
  .then(res => {
    console.log(res)
    const thead = document.querySelector('#miTabla thead');
    res.map(ti=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <th>${ti.Codigo} </th>
      <th>${ti.Nombre}</th>
      <th>${ti.Apellido}</th>
      <th>${ti.Nota1}</th>
      <th>${ti.Nota2}</th>
      <th>${ti.Nota3}</th>
      <th>${ti.Promedio}</th>
      `;
      thead.appendChild(tr);
    })
   })
    fetch('../notas.json')
    .then(response => response.json())
    .then(res => {console.log(res)

    const tbody = document.querySelector('#miTabla tbody');

    res.map(obj => {
      const tr = document.createElement('tr');
      tr.innerHTML = `

        <td  ><input type="number" value=${obj.Codigo} name="codigo"  disabled></input></td>
        <td > <input 
        disabled
        type="text" 
        value=${obj.Nombre}
        name="nombre" 
        ></input>
        </td>
        <td >
        <input 
        disabled
        type="text" 
        value=${obj.Apellido}
        name="apellido" 
        ></input>
        </td>
        <td >
        <input 
        type="number" 
        value=${obj.Nota1}
        name="nota1" 
        ></input>
        </td>
        <td >
        <input 
        type="number" 
        value=${obj.Nota2}
        name="nota2" 
        ></input>
        <td >
        <input 
        type="number" 
        value=${obj.Nota3}
        name="nota3" 
        ></input>
        </td>
        <td >
        <input 
        type="number" 
        value=${obj.Promedio}
        name="promedio" 
        ></input>
        </td>

      `;
      tbody.appendChild(tr);
    });

})

*/
 //guardarDatos()

});
/*
formulario.addEventListener('submit', e => {
  e.preventDefault(); // Previene que se recargue la página al enviar el formulario
  
  const codigo = document.querySelector('#Codigo').value;
  const dni = document.querySelector('#DNI').value;
  const nombre = document.querySelector('#Nombre').value;
  const apellido = document.querySelector('#Apellido').value;
  const correo = document.querySelector('#Correo').value;
  const direccion = document.querySelector('#Direccion').value;
  const nuevaFila = document.createElement('tr');
  nuevaFila.innerHTML = `
  <td  ><input type="number" value=${codigo} name="codigo"  disabled></input></td>
        <td  ><input type="number" value=${dni} name="dni"  disabled></input></td>
        <td > <input 
        type="text" 
        value=${nombre}
        name="nombre" 
        ></input>
        </td>
        <td >
        <input 
        type="text" 
        value=${apellido}
        name="apellido" 
        ></input>
        </td>
        <td >
        <input 
        type="text" 
        value=${correo}
        name="correo" 
        ></input>
        </td>
        <td >
        <input 
        type="text" 
        value=${direccion}" 
        name="direccion" 
        ></input>
        </td>`;
  
  tabla.appendChild(nuevaFila);
  guardarDatos()
  formulario.reset(); // Resetea el formulario para que se pueda agregar otra fila
});
  */

  function guardarDatos() {

} 