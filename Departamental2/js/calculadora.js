//Cualquier instruccion que se ponga fuera de las funciones se eejcutan
function holaMundo(){
    alert("Hola Mundo del JS 2");
}

function sumaNumeros(){
    //Propiedad
    var primerNumero        =  parseInt(document.getElementById("numero1").value);
    var segundoNumero       =   parseInt(document.getElementById("numero2").value);
    
    //Todo el objeto
    var parrafoResultado    =  document.getElementById("resultado");
    
    var resultado           =  primerNumero + segundoNumero;
   
    parrafoResultado.innerHTML = "Resultado: " + resultado;

    //alert("Esta funcion son suma de dos numeros");
    //alert("Numero 1: " + document.getElementById("numero1").value);
    //alert("Numero 2: " + document.getElementById("numero2").value);
    //alert("Parrafo para el resultado: " + document.getElementById("resultado").innerHTML);
}

function restaNumeros(){
    var resultado = document.getElementById("numero1").value - document.getElementById("numero2").value;
    document.getElementById("resultado").innerHTML="Resultado: " + resultado; 
    //alert("Esta funcion son resta de dos numeros");
}

function multiplicaNumeros(){
    var resultado = document.getElementById("numero1").value * document.getElementById("numero2").value;
    document.getElementById("resultado").innerHTML="Resultado: " + resultado; 
    //alert("Esta funcion son multiplica de dos numeros");
}

function divideNumeros(){
    var resultado = document.getElementById("numero1").value - document.getElementById("numero2").value;
    document.getElementById("resultado").innerHTML="Resultado: " + resultado; 
    //alert("Esta funcion son divide de dos numeros");
}

