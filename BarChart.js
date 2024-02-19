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
        let maxValue = max(this.data.map(x => x[this.yDataValue]));
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
            push();
            fill(this.barColor);
            rect(0,0,this.barWidth, -this.data[i][this.yDataValue] * scalar);
            pop();
            push();
            rotate(45);
            noStroke();
            textSize(this.fontSize);
            textAlign(LEFT, CENTER);
            stroke(this.labelColor);
            strokeWeight(this.chartStrokeWidth);
            textSize(this.labelTextSize);
            translate(10, this.barWidth / 5);
            text(this.data[i][this.xDataValue], this.labelPadding, 0);
            pop();
            translate(gap + this.barWidth, 0)
            pop();
        }
    }
}