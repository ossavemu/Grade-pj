/**************************************
 *********Anoher Calc App**************
 **************************************
 *For this projec I use jquery, mathjs*
 ***********and Bootstrap**************
 **************************************/
//Declarations for keep the answers and input
const InvalidAns = "<br /> Invalid input, please try again";
let AlertAns =
  '<br /><div class="alert alert-success alert-dismissible mx-auto" role="alert" style="width: 65%"> The answer is  ';
let AlertAns2 =
  '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
let inputstring;
//Calculate APP
const getClick = () => {
  //Method for catch the user input
  inputstring = document.getElementById("inputST").value;
  //JSon of MathJS
  math.config({
    number: "BigNumber",
    precision: 14,
  });
  //Comma to dot conversor, Could this be a method?
  if (inputstring.includes(",")) {
    inputstring = inputstring.replace(/[',']/gi, ".");
    //MathJS evaluation and logic to show mistakes
    try {
      let RigthAns = Number(math.evaluate(inputstring));

      if (isNaN(RigthAns)) {
        document.getElementById("answer").innerHTML = InvalidAns;
      } else
        document.getElementById("answer").innerHTML =
          AlertAns + RigthAns + AlertAns2;
    } catch (e) {
      document.getElementById("answer").innerHTML = InvalidAns;
    }
  } else
    try {
      let RigthAns = Number(math.evaluate(inputstring));
      if (isNaN(RigthAns)) {
        document.getElementById("answer").innerHTML = InvalidAns;
      } else
        document.getElementById("answer").innerHTML =
          AlertAns + RigthAns + AlertAns2;
    } catch (e) {
      document.getElementById("answer").innerHTML = InvalidAns;
    }
};
//Simplify App - note that the code and methods are from Calculate App
const SimplyF = () => {
  inputstring = document.getElementById("inputST").value;
  if (inputstring.includes())
    if (inputstring.includes(",")) {
      inputstring = inputstring.replace(/[',']/gi, ".");
    }
  try {
    let SipAns = math.simplify(inputstring).toString();
    if (inputstring === "") {
      document.getElementById("answer").innerHTML = InvalidAns;
    } else {
      document.getElementById("answer").innerHTML =
        AlertAns + SipAns + AlertAns2;
    }
  } catch (e) {
    document.getElementById("answer").innerHTML = InvalidAns;
  }
};
//Dereivative App - look line 79, It was decided that the derivative should be taken as a factor "x".
let factorder = "";
const Dx = () => {
  inputstring = document.getElementById("inputST").value;
  if (inputstring.includes(",")) {
    inputstring = inputstring.replace(/[',']/gi, ".");
  }
  Swal.fire({
    title:
      "<h4 style='color:black'>Which factor do you want to derive? Only one letter (a, b, c ... x, y, z)</h4>",
    input: "text",
    html: '<p class="text-center" style="font-size: 85%; width: 80%; margin-left:auto;  margin-right:auto"> If you have [x^2+1-y] and you type "x", you will get 2*x</p>',
    inputPlaceholder: "Insert the variable to be derived here",
    padding: "0.7em",
    background: "#F5F5F5",
    inputAttributes: {
      "aria-label": "Type your message here",
    },
    showCancelButton: true,
    cancelButtonColor: "#797d80",
    confirmButtonColor: "#6c757d",
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
      if (value.length > 1) {
        return "Type only one letter!";
      }
      if (isNaN(value) == false) {
        return "Type only one letter!";
      }
    },
  }).then((result) => {
    if (result.value) {
      factorder = result.value;
      mathdx();
    }
  });

  function mathdx() {
    try {
      let DXAns = math.derivative(inputstring, factorder).toString();
      document.getElementById("answer").innerHTML =
        AlertAns + DXAns + AlertAns2;
    } catch (e) {
      document.getElementById("answer").innerHTML = InvalidAns;
    }
  }
};
//Rationalize App
const RtA = () => {
  inputstring = document.getElementById("inputST").value;
  if (inputstring.includes(",")) {
    inputstring = inputstring.replace(/[',']/gi, ".");
  }
  try {
    let RatioAns = math.rationalize(inputstring).toString();
    if (inputstring === "") {
      document.getElementById("answer").innerHTML = InvalidAns;
    } else {
      document.getElementById("answer").innerHTML =
        AlertAns + RatioAns + AlertAns2;
    }
  } catch (e) {
    document.getElementById("answer").innerHTML = InvalidAns;
  }
};
//Clear Input
const clearinput = () => {
  $("#inputST").val("");
  document.getElementById("answer").innerHTML = "";
};
