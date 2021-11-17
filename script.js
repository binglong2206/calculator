const displayHistory = document.querySelector('.displayHistory')
const displayOutput = document.querySelector('.displayOutput')

const numpads = document.querySelectorAll('button.numpad')
const operators = document.querySelectorAll('button.operators')

let mainOperator = '';

numpads.forEach((button)=>{
    button.addEventListener('click', ()=>{ 
        if (displayOutput.textContent[0] !== '0' || displayOutput.textContent[1] == '.'){  //only allow input if first digit is NOT 0 or if second digit IS a decimal
        displayOutput.textContent += button.textContent;
        }
    })
})


operators.forEach((operator)=>{
    operator.addEventListener('click', ()=>{
        let latestOperator = operator.textContent;

        if (displayOutput.textContent === '' && displayHistory.textContent === '') return //disable operator is userInput is empty
        
        if (displayOutput.textContent === '' && displayHistory.textContent !== ''){ //if output is empty but have history, allow user to change operator
            displayHistory.textContent = displayHistory.textContent.slice(0,-1) + latestOperator;
            mainOperator = latestOperator;
            return
        }
        
        if (latestOperator === '=' && displayHistory.textContent === '') return //prevent user from pressing equal when theres only output but no history to compute against
        
        if (displayHistory.textContent !== '') {compute(latestOperator); return}//if both output and history is present, start compute 
        
        //if there is user input but no history, proceed to below
        //move userInput up to history and store the operator if there's only userInput and no history to compute 2 numbers yet
        displayHistory.textContent = displayOutput.textContent + latestOperator;
        displayOutput.textContent =''
        mainOperator = latestOperator;
    })
})

function compute(latestOperator){ 
    let history = parseFloat(displayHistory.textContent);
    let output = parseFloat(displayOutput.textContent);

    //if user presses equal, then simply remove history and compute the result onto the displayOutput
    if (latestOperator === '=') {
        switch(mainOperator){
            case '*': 
            displayOutput.textContent = history*output
            break;
            
            case '+': 
            displayOutput.textContent = history+output
            break;

            case '-': 
            displayOutput.textContent = history-output
            break;

            case '÷': 
            if (output == 0){
                alert('cant divide by 0')
                return displayOutput.textContent = ''
            } else {
                displayOutput.textContent = history/output
            }
        }
        return displayHistory.textContent = '';
    } 

    //if user presses anything other than equal, remove output and compute the result onto displayHistory using the MAIN/PREVIOUS clicked operator.
    //Save the latest operator after all is done
    displayOutput.textContent = ''; 
    if (mainOperator === '*'){displayHistory.textContent =( history * output)+ latestOperator} //push the latest operator up to history when a new operator is pressed for compute
    else if (mainOperator ==='+') {displayHistory.textContent = (history + output)+latestOperator}
    else if (mainOperator ==='-') {displayHistory.textContent = (history - output)+latestOperator}
    else if (mainOperator ==='÷') { 
        if (output == 0) {
        return alert("can't divide by 0 ya dumb dumb"); 
      } 
      else {displayHistory.textContent = (history / output) + latestOperator}
    
    mainOperator = latestOperator;
}}



function backSpace(){
    let tempNum = displayOutput.textContent.slice(0,-1) //slice out from starting position till end, but not inclusive of the ending position
    displayOutput.textContent = tempNum
}

function clearSpace(){
    displayOutput.textContent = '';
    displayHistory.textContent = '';
}

function checkDecimal(){
    if (!displayOutput.textContent.includes('.')){ //only allow decimal is decimal is NOT/FALSE in the output string
        displayOutput.textContent += '.'
    }
}

function plusMinus(){
    if (displayOutput.textContent[0] === '-'){
        displayOutput.textContent = displayOutput.textContent.slice(1)
    } else {
        displayOutput.textContent = '-' + displayOutput.textContent
    }
}
