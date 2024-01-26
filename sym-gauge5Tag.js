(function (PV) {
	"use strict";
    
	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = {
		typeName: "gauge5Tag",
        iconUrl: 'Scripts\\app\\editor\\symbols\\ext\\icons\\4.jpg',
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function () {
			return {
				DataShape: 'TimeSeries',
				Height: 500,
				Width: 500,
			}
		},
    }

	symbolVis.prototype.init = function (scope, elem){ 

        this.onDataUpdate = dataUpdate;

        var maximumValue;
        var minimumValue;
        var takenvalue;
        var border4Green;
        var border4Red;
            
        am4core.useTheme(am4themes_animated);           

        var chart = am4core.create("chartdivgauge5Tag", am4charts.GaugeChart);
        
        chart.hiddenState.properties.opacity = 0;

        chart.innerRadius = -25;

        var axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.min = 0;
        axis.max = 100;
        axis.strictMinMax = true;
        axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
        axis.renderer.grid.template.strokeOpacity = 0.3;
        axis.renderer.labels.template.fill = am4core.color("#FFFFFF");

        var colorSet = new am4core.ColorSet();

        var range0 = axis.axisRanges.create();
        range0.value = 10;
        range0.endValue = 50;
        range0.axisFill.fillOpacity = 1;
        range0.axisFill.fill = am4core.color("#62B58F");
        range0.axisFill.zIndex = - 1;

        var range1 = axis.axisRanges.create();
        range1.value = 50;
        range1.endValue = 80;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = am4core.color("#DDEA1A");
        range1.axisFill.zIndex = -1;

        var range2 = axis.axisRanges.create();
        range2.value = 80;
        range2.endValue = 120;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color("#F2726F");
        range2.axisFill.zIndex = -1;

        var hand = chart.hands.push(new am4charts.ClockHand());
        hand.fill = am4core.color("#FFFFFF");
        hand.stroke = am4core.color("#FFFFFF");
/*
        var labelList = new am4core.ListTemplate(new am4core.Label());
        labelList.template.isMeasured = false;
        labelList.template.background.strokeWidth = 2;
        labelList.template.fontSize = 25;
        labelList.template.padding(10, 20, 10, 20);
        labelList.template.y = am4core.percent(50);
        labelList.template.horizontalCenter = "middle";

        var label = labelList.create();
        label.parent = chart.chartContainer;
        label.x = am4core.percent(40);
        label.background.stroke = am4core.color("#3AEA1A");
        label.fill = am4core.color("#3AEA1A");
        label.text = "0";

        var label2 = labelList.create();
        label2.parent = chart.chartContainer;
        label2.x = am4core.percent(50);
        label2.background.stroke = am4core.color("#000000");
        label2.fill = am4core.color("#000000");
        label2.text = "0";

        var label3 = labelList.create();
        label3.parent = chart.chartContainer;
        label3.x = am4core.percent(60);
        label3.background.stroke = am4core.color("#F0260E");
        label3.fill = am4core.color("#F0260E");
        label3.text = "0";*/

        function convertToChart(data){
            return data.Rows.map(function(item){
                return{
                    value: item.Value,
                    attribute: item.Label
                }
            });
        }
        
        function dataUpdate(newData){

            if(newData){

                    var chartData = convertToChart(newData)
                    console.log(chartData);
/*
                    var maximumValue = Number(scope.runtimeData.data.Rows[0].Value);
                    var minimumValue = Number(scope.runtimeData.data.Rows[1].Value);
                    var takenvalue   = Number(scope.runtimeData.data.Rows[2].Value);
                    var border4Green = Number(scope.runtimeData.data.Rows[3].Value);
                    var border4Red   = Number(scope.runtimeData.data.Rows[4].Value);
        */
                    maximumValue = chartData[0].value;
                    minimumValue = chartData[1].value;
                    takenvalue = chartData[2].value;
                    border4Green = chartData[3].value;
                    border4Red = chartData[4].value;

                    maximumValue = String(maximumValue);
                    maximumValue=maximumValue.replace(',', '');
                    maximumValue = Number(maximumValue);

                    minimumValue = String(minimumValue);
                    minimumValue=minimumValue.replace(',', '');
                    minimumValue = Number(minimumValue);

                    takenvalue = String(takenvalue);
                    takenvalue=takenvalue.replace(',', '');
                    takenvalue = Number(takenvalue);

                    border4Green = String(border4Green);
                    border4Green=border4Green.replace(',', '');
                    border4Green = Number(border4Green);

                    border4Red = String(border4Red);
                    border4Red=border4Red.replace(',', '');
                    border4Red = Number(border4Red);

                    axis.min = minimumValue;
                    axis.max = maximumValue;
                    range0.value = minimumValue;
                    range0.endValue = border4Green;
                    range1.value = border4Green;
                    range1.endValue = border4Red;
                    range2.value = border4Red;
                    range2.endValue = maximumValue;
                    hand.showValue(takenvalue, 1000, am4core.ease.cubicOut);
                   /* label.text = border4Green.toString();
                    label2.text = takenvalue.toString();
                    label3.text = border4Red.toString();*/
            }
        }    	
	};

	PV.symbolCatalog.register(definition);

})(window.PIVisualization);