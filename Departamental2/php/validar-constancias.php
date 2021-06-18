<?php
//valida = -1 Todavia no está valida
//valida = 0 Constancia no válida
//valida = 1 Constancia válida
if(isset($_POST['accion']))
    $accion   = $_POST['accion'];
else if(isset($_GET['accion']))
    $accion   = $_GET['accion'];

include 'conexion.php';

switch($accion){
    case 'Read':
        accionLeer($conexion);
      break;
    case 'Update': //validar constancias, Actualizar constancias
      accionValidarConstancia($conexion);
       break;
    default:
        # code...
      break;
  }

  function accionLeer($conexion){
    $respuesta = array();
    if(isset($_GET['id'])){
        $id=$_GET ['id'];

        $Query =" SELECT c.id, a.programa, a.nombre, c.actividad, c.actividad, c.horas, c.fecha_inicio, c.fecha_fin, c.observaciones ";
        $Query =$Query ." FROM alumno a, constancia c ";
        $Query =$Query ." WHERE c.valida = -1 ";
        $Query =$Query ." AND c.id = ".$id;
        $Query =$Query ." AND c.alumno_id = a.id ";

        $resultado = mysqli_query($conexion,$Query);
        $numero = mysqli_num_rows($resultado);

        if ($numero>=1){
          $respuesta["estado"]=1;
          $respuesta["mensaje"]= "Registros encontrados";

          $row = mysqli_fetch_array($resultado);

          $respuesta ["id"]            =$row['id'];
          $respuesta ["programa"]      =$row['programa'];
          $respuesta ["nombre"]        =$row['nombre'];
          $respuesta ["actividad"]     =$row['actividad'];
          $respuesta ["horas"]         =$row['horas'];
          $respuesta ["fecha_inicio"]  =$row['fecha_inicio'];
          $respuesta ["fecha_fin"]     =$row['fecha_fin'];
          $respuesta ["observaciones"] =$row['observaciones'];

        }else{
          $respuesta["estado"]=0;
          $respuesta["mensaje"]= "La constancia ya fue validada";
        }

    }else{

        $Query =" SELECT c.id, a.programa, a.nombre, c.actividad, c.actividad, c.horas ";
        $Query =$Query ." FROM alumno a, constancia c ";
        $Query =$Query ." WHERE c.valida = -1 ";
        $Query =$Query ." AND c.alumno_id = a.id ";

        $resultado = mysqli_query($conexion,$Query);
        $numero=mysqli_num_rows($resultado);
 
        if($numero>=1){
          
            $respuesta["estado"]=1;
            $respuesta["mensaje"]= "Registros encontrados";
            
            $respuesta["constancias"]=array();

            while($row = mysqli_fetch_array($resultado)){ 
                $rowConstancia = array();

                $rowConstancia["id"]        = $row["id"];
                $rowConstancia["programa"]  = $row["programa"];
                $rowConstancia["nombre"]    = $row["nombre"];
                $rowConstancia["actividad"] = $row["actividad"];
                $rowConstancia["horas"]     = $row["horas"];

                array_push($respuesta["constancias"], $rowConstancia);

              }
          }else{
            $respuesta["estado"]=0;
            $respuesta["mensaje"]= "Registros no encontrados";            
          }
    }
    echo json_encode($respuesta);
    mysqli_close($conexion);
  }

  function accionValidarConstancia($conexion){
    $respuesta=array();

    $id                       =$_POST['id'];
    $valida                   =$_POST['valida'];
    $observaciones_encargado  =$_POST['observaciones_encargado'];

    if($valida==0){
      $Query =" UPDATE constancia ";
      $Query =$Query ." SET valida=".$valida.", observaciones_encargado='".$observaciones_encargado."' ";
      $Query =$Query ." WHERE id=".$id;

      $resultado = mysqli_query($conexion,$Query);  
      $numero = mysqli_affected_rows($conexion);

      if($numero>=1){
        $respuesta["estado"]=1;
        $respuesta["mensaje"]= "La constancia se validó correctamente";
      }else{
        $respuesta["estado"]=0;
        $respuesta["mensaje"]= "La constancia ya estaba validada";
        }
      }else{
        $respuesta["estado"]=0;
        $respuesta["mensaje"]= "Aún falta implementar cuando la constancia si es válida";
        //Siempre hay que regresar mínimo estado y mensaje 
        //Me parece que este es el detalle. 
      }
    
    echo json_encode($respuesta);
    mysqli_close($conexion);
  }
  
?>