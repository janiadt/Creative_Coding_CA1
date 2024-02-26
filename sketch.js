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
  
  // Data title
  push();
  translate(canvasWidth/2, 10);
  text("Data set title goes here",0 ,0);
  pop();

  numBars = data.rows.length;
  // Cleaning up data
  for(let i = 0; i < numBars; i++){
    cleanData.push(data.rows[i].obj);
  }
  console.log(cleanData);

  // Making our object literal to pass to the barchart class
  let barChart01 = {
    chartTitle: "Median Annual Earning in Ireland Clustered",
    chartType: "clustered",
    data: cleanData,
    fullLength: false,
    // we need to make the y value and array for a stacked bar chart.
    yDataValue: ["Male", "Female"],
    yDataDescription: "Statistic",
    yDataDescriptionSize: 20,
    xDataValue: "Age Group",
    xPos: 130,
    yPos: 400,
    chartWidth: 300,
    chartHeight: 300,
    labelTextSize: 15,
    axisLineColor: "#282b29",
    labelColor: "#332f2f",
    barWidth: 15,
    numTicks: 10,
    axisLineWeight: 1,
    labelPadding: 10,
    labelRotation: 45,
    titleSize: 20,
    barColor: ["#db701f", "#7b42f5"],
    chartStrokeWidth:0.8
}

let barChart02 = {
  chartTitle: "Median Annual Earning in Ireland Stacked",
  chartType: "stacked",
  data: cleanData,
  fullLength: true,
  // we need to make the y value and array for a stacked bar chart.
  yDataValue: ["Male", "Female"],
  yDataDescription: "Statistic",
  yDataDescriptionSize: 20,
  xDataValue: "Age Group",
  xPos: 300,
  yPos: 0,
  chartWidth: 300,
  chartHeight: 300,
  labelTextSize: 15,
  axisLineColor: "#282b29",
  labelColor: "#332f2f",
  barWidth: 30,
  numTicks: 10,
  axisLineWeight: 1,
  labelPadding: 10,
  labelRotation: 45,
  titleSize: 20,
  barColor: ["#db701f", "#7b42f5"],
  chartStrokeWidth:0.8
}

let barChart03 = {
  chartTitle: "Median Annual Earning in Ireland",
  chartType: "stacked",
  data: cleanData,
  fullLength: true,
  // we need to make the y value and array for a stacked bar chart.
  yDataValue: ["Male", "Female"],
  yDataDescription: "Statistic",
  yDataDescriptionSize: 20,
  xDataValue: "Age Group",
  xPos: -800,
  yPos: 500,
  chartWidth: 300,
  chartHeight: 300,
  labelTextSize: 15,
  axisLineColor: "#282b29",
  labelColor: "#332f2f",
  barWidth: 30,
  numTicks: 10,
  axisLineWeight: 1,
  labelPadding: 10,
  labelRotation: 45,
  titleSize: 20,
  barColor: ["#db701f", "#7b42f5"],
  chartStrokeWidth:0.8
}

let barChart04 = {
  chartTitle: "Median Annual Earning in Ireland",
  chartType: "clustered",
  data: cleanData,
  fullLength: false,
  // we need to make the y value and array for a stacked bar chart.
  yDataValue: ["Male", "Female"],
  yDataDescription: "Statistic",
  yDataDescriptionSize: 20,
  xDataValue: "Age Group",
  xPos: 550,
  yPos: 45,
  chartWidth: 500,
  chartHeight: 300,
  labelTextSize: 15,
  axisLineColor: "#282b29",
  labelColor: "#332f2f",
  barWidth: 15,
  numTicks: 10,
  axisLineWeight: 1,
  labelPadding: 10,
  labelRotation: 45,
  titleSize: 20,
  barColor: ["#db701f", "#7b42f5"],
  chartStrokeWidth:0.8
}

let pieChart01 = {
  chartTitle: "Median Annual Earning in Ireland",
  chartType: "clustered",
  data: cleanData,
  fullLength: false,
  // we need to make the y value and array for a stacked bar chart.
  yDataValue: ["Male", "Female"],
  yDataDescription: "Statistic",
  yDataDescriptionSize: 20,
  xDataValue: "Age Group",
  xPos: 500,
  yPos: -450,
  chartWidth: 400,
  chartHeight: 300,
  labelTextSize: 15,
  axisLineColor: "#282b29",
  labelColor: "#332f2f",
  pieRadius: 150,
  numTicks: 10,
  axisLineWeight: 1,
  labelPadding: 5,
  labelRotation: 45,
  titleSize: 20,
  pieSegmentColor: ["#db701f", "#7b42f5", "#eb7134", "#eb9f34", "#3486eb", "#2a1b4a"],
  chartStrokeWidth:0.8
}


// Making our barchart class from the object literal
barCharts.push(new BarChart(barChart01));
barCharts.push(new BarChart(barChart02));
barCharts.push(new HorizontalBarChart(barChart03));
barCharts.push(new HorizontalBarChart(barChart04));
barCharts.push(new PieChart(pieChart01));



}
// calling the class' render function for each barchart in our barchart array
function draw(){
  noLoop();
  barCharts.forEach(bar => bar.render());
}