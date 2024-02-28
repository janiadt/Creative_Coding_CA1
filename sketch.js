// Data arrays instantiated

// Setting up two different data set slots
let data1 = [];
let cleanData1 = [];
let data2 = [];
let cleanData2 = [];
let barCharts = [];
let numBarsSlot1;
let numBarsSlot2;

const canvasWidth = 1800;
const canvasHeight = 1000;

// Loading our data into our data array
function preload(){
  data1 = loadTable("data/DEA.csv", "csv", "header");
  data2 = loadTable("data/DEAtrend.csv", "csv", "header");
}

function cleanData(cleanArray, rawData, dataNumBars){
  for(let i = 0; i < dataNumBars; i++){
    cleanArray.push(rawData.rows[i].obj);
  }
}

function setup(){
  createCanvas(canvasWidth, canvasHeight);
  background(200);
  angleMode(DEGREES);

  numBarsSlot1 = data1.rows.length;
  numBarsSlot2 = data2.rows.length;
  // Cleaning up data
  cleanData(cleanData1, data1, numBarsSlot1);
  cleanData(cleanData2, data2, numBarsSlot2);

  console.log(cleanData1);

  // Making our object literal to pass to the barchart class with all of our desired values
  let barChart01 = {
    chartTitle: "Median Annual Earning in Ireland Clustered",
    chartType: "clustered",
    data: cleanData1,
    fullLength: false,
    // we need to make the y value and array for a stacked bar chart.
    yDataValue: ["Male", "Female"],
    yDataDescription: "Statistic",
    yDataDescriptionSize: 15,
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
    chartStrokeWidth:0.8,
    legendPadding: 40,
    tickValuePadding: 60
}

let barChart02 = {
  chartTitle: "Trend of Average Annual Pay Sorted By Gender",
  chartType: "clustered",
  data: cleanData2,
  fullLength: false,
  // we need to make the y value and array for a stacked bar chart.
  yDataValue: ["Male", "Female"],
  yDataDescription: "Statistic",
  yDataDescriptionSize: 15,
  xDataValue: "Year",
  xPos: 300,
  yPos: 0,
  chartWidth: 300,
  chartHeight: 300,
  labelTextSize: 15,
  axisLineColor: "#282b29",
  labelColor: "#332f2f",
  barWidth: 8,
  numTicks: 10,
  axisLineWeight: 1,
  labelPadding: 15,
  labelRotation: 45,
  titleSize: 20,
  barColor: ["#db701f", "#7b42f5"],
  chartStrokeWidth:0.8,
  legendPadding: 40,
  tickValuePadding: 60
}

let barChart03 = {
  chartTitle: "Median Annual Earning in Ireland By Gender",
  chartType: "stacked",
  data: cleanData1,
  fullLength: true,
  // we need to make the y value and array for a stacked bar chart.
  yDataValue: ["Male", "Female"],
  yDataDescription: "Statistic",
  yDataDescriptionSize: 15,
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
  labelPadding: 15,
  labelRotation: 45,
  titleSize: 20,
  barColor: ["#db701f", "#7b42f5"],
  chartStrokeWidth:0.8,
  legendPadding: 40
}

let barChart04 = {
  chartTitle: "Median Annual Earning in Ireland By Gender",
  chartType: "clustered",
  data: cleanData1,
  fullLength: false,
  // we need to make the y value and array for a stacked bar chart.
  yDataValue: ["Male", "Female"],
  yDataDescription: "Statistic",
  yDataDescriptionSize: 15,
  xDataValue: "Age Group",
  xPos: 550,
  yPos: 45,
  chartWidth: 300,
  chartHeight: 300,
  labelTextSize: 15,
  axisLineColor: "#282b29",
  labelColor: "#332f2f",
  barWidth: 15,
  numTicks: 10,
  axisLineWeight: 1,
  labelPadding: 15,
  labelRotation: 45,
  titleSize: 20,
  barColor: ["#db701f", "#7b42f5"],
  chartStrokeWidth:0.8,
  legendPadding: 40
}

let pieChart01 = {
  chartTitle: "Distribution of Median Annual Earning by Age and Gender",
  chartType: "clustered",
  data: cleanData1,
  // we need to make the y value and array for a stacked bar chart.
  yDataValue: ["Male", "Female"],
  yDataDescription: "Statistic",
  yDataDescriptionSize: 15,
  xDataValue: "Age Group",
  xPos: 500,
  yPos: -450,
  chartWidth: 400,
  chartHeight: 300,
  labelTextSize: 15,
  axisLineColor: "#282b29",
  labelColor: "#332f2f",
  pieRadius: 150,
  axisLineWeight: 1,
  labelPadding: 0,
  labelRotation: 45,
  titleSize: 20,
  pieSegmentColor: ["#db701f", "#7b42f5", "#eb7134", "#eb9f34", "#3486eb", "#2a1b4a"],
  chartStrokeWidth:0.8,
  legendPadding: 40
}

let barChart05 = {
  chartTitle: "Median Annual Earning in Ireland Stacked",
  chartType: "stacked",
  data: cleanData1,
  fullLength: false,
  // we need to make the y value and array for a stacked bar chart.
  yDataValue: ["Male", "Female"],
  yDataDescription: "Statistic",
  yDataDescriptionSize: 15,
  xDataValue: "Age Group",
  xPos: -200,
  yPos: 495,
  chartWidth: 300,
  chartHeight: 300,
  labelTextSize: 15,
  axisLineColor: "#282b29",
  labelColor: "#332f2f",
  barWidth: 30,
  numTicks: 10,
  axisLineWeight: 1,
  labelPadding: 15,
  labelRotation: 45,
  titleSize: 20,
  barColor: ["#db701f", "#7b42f5"],
  chartStrokeWidth:0.8,
  legendPadding: 40,
  tickValuePadding: 60
}


// Making our barchart class from the object literal
barCharts.push(new BarChart(barChart01));
barCharts.push(new BarChart(barChart02));
barCharts.push(new HorizontalBarChart(barChart03));
barCharts.push(new HorizontalBarChart(barChart04));
barCharts.push(new PieChart(pieChart01));
barCharts.push(new BarChart(barChart05));



}
// calling the class' render function for each barchart in our barchart array
function draw(){
  noLoop();
  barCharts.forEach(bar => bar.render());
}