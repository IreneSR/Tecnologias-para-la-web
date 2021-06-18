/*Controlador*/
var idSeleccionadoParaEliminar = 0;
var idSeleccionadoParaActualizar = 0;

function actionCreate(){
    var tabla = $('#example1').DataTable();
    var eje_tematico_create = document.getElementById("eje_temativo_create").value;
    var modalidad_create = document.getElementById("modalidad_create").value;
    var descripcion_create = document.getElementById("descripcion_create").value;
    var factor_create = document.getElementById("factor_create").value;
    var ejemplos_create = document.getElementById("ejemplos_create").value;
    
   $.ajax({
        url: "php/crud-denominacion.php",
        method: 'POST',
        data: {
            eje_tematico: eje_tematico_create,
            modalidad: modalidad_create,
            descripcion: descripcion_create,
            factor: factor_create,
            ejemplos: ejemplos_create,
            accion: 'create'
        },
        success: function( resultado) {
         
          alert(resultado);
          var objetoJSON = JSON.parse(resultado);
          if(objetoJSON.estado==1){
            //mostar en la tabla los datos que este regresando
                //BOTONES

                var Botones = '<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-editar" onclick="recuperarRegistroActualizar('+ objetoJSON.id+');" href="#"> <i class="fas fa-pencil-alt"> </i> Editar </a>';
                Botones += ' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" onlick="identificarEliminar('+objetoJSON.id+');" href="#"><i class="fas fa-trash"></i>Eliminar</a>';
                tabla.row.add( [
                    eje_tematico_create,
                    modalidad_create,
                    descripcion_create, 
                    Botones
            
                ] ).node().id = 'row_'+objetoJSON.id;
                tabla.draw( false );
                alert(objetoJSON.mensaje);
                $('#modal-nueva').modal('hide');
          }else{
              alert(objetoJSON.mensaje);
          }
        }
      });
}
function actionRead(){
    $.ajax({
        url: "php/crud-denominacion.php",
        method: 'GET',
        data: {
            accion: 'Read'
        },
        success: function( resultado ) {
            var objetoJSON = JSON.parse(resultado);
            
            if(objetoJSON.estado==1){
                var tabla = $('#example1').DataTable();
              
                for(denominacion of objetoJSON.denominaciones){
                
                    var Botones = '<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-editar" onclick="recuperarRegistroActualizar('+ denominacion.id+');" href="#"> <i class="fas fa-pencil-alt"> </i> Editar </a>';
                    Botones += ' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" onclick="identificarEliminar('+denominacion.id +')" href="#"><i class="fas fa-trash"></i>Eliminar</a>';
                    
                    tabla.row.add([
                        denominacion.eje_tematico,
                        denominacion.modalidad,
                        denominacion.descripcion,
                        Botones
                    ]).node().id = 'row_'+denominacion.id;

                    tabla.draw(false);
                }
            }
          
        }
    
      });
}
function actionUpdate(){
    alert("Actualizar");
    var eje_tematico_actualizar = document.getElementById("eje_temativo_actualizar").value;
    var modalidad_actualizar = document.getElementById("modalidad_actualizar").value;
    var descripcion_actualizar = document.getElementById("descripcion_actualizar").value;
    var factor_actualizar = document.getElementById("factor_actualizar").value;
    var ejemplos_actualizar = document.getElementById("ejemplos_actualizar").value;

    $.ajax({
        url: "php/crud-denominacion.php",
        method:'POST',
        data: {
          id : idSeleccionadoParaActualizar,
          eje_tematico: eje_tematico_actualizar,
          modalidad: modalidad_actualizar,
          descripcion: descripcion_actualizar,
          factor: factor_actualizar,
          descripcion: descripcion_actualizar,
          ejemplos:ejemplos_actualizar,
          accion: "Actualizar"
        },
        success: function( resultado ) {
          alert(resultado);
          //Si todo está bien, actualizar también el renglon de la tabla
          //var tabla = $('#example1').DataTable();
        var objetoJSON = JSON.parse(resultado);
        if(objetoJSON.estado==1){
            alert(objetoJSON.mensaje);
            $('#modal-editar').modal('hide');
            var tabla = $('#example1').DataTable();
            var renglon = tabla.row("#row_"+idSeleccionadoParaActualizar).data();
            renglon[0]=eje_tematico_actualizar;
            renglon[1]=modalidad_actualizar;
            renglon[2]=descripcion_actualizar;
            tabla.row("#row_"+idSeleccionadoParaActualizar).data(renglon);
        }else{
            alert(objetoJSON.mensaje);
        }
        }
      });

}
function recuperarRegistroActualizar(id){
    alert(id);
    idSeleccionadoParaActualizar=id;
    $.ajax({
        url: "php/crud-denominacion.php",
        method: 'GET',
        data: {
            id: idSeleccionadoParaActualizar,
            accion: 'Read'
        },
        success: function( resultado ) {
            var objetoJSON = JSON.parse(resultado);
            if(objetoJSON.estado==1){
                document.getElementById("eje_temativo_actualizar").value = objetoJSON.eje_tematico;
                document.getElementById("modalidad_actualizar").value = objetoJSON.modalidad;
                document.getElementById("descripcion_actualizar").value = objetoJSON.descripcion;
                document.getElementById("factor_actualizar").value = objetoJSON.factor;
                document.getElementById("ejemplos_actualizar").value = objetoJSON.ejemplos;
            }else{
                alert(objetoJSON.mensaje);
            }
            alert("Hola"+resultado);
        }
      });
}

function actionDelete(){
    $.ajax({
        url: "php/crud-denominacion.php",
        method: 'POST',
        data: {
            id: idSeleccionadoParaEliminar,
            accion: 'delete'
        },
        success: function( resultado ) {
            var objetoJSON = JSON.parse(resultado);
            if(objetoJSON.estado==1){
                //Quitar el registro eliminado
                var tabla = $('#example1').DataTable();

                tabla.row("#row_"+idSeleccionadoParaEliminar).remove().draw();

                alert(objetoJSON.mensaje);
                $('#modal-default').modal('hide'); //hide = ocultar, show=mpstrar
            }else{
                alert(objetoJSON.mensaje);
            }
        }
      });
    //alert("Eliminar11");
}

function identificarEliminar(id){
    //alert("El registro seleccionado para eliminar es el siguiete: "+id);
    idSeleccionadoParaEliminar=id;
}
function identificarActualizar(id){
    //alert("El registro seleccionado actualizar es el siguiete: "+id);
    idSeleccionadoParaActualizar=id;
}