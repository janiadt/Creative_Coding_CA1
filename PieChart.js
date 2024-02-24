class PieChart {
    // The constructor gets our chart object and assigns its values based on the object.
    constructor(obj){
        this.chartTitle = obj.chartTitle;
        this.chartType = obj.chartType;
        this.data = obj.data;
        this.fullLength = obj.fullLength;
        this.yDataValue = obj.yDataValue;
        this.yDataDescription = obj.yDataDescription
        this.yDataDescriptionSize = obj.yDataDescriptionSize
        this.xDataValue = obj.xDataValue;
        this.xPos = obj.xPos;
        this.yPos = obj.yPos;
        this.chartWidth = obj.chartWidth;
        this.chartHeight = obj.chartHeight;
        this.labelTextSize = obj.labelTextSize;
        this.axisLineColor = obj.axisLineColor;
        this.labelColor = obj.labelColor;
        this.pieRadius = obj.pieRadius;
        this.axisLineWeight = obj.axisLineWeight;
        this.labelPadding = obj.labelPadding;
        this.labelRotation = obj.labelRotation;
        this.titleSize = obj.titleSize;
        this.pieSegmentColor = obj.pieSegmentColor;
        this.chartStrokeWidth = obj.chartStrokeWidth;

    }

    render(){
        noFill();
        strokeWeight(this.axisLineWeight);

        // Warning Errors
        if (this.chartType === "clustered" && this.fullLength === true){
            console.log("A 100% bar chart can not be made with a clustered or single type bar chart: " + this.chartTitle);
        }
        
      
        let gap = (this.chartWidth - (this.data.length * this.pieRadius)) / (this.data.length + 1);
        
        let maxValues = [];

        for (let i = 0; i < this.yDataValue.length; i++){
            maxValues.push(max(this.data.map((row) => +row[this.yDataValue[i]]))); 
        }

        // Rendering the chart lines
        
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColor);
      
        line(0, 0, this.chartWidth, 0);
        line(0,0,0,-this.chartHeight);

        this.chartWidth = this.pieRadius * this.data.length;
        // Rendering the title
        push();
        noStroke();
        textSize(this.fontSize);
        textAlign(CENTER, CENTER);
        fill(this.labelColor);
        strokeWeight(this.chartStrokeWidth);
        textSize(this.titleSize);
        text(this.chartTitle, this.chartHeight/2, -this.chartHeight * 1.15);
        pop();
    
        
        

        // Y value description
        push();
        translate(-30, -this.chartHeight/2);
        rotate(-90);
        noStroke();
        textSize(this.fontSize);
        textAlign(CENTER, CENTER);
        fill(this.labelColor);
        strokeWeight(this.chartStrokeWidth);
        textSize(this.yDataDescriptionSize);
        text(this.data[0][this.yDataDescription],0,0);
        pop();

        // Rendering the legend by iterating through our y values
        push();
        if (this.fullLength === true){
            translate(this.chartWidth + 40,-this.chartHeight/1.2);  
        } else {
            translate(this.chartWidth,-this.chartHeight/1.2);
        }

        
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
            fill(this.pieSegmentColor[i]);
            translate(-15,-7);
            rect(0,0,10,10);
            pop();
            translate(0,20);
        }
        pop();

        
 
        
        // Translating each pie chart by its width
        for(let i = 0; i < this.data.length; i++){
            
            translate(this.pieRadius, 0);

            push();
            rotate(45);
            noStroke();    
            textSize(this.fontSize);     
            textAlign(LEFT, CENTER);
            fill(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            translate(10, this.pieRadius / 4);
            text(this.data[i][this.xDataValue], this.labelPadding, 0);
            pop();
            
            pop();
            push();
            translate(0, -this.chartHeight/2);
            //Nested loop for each y data value that draws the bars
            for(let j = 0; j < this.yDataValue.length; j++){
                // Calculating the max value for each bar for the purposes of pie chart, because we need to divide our current data with the max data for each i category
                let dataMaxValues = [];
                let dataMaxValue = 0;
                for(let m = 0; m < this.yDataValue.length; m++){
                    dataMaxValues.push(+this.data[i][this.yDataValue[m]]);
                }

                let sum = 0;
                for(let m = 0; m < this.yDataValue.length; m++){
                    
                    sum += dataMaxValues[m];
                }

                dataMaxValue = sum;

               
                // To make a pie chart, we need to figure out the percentage in decimal of each data value j divided by the max value
                let piePercentage = (this.data[i][this.yDataValue[j]] / dataMaxValue);
                // The angle then of each y value is this percentage decimal * 360
                let dataAngle = piePercentage * 360;
                // End calculation

                fill(this.pieSegmentColor[j]);
                let lastAngle = 0;
                arc(
                    0,0,this.pieRadius,this.pieRadius,lastAngle,lastAngle + dataAngle, PIE
                );
                // Rotating the next arc by the angle (this is basically the pie chart equivalent of translating upward by the bar height)
                rotate(dataAngle);
                lastAngle += dataAngle;
                
            }
            pop();
                
        } 
    
    }
    
}