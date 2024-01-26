(function (PV) {
	"use strict";

	function symbolVis() { };
	PV.deriveVisualizationFromBase(symbolVis);

	var definition = {
		typeName: "gaugeT1",
		iconUrl: 'Scripts\\app\\editor\\symbols\\ext\\icons\\1.png',
		visObjectType: symbolVis,
		datasourceBehavior: PV.Extensibility.Enums.DatasourceBehaviors.Multiple,
		getDefaultConfig: function () {
			return {
				DataShape: 'table',
				Height: 150,
				Width: 150,
			}
		},
	}

	symbolVis.prototype.init = function (scope, elem) {

		am4core.useTheme(am4themes_animated);

		var chart = am4core.create("chartContainergauget1", am4charts.GaugeChart);
		
		chart.innerRadius = am4core.percent(82);

		var axis = chart.xAxes.push(new am4charts.ValueAxis());
		axis.min = 0;
		axis.max = 100;
		axis.strictMinMax = true;
		axis.renderer.radius = am4core.percent(80);
		axis.renderer.inside = true;
		axis.renderer.line.strokeOpacity = 1;
		axis.renderer.ticks.template.disabled = false
		axis.renderer.ticks.template.strokeOpacity = 1;
		axis.renderer.ticks.template.length = 10;
		axis.renderer.grid.template.disabled = true;
		axis.renderer.labels.template.radius = 40;
		axis.renderer.labels.template.adapter.add("text", function(text) {
		  return text + "%";
		})

		var colorSet = new am4core.ColorSet();

		var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
		axis2.min = 0;
		axis2.max = 100;
		axis2.renderer.innerRadius = 10
		axis2.strictMinMax = true;
		axis2.renderer.labels.template.disabled = true;
		axis2.renderer.ticks.template.disabled = true;
		axis2.renderer.grid.template.disabled = true;

		var range0 = axis2.axisRanges.create();
		range0.value = 0;
		range0.endValue = 50;
		range0.axisFill.fillOpacity = 1;
		range0.axisFill.fill = colorSet.getIndex(6);

		var range1 = axis2.axisRanges.create();
		range1.value = 50;
		range1.endValue = 100;
		range1.axisFill.fillOpacity = 1;
		range1.axisFill.fill = colorSet.getIndex(2);

		var label = chart.radarContainer.createChild(am4core.Label);
		label.isMeasured = false;
		label.fontSize = 45;
		label.x = am4core.percent(50);
		label.y = am4core.percent(100);
		label.horizontalCenter = "middle";
		label.verticalCenter = "bottom";
		label.text = "50%";

		var hand = chart.hands.push(new am4charts.ClockHand());
		hand.axis = axis2;
		hand.innerRadius = am4core.percent(20);
		hand.startWidth = 10;
		hand.pin.disabled = true;
		hand.value = 50;

		hand.events.on("propertychanged", function(ev) {
		  range0.endValue = ev.target.value;
		  range1.value = ev.target.value;
		  axis2.invalidate();
		});

		setInterval(function() {
		  var value = Math.round(Math.random() * 100);
		  label.text = value + "%";
		  var animation = new am4core.Animation(hand, {
		    property: "value",
		    to: value
		  }, 1000, am4core.ease.cubicOut).start();
		}, 2000);
		
	};

	PV.symbolCatalog.register(definition);

})(window.PIVisualization); 
