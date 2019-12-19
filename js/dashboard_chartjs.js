// @ts-nocheck
/* eslint-disable */
function getRandomColorHex(value) {
    const hex = '0123456789ABCDEF';
    let colorarray = [];
    for (let j = 1; j <= value; j++) {
        let color = '#';
        for (let i = 1; i <= 6; i++) {
            color += hex[Math.floor(Math.random() * 16)];
        }
        colorarray.push(color);
    }
    return colorarray;
};

function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) ||
            !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'desc') ?
                (comparison * -1) : comparison
        );
    };
}
// skdhjf sdlfh
function getSum(total, num) {
    return total + num;
}
function hexToRgb(hex) {
    if (hex != undefined && hex != null) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    } else {
        return null;
    }

}

var colors_array = ["#3AE4FF", "#E8E8E8", "#2FE3FF", "#D9D9D9", "#42E5FF", "#CACACA", "#525A6B", "#21C0D9", "#B0B0B0"];
const arrSum = arr => arr.reduce((a, b) => a + b, 0);
let tempmaindt = new Array();
let borderarray= new Array();
let arrayofchart = new Array();
let checkifon = false;
let OtherOptionArray = new Array();
let currentsourceoffilter = new Array();
function Draw_Dashboard_2ndSource(data, sourceoffilter) {
    //get data into crossfilter formate //#endregion
    currentsourceoffilter = sourceoffilter;
    if (!sourceoffilter.length) {
        sourceoffilter= [''];
        tempmaindt = data;
        checkifon = false;
    } else {
        checkifon = true;
    }
    /////
    var options_var = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 0,
        },
        legend: {
            position: 'bottom',
            display: false,
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 4,
                bottom: 4
            }
        },
        plugins: {
            labels: [{
                render: 'percentage',
                fontColor: theme_var.root.style.getPropertyValue('--chartslabelcolor'),
                precision: 2,
                anchor: 'end',
                align: 'end',
                position: 'border',
                rotation: 0,
                offset: 40,
                display: 'auto'
            },
            {
                render: 'label',
                arc: true,
                fontColor: theme_var.root.style.getPropertyValue('--chartslabelcolor'),
                display: 'auto',
                rotation: 90,
                position: 'outside'
            }
            ]
        },
        'onClick': function (evt, elements) {
            if (elements && elements.length) {
                var segment = elements[0];
                ManageBorderArray(segment);
    
            }
        }
    };
    ////
    

    let dataitem = crossfilter(data);
    let fliparray = new Array();
    var ctx1 = document.getElementById('chartjs1').getContext('2d');
    var ctx2 = document.getElementById('chartjs2').getContext('2d');
    var ctx3 = document.getElementById('chartjs3').getContext('2d');
    var ctx4 = document.getElementById('chartjs4').getContext('2d');
    var ctx5 = document.getElementById('chartjs5').getContext('2d');
    // main statics bar code

    if (Mapping_Array[0]['PoF_Year'] != undefined && Mapping_Array[0]['PoF_Year'].trim() != '' &&
        Mapping_Array[0]['PipeCount'] != undefined && Mapping_Array[0]['PipeCount'].trim() != ''
    ) {
        let m_1 = dataitem.dimension(item => item[Mapping_Array[0]['PoF_Year']]);
        let Group_m_1 = m_1.group().reduceSum(item =>
            item[Mapping_Array[0]['PipeCount']] == 'Unknown' || item[Mapping_Array[0]['PipeCount']] == null ? 0 : item[Mapping_Array[0]['PipeCount']]
        ).all().map(a => a.value);
        $('#m_1').html(parseFloat(Group_m_1).toFixed(2));
    } else {
        $('#m_1').html('Map PoF_Year & PipeCount');
    }
    if (Mapping_Array[0]['PoF_Year'] != undefined && Mapping_Array[0]['PoF_Year'].trim() != '' &&
        Mapping_Array[0]['Length_Mi'] != undefined && Mapping_Array[0]['Length_Mi'].trim() != ''
    ) {
        let m_2 = dataitem.dimension(item => item[Mapping_Array[0]['PoF_Year']]);
        let Group_m_2 = m_2.group().reduceSum(item =>
            item[Mapping_Array[0]['Length_Mi']] == 'Unknown' || item[Mapping_Array[0]['Length_Mi']] == null ? 0 : item[Mapping_Array[0]['Length_Mi']]
        ).all().map(a => a.value);
        $('#m_2').html(parseFloat(Group_m_2).toFixed(2));
    } else {
        $('#m_2').html('Map PoF_Year & Length_Mi');
    }
    if (Mapping_Array[0]['PoF_Year'] != undefined && Mapping_Array[0]['PoF_Year'].trim() != '' &&
        Mapping_Array[0]['BreakCount'] != undefined && Mapping_Array[0]['BreakCount'].trim() != ''
    ) {
        let m_3 = dataitem.dimension(item => item[Mapping_Array[0]['PoF_Year']]);
        let Group_m_3 = m_3.group().reduceSum(item =>
            item[Mapping_Array[0]['BreakCount']] == 'Unknown' || item[Mapping_Array[0]['BreakCount']] == null ? 0 : item[Mapping_Array[0]['BreakCount']]
        ).all().map(a => a.value);
        $('#m_3').html(parseFloat(Group_m_3).toFixed(2));
        let m_2 = dataitem.dimension(item => item[Mapping_Array[0]['PoF_Year']]);
        let Group_m_2 = m_2.group().reduceSum(item =>
            item[Mapping_Array[0]['Length_Mi']] == 'Unknown' || item[Mapping_Array[0]['Length_Mi']] == null ? 0 : item[Mapping_Array[0]['Length_Mi']]
        ).all().map(a => a.value);
        $('#m_4').html(((parseFloat(Group_m_3) / parseFloat(Group_m_2)) * 100).toFixed(2));
    } else {
        $('#m_3').html('Map PoF_Year & BreakCount');
        $('#m_4').html('Map PoF_Year & BreakCount');
    }
    if (Mapping_Array[0]['InstallYear'] != undefined && Mapping_Array[0]['InstallYear'].trim() != '' &&
        Mapping_Array[0]['BreakCount'] != undefined && Mapping_Array[0]['BreakCount'].trim() != '' &&
        !sourceoffilter.includes('chartjs1')
    ) {
        //chart3
        // % pipelength by material
        let Dim_Chart1 = dataitem.dimension(item => parseInt(item[Mapping_Array[0]['InstallYear']]));
        let Group_Chart1 = Dim_Chart1.group().reduceSum(item =>
            item[Mapping_Array[0]['BreakCount']] == 'Unknown' || item[Mapping_Array[0]['BreakCount']] == null ? 0 : item[Mapping_Array[0]['BreakCount']]
        ).top(9);
        Group_Chart1 = Group_Chart1.sort(compareValues('key', 'acs'));
        var config1 = {
          type: "line",
          data: {
            datasets: [
              {
                data: Group_Chart1.map(i => Math.round(i.value)),
                backgroundColor: ["#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9"],
                borderColor: ["#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9","#21C0D9"],
                hoverBackgroundColor: ["#3AE4FF","#3AE4FF","#3AE4FF","#3AE4FF","#3AE4FF","#3AE4FF","#3AE4FF","#3AE4FF","#3AE4FF","#3AE4FF"],
                hoverBorderColor: ["#0B6774", "#0B6774", "#0B6774", "#0B6774", "#0B6774", "#0B6774", "#0B6774", "#0B6774", "#0B6774", "#0B6774"],   
                Column: Mapping_Array[0]["InstallYear"],
                label: "Breaks per Install Year",
                fill: false,
                pointRadius: 6,
                pointHoverRadius: 7
              }
            ],
            labels: Group_Chart1.map(i => i.key)
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            legend: {
              display: false
            },
            layout: {
              padding: {
                left: 8,
                right: 8,
                top: 12,
                bottom: 8
              }
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display:true,
                    color: theme_var.root.style.getPropertyValue('--linechartgridcolor') // this here
                  },
                  ticks: {
                    fontColor:theme_var.root.style.getPropertyValue('--linechartlabelcolor') // this here
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color:theme_var.root.style.getPropertyValue('--linechartgridcolor') // this here
                  },
                  ticks: {
                    fontColor: theme_var.root.style.getPropertyValue('--linechartlabelcolor') // this here
                  }
                }
              ]
            },
            plugins: {
              labels: [
                {
                  render: "percentage",
                  fontColor: function(args) {
                    var rgb = hexToRgb(
                      args.dataset.backgroundColor[args.index]
                    );
                    var threshold = 140;
                    var luminance =
                      0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
                    return luminance > threshold ? "black" : "white";
                  },
                  precision: 2,
                  position: "border"
                },
                {
                  render: "label",
                  arc: true,
                  fontColor: "#000",
                  position: "outside"
                }
              ]
            },
            onClick: function(evt, elements) {
              if (elements && elements.length) {
                var segment = elements[0];
                ManageBorderArray(segment);
              }
            }
          }
        };
        if (arrayofchart[0] != null) {
            arrayofchart[0].destroy();
        }
        let chart1 = new Chart(ctx1, config1);
        arrayofchart[0] = chart1;
        fliparray.push({
            Flip: true,
            ID: "#chartjs1"
        });

    } else if (!sourceoffilter.includes('chartjs1')) {
        fliparray.push({
            Flip: false,
            ID: "#chartjs1"
        });
    }
    if (Mapping_Array[0]['PipeMaterial'] != undefined && Mapping_Array[0]['PipeMaterial'].trim() != '' &&
        Mapping_Array[0]['Probability'] != undefined && Mapping_Array[0]['Probability'].trim() != '' &&
        !sourceoffilter.includes('chartjs2') ) {
        //chart3
        // % pipelength by material
        let Dim_Chart2 = dataitem.dimension(item => item[Mapping_Array[0]['PipeMaterial']]);

        let Group_Chart2 = Dim_Chart2.group().reduceSum(item =>
            item[Mapping_Array[0]['Probability']] == 'Unknown' || item[Mapping_Array[0]['Probability']] == null ? 0 : item[Mapping_Array[0]['Probability']]
        ).top(9);

        const colorbind = new GetColorArray($("#themetype option:selected").index());
        var config2 = {
            type: 'pie',
            data: {
                datasets: [{
                    data: Group_Chart2.map(i => Math.round(i.value)),
                    backgroundColor: colorbind.backgroundColor,
                    borderColor: colorbind.borderColor,
                    hoverBackgroundColor:  colorbind.hoverBackgroundColor,
                    hoverBorderColor:colorbind.hoverBorderColor,
                    hoverBorderWidth: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                    borderWidth: [1, 1,1,1,1,1,1,1,1],
                    Column: Mapping_Array[0]['PipeMaterial'],
                    label: 'Sum Probability by Pipe Material'
                }],
                labels: Group_Chart2.map(i => i.key)
            },
            options: options_var
        };
        if (arrayofchart[1] != null) {
            arrayofchart[1].destroy();
        }
        let chart2 = new Chart(ctx2, config2);
        arrayofchart[1] = chart2;
        fliparray.push({
            Flip: true,
            ID: "#chartjs2"
        });

    } else if (!sourceoffilter.includes('chartjs2')) {
        fliparray.push({
            Flip: false,
            ID: "#chartjs2"
        });
    }
    if (Mapping_Array[0]['PipeDiameter'] != undefined && Mapping_Array[0]['PipeDiameter'].trim() != '' &&
        Mapping_Array[0]['Probability'] != undefined && Mapping_Array[0]['Probability'].trim() != '' &&
        !sourceoffilter.includes('chartjs3')) {
        //chart3
        // % pipelength by material
        let Dim_Chart3 = dataitem.dimension(item => item[Mapping_Array[0]['PipeDiameter']]);
        let Group_Chart3 = Dim_Chart3.group().reduceSum(item =>
            item[Mapping_Array[0]['Probability']] == 'Unknown' || item[Mapping_Array[0]['Probability']] == null ? 0 : item[Mapping_Array[0]['Probability']]
        ).top(4);
        const total = Dim_Chart3.group().reduceSum(item =>
            item[Mapping_Array[0]['Probability']] == 'Unknown' || item[Mapping_Array[0]['Probability']] == null ? 0 : item[Mapping_Array[0]['Probability']]
        ).all();
        let difference = total.filter(({
            value: id1
        }) => !Group_Chart3.some(({
            value: id2
        }) => id2 === id1));
        if (difference.length) {
            OtherOptionArray[0] = difference;
            Group_Chart3.push({
                key: 'Other',
                value: difference.map(a => a.value).reduce(getSum).toFixed(2)
            });
        } else {
            OtherOptionArray = new Array();
        }
        const colorbind = new GetColorArray($("#themetype option:selected").index());

        var config3 = {
            type: 'pie',
            data: {
                datasets: [{
                    data: Group_Chart3.map(i => Math.round(i.value)),
                    backgroundColor: colorbind.backgroundColor,
                    borderColor: colorbind.borderColor,
                    hoverBackgroundColor:  colorbind.hoverBackgroundColor,
                    hoverBorderColor: colorbind.hoverBorderColor,
                    hoverBorderWidth: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                    borderWidth: [1, 1,1,1,1,1,1,1,1],
                    Column: Mapping_Array[0]['PipeDiameter'],
                    label: 'Sum Probability by PipeDiameter'
                }],
                labels: Group_Chart3.map(i => i.key)
            },
            options: options_var
        };
        if (arrayofchart[2] != null) {
            arrayofchart[2].destroy();
        }
        let chart3 = new Chart(ctx3, config3);
        arrayofchart[2] = chart3;
        fliparray.push({
            Flip: true,
            ID: "#chartjs3"
        });
    } else if (!sourceoffilter.includes('chartjs3')) {
        fliparray.push({
            Flip: false,
            ID: "#chartjs3"
        });
    }
    if (Mapping_Array[0]['CoFCategory'] != undefined && Mapping_Array[0]['CoFCategory'].trim() != '' &&
        Mapping_Array[0]['Probability'] != undefined && Mapping_Array[0]['Probability'].trim() != '' &&
        !sourceoffilter.includes('chartjs4')) {
        //chart3
        // % pipelength by material
        let Dim_Chart4 = dataitem.dimension(item => item[Mapping_Array[0]['CoFCategory']]);
        let Group_Chart4 = Dim_Chart4.group().reduceSum(item =>
            item[Mapping_Array[0]['Probability']] == 'Unknown' || item[Mapping_Array[0]['Probability']] == null ? 0 : item[Mapping_Array[0]['Probability']]
        ).top(5);
        const colorbind = new GetColorArray($("#themetype option:selected").index());

        var config4 = {
            type: 'pie',
            data: {
                datasets: [{
                    data: Group_Chart4.map(i => Math.round(i.value)),
                    backgroundColor: colorbind.backgroundColor,
                    borderColor: colorbind.borderColor,
                    hoverBackgroundColor:  colorbind.hoverBackgroundColor,
                    hoverBorderColor: colorbind.hoverBorderColor,
                    hoverBorderWidth: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                    borderWidth: [1, 1,1,1,1,1,1,1,1],
                    Column: Mapping_Array[0]['CoFCategory'],
                    label: 'Sum Probability by CoFCategory'
                }],
                labels: Group_Chart4.map(i => i.key)
            },
            options: options_var
        };
        if (arrayofchart[3] != null) {
            arrayofchart[3].destroy();
        }
        let chart4 = new Chart(ctx4, config4);
        arrayofchart[3] = chart4;
        fliparray.push({
            Flip: true,
            ID: "#chartjs4"
        });
    } else if (!sourceoffilter.includes('chartjs4')) {
        fliparray.push({
            Flip: false,
            ID: "#chartjs4"
        });
    }
    if (Mapping_Array[0]['PoFCategory'] != undefined && Mapping_Array[0]['PoFCategory'].trim() != '' &&
        Mapping_Array[0]['PipeCount'] != undefined && Mapping_Array[0]['PipeCount'].trim() != '' &&
        !sourceoffilter.includes('my_dataviz')) {
        // instantiate d3plus
        let Dim_Chart412 = dataitem.dimension(item => item[Mapping_Array[0]['PoFCategory']]);
        let Group_Chart412 = Dim_Chart412.group().reduceSum(item =>
            item[Mapping_Array[0]['PipeCount']] == 'Unknown' || item[Mapping_Array[0]['PipeCount']] == null ? 0 : item[Mapping_Array[0]['PipeCount']]
        ).order(a => a[Mapping_Array[0]['PoFCategory']]).top(9);
        treemap2 = function () {
            return {
                init: function init() {

                    $('#my_dataviz').html('');
                    d3plus.viz()
                        .container("#my_dataviz") // container DIV to hold the visualization
                        .data(Group_Chart412) // data to use with the visualization
                        .type("tree_map") // visualization type
                        .id("key") // key for which our data is unique on
                        .size("value") // sizing of blocks
                        .font({
                            "family": "Poppins'",
                            "size": 30
                        })
                        .mouse({
                            "click": function (event) {
                                if (event.key != null) {
                                    Attach_click_Tree('my_dataviz', 'PoFCategory', event.key);
                                }
                            }
                        })
                        .draw() // finally, draw the visualization!
                }
            };
        }();
        treemap2.init();
        fliparray.push({
            Flip: true,
            ID: "#my_dataviz"
        });

    } else if (!sourceoffilter.includes('my_dataviz')) {
        fliparray.push({
            Flip: false,
            ID: "#my_dataviz"
        });
    }
    if (Mapping_Array[0]['CoFCategory'] != undefined && Mapping_Array[0]['CoFCategory'].trim() != '' &&
        Mapping_Array[0]['PipeCount'] != undefined && Mapping_Array[0]['PipeCount'].trim() != '' &&
        !sourceoffilter.includes('my_dataviz2') ) {

        // instantiate d3plus
        let Dim_Chart41 = dataitem.dimension(item => item[Mapping_Array[0]['CoFCategory']]);
        let Group_Chart41 = Dim_Chart41.group().reduceSum(item =>
            item[Mapping_Array[0]['PipeCount']] == 'Unknown' || item[Mapping_Array[0]['PipeCount']] == null ? 0 : item[Mapping_Array[0]['PipeCount']]
        ).order(a => a[Mapping_Array[0]['CoFCategory']]).top(9);
        treemap = function () {
            return {
                init: function init() {

                    $('#my_dataviz2').html('');
                    d3plus.viz()
                        .container("#my_dataviz2") // container DIV to hold the visualization
                        .data(Group_Chart41) // data to use with the visualization
                        .type("tree_map") // visualization type
                        .id("key") // key for which our data is unique on
                        .size("value") // sizing of blocks
                        .font({
                            "family": "Poppins'",
                            "size": 30
                        })
                        .mouse({
                            "click": function (event) {
                                if (event.key != null) {
                                    Attach_click_Tree('my_dataviz2', 'CoFCategory', event.key);
                                }
                            }
                        })
                        .draw() // finally, draw the visualization!
                }
            };
        }();
        treemap.init();
        fliparray.push({
            Flip: true,
            ID: "#my_dataviz2"
        });
    } else if (!sourceoffilter.includes('my_dataviz2')) {
        fliparray.push({
            Flip: false,
            ID: "#my_dataviz2"
        });
    }
    if (Mapping_Array[0]['Contract'] != undefined && Mapping_Array[0]['Contract'].trim() != '' &&
        !sourceoffilter.includes('chartjs5') ) {
        //chart3
        // % pipelength by material
        let Dim_Chart5 = dataitem.dimension(item => item[Mapping_Array[0]['Contract']]);
        let Group_Chart5 = Dim_Chart5.group().reduceSum(item =>
            item[Mapping_Array[0]['Probability']] == 'Unknown' || item[Mapping_Array[0]['Probability']] == null ? 0 : item[Mapping_Array[0]['Probability']]
        ).top(8);
        const colorbind = new GetColorArray($("#themetype option:selected").index());

        var config5 = {
            type: 'pie',
            data: {
                datasets: [{
                    data: Group_Chart5.map(i => Math.round(i.value)),
                    backgroundColor: colorbind.backgroundColor,
                    borderColor: colorbind.borderColor,
                    hoverBackgroundColor:  colorbind.hoverBackgroundColor,
                    hoverBorderColor: colorbind.hoverBorderColor,
                    hoverBorderWidth: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                    borderWidth: [1, 1,1,1,1,1,1,1,1],
                    Column: Mapping_Array[0]['Contract'],
                    label: 'Sum Probability by Contract'
                }],
                labels: Group_Chart5.map(i => i.key)
            },
            options: options_var
        };
        if (arrayofchart[4] != null) {
            arrayofchart[4].destroy();
        }
        let chart5 = new Chart(ctx5, config5);
        arrayofchart[4] = chart5;
        fliparray.push({
            Flip: true,
            ID: "#chartjs5"
        });
    } else if (!sourceoffilter.includes('chartjs5')) {
        fliparray.push({
            Flip: false,
            ID: "#chartjs5"
        });
    }
    // end code
    if ($('.is-active').data('module') == 'metrics') {
        $('#datamappingMain').show();
        $('#dataexplorepanel').hide();
    } else {
        $('#datamappingMain').hide();
    }

    if ($('#loadermain').is(':visible')) {
        setTimeout(function () {
            $('#loadermain').hide();
        }, 500);
    }
    fliparray.forEach(a => {
        if (a.Flip) {
            $(a.ID).closest('.flipper').addClass('flip');
        } else {
            $(a.ID).closest('.flipper').removeClass('flip');
        }
    });
    // $('.mainstage').scrollTop(500);
    ////////////////////////////////////
}
