/*  NewApp  */
//Json for mathjs
math.config({
  number: 'BigNumber',
  precision: 14,
});
//Class and methods
class Operation {
  constructor(operation, factor, scope) {
    this.operation = operation;
    this.factor = factor;
    this.scope = scope;
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
  //string mathjs evaluation without scope
  evaluateM(operation) {
    try {
      let result = math.evaluate(this.commaC(operation));
      return result;
    } catch (e) {
      return (operation = undefined);
    }
  }
  //string mathjs evaluation
  setScope(operation, scope) {
    try {
      let result = math.evaluate(this.commaC(operation), scope);
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
//methods for change the ui
class Ui {
  constructor(ans) {
    this.ans = ans;
  }
  //create answers
  addAnswer(ans) {
    const AlertAns =
      '<br /><div class="alert alert-success alert-dismissible mx-auto" role="alert" style="width: 65%"> The answer is  ';
    const AlertAns2 =
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    const errorShow = `<div class="alert alert-dismissible alert-danger mx-auto" role="alert" style="width: 65%">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button> <strong>Invalid input!</strong>
        Write an operation and try again. </div>`;
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
  //pop up for input the derive factor
  fxEva(factor) {
    return new Promise((resolve) => {
      resolve(
        Swal.fire({
          title:
            '<h4 style="color:white">Which factor do you want to derive? Only one letter (a, b, c ... x, y, z)</h4>',
          input: 'text',
          html: `<hr><p class="text-center" style="color: white; font-size: 85%; width: 80%; margin-left:auto;  margin-right:auto">
                If you have [ x^2+1-y ] and you type "x",<br /> you will get [ 2*x ]</p>`,
          inputPlaceholder: 'Insert the variable to be derived here',
          padding: '0.2em',
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
          factor = result.value;
          return factor;
        }),
      );
    });
  }
  //pop up for the scope
  scopeDialog(scope) {
    scope = {};
    return new Promise((resolve) => {
      resolve(
        Swal.fire({
          title:
            '<h4 style="color:white; margin-bottom:-0.5rem"><b>Steps for evaluate</b></h4>',
          input: 'text',
          html: ` <hr><div><p style="color:white; text-align:justify"> To evaluate an algebraic expression according to its variables
           you must write the letters of the variables in the first box separated by a comma, 
           and their respective values in the box below separated by a comma as well. Make sure you are defining all variables,
            otherwise you will get an error.</p><br /><p style="color:white">
          For example, if you want to evaluate that "x=2" and "y=1", 
          you must put [x,y] in the top box and [2,1] in the bottom box. Try it yourself! </p><br />
                <span>
                <input autocomplete="off" aria-label="Type your message here" class="swal2-input" id="sc" placeholder="Type their letters here" type="text">
                </span></div>`,
          inputPlaceholder: 'Type their values here',
          padding: '0.2em',
          background: '#0f2537',
          inputAttributes: {
            'aria-label': 'Type your message here',
          },
          showCancelButton: true,
          cancelButtonColor: '#4e5d6c',
          confirmButtonColor: '#5cb85c',
          inputValidator: (value, letter) => {
            const rwInput = $('#sc').val();
            const rwInputArray = rwInput.split(',');
            const rwNumArray = value.split(',');
            const OPinput = $('#inputST').val();
            const checker = (arr, target) =>
              target.every((v) => arr.includes(v));
            const numcheck = rwNumArray.every(function (element) {
              return !isNaN(element);
            });
            letter = rwInput;
            if (!letter || !value) {
              return 'You need to write something!';
            }
            if (numcheck == false) {
              return 'You need to check the numbers';
            }
            if (checker(OPinput, rwInputArray) == false) {
              return 'You need to change your letters!';
            }
            if (rwNumArray.length != rwInputArray.length) {
              return 'Sure you wrote down enough numbers or letters?';
            }
          },
        }).then((result, letter, num) => {
          const rwInput = $('#sc').val();
          const rwInputArray = rwInput.split(',');
          const rwNum = result.value;
          const rwNumArray = rwNum.split(',');
          letter = rwInputArray;
          num = rwNumArray;
          for (let i = 0; i < rwNumArray.length; i++) {
            scope[letter[i]] = num[i];
          }
          return scope;
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
$('#scope').click(function () {
  const op = document.getElementById('inputST').value;
  const operation = new Operation(op);
  const show = new Ui();
  if ($('#inputST').val().length > 0) {
    show.scopeDialog().then((scope) => {
      const answer = operation.setScope(op, scope);
      return show.addAnswer(answer);
    });
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
  if ($('#inputST').val().length > 0) {
    show.fxEva().then((factor) => {
      const answer = operation.dXM(op, factor);
      return show.addAnswer(answer);
    });
  } else {
    return show.addAnswer(undefined);
  }
});
$('#rat').click(function () {
  const op = document.getElementById('inputST').value;
  const operation = new Operation(op);
  const show = new Ui();
  const answer = operation.ratioM(op);
  if (answer == 'undefined') {
    return show.addAnswer(undefined);
  } else {
    return show.addAnswer(answer);
  }
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
    $('#inputST').val('');
  }
});
