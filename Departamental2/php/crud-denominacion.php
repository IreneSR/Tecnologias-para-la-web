<?php
/*Modelo de datos =MVC */
//$eje_tematico = $_POST['eje_tematico'];
//$eje_tematico = $_PUT['eje_tematico'];

$accion         =   $_POST['accion'];

include 'conexion.php';

switch ($accion){
    case 'Create':
        accionCrear($conexion);
        break;
    case 'Delete':
        accionEliminar($conexion);
        break;
    case 'Read':
        accionLeer($conexion);
        break;
    case 'Update':
        accionActualizar($conexion);
        break;
    default:
    # Code ...
        break;
}
function accionCrear($conexion){
    $respuesta      = array();

    $eje_tematico   =   $_POST['eje_tematico'];
    $modalidad      =   $_POST['modalidad'];
    $descripcion    =   $_POST['descripcion'];
    $factor         =   $_POST['factor'];
    $ejemplos       =   $_POST['ejemplos'];

    $Query="INSERT INTO denominacion (id, eje_tematico, modalidad, descripcion, factor, ejemplos) VALUES (NULL, '".$eje_tematico."', '".$modalidad."', '".$descripcion."', ".$factor.", '".$ejemplos."')";
    
    //esta funcion crea el registro de la base de datos
    $resultado = mysqli_query($conexion,$Query);
    if($resultado>=1){
        $respuesta['estado']    =1;
        $respuesta['mensaje']   ="El resultado se creo con Exito";
        $respuesta['id']        =mysqli_insert_id($conexion);
        echo json_encode($respuesta);
        //echo "El resultado se creo con Exito y tu id es: ".mysqli_insert_id($conexion);
    }
    else {
        $respuesta['estado']    =0;
        $respuesta['mensaje']   ="Ocurrio un error desconocido";
        echo json_encode($respuesta);
        //echo "Ocurrio un error desconocido";
    }
}

function accionEliminar($conexion){
    $id = $_POST['id'];
    //codificar para eliminar el registro
}

function accionleer($conexion){
    //isset= me permite saber si me esta enviando el parametro id
    if(isset($_GET['id']))
    $id = $_GET['id'];

    //codificar para leer todos los registros
}

function  accionActualizar($conexion){
    $id             =   $_POST['id'];
    $eje_tematico   =   $_POST['eje_tematico'];
    $modalidad      =   $_POST['modalidad'];
    $descripcion    =   $_POST['descripcion'];
    $factor         =   $_POST['factor'];
    $ejemplos       =   $_POST['ejemplos'];
}
?>