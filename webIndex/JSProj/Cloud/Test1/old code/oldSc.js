//variable for answers (at the end)
let outputClear = 0;
//raw operator
let opcode = 0;
//raw numbers
let numcode = [0, 0];
// operator characters - I use null to correct an error, which I don't understand why it occurs.
let operatorsRaw = ["+", "-", "/", null, "*"];
/*call promt and save the answer*/
let rw = (AlfaPromtString = () => {
  rw = prompt(
    "Enter your arimetric problem with this syntax A + B, and we give you the answer"
  );
  return this;
});
// operations index finder
let ix = (getIndex = () => {
  for (let i = 0; i < operatorsRaw.length + 1; i++) {
    if (rw.includes(operatorsRaw[i])) {
      ix = rw.indexOf(operatorsRaw[i]);
    } else i++;
  }
  return this;
});
//finder for: numbers, comma index, undebugged operators and return clean numbers
let coma0;
let coma1;
let ch0;
let ch1;
let WellNumbers = [0, 0];
function searchNumberRaw() {
  opcode = rw.charAt(ix);

  numcode[0] = rw.substring(0, ix);

  numcode[1] = rw.substring(ix + 1, rw.length);

  coma0 = numcode[0].indexOf(",");

  coma1 = numcode[1].indexOf(",");
  console.log(numcode[0]);
  console.log(numcode[1]);
  console.log(coma0);
  console.log(coma1);
  let auxa = numcode[0].substring(0, coma0);
  let auxb = numcode[1].substring(0, coma1);
  if (coma0 > 0) {
    if (auxa.includes(" ,")) {
      ch0 = "0." + Number(numcode[0].substring(coma0 + 1, numcode[0].length));
    } else {
      ch0 =
        numcode[0].substring(0, coma0) +
        "." +
        numcode[0].substring(coma0 + 1, numcode[0].length);
    }
  }
  if (coma1 > 0) {
    if (auxb.includes(" ,")) {
      ch0 = "0." + numcode[0];
    } else {
      ch1 =
        numcode[1].substring(0, coma1) +
        "." +
        numcode[1].substring(coma1 + 1, numcode[1].length);
    }
  }
  if (coma0 < 0) {
    ch0 = numcode[0];
  }

  if (coma1 < 0) {
    ch1 = numcode[1];
  }
  if ((coma0 = 0)) {
    ch0 = "0." + numcode[0].substring(1, numcode[0].length);
  }

  if ((coma1 = 0)) {
    ch1 = "0." + numcode[1].substring(1, numcode[1].length);
  }
  console.log(ch0);
  console.log(ch1);
  WellNumbers[0] = Number(ch0);
  WellNumbers[1] = Number(ch1);
  console.log(WellNumbers[0]);
  console.log(WellNumbers[1]);
  return this;
}
//operate arithmetically and display responses
function AlfCalc(numberA, operator, numberB) {
  if (isNaN(WellNumbers[0]) == true || isNaN(WellNumbers[1]) == true) {
    return alert(
      "Numeric format is not valid, please use rational numbers and take account the spaces after and before the operator."
    );
  } else {
  }
  if (isNaN(opcode) == false) {
    return alert(
      "Please insert an addition or a subtraction or a multiplication or a division"
    );
  } else
    for (let j = 0; j < operatorsRaw.length + 1; j++) {
      if (operator == operatorsRaw[j]) {
        switch (j) {
          case 0:
            outputClear = math.add(numberA, numberB);
            break;
          case 1:
            outputClear = math.substract(numberA, numberB);
            break;
          case 2:
            outputClear = math.divide(numberA, numberB);
            break;
          case 4:
            outputClear = math.multiply(numberA, numberB);
            break;
        }
        outputClear = parseFloat(outputClear);
        alert("The answer is " + outputClear);
      } else {
        j++;
      }
    }
  return this;
}

//call structure
function input() {
  AlfaPromtString();
  getIndex();
  searchNumberRaw();
  AlfCalc(WellNumbers[0], opcode, WellNumbers[1]);
}
