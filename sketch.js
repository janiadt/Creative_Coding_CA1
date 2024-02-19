// Data arrays instantiated

let data = [];
let cleanData = [];
let barCharts = [];
let numBars;

const canvasWidth = 1800;
const canvasHeight = 1000;

// Loading our data into our data array
function preload(){
  data = loadTable("data/DEA.csv", "csv", "header");
}

function setup(){
  createCanvas(canvasWidth, canvasHeight);
  background(200);
  angleMode(DEGREES);
  numBars = data.rows.length;
  // Cleaning up data
  for(let i = 0; i < numBars; i++){
    cleanData.push(data.rows[i].obj);
  }
  console.log(cleanData);

  // Making our object literal to pass to the barchart class
  let barChart01 = {
    chartType: "stacked",
    data: cleanData,
    yDataValue: "Male",
    xDataValue: "Age Group",
    xPos: 80,
    yPos: 400,
    chartWidth: 600,
    chartHeight: 300,
    labelTextSize: 20,
    axisLineColor: "#282b29",
    labelColor: "#332f2f",
    barWidth: 30,
    numTicks: 4,
    axisLineWeight: 1,
    barColor: "#bf394b",
    labelPadding: 10,
    labelRotation: 45,
    barColor: "#db701f",
    chartStrokeWidth:0.8
}

let barChart02 = {
  data: cleanData,
  yDataValue: "Total",
  xDataValue: "Year",
  xPos: 40,
  yPos: 400,
  chartWidth: 1200,
  chartHeight: 300,
  labelTextSize: 30,
  axisLineColor: "#282b29",
  labelColor: "#db1f83",
  barWidth: 10,
  numTicks: 4,
  axisLineWeight: 1,
  barColor: "#bf394b",
  labelPadding: 10,
  labelRotation: 45,
  barColor: "#db701f"
}

// Making our barchart class from the object literal
barCharts.push(new BarChart(barChart01));

}

// calling the class' render function for each barchart in our barchart array
function draw(){
  barCharts.forEach(bar => bar.render());
}