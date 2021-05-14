/*Controlador*/
function actionCreate(){
    var tabla = $('#example1').DataTable();
    var eje_tematico_create=document.getElementById("eje_tematico_create").value;
    var modalidad_create=document.getElementById("modalidad_create").value;
    var descripcion_create=document.getElementById("descripcion_create").value;
    var factor_create=document.getElementById("factor_create").value;
    var ejemplos_create=document.getElementById("ejemplos_create").value;

    //MODELO DE DATOS
    //Comunicarnos con el servidor, guardar en la base de datos y regresar algun mensaje de exito o fracaso de operación

    //VISTA
  
    //Guardar la informacion en la base de datos => $ = jquery
    $.ajax({
        url: "php/crud-denominacion.php",
        method:'POST',
        data: {
            eje_tematico: eje_tematico_create,
            modalidad   : modalidad_create,
            descripcion : descripcion_create,
            factor      : factor_create,
            ejemplos    : ejemplos_create,
            accion      : 'Create',
        },
        success: function( resultado) {
            //y luego, despues de la respuesta me muestra este alert
            alert("Esto me responde el servidor"+resultado);
        }
      });

  //*Botones*//
    var Botones ='<a class="btn btn-info btn-sm" data-toggle="modal" data-target="#modal-Actualizar" href="#">';
        Botones=Botones+' <i class="fas fa-pencil-alt">';
        Botones=Botones+' </i>';
        Botones=Botones+' Editar';
        Botones=Botones+' </a>';
        Botones=Botones+' <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#modal-default" href="#">';
        Botones=Botones+' <i class="fas fa-trash">';
        Botones=Botones+' </i>';
        Botones=Botones+' Eliminar';
        Botones=Botones+' </a>';
        
    //////////////

    tabla.row.add( [
        eje_tematico_create,
        modalidad_create,
        descripcion_create,
        Botones
    ] ).draw( false );

    alert("Crear registro(Create)")
}

function actionRead(){
    $.ajax({
        url: "php/crud-denominacion.php",
        method:'GET',
        data: {
            id     :10,
            accion : 'Read'
        },
        success: function( resultado ){
            alert("Esto me responde el servidor"+resultado)
;       }
    });
    alert("Leer y mostrar todos los datos")
}

function actionUpdate(){
    alert("Actualizar registo")

}

function actionDelete(){
    alert("Eliminar registro")

}
