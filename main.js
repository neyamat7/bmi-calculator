// all selected element
// progress bar elements
const progressBarContainer = document.querySelector(".progress-bar-container");
const progressCircle = document.querySelector(".progress-circle");
const heightDisplay = document.querySelector(".height-display"); //input element to display height

// toggle button's elements
const toggleBtn = document.querySelector(".toggle-btn");
const toggleCircle = document.querySelector(".toggle-circle");

// height progress bar funcitonality
let initialValue = 75;
let isDraggable = false;
const minValue = 50;
const maxValue = 300;
const range = 250;

// initial value of progress bar
function barInitialValue(initialValue) {
  heightDisplay.value = parseInt(initialValue);
}
barInitialValue(initialValue);

progressBarContainer.addEventListener("mousedown", (e) => {
  isDraggable = true;
  updateProgressBar(e);

  progressBarContainer.addEventListener("mousemove", updateProgressBar);
  progressBarContainer.addEventListener("click", updateProgressBar);

  progressBarContainer.addEventListener("mouseup", () => {
    isDraggable = false;
  });
});

// update funtion according to mouse event
function updateProgressBar(e) {
  if (!isDraggable) return;
  const rect = progressBarContainer.getBoundingClientRect();
  const barLeft = rect.left;
  const barContainerWidth = rect.width;
  const clientX = e.clientX;
  const barCircleLeftSpace = clientX - barLeft;

  // progress bar width in percentage
  const progressCircleWidth = Math.round(
    (barCircleLeftSpace / barContainerWidth) * 100
  );

  if (progressCircleWidth < 0) progressCircleWidth = 0;
  if (progressCircleWidth > 100) progressCircleWidth = 100;

  progressCircle.style.width = `${progressCircleWidth}%`;

  // The width of progressCircle is relative to barContainer width in percentage.
  // And here, progressCircle is relative to the total cm range instead of barContainer,
  // because barContainer's full width actually contains the full cm range, like 20%
  // of the total range, as before we did, 20% of total barContainer width.
  //set the value of height display as bar value changes
  initialValue = minValue + range * (progressCircleWidth / 100);

  barInitialValue(initialValue);
}

//toggle button dynamic functionality
toggleBtn.addEventListener("click", (e) => {
  // add styles to toggle the button
  toggleCircle.classList.toggle("ml-[calc(100%-40px)]");
  toggleCircle.classList.toggle("female");
});

// BMI functionality
let weight = document.querySelector(".weight");
const height = document.querySelector(".height-display");
const submitBtn = document.querySelector(".submit");
const result = document.querySelector(".result");
const resultFraction = document.querySelector(".result-fraction");

// change the age and weight click event handler
const increaseAge = document.querySelector(".increase-age");
const decreaseAge = document.querySelector(".decrease-age");
let ageInput = document.querySelector(".age");

const increaseWeight = document.querySelector(".increase-weight");
const decreaseWeight = document.querySelector(".decrease-weight");

// increase value
function increaseValue(clickButton, increaseElement) {
  clickButton.addEventListener("click", () => {
    let inputValue = Number(increaseElement.value);
    inputValue++;
    increaseElement.value = inputValue;
  });
}

function decreaseValue(clickButton, increaseElement) {
  clickButton.addEventListener("click", () => {
    let inputValue = Number(increaseElement.value);
    inputValue--;
    increaseElement.value = inputValue;
  });
}

// age increase and decrease
increaseValue(increaseAge, ageInput);
decreaseValue(decreaseAge, ageInput);

// weight increase and decrease
increaseValue(increaseWeight, weight);
decreaseValue(decreaseWeight, weight);

// increase age
// increaseAge.addEventListener("click", () => {
//   let ageInput = document.querySelector(".age");
//   let ageValue = Number(ageInput.value);
//   ageValue++;
//   ageInput.value = ageValue;
// });

// // decrease age
// decreaseAge.addEventListener("click", () => {
//   let ageInput = document.querySelector(".age");
//   let ageValue = Number(ageInput.value);
//   ageValue--;
//   ageInput.value = ageValue;
// });

// // increase the weight value
// increaseWeight.addEventListener("click", () => {
//   let weightValue = Number(weight.value);
//   weightValue++;
//   weight.value = weightValue;
// });

// // decrease the weight value
// decreaseWeight.addEventListener("click", () => {
//   let weightValue = Number(weight.value);
//   weightValue--;
//   weight.value = weightValue;
// });

// bmi calculation functions
function bmiCalculation(weight, height) {
  let bmi = 0;
  //convert height into metre
  height = height / 100;
  // apply bmi formula
  bmi = (weight / (height * height)).toFixed(2);
  if (bmi.includes(".")) {
    const decimalIndex = bmi.indexOf(".");
    //slice the int value from string
    const intValue = bmi.slice(0, decimalIndex);
    result.textContent = intValue;
    // slice the fraction value from string
    let fractionValue = bmi.slice(decimalIndex);
    resultFraction.textContent = fractionValue;
  }
  // return the bmi
  return bmi;
}

// submit event handler
submitBtn.addEventListener("click", () => {
  let bmi = bmiCalculation(Number(weight.value), Number(height.value));
  // convert into number
  bmi = Number(bmi);

  // check bmi value to change color and size of related text
  let bmiStatus = document.querySelector(".bmi-result-show");
  if (bmi < 18.5) {
    bmiStatus.textContent = "Underweight";
    bmiStatus.style.color = "red";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiStatus.textContent = "Normal";
    bmiStatus.style.color = "green";
  } else if (bmi >= 29 && bmi < 30) {
    bmiStatus.textContent = "Overweight";
    bmiStatus.style.color = "red";
  } else if (bmi > 30) {
    bmiStatus.textContent = "Obesity";
    bmiStatus.style.color = "red";
  }
});
