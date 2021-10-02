/*  NewApp  */
//Json for mathjs
math.config({
  number: 'BigNumber',
  precision: 14,
});
//Class and methods
class Operation {
  constructor(operation, factor) {
    this.operation = operation;
    this.factor = factor;
  }
  //float numbers, adjust format
  commaC(operation) {
    if (operation.includes(',')) {
      operation = operation.replace(/[,]/gi, '.');
      return operation;
    } else {
      return operation;
    }
  }
  //string mathjs evaluation
  evaluateM(operation) {
    try {
      let result = math.evaluate(this.commaC(operation));
      return result;
    } catch (e) {
      return (operation = undefined);
    }
  }
  //method for simp
  simpM(operation) {
    try {
      let result = math.simplify(this.commaC(operation));
      return result;
    } catch (e) {
      return (operation = undefined);
    }
  }
  //method for dx
  dXM(operation, factor) {
    try {
      let result = math.derivative(this.commaC(operation), factor);
      return result;
    } catch (e) {
      return (operation = undefined);
    }
  }
  //method for rationalize
  ratioM(operation) {
    try {
      let result = math.rationalize(this.commaC(operation));
      return result;
    } catch (e) {
      return (operation = undefined);
    }
  }
}
//method for show the anwers
class Ui {
  addAnswer(ans) {
    const AlertAns =
      '<br /><div class="alert alert-success alert-dismissible mx-auto" role="alert" style="width: 65%"> The answer is  ';
    const AlertAns2 =
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    const errorShow = `<div class="alert alert-dismissible alert-danger mx-auto" role="alert" style="width: 65%">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button> <strong>Invalid input!</strong> Please try </div>`;
    const answerA = document.getElementById('ans');
    const element = document.createElement('div');
    if (ans === undefined) {
      element.innerHTML = errorShow;
      return answerA.insertBefore(element, answerA.firstChild);
    } else {
      element.innerHTML = AlertAns + ans + AlertAns2;
      answerA.insertBefore(element, answerA.firstChild);
    }
  }
  fxEva(factor) {
    return new Promise((resolve) => {
      resolve(
        Swal.fire({
          title:
            '<h4 style="color:white">Which factor do you want to derive? Only one letter (a, b, c ... x, y, z)</h4>',
          input: 'text',
          html: `<p class="text-center" style="color: white; font-size: 85%; width: 80%; margin-left:auto;  margin-right:auto">
                If you have [ x^2+1-y ] and you type "x",<br /> you will get [ 2*x ]</p>`,
          inputPlaceholder: 'Insert the variable to be derived here',
          padding: '0.25em',
          background: '#0f2537',
          inputAttributes: {
            'aria-label': 'Type your message here',
          },
          showCancelButton: true,
          cancelButtonColor: '#4e5d6c',
          confirmButtonColor: '#5cb85c',
          inputValidator: (value) => {
            if (!value) {
              return 'You need to write something!';
            }
            if (value.length > 1) {
              return 'Type only one letter!';
            }
            if (isNaN(value) == false) {
              return 'Only type letters!';
            }
          },
        }).then((result) => {
          if (result.value.length) {
            factor = result.value;
            return factor;
          }
        }),
      );
    });
  }
}
//DOM
$('#bta').click(function () {
  const op = document.getElementById('inputST').value;
  const operation = new Operation(op);
  const show = new Ui();
  if (isNaN(operation.evaluateM(op)) == false) {
    const answer = operation.evaluateM(op);
    return show.addAnswer(answer);
  } else {
    return show.addAnswer(undefined);
  }
});
$('#simp').click(function () {
  const op = document.getElementById('inputST').value;
  const operation = new Operation(op);
  const show = new Ui();
  if (operation.simpM(op) == 'undefined') {
    return show.addAnswer(undefined);
  } else {
    return show.addAnswer(operation.simpM(op));
  }
});
$('#dx').click(function () {
  const op = document.getElementById('inputST').value;
  const operation = new Operation(op);
  const show = new Ui();
  // const factor = () => {
  //   return new Promise((resolve, reject) => {
  //     resolve(show.fxEva());
  //   });
  // };
  show.fxEva().then((factor) => {
    const answer = operation.dXM(op, factor);
    return show.addAnswer(answer);
  });
});
$('#rat').click(function () {
  const op = document.getElementById('inputST').value;
  const operation = new Operation(op);
  const show = new Ui();
  const answer = operation.ratioM(op);
  return show.addAnswer(answer);
});
$('#clear').click(function () {
  $('#inputST').val('');
  $('#ans').html('');
});
$('#inputST').on('keyup', function (k) {
  var keycode = k.keyCode || k.which;
  if (keycode == 13) {
    return $('#bta').trigger('click');
  }
  if (keycode == 27) {
    return $('#clear').trigger('click');
  }
});
