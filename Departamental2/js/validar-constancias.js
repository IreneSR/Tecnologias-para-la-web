var idSeleccionarConstanciaRecuperar=0;
function actionRead(){
    $.ajax({
        url: "php/validar-constancias.php",
        method: "GET",
        data: {
            accion: "Read"
        },
        success: function(resultado) {
            alert(resultado);
            var objetoJSON=JSON.parse(resultado);
            if (objetoJSON.estado==1){

                var tabla = $('#example1').DataTable();
                for(constancia of objetoJSON.constancias){
                    var botones =' <a class="btn btn-block btn-warning btn-flat" data-toggle="modal" data-target="#modal-Actualizar" href="#" onclick="accionRecuperarUnaConstancia('+constancia.id+')">';
                    botones= botones +'<i class="fas fa-tasks">';
                    botones= botones +'</i>';
                    botones= botones +'</a>';

                    tabla.row.add([
                        constancia.programa,
                        constancia.nombre,
                        constancia.actividad,
                        constancia.horas,
                        botones
                    ]).node().id = 'row_'+constancia.id;

                    tabla.draw(false);
                }

            }
        }
    });
}

function accionRecuperarUnaConstancia(id){
    idSeleccionarConstanciaRecuperar=id;
    $.ajax({
        url: "php/validar-constancias.php",
        method: "GET",
        data: {
            id:idSeleccionarConstanciaRecuperar,
            accion: "Read"
        },
        success: function(resultado) {
            //alert(resultado);
            var objetoJSON=JSON.parse(resultado);
            if(objetoJSON.estado==1){
                document.getElementById("nombre_validar").innerHTML=objetoJSON.nombre
                document.getElementById("actividad_validar").value=objetoJSON.actividad;
                document.getElementById("fecha_inicio_validar").value=objetoJSON.fecha_inicio;
                document.getElementById("fecha_fin_validar").value=objetoJSON.fecha_fin;
                document.getElementById("horas_validar").value=objetoJSON.horas;
                document.getElementById("observaciones_encargado").value=objetoJSON.observaciones;//

            }else{
                alert(objetoJSON.mensaje);
            }
        }
    });
}

function accionValidarConstancia(){
    var constancia_valida=document.getElementById("constancia_valida").value;
    var observaciones_encargado_validar=document.getElementById("observaciones_encargado").value;
    $.ajax({
        url: "php/validar-constancias.php",
        method: "POST",
        data: {
            id:idSeleccionarConstanciaRecuperar,
            valida:constancia_valida,
            observaciones_encargado:observaciones_encargado_validar,
            accion:"Update"
        },
        success: function(resultado) {
            alert(resultado);
            var objetoJSON=JSON.parse(resultado);
            if(objetoJSON.estado==1){
                alert(objetoJSON.mensaje);
                $('#modal-Actualizar').modal('hide');

                var tabla = $('#example1').DataTable();
                tabla.row("#row_"+idSeleccionarConstanciaRecuperar).remove().draw();
            }else{
                alert(objetoJSON.mensaje);
            }
        }
    });
}
