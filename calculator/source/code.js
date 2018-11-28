var calculator = {
    caclElement: document.querySelector(".calculator"),
    inInitalState: true,
    calculatorLocked: false,
    operationState: "",
    result: {
        resultTextElement: document.querySelector(".result-text"),
    },
    firstNumber: 0,
    secondNumber: 0,

    setOperationState: function (operation) {
        return this.operationState = operation;
    },

    runOperation: function () {
        if(this.operationState == "division") {
            return (this.firstNumber / this.secondNumber).toFixed(5);
        } else if(this.operationState == "mulitplication") {
            return (this.firstNumber * this.secondNumber);
        } else if(this.operationState == "subtraction") {
            return (this.firstNumber - this.secondNumber);
        } else if(this.operationState == "addition") {
            return (this.firstNumber + this.secondNumber);
        }
    },
    
    toggleinInitalState: function () {
        // Purpose: toggles the inital state of the calculator.
        // paramerters: none
        // returns: none.
        if(this.inInitalState) {
            return this.inInitalState = false;
        } else if(!this.inInitalState) {
            this.firstNumber = 0;
            this.secondNumber = 0;
            this.inInitalState = true;
            return;
        }
    },
    toggleLockCalculator: function() {
        if(this.calculatorLocked) {
            this.calculatorLocked = false;
            this.operationState = "";
            return this.calculatorLocked;
        } else {
            this.calculatorLocked = true;
            return this.calculatorLocked;
        }
    }
}

//event listener for the calculator.
calculator.caclElement.addEventListener('click', (event) => {

    //Get the tile that was clicked.
    let clickedTile = event.target;

    //Ensure that the calculator is not locked.
    if(!calculator.calculatorLocked) {
        //Check to see if the tile clicked is a number. If it is then run the functions to insert the number.
        if(clickedTile.classList.contains("numbers")) {
            insertNumber(clickedTile.innerHTML);
        } else if (clickedTile.classList.contains("back")) { //back button was clicked.
            //if there are more then 1 number present then remove one number.
            if(calculator.result.resultTextElement.innerHTML.length > 1) {
                let tempResultText = calculator.result.resultTextElement.innerHTML.split('');
                tempResultText.pop();
                tempResultText = tempResultText.join('');
                calculator.result.resultTextElement.innerHTML = tempResultText;
            } else { //else if there is only 1 number then replce with a 0.
                calculator.result.resultTextElement.innerHTML = "0";
            }
        } else if (clickedTile.classList.contains("operations")) { //an operations tile was clicked.
            if(calculator.operationState === "" || clickedTile.classList.contains("equal")) { //dont allow another operation if one is already initiated.
                checkOperation(clickedTile);
            }
        }
    }
    if (clickedTile.classList.contains("clear")) { //clear is clicked.
        clearResult();
        //if the state is not inital then make it.
        if(!calculator.inInitalState) {
            calculator.toggleinInitalState();
        }
        if(calculator.calculatorLocked) {
            calculator.toggleLockCalculator();
        } 
        calculator.result.resultTextElement.innerHTML = "0";
    } 

    
}, false);

// Purpose: insert the number clicked into the result section.
// paramerters: the number clicked.
// returns: none
let  insertNumber = (number) => {
    //If the caclulator is in its inital state first clear out the result and then insert.
    if(calculator.inInitalState) {
        clearResult();    
        calculator.toggleinInitalState();
        calculator.result.resultTextElement.innerHTML = number;
    } else {
        if(calculator.result.resultTextElement.innerHTML == "0") {
            clearResult();
        }
        calculator.result.resultTextElement.innerHTML = calculator.result.resultTextElement.innerHTML += number;
    }
}

let checkOperation = (clickedTile) => {
    //check if we are entering the equal sign in order to end the operation.
    if(clickedTile.classList.contains("equal")) {
        calculator.secondNumber = parseInt(calculator.result.resultTextElement.innerHTML);
        let tempResult = calculator.runOperation();
        calculator.result.resultTextElement.innerHTML = tempResult;
        calculator.toggleLockCalculator();
    } else{ //perfom the operations assignment.
        //Save the operation first number.
        calculator.firstNumber = parseInt(calculator.result.resultTextElement.innerHTML);

        //check for the type of operation.
        if(clickedTile.classList.contains("division")) {
            calculator.setOperationState("division");
            clearResult();
        } else if(clickedTile.classList.contains("mulitplication")) {
            calculator.setOperationState("mulitplication");
            clearResult();
        } else if(clickedTile.classList.contains("subtraction")) {
            calculator.setOperationState("subtraction");
            clearResult();
        } else if(clickedTile.classList.contains("addition")) {
            calculator.setOperationState("addition");
            clearResult();
        }
    } 
}

// Purpose: checks to see if the caclulator is in its inital state
// paramerters: none
// returns: the inital state of the calculator.
let inInitialState = () => calculator.inInitalState;

// Purpose: clear the results
// paramerters: none
// returns: none.
let clearResult = () => {
    calculator.result.resultTextElement.innerHTML = "";
} 


