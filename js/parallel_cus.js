// @ts-nocheck
function Remove_Extras() {

	$('.attrtext').each(function () {
		var txt = $(this).text();

		if (txt.includes('year') || txt.includes('Year')) {
			$(this).parent().find('.tick').each(function () {
				var val_tex_F = parseFloat($(this).find('.pretextcls').text().replace(',', ''));
				var val_tex_I = parseInt($(this).find('.pretextcls').text().replace(',', ''));
				if (val_tex_F > val_tex_I) {
					$(this).css('display', 'none');
				} else {
					$(this).find('.pretextcls').text(parseInt($(this).find('.pretextcls').text().replace(',', '')));
				}

			});
		} else if (txt.includes('Date') || txt.includes('date')) {
			$(this).parent().find('.tick').each(function () {
				var dt = new Date($(this).find('.pretextcls').text());
				if (dt.toLocaleDateString() != 'Invalid Date') {
					$(this).find('.pretextcls').text(dt.toLocaleDateString())
				}
			});
		}
	});
	//Issue #44 Related to this code
	////////////////////////////////////// code for count and % //#endregion
	$('.attrtext').each(function () {
		var txt = $(this).text();
		var domain_Name = txt;
		var values_tick = Count_Ticks_Array.filter(item => item[domain_Name])[0][domain_Name];

		$(this).parent().find('.tick').each(function () {
			var t1 = $(this).find('.pretextcls').text();

			var t2 = values_tick.filter(function (d) {
				if (txt.includes('year') || txt.includes('Year'))

					return d.key.toString().replace(',', '') == t1
				else
					return d.key == t1
			})[0];
			if (t2 != undefined && t2 != null) {
				var count_tick = t2.value < 0 ? 0 : t2.value;
				if (count_tick > 1) {
					///// Issue# 41 can edit template for showing text in right side of bars
					$(this).find('.countclass').text(Math.round(((count_tick / total_length_data) * 100), 2) + '% : ' + count_tick);
				}
			}
		});

	});
	//////////////
}

function CloseFun() {
	$('.attrtext').mouseenter(function () {
		let attriname = $(this).text();
		var attname = typeofSource == 'break' ? ['PipelineOwner','BreakCause'] : ['PipeCount','PoFCategory'];
		if (showattriList_Parallel.length > 1 && !attname.includes(attriname)) {
			var x = $(this).position();
			var left = $(this).closest('.dimension').attr('leftpx');
			$('#closeicn').attr('data-key', $(this).text());
			$('#closeicn').css('left', parseInt(left) - ( showattriList_Parallel.length <=6 ? 250 : 146 + (attriname.length) * 2));
			$('#closeicn').css('top', -24);
			$('#closeicn').show();
		}
	}).mouseleave(function () {});
	/////////////////mycustome code
	$('#closeicn').click(function () {
		var index = showattriList_Parallel.indexOf($(this).attr('data-key'));
		if (index !== -1) showattriList_Parallel.splice(index, 1);
		$('#analysis svg').remove();
		$('#analysis').hide();
		Progress_reset(4, 'closeicn');
		$protext.html('Loading PipeLine Owner Attributes');
		$('#closeicn').hide();
		setTimeout(function () {
			FormateESRIArrayafterDragnDrop_Parallel();
		}, 200);
	});

}
let MX = 0;
let MY = 0;
let Mid_MZ = 0;
let SelectCount = -1;
let Brushed_Clicked = false;

function AppendCloseIcon() {
	$('#closeicn').remove();
	$('<img id="closeicn" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQzOC41MzMgNDM4LjUzMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM4LjUzMyA0MzguNTMzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQwOS4xMzMsMTA5LjIwM2MtMTkuNjA4LTMzLjU5Mi00Ni4yMDUtNjAuMTg5LTc5Ljc5OC03OS43OTZDMjk1LjczNiw5LjgwMSwyNTkuMDU4LDAsMjE5LjI3MywwICAgYy0zOS43ODEsMC03Ni40Nyw5LjgwMS0xMTAuMDYzLDI5LjQwN2MtMzMuNTk1LDE5LjYwNC02MC4xOTIsNDYuMjAxLTc5LjgsNzkuNzk2QzkuODAxLDE0Mi44LDAsMTc5LjQ4OSwwLDIxOS4yNjcgICBjMCwzOS43OCw5LjgwNCw3Ni40NjMsMjkuNDA3LDExMC4wNjJjMTkuNjA3LDMzLjU5Miw0Ni4yMDQsNjAuMTg5LDc5Ljc5OSw3OS43OThjMzMuNTk3LDE5LjYwNSw3MC4yODMsMjkuNDA3LDExMC4wNjMsMjkuNDA3ICAgczc2LjQ3LTkuODAyLDExMC4wNjUtMjkuNDA3YzMzLjU5My0xOS42MDIsNjAuMTg5LTQ2LjIwNiw3OS43OTUtNzkuNzk4YzE5LjYwMy0zMy41OTYsMjkuNDAzLTcwLjI4NCwyOS40MDMtMTEwLjA2MiAgIEM0MzguNTMzLDE3OS40ODUsNDI4LjczMiwxNDIuNzk1LDQwOS4xMzMsMTA5LjIwM3ogTTMyMi42MjEsMjcwLjkzOWMzLjYxNywzLjYxMyw1LjQyOCw3LjkwNSw1LjQyOCwxMi44NTQgICBjMCw1LjEzMy0xLjgxMSw5LjUxNC01LjQyOCwxMy4xMjdsLTI1LjY5MywyNS43MDFjLTMuNjE0LDMuNjEzLTcuOTk0LDUuNDItMTMuMTM1LDUuNDJjLTQuOTQ4LDAtOS4yMzYtMS44MDctMTIuODQ3LTUuNDIgICBsLTUxLjY3Ni01MS42ODJsLTUxLjY3OCw1MS42ODJjLTMuNjE2LDMuNjEzLTcuODk4LDUuNDItMTIuODQ3LDUuNDJjLTUuMTQsMC05LjUxNy0xLjgwNy0xMy4xMzQtNS40MmwtMjUuNjk3LTI1LjcwMSAgIGMtMy42MTYtMy42MTMtNS40MjQtNy45OTQtNS40MjQtMTMuMTI3YzAtNC45NDgsMS44MDktOS4yNCw1LjQyNC0xMi44NTRsNTEuNjc4LTUxLjY3M2wtNTEuNjc4LTUxLjY3OCAgIGMtMy42MTYtMy42MTItNS40MjQtNy44OTgtNS40MjQtMTIuODQ3YzAtNS4xNCwxLjgwOS05LjUxNyw1LjQyNC0xMy4xMzRsMjUuNjk3LTI1LjY5M2MzLjYxNy0zLjYxNiw3Ljk5NC01LjQyNCwxMy4xMzQtNS40MjQgICBjNC45NDksMCw5LjIzMSwxLjgwOSwxMi44NDcsNS40MjRsNTEuNjc4LDUxLjY3NGw1MS42NzYtNTEuNjc0YzMuNjEtMy42MTYsNy44OTgtNS40MjQsMTIuODQ3LTUuNDI0ICAgYzUuMTQxLDAsOS41MjEsMS44MDksMTMuMTM1LDUuNDI0bDI1LjY5MywyNS42OTNjMy42MTcsMy42MTcsNS40MjgsNy45OTQsNS40MjgsMTMuMTM0YzAsNC45NDgtMS44MTEsOS4yMzUtNS40MjgsMTIuODQ3ICAgbC01MS42NzUsNTEuNjc4TDMyMi42MjEsMjcwLjkzOXoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K">').insertBefore($("#analysis .shadows"));
	var mX, mY, distance,

		$element = $('#closeicn');

	function calculateDistance(elem, mouseX, mouseY) {
		return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
	}
	$('#analysis').unbind("mousemove");
	Mid_MZ = ($(window).height() + 120) / 2;
	$('#analysis').mousemove(function (e) {
		mX = e.pageX;
		mY = e.pageY;

		MX = mX;
		MY = mY;
		if (Mid_MZ > mY)
			MY = MY + 50;
		else if (Mid_MZ < mY)
			MY = MY - 50;
		distance = calculateDistance($element, mX, mY);
		if (distance !== null && distance > 90) $('#closeicn').hide();


	});
}
//// code for adding extra zeros
Number.prototype.pad = function (n) {
	return new Array(n).join('0').slice((n || 2) * -1) + this;
}
let Colors_Var;
let Count_Ticks_Array = new Array();
let total_length_data = 0;
let checkredraw = true;
function DrawD3_Parallel(data) {
	let temp3 =data;
	let temp4 = new Array();
	if(typeofSource == 'risk' && !isfileData) {
		if (temp3[0].PoFCategory) {
			if ($('#pofcatlist').chosen().val().length < 1) {
				var text = $('#pofcatlist').chosen().val()[0];
				temp4 = temp3.filter(a => a.PoFCategory == text);
			} else {
				let tempdata= new Array();
				$('#pofcatlist').chosen().val().forEach(a => {
					var text = a;
						let tempdata2 = temp3.filter(a => a.PoFCategory == text);
						Array.prototype.unshift.apply(tempdata, tempdata2);
				});
				temp4 = tempdata;
			}
	   }
	} else {
		temp4 = temp3;
	}
	let data_new = temp4;
	let isHold_RedLine = false;
	let dataitem = crossfilter(data_new);
	total_length_data = data_new.length;
	Count_Ticks_Array = new Array();
	for (var i = 0; i < showattriList_Parallel.length; i++) {
			let Dim_Chart3 = dataitem.dimension(d => d[showattriList_Parallel[i]]);
			var obj = new Object();
			obj[showattriList_Parallel[i]] = Dim_Chart3.group().all();
			Count_Ticks_Array.push(obj);
	}
	redraw = function () {


	     if ($('#wrapper').is(':visible')) {
             		$("#analysis").css("width", (parseFloat($(window).width()) - 55) + 'px');
 		 } else {
			     $("#analysis").css("width", (parseFloat($(window).width()) - 55) + 'px');
		  }

		// Extract the width and height that was computed by CSS.
		var height = parseFloat(parseFloat(parseFloat($(window).height() - 160) - 10));
		$("#analysis").css("height", parseFloat(height + 10) + 'px');
		var width = parseFloat((parseFloat($(window).width()) - 55));
		$('#analysis canvas').remove();
		$('#analysis').html('');
		$('#analysis svg').remove();
		var firstCell = data_new.map(function (d) {
			return d3.values(d)[0];
		});
		// find the longest text size in the first row to adjust left margin
		var textLength = 0;
		firstCell.forEach(function (d) {
			if (d.length > textLength) textLength = d.length;
		});
		////end
		var length_Dt = data_new.length.toString();
		var alpha = 0.33;
		if (length_Dt.length > 0) {
			var _multi = 1;
			var val = length_Dt * parseFloat('0.' + _multi.pad(length_Dt.length));
			alpha = 1 - val;
			if (alpha < 0.1)
				alpha = alpha + 0.2;
			if (length_Dt < 300) {
				alpha = 0.8;
			}
		}
		Colors_Var = theme_var.root.style.getPropertyValue('--parallel_Chart_line-color');
		// get parallel coordinates
		graph = d3.parcoords()('#analysis')
			.data(data_new)
			.composite("darken")
			.color(Colors_Var)
			.margin({
				top: 24,
				left: showattriList_Parallel.length <= 6 ? -240 : -160,
				bottom: 20,
				right: showattriList_Parallel.length <= 6 ? -80 : 0
			})
			.alpha(alpha)
			//Issue #5 Change Value to Get Curve
			.smoothness(0.50)
			//Issue #5//#endregion.
			.mode("queue")
			.rate(500000)
			.interactive().reorderable()
			.brushMode("1D-axes").brushPredicate('AND');
		$("#analysis svg").css("width", width + 20 + 'px !Important').css("height", height + 'px !Important');
		$("#analysis canvas").each(function () {
			$(this).css("width", width + 20 + 'px !Important').css("height", height + 'px !Important');
		});
		$('#divsvg').click(function () {
			if (!$(event.target).hasClass('attrtext')) {
				if ($('#tooltip').is(':visible') && !isHold_RedLine) {
					isHold_RedLine = true;
				} else if (isHold_RedLine) {
					cleanTooltip();
					if (!Brushed_Clicked)
						$('#divsvg').css('cursor', 'default');
					else
						$('#divsvg').css('cursor', 'zoom-out');
					graph.color(Colors_Var);
					graph.unhighlight();
					isHold_RedLine = false;
				}
				/////for zooming out
				if (Brushed_Clicked) {
					if (!$('.progress').is(':visible')) {
						Progress_reset(1, 'brushed');
						$protext.html('Zooming Out');
					}
					DrawD3_Parallel(chart_Data_End);
					Brushed_Clicked = false;
					$('#divsvg').css('cursor', 'default');
				}
			} else {
				setTimeout(() => {
					Remove_Extras();
				}, 200);

			}
		});
		///code for highlighting and brush
		setTimeout(() => {
			Remove_Extras();
		}, 200);
		//add hover event
		setTimeout(() => {

			d3.select("#analysis svg").on("mousemove", function () {
					var hght = 0;
					$('.extent').each(function () {
						if (hght < $(this).height())
							hght = $(this).height();
					});
					if (!isHold_RedLine && hght == 0) {
						var mousePosition = d3.mouse(this);
						if (SelectCount != 0) {
							if ($(event.target)[0].localName != 'rect') {
								highlightLineOnClick(mousePosition, true); //true will also add tooltip
							} else {
								if (!Brushed_Clicked)
									$('#divsvg').css('cursor', 'default');
								else
									$('#divsvg').css('cursor', 'zoom-out');
							}
						}
					}
				})
				.on("mouseout", function () {
					if (!isHold_RedLine) {
						cleanTooltip();
						if (!Brushed_Clicked)
							$('#divsvg').css('cursor', 'default');
						else
							$('#divsvg').css('cursor', 'zoom-out');

						graph.unhighlight();
						graph.color(Colors_Var);
					}
				});

		}, 2000);
		// Add highlight for every line on click
		function getCentroids(data) {
			var margins = graph.margin();
			var graphCentPts = [];
			data.forEach(function (d) {
				var initCenPts = graph.compute_centroids(d).filter(function (d, i) {
					return i % 2 == 0;
				});
				var cenPts = initCenPts.map(function (d) {
					return [d[0] + margins["left"], d[1] + margins["top"]];
				});

				graphCentPts.push(cenPts);
			});
			return graphCentPts;
		}

		function getActiveData() {

			if (graph.brushed() != false) return graph.brushed();
			return graph.data();
		}

		function isOnLine(startPt, endPt, testPt, tol) {
			// check if test point is close enough to a line
			// between startPt and endPt. close enough means smaller than tolerance
			var x0 = testPt[0];
			var y0 = testPt[1];
			var x1 = startPt[0];
			var y1 = startPt[1];
			var x2 = endPt[0];
			var y2 = endPt[1];
			var Dx = x2 - x1;
			var Dy = y2 - y1;
			var delta = Math.abs(Dy * x0 - Dx * y0 - x1 * y2 + x2 * y1) / Math.sqrt(Math.pow(Dx, 2) + Math.pow(Dy, 2));

			if (delta <= tol) return true;
			return false;
		}

		function findAxes(testPt, cenPts) {
			// finds between which two axis the mouse is
			var x = testPt[0];
			//	var x = testPt[1];
			// make sure it is inside the range of x
			if (cenPts[0][0] > x) return false;

			if (cenPts[cenPts.length - 1][0] < x) return false;

			// find between which segment the point is
			for (var i = 0; i < cenPts.length; i++) {


				if (cenPts[i][0] > x)
					return i;
			}
		}

		function cleanTooltip() {
			// removes any object under #tooltip is
			graph.color(Colors_Var);
			graph.svg.selectAll("#tooltip")
				.remove();
		}

		function addTooltip(clicked, clickedCenPts, clickedIndex) {
			// sdd tooltip to multiple clicked lines
			var clickedDataSet = [];
			var margins = graph.margin();
			var clickedIndex = clickedIndex[0];
			// get all the values into a single list
			// I'm pretty sure there is a better way to write this is Javascript
			for (var i = 0; i < clicked.length; i++) {
				for (var j = 0; j < clickedCenPts[i].length; j++) {
					//var text =showattriList_Parallel[j]+': '+ d3.values(clicked[i])[j];
					var text = d3.values(clicked[i])[j];
					// graph.color('#FF0000');
					// not clean at all!
					var x = clickedCenPts[i][j][0] - margins.left;
					var y = clickedCenPts[i][j][1] - margins.top;
					if (clickedDataSet.length < showattriList_Parallel.length) {
						clickedDataSet.push([x, y, text]);
					}

				}
			};

			// add rectangles
			var fontSize = 11;
			var padding = 2;
			var rectHeight = (fontSize + 3) + 2 * padding; //based on font size
			//rectHeight+=rectHeight;
			var text_count = 'Count: ' + data_new.length;
			graph.svg.selectAll("rect[id='tooltip']")
				.data(clickedDataSet).enter()
				.append("rect")
				.attr("x", function (d) {
					return d[0] - d[2].length * 5;
				})
				.attr("y", function (d) {
					return d[1] - rectHeight + 2 * padding;
				})
				.attr("rx", "4")
				.attr("ry", "4")
				.attr("id", "tooltip")
				.attr("fill", "grey")
				.attr("opacity", 0.7)
				.attr("stroke", "#000000")
				.attr("stroke-width", 1)
				.attr("stroke-opacity", "0.25")
				.attr("width", function (d) {
					return d[2].length * 10;
				})
				.attr("height", rectHeight);

			graph.svg
				.append("rect")
				.attr("x", (MX+120) - ((text_count.length * 10)))
				.attr("y", MY - (185 + rectHeight + 2 * padding))
				.attr("rx", "4")
				.attr("ry", "4")
				.attr("id", "tooltip")
				.attr("fill", "grey")
				.attr("opacity", 0.5)
				.attr('z-index', '2')
				.attr("stroke", "#000000")
				.attr("stroke-width", 1)
				.attr("stroke-opacity", "0.25")
				.attr("width", text_count.length * 10)
				.attr("height", rectHeight + 6);
			// add text on top of rectangle
			graph.svg.selectAll("text[id='tooltip']")
				.data(clickedDataSet).enter()
				.append("text")
				.attr("x", function (d) {
					return d[0];
				})

				.attr("y", function (d) {
					return d[1];
				})
				.attr("id", "tooltip")
				.attr("fill", "white")
				.attr("text-anchor", "middle")
				.attr("font-size", fontSize)
				.text(function (d) {
					return d[2];
				});

			graph.svg
				.append("text")
				.attr("x", (MX+176) - (text_count.length * 10))
				.attr("y", MY - 191)
				.attr("id", "tooltip")
				.attr("fill", "#ffffff")
				.attr('z-index', '2')
				.attr("text-anchor", "middle")
				.attr("font-size", fontSize)
				.text(function (d) {
					return 'Count: ' + clickedIndex
				});
             graph.color('#FF0000');
		}



		function getClickedLines(mouseClick) {
			var clicked = [];
			var clickedCenPts = [];
			var clickedIndex = [];

			// find which data is activated right now
			var activeData = getActiveData();

			// find centriod points
			var graphCentPts = getCentroids(activeData);

			if (graphCentPts.length == 0) return false;

			// find between which axes the point is
			var axeNum = findAxes(mouseClick, graphCentPts[0]);
			if (!axeNum) return false;

			graphCentPts.forEach(function (d, i) {

				if (isOnLine(d[axeNum - 1], d[axeNum], mouseClick, 2)) {
					clicked.push(activeData[i]);
					clickedCenPts.push(graphCentPts[i]); // for tooltip
				}

			});

			clickedIndex.push(clickedCenPts.length);


			return [clicked, clickedCenPts, clickedIndex]
		}


		function highlightLineOnClick(mouseClick, drawTooltip) {

			var clicked = [];
			var clickedCenPts = [];
			var clickedIndex = [];
			clickedData = getClickedLines(mouseClick);


			if (clickedData && clickedData[0].length != 0) {

				clicked = clickedData[0][0];
				clickedCenPts = clickedData[1][0];
				clickedIndex = clickedData[2][0];

				// highlight clicked line
				graph.highlight([clicked]);

				if (drawTooltip) {
					// clean if anything is there
					cleanTooltip();
					$('#divsvg').css('cursor', 'pointer');

					// add tooltip
					addTooltip([clicked], [clickedCenPts], [clickedIndex]);
				}

			}
		}
		AppendCloseIcon();
		CloseFun();
		if ($('#loadermain').is(':visible')) {
			Incr_progress();
			setTimeout(function () {
				$('#loadermain').hide();
			}, 1000);
		}
		window.addEventListener("resize", redraw);

		// $('#sidebarDiv2').click(function () {
		// 	if ($('#dataexplorepanel').is(':visible') && checkredraw) {
		// 		redraw();
		// 		checkredraw = false;
		// 	} else if (!$('#dataexplorepanel').is(':visible') && !checkredraw) { 
		// 		redraw();
		// 		checkredraw = false;
		// 	}
		//  });

	};
	redraw();
	$(function () {
		$("#sortable ").sortable({
				connectWith: "#analysis",
				scroll: false,
			revert: true,
			start: function(event, ui) {
				$("#analysis").css("width", (parseFloat($(window).width()) - 448) + 'px');
				$("#sortable").css("overflow-y","unset");
			},
			stop: function (evt, ui) {
				$("#sortable").css("overflow-y","auto");
			}
			})
			.disableSelection();
		/////on drop of item this will fire and shows Confirmation For Date

		$("#analysis").droppable({
			receive: function (event, ui) {
				$("#sortable").css("overflow-y","auto");
				ui.item.remove();
			},
			drop: function (event, ui) {
				$("#sortable").css("overflow-y","auto");
				var text_v = $(ui.draggable).attr('data-value');
				showattriList_Parallel.push(text_v);
				ui.draggable.remove();
				ReloadChart();
			}
		});
		$("#sortable li").dblclick(function (e) {
			var text_v = $(e.target).attr('data-value');
			showattriList_Parallel.push(text_v);
			ReloadChart();
		});
	});
	CloseFun();
	if ($('.is-active').data('module') == 'analysis' || initialload) {
		$('#dataexplorepanel').show();
	} else {
		$('#dataexplorepanel').hide();
	}
	if (onlyloadhigh) {

		 $('#analysisicon').show();
		 $('#analysisloader').hide();
		 $('#launchloader').hide();
		 $('#launch-btn').attr("disabled", false);
		 $('[data-module=analysis]').css('pointer-events', 'all');
		var text = $('#pofyearselect option:selected').text();
		var MinID = $('#pofyearselect option:selected').data('min');
		var MaxID = $('#pofyearselect option:selected').data('max');
		if (text != '' && text !== null) {
			$('#analysisloader').hide();
			$('#analysisicon').show();
			onlyloadhigh = false;
			dontshowload = true;
			initialload = false;
			FetchData_OwnerRecord(text, MinID, MaxID);
		}
	} else {
		dontshowload = false;
		$('#metricsloader').hide();
		$('#metricsicon').show();
		$("#pofcatlist").prop('disabled', false).trigger("chosen:updated");
		$('[data-module=metrics]').css('pointer-events', 'all');
		$("#pofcatlist_chosen").attr('title', 'Select Any Category');
		if(backgroundata.length < 1) {
			FetchData_PoF_Year_background();
		}
	}
	Incr_progress();
	setTimeout(function () {
		$('#loadermain').hide();

	}, 1000);
}
