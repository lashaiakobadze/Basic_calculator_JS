var formula=document.getElementById("formula");
var display=document.getElementById("display");
var calculated=false;
var previousAns="";
var noOfOp=0;

display.value=0;

function insert(num) {
  if (calculated==true) {
    formula.value=previousAns+num;
    display.value=previousAns+num;
  } else if (isNaN(display.value) == true) {
     formula.value += num; 
     display.value = num;
  } else if (display.value != "0" && isNaN(display.value)== false) {
     formula.value += num;
     display.value += num;
  } else if (display.value == "0" && num != 0) {
     formula.value += num;
     display.value = num;
     }
  calculated=false;
  noOfOp=0;
}

function operator(op){
  let lastChar = formula.value[formula.value.length-1];
  let origin=display.value;
  if (noOfOp<2) { //only 2 consecutive operators allowed
  display.value=op;
  if (calculated==true) {
    formula.value=previousAns+op;
  } else if (Number(origin)!= NaN) {
      formula.value+=op; //display value=number
      } else if (op="-" && /[+/*]/.test(lastChar)==true) {
      formula.value+=op;           
      }
  calculated=false;
  noOfOp+=1;
  }
}

function clean(){
  formula.value="";
  display.value=0;
  calculated=false;
  previousAns="";
  var noOfOp=0;
}

function back(){
  if (display.value!="0" && formula.value!="") {
    if (display.value.length==1 && formula.value.length==1){
      formula.value="";
      display.value=0;
    } else {
        formula.value=formula.value.slice(0,-1);
        display.value=display.value.slice(0,-1);
    }
  }
}

function percent(){
  let percentform = eval(display.value+"/100").toString();
  let removelength = display.value.length; 
  display.value= percentform;
  formula.value = formula.value.slice(0, -removelength) + percentform; 
}

function state(){
  if (Number(display.value) != "NaN"){
      if (Number(display.value) > 0) {
        let state= "-" + display.value;
        let removelength = display.value.length; 
        formula.value = formula.value.slice(0,-removelength) + state;
        display.value = state; 
      } else if (Number(display.value) < 0) {
          let state = display.value.slice(1, display.value.length);
          let removelength = display.value.length; 
          formula.value = formula.value.slice(0,-removelength) + state;
          display.value = state; 
      }
    }
}

function decimal(){
  if (display.value.indexOf(".")==-1) {
    formula.value = formula.value +".";
    display.value = display.value +".";
  }
}

function equal(){
  let expression = formula.value;
  let lastChar = expression[expression.length-1];
      while (isNaN(lastChar) == true) {       
          expression = expression.slice(0, -1);
          lastChar = expression[expression.length-1];
          }
  let answer = eval(expression); //calculate
  if (Number.isInteger(answer) == false) {       
        if (answer.toString().split(".")[1].length > 4)
        answer = answer.toFixed(4);
      }
  formula.value = expression + "=" + answer;
  display.value = answer;
  calculated = true;
  previousAns = answer.toString();
}