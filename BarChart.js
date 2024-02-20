class BarChart {
    // The constructor gets our chart object and assigns its values based on the object.
    constructor(obj){
        this.chartType = obj.chartType;
        this.data = obj.data;
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
        this.barWidth = obj.barWidth;
        this.numTicks = obj.numTicks;
        this.axisLineWeight = obj.axisLineWeight;
        this.barColor - obj.barColor;
        this.labelPadding = obj.labelPadding;
        this.labelRotation = obj.labelRotation;
        this.barColor = obj.barColor;
        this.chartStrokeWidth = obj.chartStrokeWidth;

    }

    render(){
        noFill();
        strokeWeight(this.axisLineWeight);
      
        let gap = (this.chartWidth - (this.data.length * this.barWidth)) / (this.data.length + 1);
        
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
        let scalar = this.chartHeight / maxValue;

        // Rendering the chart lines
        translate(this.xPos, this.yPos);
        stroke(this.axisLineColor);
      
        line(0, 0, this.chartWidth, 0);
        line(0,0,0,-this.chartHeight);
      
        // all labels and ticks for Y value
        push();
        for(let i = 0; i < this.numTicks + 1; i++){
            push();
            noStroke();
            textSize(this.fontSize);
            textAlign(LEFT, CENTER);
            fill(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            translate(0, this.barWidth / this.numTicks + 1);
            text((round(maxValue / this.numTicks)) * i, -70, 0);
            pop();
            line(0,0,-10,0);
            translate(0, -this.chartHeight / this.numTicks);
            
        }
        pop();

        // Y value label
        push();
        rotate(-90);
        noStroke();
        textSize(this.fontSize);
        textAlign(CENTER, CENTER);
        fill(this.labelColor);
        strokeWeight(this.chartStrokeWidth);
        textSize(this.yDataDescriptionSize);
        text(this.data[0][this.yDataDescription], this.chartHeight/2, -this.chartWidth / 3);
        pop();
        

        // Line graph code  
        // push();
        // beginShape()
        // for(let i = 0; i < this.data.length; i++){  
        //     vertex((this.barWidth+gap)*i, -this.data[i][this.yDataValue] * scalar);
        // }
        // endShape()
        // pop();

        if (this.chartType ==="stacked"){
            translate(-this.barWidth, 0)
        } 
        else {
            translate(-this.barWidth * this.yDataValue.length, 0)
        }
        
        for(let i = 0; i < this.data.length; i++){
            
            translate(gap + this.barWidth, 0)

            push();
            
            rotate(45);
            noStroke();
            
            textSize(this.fontSize);
            
            textAlign(LEFT, CENTER);
            fill(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            translate(10, this.barWidth / 4);
            text(this.data[i][this.xDataValue], this.labelPadding, 0);
            pop();
            
            pop();
            push();
            //Nested loop for each y data value
            for(let j = 0; j < this.yDataValue.length; j++){

                let barHeight = this.data[i][this.yDataValue[j]] * scalar;
                
                fill(this.barColor[j]);
                // Drawing a rectangle with the barheight and width, and then translating to the bar height and drawing another one.
                // If the chart type is stacked, put the bar on the other bar
                if (this.chartType === "stacked"){
                    rect(0, 0, this.barWidth, -barHeight);
                    translate(0,-barHeight);
                    
                }
                // If the chart type is clustered, put the bar next to the other bar
                else {
                    rect(0, 0, this.barWidth, -barHeight);
                    translate(this.barWidth, 0);
                    
                }
                
            }
            pop();
                
        } 
         
    }
}