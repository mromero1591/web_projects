var calculator = {
    caclElement: document.querySelector(".calculator"),
    inInitalState: true,
    result: {
        resultTextElement: document.querySelector(".result-text"),
    },
    
}

//event listener for the calculator.
calculator.caclElement.addEventListener('click', (event) => {
    //Get the tile that was clicked.
    let clickedTile = event.target;

    //Check to see if the tile clicked is a number. If it is then run the functions to insert the number.
    if(clickedTile.classList.contains("numbers")) {
        insertNumber(clickedTile.innerHTML);
    } else if (clickedTile.classList.contains("clear")) { //clear is clicked.
        clearResult();
        //if the state is not inital then make it.
        if(!calculator.inInitalState) {
            toggleinInitalState();
        } 
        calculator.result.resultTextElement.innerHTML = "0";
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

    }
}, false);

// Purpose: insert the number clicked into the result section.
// paramerters: the number clicked.
// returns: none
let  insertNumber = (number) => {
    //If the caclulator is in its inital state first clear out the result and then insert.
    if(calculator.inInitalState) {
        clearResult();
        toggleinInitalState();
        calculator.result.resultTextElement.innerHTML = number;
    } else {
        calculator.result.resultTextElement.innerHTML = calculator.result.resultTextElement.innerHTML += number;
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

// Purpose: toggles the inital state of the calculator.
// paramerters: none
// returns: none.
let toggleinInitalState = () => calculator.inInitalState ? calculator.inInitalState = false : calculator.inInitalState = true;