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
