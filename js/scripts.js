const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

 
  addDigit(digit) {
    console.log(digit);   
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }
  addDigit(digit) {
    console.log(digit);   
    if (digit === "-" && this.currentOperationText.innerText.includes("-")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  processOperation(operation) {  
    if (this.currentOperationText.innerText === "" && operation !== "Cle") {          
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValueC,operationValueF,operationValueK,operationValueR;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "°C":
        operationValueC = current;
        operationValueF = (9/5*operationValueC)+32;
        operationValueK = (operationValueC + 273.15)
        operationValueR = (operationValueC + 273.15)*(9 / 5);
        this.updateScreen(operationValueC.toFixed(2)+"°C\n"+operationValueF.toFixed(2)+"°F\n"+operationValueK.toFixed(2)+" K\n"+operationValueR.toFixed(2)+" R\n"+"Você digitou "+current+" Usando "+operation);
        break;
      case "F":
        operationValueF = current;
        operationValueC = (operationValueF-32)/1.8;
        operationValueK = ((operationValueF-32)*5/9 + 273.15);
        operationValueR = (operationValueC + 273.15)*(9 / 5);
        this.updateScreen(operationValueC.toFixed(2)+"°C\n"+operationValueF.toFixed(2)+"°F\n"+operationValueK.toFixed(2)+" K\n"+operationValueR.toFixed(2)+" R\n"+"Você digitou "+current+" Usando "+operation,previous);
        break;
      case "K":
        operationValueK = current;
        operationValueC = operationValueK - 273.15;
        operationValueF = (operationValueK - 273.15) * 1.8 +32
        operationValueR = (operationValueC + 273.15)*(9 / 5);
        this.updateScreen(operationValueC.toFixed(2)+"°C\n"+operationValueF.toFixed(2)+"°F\n"+operationValueK.toFixed(2)+" K\n"+operationValueR.toFixed(2)+" R\n"+"Você digitou "+current+" Usando "+operation,previous);
        break;
      case "R":
        operationValueR = current;
        operationValueC = (operationValueR * (5/9)) - 273.15;
        operationValueF = (9/5*operationValueC)+32;
        operationValueK = (operationValueC + 273.15)
        operationValueR = (operationValueC + 273.15)*(9 / 5);
        this.updateScreen(operationValueC.toFixed(2)+"°C\n"+operationValueF.toFixed(2)+"°F\n"+operationValueK.toFixed(2)+" K\n"+operationValueR.toFixed(2)+" R\n"+"Você digitou "+current+" Usando "+operation,previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "Cle":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null,    
  ) {
    if (operationValue === null) {      
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      if (previous === 0) {
        operationValue = current;
      }      
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  changeOperation(operation) {
    const mathOperations = ["C", "F", "K", "R"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === "." || value === "-") {
      console.log(value);
      calc.addDigit(value);
    }
        
    else {
      calc.processOperation(value);
    }
  });
});
