class HorizontalBarChart {
    // The constructor gets our chart object and assigns its values based on the object.
    constructor(obj){
        // Chart title and data
        this.chartTitle = obj.chartTitle;
        this.chartType = obj.chartType;
        this.data = obj.data;
        this.fullLength = obj.fullLength;
        this.yDataValue = obj.yDataValue;
        this.yDataDescription = obj.yDataDescription
        this.yDataDescriptionSize = obj.yDataDescriptionSize
        this.xDataValue = obj.xDataValue;
        // Chart position and width and height
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        // Chart styling
        this.labelTextSize = obj.labelTextSize;
        this.axisLineColor = obj.axisLineColor;
        this.labelColor = obj.labelColor;
        this.barWidth = obj.barWidth;
        this.numTicks = obj.numTicks;
        this.axisLineWeight = obj.axisLineWeight;
        this.labelPadding = obj.labelPadding;
        this.labelRotation = obj.labelRotation;
        this.titleSize = obj.titleSize;
        this.barColor = obj.barColor;
        this.chartStrokeWidth = obj.chartStrokeWidth;
        this.legendPadding = obj.legendPadding;
        this.tickValuePadding = obj.tickValuePadding;

    }

    // In order to render a horizontal bar chart instead of a vertical one, we need to inverse the values in all of the translates
    render(){
        noFill();
        strokeWeight(this.axisLineWeight);

        
        // Warning Errors
        if (this.chartType === "clustered" && this.fullLength === true){
            console.log("A 100% bar chart can not be made with a clustered or single type bar chart: " + this.chartTitle);
        }
      
        let gap = (this.chartHeight - (this.data.length * this.barWidth)) / (this.data.length + 1);
        
        let maxValue;
        let maxValues = [];

        for (let i = 0; i < this.yDataValue.length; i++){
            maxValues.push(max(this.data.map((row) => +row[this.yDataValue[i]]))); 
        }

        if (this.chartType ==="stacked"){
            // The for loop adds all y value components for the purposes of a stacked bar chart
            let sum = 0;
            for(let i = 0; i < this.yDataValue.length; i++) {
                sum += maxValues[i];
            }
            maxValue = sum;
        } 
        else {
            maxValue = max(maxValues);
        }
        
        
        // Value to be used to scale the bars
        let scaler = this.chartWidth / maxValue;

        // Rendering the chart lines
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColor);
      
        line(0, 0, this.chartWidth, 0);
        line(0,0,0,-this.chartHeight);

        // Rendering the title
        push();
        noStroke();
        textStyle(BOLD);
        textSize(this.fontSize);
        textAlign(CENTER, CENTER);
        fill(this.labelColor);
        strokeWeight(this.chartStrokeWidth);
        textSize(this.titleSize);
        text(this.chartTitle, this.chartWidth/2, -this.chartHeight * 1.15);
        pop();
    
      
        // all labels and ticks for Y value
        push();
        for(let i = 0; i < this.numTicks + 1; i++){
            push();
            noStroke();
            translate(0,this.labelPadding);
            rotate(45);
            textSize(this.fontSize);
            fill(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textStyle(ITALIC);
            textSize(this.labelTextSize);
            translate(0, this.barWidth / this.numTicks + 1);
            if(this.fullLength){
                text(((round(100 / this.numTicks)) * i) + "%", 0, 0);
            }
            else{
                text((round(maxValue / this.numTicks)) * i, 0, 0);
            }
            pop();
            line(0,0,0,-10);
            // Scales with chart width now instead of height
            translate(this.chartWidth / this.numTicks,0);
            
        }
        pop();

        // Y value description
        push();
        noStroke();
        translate(this.chartWidth/2,this.yDataDescriptionSize + 40);
        textSize(this.fontSize);
        textAlign(CENTER, CENTER);
        fill(this.labelColor);
        strokeWeight(this.chartStrokeWidth);
        textSize(this.yDataDescriptionSize);
        text(this.data[0][this.yDataDescription], 0, 0);
        pop();

        // Rendering the legend by iterating through our y values
        push();
        translate(this.chartWidth + this.legendPadding,-this.chartHeight/1.2);
        for(let i = 0; i < this.yDataValue.length; i++){
            push();
            noStroke();
            textSize(this.fontSize);
            textAlign(LEFT, CENTER);
            fill(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            text(this.yDataValue[i], 0, 0);
            pop();
            push();
            let t = i % this.barColor.length;
            fill(this.barColor[t]);
            translate(-15,-7);
            rect(0,0,10,10);
            pop();
            translate(0,20);
        }
        pop();
        
        
        if (this.chartType ==="stacked"){
            translate(0, -this.chartHeight);
            translate(0, -(this.barWidth));
        } 
        else {
            translate(0, -(this.chartHeight + this.barWidth))
        }
       
        for(let i = 0; i < this.data.length; i++){
            
            translate(0, gap + this.barWidth)

            // X data values and labels
            push();
            noStroke();
            textSize(this.fontSize);
            textAlign(RIGHT, CENTER);
            fill(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            // If it's a stacked bar chart, get the half of the bar
            if (this.chartType !== "stacked"){
                translate(-this.labelPadding,this.barWidth); 
            } else {
                translate(-this.labelPadding,this.barWidth/2); 
            }
            text(this.data[i][this.xDataValue], 0, 0);
            pop();         
            pop();

            // Drawing the bars
            push();
            //Nested loop for each y data value that draws the bars
            for(let j = 0; j < this.yDataValue.length; j++){

                
                // Calculating the max value for each bar for the purposes of the 100% bar chart
                let barMaxValues = [];
                let barMaxValue = 0;
                for(let m = 0; m < this.yDataValue.length; m++){
                    barMaxValues.push(+this.data[i][this.yDataValue[m]]);
                }

                let sum = 0;
                for(let m = 0; m < this.yDataValue.length; m++){
                    
                    sum += barMaxValues[m];
                }

                barMaxValue = sum;

                // If it's a full 100% length bar chart, do the adjusted barHeight calculation. If not, just do the normal one
                let barHeight = 0;
                if (this.fullLength === true){
                    barHeight = (this.data[i][this.yDataValue[j]] / barMaxValue) * this.chartHeight;  
                } else {
                    barHeight = this.data[i][this.yDataValue[j]] * scaler;
                }

                // End calculation
               
                let t = j % this.barColor.length;
                fill(this.barColor[t]);
                // Drawing a rectangle with the barheight and width, and then translating to the bar height and drawing another one.
                // If the chart type is stacked, put the bar on the other bar
                if (this.chartType === "stacked"){
                    rect(0, 0, barHeight, this.barWidth);
                    translate(barHeight, 0);
                    
                }
                // If the chart type is clustered, put the bar next to the other bar
                else {
                    rect(0, 0, barHeight, this.barWidth);
                    translate(0,this.barWidth);
                
                }
            }
            pop();
                
        } 
         
    }
}