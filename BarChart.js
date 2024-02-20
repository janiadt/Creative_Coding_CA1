class BarChart {
    // The constructor gets our chart object and assigns its values based on the object.
    constructor(obj){
        this.chartType = obj.chartType;
        this.data = obj.data;
        this.yDataValue = obj.yDataValue;
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
        // Making an array so we can access the y data value
        let maxValue = max(this.data.map(x => x[this.yDataValue[0]]));
        let maxValues = [];
        // console.log(this.data[0][this.yDataValue[0]]);

        for (let i = 0; i < this.yDataValue.length; i++){
            maxValues.push(max(this.data.map((row) => +row[this.yDataValue[i]]))); 
        }

        maxValue = maxValues[0] + maxValues[1];
        
        let scalar = this.chartHeight / maxValue;

        translate(this.xPos, this.yPos);
        stroke(this.axisLineColor);
      
        line(0, 0, this.chartWidth, 0);
        line(0,0,0,-this.chartHeight);
      
        // all labels and ticks
        push();
        for(let i = 0; i < this.numTicks + 1; i++){
            push();
            noStroke();
            textSize(this.fontSize);
            textAlign(LEFT, CENTER);
            stroke(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            translate(0, this.barWidth / this.numTicks + 1);
            text((round(maxValue / 4)) * i, -70, 0);
            pop();
            line(0,0,-10,0);
            translate(0, -this.chartHeight / this.numTicks);
            
        }
        pop();

        // Line graph code  
        // push();
        // beginShape()
        // for(let i = 0; i < this.data.length; i++){  
        //     vertex((this.barWidth+gap)*i, -this.data[i][this.yDataValue] * scalar);
        // }
        // endShape()
        // pop();


        translate(gap, 0);
        for(let i = 0; i < this.data.length; i++){
            
            // push();
            // fill(this.barColor[0]);
            // rect(0,0,this.barWidth, -this.data[i][this.yDataValue[0]] * scalar);
            // pop();
            // push();
 
            // fill(this.barColor[1]);
            // translate(0, -this.data[i][this.yDataValue[1]] * scalar);
            // rect(0,0,this.barWidth, -this.data[i][this.yDataValue[1]] * scalar);
            
            // pop();
            
            
            push();
            rotate(45);
            noStroke();
            textSize(this.fontSize);
            textAlign(LEFT, CENTER);
            stroke(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            translate(10, this.barWidth / 4);
            text(this.data[i][this.xDataValue], this.labelPadding, 0);
            pop();
            translate(gap + this.barWidth, 0)
            pop();
            
                
            //Nested loop for each y data value
            for(let j = 0; j < this.yDataValue.length; j++){
                
                let barHeight = this.data[i][this.yDataValue[j]] * scalar;
                
                console.log(barHeight);

                
                push();
                fill(this.barColor[j]);
                rect(0, 0, this.barWidth, -barHeight);
                translate(0,-barHeight);
                pop();
                
                
            }
        } 
         
    }
}