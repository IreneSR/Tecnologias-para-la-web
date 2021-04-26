//Variable global
var display = document.getElementById("display");
var iniciar = new Boolean(true);

function clickDigito(digito){
    if(iniciar==true){
        display.value=digito;
    }
    else{
        display.value=display.value+digito;
    }
    iniciar = false;
}

function clickDigito(digito){
    //var display = document.getElementById("display");
    display.value=display.value+digito;
    //alert("Click en el digito: "+ digito);
}

function limpiaDisplay(){
   // var display = document.getElementById("display");
    display.value="";
}

function presionaOperador(operador){
    //var display       = document.getElementById("display");
    display.value = display.value + operador;
}

function presionaIgual(){
	var resultado = eval(display.value);
	//alert(resultado);
	display.value = resultado;
}

function calculaAbreParentesis(operador){
       // var display=document.getElementById("display");
        display.value=display.value+operador;
    }
     
function calculaCierraParentesis(operador){
        //var display=document.getElementById("display");
        display.value=display.value+operador;
    }
     
function presionaPunto(operador){
        //var display=document.getElementById("display");
        display.value=display.value+operador;
    }

function calculaRaiz(){
    //Obtiene la expresion
    //var display = document.getElementById("display");
    //Evalua la expresion = genera un numero
    var numero = eval(display.value);
    //Calcular la raiz
    var raiz =Math.sqrt(numero);
    //Desplegar el resultado del calculo
    display.value = raiz;
}

function calculaln(){
    //var display=document.getElementById("display");
    var numero=eval(display.value);
    var log=Math.log(numero);
    display.value=log;
}

function calculalog(){
    //var display=document.getElementById("display");
    var numero=eval(display.value);
    var loga=Math.log10(numero);
    display.value=loga;
}

function calculaPorcentaje(){
    //var display=document.getElementById("display");
    var numero=eval(display.value);
    var porce=numero/100;
    display.value=porce;
}

function calculaPotencia(){
   // var display = document.getElementById("display");
        var pote= prompt("Potencia a la que se quiere elevar: ");
        var numero=eval(display.value); 
        var res= Math.pow(numero,pote);
         display.value = res;
}

function Factorial(){
    //var display=document.getElementById("display");
    var num=eval(display.value);
    var res = 1; 
    for (i=1; i<=num; i++) {
        res = res * i; 
    }
    display.value=res; 
}
