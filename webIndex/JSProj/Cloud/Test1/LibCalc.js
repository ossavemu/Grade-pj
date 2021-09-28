const getClick = () => {
  let inputstring = document.getElementById("inputST").value;
  const InvalidAns = "<br /> Invalid input, please try again";
  let AlertAns =
    '<br /><div class="alert alert-success alert-dismissible mx-auto" role="alert" style="width: 65%"> The answer is  ';
  let AlertAns2 =
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  math.config({
    number: "BigNumber",
    precision: 14,
  });
  if (inputstring.includes(",")) {
    inputstring = inputstring.replace(/[',']/gi, ".");
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
