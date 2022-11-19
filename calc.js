const inp_element = document.querySelector('.inp');
const out_oper_element=document.querySelector('.oper .val');
const out_res_element=document.querySelector('.res .val');
const OPERATORS = ["+","-","*","/"];
const POWER = "POWER(",FACTORIAL="FACTORIAL";
let data={
    oper:[],
    form:[]
}
let ans=0;
/* buttons in calculator*/
let calculator_buttons = [
    {
        name : "rad",
        sym : "Rad",
        form : false,
        type : "key"
    },
    {
        name : "deg",
        sym : "Deg",
        form : false,
        type : "key"
    },
    {
        name : "square-root",
        sym : "√",
        form : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        sym : "x²",
        form : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        sym : "(",
        form : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        sym : ")",
        form : ")",
        type : "number"
    },
    {
        name : "clear",
        sym : "C",
        form : false,
        type : "key"
    },
    {
        name : "delete",
        sym : "⌫",
        form : false,
        type : "key"
    },
    {
        name : "pi",
        sym : "π",
        form : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        sym : "cos",
        form : "trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        sym : "sin",
        form : "trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        sym : "tan",
        form : "trigo(Math.tan,",
        type : "trigo_function"
    },{
        name : "7",
        sym : 7,
        form : 7,
        type : "number"
    },{
        name : "8",
        sym : 8,
        form : 8,
        type : "number"
    },{
        name : "9",
        sym : 9,
        form : 9,
        type : "number"
    },
    {
        name : "division",
        sym : "÷",
        form : "/",
        type : "operator"
    },
    {
        name : "e",
        sym : "e",
        form : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        sym : "acos",
        form : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },{
        name : "asin",
        sym : "asin",
        form : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },{
        name : "atan",
        sym : "atan",
        form : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        sym : 4,
        form : 4,
        type : "number"
    },{
        name : "5",
        sym : 5,
        form : 5,
        type : "number"
    },{
        name : "6",
        sym : 6,
        form : 6,
        type : "number"
    },{
        name : "multiplication",
        sym : "×",
        form : "*",
        type : "operator"
    },{
        name : "factorial",
        sym : "×!",
        form : FACTORIAL,
        type : "math_function"
    },{
        name : "exp",
        sym : "exp",
        form : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        sym : "ln",
        form : "Math.log",
        type : "math_function"
    },{
        name : "log",
        sym: "log",
        form : "Math.log10",
        type : "math_function"
    },{
        name : "1",
        sym : 1,
        form : 1,
        type : "number"
    },{
        name : "2",
        sym : 2,
        form : 2,
        type : "number"
    },{
        name : "3",
        sym : 3,
        form : 3,
        type : "number"
    },{
        name : "subtraction",
        sym: "–",
        form : "-",
        type : "operator"
    },{
        name : "power",
        sym : "x<span>y</span>",
        form : POWER,
        type : "math_function"
    },{
        name : "ANS",
        sym : "ANS",
        form : "ans",
        type : "number"
    },{
        name : "percent",
        sym : "%",
        form : "/100",
        type : "number"
    },{
        name : "comma",
        sym : ".",
        form : ".",
        type : "number"
    },{
        name : "0",
        sym : 0,
        form : 0,
        type : "number"
    },{
        name : "calculate",
        sym : "=",
        form : "=",
        type : "calculate"
    },{
        name : "addition",
        sym : "+",
        form : "+",
        type : "operator"
    }
];
/*createCaculator Button*/
function createCalculatorButtons(){
    const btns_per_row=8;
    let added_butns=0;
    calculator_buttons.forEach(button=>{
        if(added_butns % btns_per_row == 0){
            inp_element.innerHTML += `<div class="row"></div>`;

        }
        const row = document.querySelector(".row:last-child");
        row.innerHTML +=`<button id="${button.name}">
        ${button.sym}
        </button>`;
        added_butns++;
    })
}
createCalculatorButtons();
let RADIAN = true;
const rad_btns = document.getElementById("rad");
const deg_btns =document.getElementById("deg");
rad_btns.classList.add("active_angle");
function angleToggler(){
    rad_btns.classList.toggle("active_angle");
    deg_btns.classList.toggle("active_angle");
}
inp_element.addEventListener("click",event=>{
    const target_butn=event.target;
    calculator_buttons.forEach(buttn=>{
        if(buttn.name==target_butn.id) calculator(buttn);
    })
})
function calculator(button){
    if(button.type=="operator"){
           data.oper.push(button.sym);
           data.form.push( button.form);
    }else if(button.type=="number"){
        data.oper.push( button.sym );
        data.form.push( button.form);
    }
    else if(button.type=="trigo_function"){
            data.oper.push(button.sym+"(");
            data.form.push(button.form);
    }else if(button.type=="math_function"){
           let sym,form;
           if( button.name=="factorial"){
            sym="!";
            form=button.form;
            data.oper.push(sym);
            data.form.push(form);
           } 
           else if( button.name=="power"){
            sym="^(";
            form=button.form;
            data.oper.push(sym);
            data.form.push(form);
           }
           else if( button.name=="square"){
            sym="^(";
            form=button.form;
            data.oper.push(sym);
            data.form.push(form);
            data.oper.push("2)");
            data.form.push("2)");
           }

           else{
           sym=button.sym+"(";
           form=button.form+"(";
           data.oper.push(sym);
           data.form.push(form);
           }

    }else if(button.type=="key"){
        if( button.name=="clear"){
            data.oper=[];
            data.form=[];
            updateOutputResult(0);
        }else if( button.name=="delete"){
            data.oper.pop();
            data.form.pop();
        }else if( button.name == "rad"){
            RADIAN=true;
            angleToggler();
        }else if(button.name == "deg"){
            RADIAN=false;
            angleToggler();
        }

    }else if(button.type=="calculate"){
          formula_str = data.form.join('');
          let POWER_SEARCH_RESULT=search(data.form,POWER);
          let FACTORIAL_SEARCH_RESULT=search(data.form,FACTORIAL);
          const BASES = powerBaseGetter(data.formula,POWER_SEARCH_RESULT);
          BASES.forEach(base =>{
            let toReplace =base+POWER;
            let replacement="Math.pow("+base+",";
            formula_str=formula_str.replace(toReplace,replacement);
          })
          const NUMBERS=factorialNumberGetter(data.form,FACTORIAL_SEARCH_RESULT);
          NUMBERS.forEach(factorial=>{
            formula_str=formula_str.replace(factorial.toReplace,factorial.replacement);
          })
         
         let result;
          try{
            result=eval(formula_str);
          }catch( error){
            if(error instanceof SyntaxError){
                result="Syntax Error!"
                updateOutputResult(result);
                return;
             }
          }

          ans=result
          data.oper=[result];
          data.form=[result];

          updateOutputResult(result);
    }
    updateOutputOperation(data.oper.join(''));
}
/* factorialNumberGetter*/
function factorialNumberGetter(formula,FACTORIAL_SEARCH_RESULT){
    let numbers=[];
    let factorial_sequence=0;
    FACTORIAL_SEARCH_RESULT.forEach(factorial_index=>{
            let number=[];
            let next_index=factorial_index+1;
            let next_inp=formula[next_index];
            if( next_inp == FACTORIAL){
                factorial_sequence+=1;
                return;
            }
            let first_factorial_index=factorial_index-factorial_sequence;/*factorial */
            let previous_index=first_factorial_index-1;
            let parentheses_count=0; 
            while(previous_index >= 0){
                if( formula[previous_index] ="(") parentheses_count--;
                if( formula[previous_index] =")") parentheses_count++;
                 
                let is_operator = false;
                OPERATORS.forEach(OPERATOR=>{
                    if(formula[previous_index]==OPERATOR) is_operator=true;
                })
                if(is_operator && parentheses_count ==0)  break;
                   number.unshift(formula[previous_index]);
     
                   previous_index--;
            
            }
            let number_str =number.join('');
            const factorial="factorial(",close_parenthesis=")"
            let times=factorial_sequence+1;
            let toReplace = number_str + FACTORIAL.repeat(times);
            let replacement =factorial.repeat(times)+number_str+close_parenthesis.repeat(times);
            numbers.push({
                toReplace:toReplace,
                replacement:replacement
            })
            factorial_sequence=0;
        })
        return numbers;
} 
/*powerBaseGetter function*/
function powerBaseGetter(formula,POWER_SEARCH_RESULT){
    let powers_bases=[];
    POWER_SEARCH_RESULT.forEach(power_index=>{
        let base=[];
        let parentheses_count=0;
        let previous_index = power_index -1;
        while(previous_index >= 0){
            if( formula[previous_index] ="(") parentheses_count--;
            if( formula[previous_index] =")") parentheses_count++;
             
            let is_operator = false;
            OPERATORS.forEach(OPERATOR=>{
                if(formula[previous_index]==OPERATOR) is_operator=true;
            })
            let is_power = formula[previous_index] == POWER;
            if((is_operator && parentheses_count ==0) || is_power) break;
               base.unshift(formula[previous_index]);
 
               previous_index--;
        
        }
        powers_bases.push(base.join(''));
    })
    return powers_bases;
} 
/*searching in an array*/
function search(array,keyword){
    let search_result = [];
    array.forEach((element,index)=>{
        if( element == keyword ) search_result.push(index);
    })
    return search_result;
}
/* updating the output operation*/
function updateOutputOperation(operation){
    out_oper_element.innerHTML=operation
}
/*updating the output result*/
function updateOutputResult(result){
    out_res_element.innerHTML=result
}
/* factorial functions*/
function factorial( number){
    if(number ===0 || number===1) return 1;
    let result=1;
    for(let i=1;i<=number;i++){
        result*=i;
        if(result===Infinity) return Infinity
    }
    return result;
}
/*trigometric functions*/
function trigo(callback,angle){
    if(!RADIAN){
       angle=angle*Math.PI/180;
    }
    return callback(angle);
   }
   /*inverse trigometric function*/
   function inv_trigo(callback,value){
    let angle=callback(value);
    if(!RADIAN){
       angle=angle*180/Math.PI;
    }
    return angle;
   }
/*gamma functions*/
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}
  
