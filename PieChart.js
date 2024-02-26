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
        
        let maxValues = [];

        for (let i = 0; i < this.yDataValue.length; i++){
            maxValues.push(max(this.data.map((row) => +row[this.yDataValue[i]])));        
        }

        let gap = (this.chartWidth - (this.data.length * this.pieRadius)) / (this.data.length + 1);

        // Rendering the chart lines
        
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColor);
      
        line(0, 0, this.chartWidth, 0);
        line(0,0,0,-this.chartHeight);

        
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

        // Rendering the legend by iterating through our x values
        push();
        if (this.fullLength === true){
            translate(this.chartWidth + 40,-this.chartHeight/1.2);  
        } else {
            translate(this.chartWidth,-this.chartHeight/1.2);
        }

        
        for(let i = 0; i < this.data.length; i++){
            push();
            noStroke();
            textSize(this.fontSize);
            textAlign(LEFT, CENTER);
            fill(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            // Making the legend display the X data value (label)
            text(this.data[i][this.xDataValue], 0, 0);
            pop();
            push();
            fill(this.pieSegmentColor[i]);
            translate(-15,-7);
            rect(0,0,10,10);
            pop();
            translate(0,20);
        }
        pop();

        
        translate(gap, 0);
        
        // Translating each pie chart by its width
        for(let i = 0; i < this.yDataValue.length; i++){
            
            translate(gap + (this.pieRadius * 1.7   ), 0);

            push();
            rotate(45);
            noStroke();    
            textSize(this.fontSize);     
            textAlign(LEFT, CENTER);
            fill(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            translate(10, this.pieRadius / 4);
            text(this.yDataValue[i], this.labelPadding, 0);
            pop();
            
            pop();
            push();
            translate(0, -this.chartHeight/2);
            // Calculating the max value for each y value for the purposes of pie chart, because we need to divide each individual y data point with the max data for each y value
            let dataCombinedValues = [];
            let dataCombinedValue = 0;
            for(let m = 0; m < this.data.length; m++){
                dataCombinedValues.push(+this.data[m][this.yDataValue[i]]);
                console.log(dataCombinedValues);
            }
            
            let sum = 0;
            for(let m = 0; m < this.data.length; m++){
                sum += dataCombinedValues[m];
            }
            

            dataCombinedValue = sum;
            //Nested loop for each y data value that draws the bars
            for(let j = 0; j < this.data.length; j++){
                
                
                
               
                // To make a pie chart, we need to figure out the percentage in decimal of each data value j divided by the max value
                let piePercentage = (+this.data[j][this.yDataValue[i]] / dataCombinedValue);
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
                console.log(piePercentage);
                lastAngle += dataAngle;
                
            }
            pop();
                
        } 
    
    }
    
}