document.querySelector("input[value='float']").addEventListener("click", function () {
  document.querySelector("input[name='float']").disabled = !document.querySelector("input[name='float']").disabled;
});

document.querySelector("input[name='sort']").addEventListener("click", function () {
  document.querySelector("select[name='sort']").disabled = !document.querySelector("select[name='sort']").disabled;
});

document.querySelector("input[type='reset']").addEventListener("click", function () {
  location.reload();
});
document.querySelector("input[type='submit']").addEventListener("click", checkOptions);
document.querySelector(".copy").addEventListener("click", getCopy);
console.log(Number.MIN_SAFE_INTEGER);
function checkOptions() {
  event.preventDefault();
  numbers = [];
  let minValue = parseInt(document.querySelector("input[name='min']").value);
  let maxValue = parseInt(document.querySelector("input[name='max']").value);
  let quantityValue = parseInt(document.querySelector("input[name='quantity']").value);

  minValue <= maxValue ? generateNumbers(minValue, maxValue, quantityValue) : showAlert("sequence");
}

function generateNumbers(min, max, quantity) {
  document.querySelector("input[value='float']").checked
    ? (floatValue = parseInt(document.querySelector("input[name='float']").value))
    : (floatValue = 0);
  if (document.querySelector("input[name='unique']").checked) {
    let maxQuantity;
    maxQuantity = Math.round((max - min) / Math.pow(0.1, floatValue) + 1);
    if (maxQuantity < quantity) {
      showAlert("quantity");
      quantity = maxQuantity;
      document.querySelector("input[name='quantity']").value = maxQuantity;
    }
  }

  let number = 0;
  for (let i = 0; i < quantity; i++) {
    number = (Math.random() * (max - min) + min).toFixed(floatValue);
    if (number == -0) {
      number = 0;
    } else if (document.querySelector("input[value='float']").checked) {
      number = parseFloat(number);
    }
    if (document.querySelector("input[name='unique']").checked) {
      if (numbers.includes(number)) {
        i--;
      } else {
        numbers[i] = number;
      }
    } else {
      numbers[i] = number;
    }
  }
  getNumbers();
}

function getNumbers() {
  if (document.querySelector("input[name='sort']").checked) {
    switch (document.querySelector("select[name='sort']").value) {
      case "ascending":
        numbers.sort((a, b) => a - b);
        break;
      case "descending":
        numbers.sort((a, b) => b - a);
        break;
    }
  }
  showNumbers();
}

function showNumbers() {
  let output = document.querySelector(".result textarea");
  let separate = document.querySelector("input[name='separate']").value;
  for (let n = 0; n < numbers.length; n++) {
    n == 0 ? (output.value = `${numbers[n]}`) : (output.value += `${separate} ${numbers[n]}`);
  }
}

function showAlert(info) {
  switch (info) {
    case "sequence":
      alert(
        `${document.querySelector("input[name='min']").value} is bigger than ${
          document.querySelector("input[name='max']").value
        }`
      );
      break;
    case "quantity":
      alert(
        `${document.querySelector("input[name='quantity']").value} is too big for <${
          document.querySelector("input[name='min']").value
        }; ${document.querySelector("input[name='max']").value}>`
      );
      break;
    case "copy":
      alert("Copied to clipboard");
      break;
  }
}

function getCopy() {
  event.preventDefault();
  let text = document.querySelector(".result textarea");
  if (text.value != "") {
    text.select();
    text.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(text.value);
    showAlert("copy");
  }
}
