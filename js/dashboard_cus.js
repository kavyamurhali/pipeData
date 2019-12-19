function getMaxY(data) {
	if (data.length > 0) {
		let val = parseInt(data.reduce((max, p) => p.value > max ? p.value : max, data[0].value)).toString();
		return val.length;
	}
	else {
		return 4;
	}

}
function sel_stack(i) {
	return function (d) {

		return d.value[i] < 0 ? 0 : d.value[i];
	};
}
function Filter_Source_Dashboard(source_group, val) {
	var length_v = source_group.all().length;

	if (length_v > 10) {
		if (val == 'start') {

			return {
				all: function () {
					return source_group.all().slice(0, 10);
				}
			};
		}
		else if (val == 'end') {
			var total_v = length_v / 10;
			var then = total_v * 10;
			var first = then - 10;
			return {
				all: function () {
					return source_group.all().slice(first, then);
				}
			};
		}

	}
	else {
		return source_group;
	}

}
function Filtr_by_value_Dashboard(source_group, str, end) {
	return {
		all: function () {
			return source_group.all().slice(str, end);
		}
	};
}
function Append_Nav(start, end, id, length_v) {
	if (end == 0) {
		var total_v = length_v - 10;
		var str = total_v - 10;
		str = str < 0 ? 0 : str;
		$('<i class="fas fa-angle-right" style="display:none"></i> <i class="fas fa-angle-left" data-str=' + str + ' data-end=' + total_v + '></i>').insertBefore(id);
	}
	else if (end = length_v) {
		var total_v = length_v < 20 ? length_v : 20;
		var str = total_v < 20 ? 10 : total_v - 10;

		str = str < 0 ? 0 : str;

		$('<i class="fas fa-angle-right" data-str=' + str + ' data-end=' + total_v + '></i> <i class="fas fa-angle-left" style="display:none"></i>').insertBefore(id);

	}

}

function Filter_Source_On_Nag(id, chart, value, source_group, pos, dimensionByYear) {

	$($(id + ' svg g:first-child')[0]).attr('transform', 'translate(' + value + ',0)');

	var length_v = source_group.all().length;

	if (length_v > 10) {
		if (pos == 'end')
			Append_Nav(0, 0, id, length_v);
		else
			Append_Nav(0, length_v, id, length_v);

		$(id).parent().find('i').click(function () {

			var start = $(this).attr('data-str');
			var end = $(this).attr('data-end');

			if (start >= 0 && end >= 0 && end <= length_v) {
				var filtered = Filtr_by_value_Dashboard(source_group, start, end);
				if (id != '#chart8') {
					chart.x(d3_metric.scaleBand()).xUnits(dc.units.ordinal).dimension(dimensionByYear).group(filtered).render();
				}

				else {


					chart.x(d3_metric.scaleBand()).xUnits(dc.units.ordinal).dimension(dimensionByYear).group(filtered, unique_material[0], sel_stack(unique_material[0]))


					for (var i = 1; i < unique_material.length; i++) {
						chart.stack(filtered, '' + unique_material[i], sel_stack(unique_material[i]));
					}


					chart.render();
				}



				setTimeout(function () {
					$($(id + ' svg g:first-child')[0]).attr('transform', 'translate(' + value + ',0)');
					$('.dc-chart .x text').each(function () {
						$(this).text($(this).text().slice(0, 4));
					});
				}, 200);

				if ($(this).hasClass('fa-angle-left')) {
					if (start == 0) {
						$(this).prev().attr('data-str', end > length_v - 10 ? length_v - 10 : end);
						$(this).prev().attr('data-end', (parseInt(end) + 10) > length_v ? length_v : (parseInt(end) + 10));
						$(this).prev().show();
						$(this).removeAttr('data-str');
						$(this).hide();
						$(this).removeAttr('data-end');

					}
					else {

						$(this).prev().show();

						$(this).prev().attr('data-str', (parseInt(start) + 10));
						$(this).prev().attr('data-end', (parseInt(end) + 10));


						start = (start - 10) < 0 ? 0 : (start - 10);

						$(this).attr('data-str', start);

						end = (end - 10) < 0 ? end : (end - 10);

						$(this).attr('data-end', end);

					}




				}
				else if ($(this).hasClass('fa-angle-right')) {

					if (end >= length_v) {

						$(this).next().attr('data-str', (parseInt(length_v) - 20) < 0 ? 0 : (parseInt(length_v) - 20));
						$(this).next().attr('data-end', (parseInt(length_v) - 10) < 0 ? 0 : (parseInt(length_v) - 10));
						$(this).removeAttr('data-str');
						$(this).hide();
						$(this).next().show();
						$(this).removeAttr('data-end');

					}
					else {
						$(this).next().show();
						var start2 = (start - 10) < 0 ? 0 : (start - 10);

						$(this).next().attr('data-str', start2);
						$(this).next().attr('data-end', (parseInt(end) - 10));
						$(this).attr('data-str', (parseInt(start) + 10));
						$(this).attr('data-end', (parseInt(end) + 10));

					}


				}

			}


		});
	}

}

var unique_material = new Array();
function Draw_Dashboard(data) {
	//get data into crossfilter formate //#endregion
	let dataitem = crossfilter(data);
	let fliparray = new Array();
	if (Mapping_Array[1]['BreakYear'] != undefined && Mapping_Array[1]['BreakYear'].trim()!= '' &&
	    Mapping_Array[1]['BreakCount'] != undefined && Mapping_Array[1]['BreakCount'].trim() != '') {
		// chart1
		// sum pipelength by year then divided by 100
		var dt = new Date();
		var Dim_Chart1 = dataitem.dimension(item => item[Mapping_Array[1]['BreakYear']] < 0 || item[Mapping_Array[1]['BreakYear']] > dt.getFullYear() ? 0 : item[Mapping_Array[1]['BreakYear']]);
		var Group_Chart1 = Dim_Chart1.group()
		.reduceCount(item => Math.ceil(item[Mapping_Array[1]['BreakCount']]));
		let Copy_Group_Chart1 = Group_Chart1;
		Group_Chart1 = Filter_Source_Dashboard(Group_Chart1, 'end');
		var chart1 = dc.barChart("#chart1");
		chart1.x(d3_metric.scaleBand())
			.xUnits(dc.units.ordinal)
			.xAxisLabel("Break Year")
			.yAxisLabel("BreakCount")
			.elasticY(true)
			.dimension(Dim_Chart1)
			.group(Group_Chart1).yAxis().tickFormat(function(tickVal) {
				return tickVal >= 1000 ? tickVal/1000 + "K" : tickVal;
			});
            if(Group_Chart1.all().length<=1)
            chart1.width(150);
		chart1.render();
		
		Filter_Source_On_Nag("#chart1", chart1, getMaxY(Group_Chart1.all()), Copy_Group_Chart1, 'end', Dim_Chart1);
		$($('#chart1 svg g:first-child')[0]).attr("transform","translate(18,0)");

		fliparray.push({
            Flip: true,
            ID: "#chart1"
        });
    } else  {
        fliparray.push({
            Flip: false,
            ID: "#chart1"
        });
    }

	if (Mapping_Array[1]['PipeMaterial'] != undefined && Mapping_Array[1]['PipeMaterial'].trim() != '' &&
	    Mapping_Array[1]['Length_Mi'] != undefined && Mapping_Array[1]['Length_Mi'].trim() != '') {
		//chart2
		// sum pipelength by material
		let Dim_Chart2 = dataitem.dimension(item => item[Mapping_Array[1]['PipeMaterial']]);
		let Group_Chart2 = Dim_Chart2.group().reduceSum(item => Math.ceil( isNaN(item[Mapping_Array[1]['Length_Mi']]) ? 0 : item[Mapping_Array[1]['Length_Mi']] ));
		let Copy_Group_Chart2 = Group_Chart2;
		Group_Chart2 = Filter_Source_Dashboard(Group_Chart2, 'end');
		var chart2 = dc.barChart("#chart2");
		chart2
	      	
			.x(d3_metric.scaleBand())
			.xUnits(dc.units.ordinal)
			.xAxisLabel("Material")
			.yAxisLabel("PipeLength")
			.elasticY(true)
			.dimension(Dim_Chart2)
			.group(Group_Chart2)
			.yAxis().tickFormat(function(tickVal) {
				return tickVal >= 1000 ? tickVal/1000 + "K" : tickVal;
			});
			if(Group_Chart2.all().length<=1)
            chart2.width(150);
		chart2.render();
		Filter_Source_On_Nag("#chart2", chart2, getMaxY(Group_Chart2.all()), Copy_Group_Chart2, 'end', Dim_Chart2);
		$($('#chart2 svg g:first-child')[0]).attr("transform","translate(18,0)");
	
		fliparray.push({
            Flip: true,
            ID: "#chart2"
        });
    } else  {
        fliparray.push({
            Flip: false,
            ID: "#chart2"
        });
    }

	if (Mapping_Array[1]['PipeMaterial'] != undefined && Mapping_Array[1]['PipeMaterial'].trim() != '' &&
		Mapping_Array[1]['Length_Mi'] != undefined && Mapping_Array[1]['Length_Mi'].trim() != '') {
		//chart3
		// % pipelength by material
		let Dim_Chart3 = dataitem.dimension(item => item[Mapping_Array[1]['PipeMaterial']]);
		let sum = Dim_Chart3.group().reduceSum(item => Math.ceil( isNaN(item[Mapping_Array[1]['Length_Mi']]) ? 0 : item[Mapping_Array[1]['Length_Mi']] )).all()
		 .map( a =>  parseFloat( isNaN(a.value) ? 0 : a.value ) ).reduce((a, b) => a + b, 0);
		let Group_Chart3 = Dim_Chart3.group().reduceSum(item => Math.ceil( isNaN(item[Mapping_Array[1]['Length_Mi']]) ? 0 : item[Mapping_Array[1]['Length_Mi']] ));
		var chart3 = dc.pieChart("#chart3");
		chart3
			.height(210)
			.innerRadius(40)
			.drawPaths(true)
			.dimension(Dim_Chart3)
			.group(Group_Chart3)
			.label(function(d) {
				return d.key + ' ' + Math.round((d.value/sum)*100) + '%';
			})
			.render();
		fliparray.push({
            Flip: true,
            ID: "#chart3"
        });
    } else  {
        fliparray.push({
            Flip: false,
            ID: "#chart3"
        });
    }



	if (Mapping_Array[1]['BreakCause'] != undefined  && Mapping_Array[1]['BreakCause'].trim() != '' &&
	Mapping_Array[1]['Length_Mi'] != undefined && Mapping_Array[1]['Length_Mi'].trim() != '') {
		//chart4
		// sum  pipelength by failure cause
		let Dim_Chart4 = dataitem.dimension(item => item[Mapping_Array[1]['BreakCause']]);
		let Group_Chart4 = Dim_Chart4.group().reduceSum(item => Math.ceil( isNaN(item[Mapping_Array[1]['Length_Mi']]) ? 0 : item[Mapping_Array[1]['Length_Mi']] ));
		let Copy_Group_Chart4 = Group_Chart4;
		Group_Chart4 = Filter_Source_Dashboard(Group_Chart4, 'end');
		var chart4 = dc.barChart("#chart4");
		chart4
			.x(d3_metric.scaleBand())
			.xUnits(dc.units.ordinal)
			.xAxisLabel("Break Cause")
			.yAxisLabel("Pipe Length")
			.elasticY(true)
			.dimension(Dim_Chart4)
			.group(Group_Chart4).yAxis().tickFormat(function(tickVal) {
				return tickVal >= 1000 ? tickVal/1000 + "K" : tickVal;
			});
			if(Group_Chart4.all().length<=1)
            chart4.width(150);
		chart4.render();

		Filter_Source_On_Nag("#chart4", chart4, getMaxY(Group_Chart4.all()), Copy_Group_Chart4, 'end', Dim_Chart4);
		$($('#chart4 svg g:first-child')[0]).attr("transform","translate(18,0)");
		
		fliparray.push({
            Flip: true,
            ID: "#chart4"
        });
    } else  {
        fliparray.push({
            Flip: false,
            ID: "#chart4"
        });
    }
	if (Mapping_Array[1]['OperatingPressure'] != undefined && Mapping_Array[1]['OperatingPressure'].trim() != '' &&
	    Mapping_Array[1]['Length_Mi'] != undefined && Mapping_Array[1]['Length_Mi'].trim() != ''
	   ) {
		//chart5
		// sum  pipelength by Operating Pressure
		let Dim_Chart5 = dataitem.dimension(item => item[Mapping_Array[1]['OperatingPressure']] < 0 ? 0 : item[Mapping_Array[1]['OperatingPressure']]);
		let Group_Chart5 = Dim_Chart5.group().reduceSum(item => Math.ceil( isNaN(item[Mapping_Array[1]['Length_Mi']]) ? 0 : item[Mapping_Array[1]['Length_Mi']] ));
		let Copy_Group_Chart5 = Group_Chart5;
		Group_Chart5 = Filter_Source_Dashboard(Group_Chart5, 'end');
		var chart5 = dc.barChart("#chart5");
		chart5

			.x(d3_metric.scaleBand())
			.xUnits(dc.units.ordinal)
			.xAxisLabel("Max Pressure")
			.yAxisLabel("Pipe Length")
			.elasticY(true)
			.dimension(Dim_Chart5)
			.group(Group_Chart5).yAxis().tickFormat(function(tickVal) {
				return tickVal >= 1000 ? tickVal/1000 + "K" : tickVal;
			});

			if(Group_Chart5.all().length<=1)
            chart5.width(150);
		chart5.render();

		Filter_Source_On_Nag("#chart5", chart5, getMaxY(Group_Chart5.all()), Copy_Group_Chart5, 'end', Dim_Chart5);
		$($('#chart5 svg g:first-child')[0]).attr("transform","translate(18,0)");
		

		fliparray.push({
            Flip: true,
            ID: "#chart5"
        });
    } else  {
        fliparray.push({
            Flip: false,
            ID: "#chart5"
        });
    }


	if (Mapping_Array[1]['InstallYear'] != undefined && Mapping_Array[1]['InstallYear'].trim() != '' && Mapping_Array[1]['OBJECTID'] != undefined && Mapping_Array[1]['OBJECTID'].trim() !='') {
		//chart6
		// count object id by Age
		var dt = new Date();

		let Dim_Chart6 = dataitem.dimension(item => item[Mapping_Array[1]['InstallYear']] == 'null' ? 0 : (parseInt(dt.getFullYear()) - parseInt(item[Mapping_Array[1]['InstallYear']] == 'null' ? 0 : item[Mapping_Array[1]['InstallYear']])));

		let Group_Chart6 = Dim_Chart6.group().reduceCount(item => item[Mapping_Array[1]['OBJECTID']]);


		let Copy_Group_Chart6 = Group_Chart6;

		Group_Chart6 = Filter_Source_Dashboard(Group_Chart6, 'end');
		var chart6 = dc.barChart("#chart6");
		chart6

			.x(d3_metric.scaleBand())
			.xUnits(dc.units.ordinal)
			.xAxisLabel("Age (years)")
			.yAxisLabel("Count")
			.elasticY(true)
			.dimension(Dim_Chart6)
			.group(Group_Chart6)
			.yAxis().tickFormat(function(tickVal) {
				return tickVal >= 1000 ? tickVal/1000 + "K" : tickVal;
			});
			if(Group_Chart6.all().length<=1)
            chart6.width(150);
		chart6.render();

		Filter_Source_On_Nag("#chart6", chart6, getMaxY(Group_Chart6.all()), Copy_Group_Chart6, 'end', Dim_Chart6);

		$($('#chart6 svg g:first-child')[0]).attr("transform","translate(18,0)");

		fliparray.push({
            Flip: true,
            ID: "#chart6"
        });
    } else  {
        fliparray.push({
            Flip: false,
            ID: "#chart6"
        });
    }

	if (Mapping_Array[1]['PipeMaterial'] != undefined && Mapping_Array[1]['PipeMaterial'].trim()!= '') {
		//chart7
		// count object id by Age

		let Dim_Chart7 = dataitem.dimension(item => item[Mapping_Array[1]['PipeMaterial']]);
		let Group_Chart7 = Dim_Chart7.group().reduceSum(item => Math.ceil( isNaN(item[Mapping_Array[1]['Length_Mi']]) ? 0 : item[Mapping_Array[1]['Length_Mi']]/100 ));
		let Copy_Group_Chart7 = Group_Chart7;
		Group_Chart7 = Filter_Source_Dashboard(Group_Chart7, 'end');
		var chart7 = dc.barChart("#chart7");
		chart7
			.x(d3_metric.scaleBand())
			.xUnits(dc.units.ordinal)
			.xAxisLabel("Material")
			.yAxisLabel("Pipe Length /100 Miles")
			.elasticY(true)
			.dimension(Dim_Chart7)
			.group(Group_Chart7)
			.yAxis().tickFormat(function(tickVal) {
				return tickVal >= 1000 ? tickVal/1000 + "K" : tickVal;
			});
			if(Group_Chart7.all().length<=1)
            chart7.width(150);
		chart7.render();

		Filter_Source_On_Nag("#chart7", chart7, getMaxY(Group_Chart7.all()), Copy_Group_Chart7, 'end', Dim_Chart7);

		$($('#chart7 svg g:first-child')[0]).attr("transform","translate(18,0)");

	
		fliparray.push({
            Flip: true,
            ID: "#chart7"
        });
    } else  {
        fliparray.push({
            Flip: false,
            ID: "#chart7"
        });
    }



	if (Mapping_Array[1]['PipeMaterial'] != undefined && Mapping_Array[1]['PipeMaterial'].trim() != '' && Mapping_Array[1]['InstallYear'] != undefined && Mapping_Array[1]['InstallYear'] .trim()!= '') {
		//chart 8 Pipe failures per 100 Miles by Year/Material
		///filter uniquer materials for Chart 8
		unique_material = [...new Set(data.map(item => item[Mapping_Array[1]['PipeMaterial']]))];

		let Dim_Chart8 = dataitem.dimension(item => item[Mapping_Array[1]['BreakYear']]);
		var Group_Chart8 = Dim_Chart8.group().reduce(function (p, v) {
			p[v[Mapping_Array[1]['PipeMaterial']]] = (p[v[Mapping_Array[1]['PipeMaterial']]] || 0) + 1;
			return p;
		}, function (p, v) {
			p[v[Mapping_Array[1]['PipeMaterial']]] = (p[v[Mapping_Array[1]['PipeMaterial']]] || 0) - 1;

			return p;
		},
			function () {
				return {};
			});

		let Copy_Group_Chart8 = Group_Chart8;

		Group_Chart8 = Filter_Source_Dashboard(Group_Chart8, 'end');
		const colorbind = new GetColorArray($("#themetype option:selected").index());
		var chart8 = dc.barChart("#chart8");
		chart8

			.x(d3_metric.scaleBand())
			.xUnits(dc.units.ordinal)
			.xAxisLabel("Material")
			.yAxisLabel("Pipe Length /100 Miles")
			.brushOn(false)
			.clipPadding(7)
			.title(function (d) {
				return d.key + '[' + this.layer + ']: ' + d.value[this.layer];
			})
			.ordinalColors(colorbind.backgroundColor)
			.dimension(Dim_Chart8)
			.group(Group_Chart8, unique_material[0], sel_stack(unique_material[0]))
			.yAxis().tickFormat(function(tickVal) {
				return tickVal >= 1000 ? tickVal/1000 + "K" : tickVal;
			});
		      for (var i = 1; i < unique_material.length; i++)
			chart8.stack(Group_Chart8, '' + unique_material[i], sel_stack(unique_material[i]));
            if(Group_Chart8.all().length<=1)
            chart8.width(150);
		chart8.render();
		Filter_Source_On_Nag("#chart8", chart8, getMaxY(Group_Chart8.all()), Copy_Group_Chart8, 'end', Dim_Chart8);
		// renderGradients($('#chart7').find('svg'));
		//end code for stack chart
		$($('#chart8 svg g:first-child')[0]).attr("transform","translate(18,0)");
	
		fliparray.push({
            Flip: true,
            ID: "#chart8"
        });
    } else  {
        fliparray.push({
            Flip: false,
            ID: "#chart8"
        });
    }



	if (Mapping_Array[1]['InstallYear'] != undefined && Mapping_Array[1]['InstallYear'].trim() != '') {
		//chart9
		// Pipe Failure Miles by Age
		var dt = new Date();
		let Dim_Chart9 = dataitem.dimension(item => item[Mapping_Array[1]['InstallYear']] == 'null' ? 0 : item[Mapping_Array[1]['InstallYear']]);
		let Group_Chart9 = Dim_Chart9.group().reduceSum(item => Math.ceil( isNaN(item[Mapping_Array[1]['Length_Mi']]) ? 0 : item[Mapping_Array[1]['Length_Mi']] ));
		let Copy_Group_Chart9 = Group_Chart9;

		Group_Chart9 = Filter_Source_Dashboard(Group_Chart9, 'end');
		var chart9 = dc.barChart("#chart9");
		chart9
			.x(d3_metric.scaleBand())
			.xUnits(dc.units.ordinal)
			.xAxisLabel("Install Year")
			.yAxisLabel("Pipe Length")
			.elasticY(true)
			.dimension(Dim_Chart9)
			.group(Group_Chart9).yAxis().tickFormat(function(tickVal) {
				return tickVal >= 1000 ? tickVal/1000 + "K" : tickVal;
			});
			if(Group_Chart9.all().length<=1)
            chart9.width(150);
		chart9.render();

		Filter_Source_On_Nag("#chart9", chart9, getMaxY(Group_Chart9.all()), Copy_Group_Chart9, 'end', Dim_Chart9);

		$($('#chart9 svg g:first-child')[0]).attr("transform","translate(18,0)");

		fliparray.push({
            Flip: true,
            ID: "#chart9"
        });
    } else  {
        fliparray.push({
            Flip: false,
            ID: "#chart9"
        });
    }


	// end code
	  // end code
	  if ($('.is-active').data('module') == 'metrics') {
        $('#datamappingMain').show();
        $('#dataexplorepanel').hide();
    } else {
        $('#datamappingMain').hide();
    }

	if($('#loadermain').is(':visible'))
	{
		Incr_progress();

	setTimeout(function () {
		$('#loadermain').hide();

		// $('.dc-chart .x text').each(function () {
		// 	$(this).text($(this).text().slice(0, 4));
		// });
	}, 100);
	}

	setTimeout(function(){
		$('.dc-chart .x text').each(function () {
			$(this).text($(this).text().slice(0, 4));
		});

		fliparray.forEach(a => {
			$($(a.ID + ' svg .y-axis-label')[0]).attr("transform","translate(-10,99),rotate(-90)");
		});

	},400);
	fliparray.forEach(a => {
	  if (a.Flip) {
            $(a.ID).closest('.flipper').addClass('flip');
        } else {
            $(a.ID).closest('.flipper').removeClass('flip');
        }
    });
	////////////////////////////////////

}
