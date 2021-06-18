<?php

    if(isset($_POST['accion']))
      $accion   = $_POST['accion'];
    else if(isset($_GET['accion']))
      $accion   = $_GET['accion'];
    include 'conexion.php';

    switch($accion){
      case 'create':
        accionCrear($conexion);
        break;
      case 'delete':
        accionEliminar($conexion);
        break;
      case 'Read':
        accionLeer($conexion);
        break;
      case 'Actualizar':
         accionActualizar($conexion);
         break;
      default:
        break;
    }

    function accionCrear($conexion){
      $respuesta = array();
      $eje_tematico = $_POST['eje_tematico'];
      $modalidad    = $_POST['modalidad'];
      $descripcion  = $_POST['descripcion'];
      $factor       = $_POST['factor'];
      $ejemplos     = $_POST['ejemplos'];
      

      $Query = "INSERT INTO denominacion (id, eje_tematico, modalidad, descripcion, factor, ejemplos) VALUES (NULL, '".$eje_tematico."', '".$modalidad."', '".$descripcion."', ".$factor.", '".$ejemplos."') ";
      $resultado = mysqli_query($conexion,$Query);
      if($resultado>=1){
        $respuesta['estado']=1; 
        $respuesta['mensaje']="El registro se creo con exito"; 
        $respuesta['id']=mysqli_insert_id($conexion); 
        echo json_encode($respuesta);
      }
      else{
        $respuesta['estado']=0; 
        $respuesta['mensaje']="Ocurrio un error desconocido"; 
        $respuesta['id'] = -1; 
        echo json_encode($respuesta);
      }
    }

    function accionEliminar($conexion){
       $respuesta = array();
       $id = $_POST['id'];
       $Query = "DELETE FROM denominacion WHERE denominacion.id = ".$id."";
       mysqli_query($conexion,$Query);
       $registrosEliminados=mysqli_affected_rows($conexion);
      
       if($registrosEliminados>=1){
          $respuesta['estado']=1; 
          $respuesta['mensaje']="El registro se creo con exito";
      }else{
          $respuesta['estado']=0; 
          $respuesta['mensaje']="El registro no se pudo eliminar";
      }
      echo json_encode($respuesta);
    }
    
    function accionLeer($conexion){
      $respuesta = array();
      if(isset($_GET['id'])){
        //quiero un solo registro
        $id = $_GET['id'];
        $Query ="SELECT * FROM denominacion WHERE id = ".$id."";
        $resultado = mysqli_query($conexion,$Query);
        $numero = mysqli_num_rows($resultado);
        if($numero==1){
          $row = mysqli_fetch_array($resultado);

          $respuesta["id"] =$row ["id"]; 
          $respuesta["eje_tematico"] = $row["eje_tematico"]; 
          $respuesta["modalidad"] = $row["modalidad"];
          $respuesta["descripcion"] = $row["descripcion"]; 
          $respuesta["factor"] = $row ["factor"];
          $respuesta["ejemplos"] = $row["ejemplos"]; 
          $respuesta["estado"]=1;
          $respuesta["mensaje"]= "Si hay registro para mostrar";
        }else{
          $respuesta["estado"]=0;
              $respuesta["mensaje"]= "Ocurrió un error desconocido";
        }
      }else{
        //Quiero todos los registros
        $Query ="SELECT * FROM denominacion";
        $resultado = mysqli_query($conexion,$Query); 
        $numero = mysqli_num_rows($resultado);
          if( $numero>=1){
              $respuesta["estado"]=1;
              $respuesta["mensaje"]= "Registros encontrados";
            
              $respuesta["denominaciones"]=array();

            while($row = mysqli_fetch_array($resultado)){ 
              $rowDenominacion = array();
            
              $rowDenominacion["id"] = $row["id"];
              $rowDenominacion["eje_tematico"] = $row["eje_tematico"];
              $rowDenominacion["modalidad"] = $row["modalidad"];
              $rowDenominacion["descripcion"] = $row["descripcion"];
              $rowDenominacion["factor"] = $row["factor"];
              $rowDenominacion["ejemplos"] = $row["ejemplos"];
          
              array_push($respuesta["denominaciones"], $rowDenominacion);
            
            }
          }else{
              $respuesta["estado"]=0;
              $respuesta["mensaje"]= "Registros no encontrados";
          }
        }
        

        echo json_encode($respuesta);
    }
    function accionActualizar($conexion){
      $id = $_POST['id'];
      $eje_tematico = $_POST['eje_tematico'];
      $modalidad    = $_POST['modalidad'];
      $descripcion  = $_POST['descripcion'];
      $factor       = $_POST['factor'];
      $ejemplos     = $_POST['ejemplos'];
      $Query ="UPDATE denominacion SET eje_tematico = '".$eje_tematico."', modalidad = '".$modalidad."', descripcion = '".$descripcion."', factor = ".$factor.", ejemplos = '".$ejemplos."' WHERE id = ".$id."";
      $resultado = mysqli_query($conexion,$Query);
      $numero = mysqli_affected_rows($conexion);
        if($numero>=1){
          $respuesta["estado"]=1;
          $respuesta["mensaje"]= "Registros encontrados";
        
          $respuesta["denominaciones"]=array();

        
      }else{
          $respuesta["estado"]=0;
          $respuesta["mensaje"]= "Error desconocido al actualizar";
      }
      echo json_encode($respuesta);
    }

?>