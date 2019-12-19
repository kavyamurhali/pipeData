// code for parallel charts starts here 

//////function for formating array 
function FormateESRIArray_Parallel(data) {
    fulllist_parallel = new Array();
    TypeofAttr_array = new Array();
    LeftSideList_Parallel = new Array();

    unformated_array_Dashboard = new Array();
    unformated_array_Dashboard = data;
    unformated_array_Parallel = new Array();
    unformated_array_Parallel = data;
    var formatedArray = new Array();
    if (showattriList_Parallel.length < 1) {
        showattriList_Parallel = new Array();
        Array.prototype.push.apply(showattriList_Parallel,Owner_represent);
        if(typeofSource == 'risk' && !isfileData) {
            showattriList_Parallel.push("InstallYear");
            showattriList_Parallel.push("PipeMaterial");
            showattriList_Parallel.push("PipeDiameter");
            showattriList_Parallel.push("CoFCategory");
            showattriList_Parallel.push("PoFCategory");
        } else if(typeofSource == 'break' && !isfileData){
            showattriList_Parallel.push("PipeMaterial");
            showattriList_Parallel.push("PipeDiameter");
        } else if(isfileData) {
           /// showattriList_Parallel.push(replace_Owner);
        }
    }
    for (var key in data[0].attributes) {
        LeftSideList_Parallel.push(key);
    }
    
    for (var i = 0; i < LeftSideList_Parallel.length; i++) {
        var sp = data[0].attributes;

        // @ts-ignore
        if ($.isNumeric(sp[LeftSideList_Parallel[i]])) {
            var item = LeftSideList_Parallel[i];
            if (TypeofAttr_array.indexOf(item) === -1)
                TypeofAttr_array.push(item);
        }
    }
    var sum_ = 0;
    for (let h = 0; h < data.length; h++) {

        var sp = data[h].attributes;

        var obj = {};

        for (var i = 0; i < showattriList_Parallel.length; i++) {

            //////////////////////// Formate_Parallel for sum or count or unique 

            // @ts-ignore
            if ($.isNumeric(sp[showattriList_Parallel[i]])) {


                var numtype = numerictype[showattriList_Parallel[i]];

                numtype = 'Unique';


                if (numtype == 'Sum') {
                    if (h < 1) {
                        sum_ = 0;

                        for (let j = 0; j < data.length; j++) {
                            var sp2 = data[j].attributes;

                            sum_ += parseFloat(sp2[showattriList_Parallel[i]]);
                        }
                    }


                    // @ts-ignore
                    obj[showattriList_Parallel[i]] = parseInt(sum_).toString() + ' ';
                } else if (numtype == 'Count') {
                    obj[showattriList_Parallel[i]] = data.length.toString() + ' ';


                } else {

                    obj[showattriList_Parallel[i]] = '' + sp[showattriList_Parallel[i]];
                }
            } else {

                obj[showattriList_Parallel[i]] = '' + sp[showattriList_Parallel[i]];

            }
            ////////////////////////////
        }

        formatedArray.push(obj);
    }
        formatedArray = formatedArray.filter(item => {
                return (item[Owner_represent[0]] != null && item[Owner_represent[0]] != '' && item[Owner_represent[0]] != ' ');
        });
    ReadPopulation_Parallel();
    DrawLeftSide_Parallel(LeftSideList_Parallel, showattriList_Parallel);
    fulllist_parallel = formatedArray;
    Formate_Parallel(formatedArray);

}
/////////////////func to trigger after drag n drop to redraw chart
function FormateESRIArrayafterDragnDrop_Parallel() {

    var formatedArray = new Array();
    var sum_ = 0;
    for (let h = 0; h < unformated_array_Parallel.length; h++) {

        var sp = unformated_array_Parallel[h].attributes;

        var obj = {};

        for (var i = 0; i < showattriList_Parallel.length; i++) {

            //////////////////////// Formate_Parallel for sum or count or unique 

            // @ts-ignore
            if ($.isNumeric(sp[showattriList_Parallel[i]])) {


                var numtype = numerictype[showattriList_Parallel[i]];

                numtype = 'Unique';


                if (numtype == 'Sum') {
                    if (h < 1) {
                        sum_ = 0;

                        for (let j = 0; j < unformated_array_Parallel.length; j++) {
                            var sp2 = unformated_array_Parallel[j].attributes;

                            sum_ += parseFloat(sp2[showattriList_Parallel[i]]);
                        }
                    }
                    // @ts-ignore
                    obj[showattriList_Parallel[i]] = parseInt(sum_).toString() + ' ';
                } else if (numtype == 'Count') {
                    obj[showattriList_Parallel[i]] = unformated_array_Parallel.length.toString() + ' ';

                } else {
                    obj[showattriList_Parallel[i]] = sp[showattriList_Parallel[i]];
                }
            } else {

                obj[showattriList_Parallel[i]] = '' + sp[showattriList_Parallel[i]];

            }
            ////////////////////////////
        }

        formatedArray.push(obj);

    }
    formatedArray = formatedArray.filter(item => {
            return (item[Owner_represent[0]] != null && item[Owner_represent[0]] != '' && item[Owner_represent[0]] != ' ');
    });
  
    ReadPopulation_Parallel();
    DrawLeftSide_Parallel(LeftSideList_Parallel, showattriList_Parallel);
    fulllist_parallel = formatedArray;
    Formate_Parallel(formatedArray);
}

function ReadPopulation_Parallel() {

    var data = unformated_array_Parallel;
    obj_indicator = new Object();
    Top_indicator = new Object();

    for (var key in data[0].attributes) {
        var count = 0;


        for (let i = 0; i < data.length; i++) {
            var val = data[i].attributes[key];


            if (val == null || val == undefined || val == 0 || val == '' || val == ' ' || val == 'null' || val == 'NULL' || val == 'Unknown')
                count++;

        }

        var cacl = (100 - ((count / data.length) * 100));


        var counter = {}

        data.forEach(function (obj) {

                var key_2 = JSON.stringify(obj.attributes[key])

                counter[key_2] = (counter[key_2] || 0) + 1
            }

        );

        // @ts-ignore
        keysSorted = Object.entries(counter).reverse((a, b) => a[1] - b[1]);

        // @ts-ignore
        Top_indicator[key] = keysSorted;

        obj_indicator[key] = cacl;

    }


}
////////////////
function DrawLeftSide_Parallel(array1, array2) {

    var unique = array1.filter(v => array2.indexOf(v) == -1);
    // @ts-ignore
    $("#sortable").html('');
    // @ts-ignore
    $('#sortable').closest('div').css('overflow-y', 'scroll');
    var lenght_ele = 0;

    unique.sort().forEach(element => {
        if(element != null && element != '') {
        var pop = Math.round(obj_indicator[element]);
        var top_v = Top_indicator[element];
        if (top_v.length > 6)
            top_v = top_v.slice((top_v.length - 7), top_v.length);
        let pop_tem = '';
        for (var i = top_v.length - 1; i >= 0; i--) {
            var vl = top_v[i][0];
            if (vl != 'null' && vl != 'undefined' && vl != '' && vl != " ")
                pop_tem += vl.replace(/"/g, '') + '<br/>';
        }

        if (top_v.length > 6)
            pop_tem += '...';
        var color = '';
        if (pop < 60)
            color = 'https://solutions.puretechltd.com/webpics/Icons/PowerBI/Indicators/Red.png';
        else if (pop > 59 && pop < 90)
            color = 'https://solutions.puretechltd.com/webpics/Icons/PowerBI/Indicators/Yellow.png';
        else if (pop > 89)
            color = 'https://solutions.puretechltd.com/webpics/Icons/PowerBI/Indicators/Green.png';

        var html = '<i class="circle icon indicate-ico" style="background-image: url(' + color + ');"><span class="spanindi">' + pop + '%</span></i>';
        if (lenght_ele < element.length)
            lenght_ele = element.length;
        if (pop_tem != '' && pop_tem != null && pop_tem != ' ')
            // @ts-ignore
            $("#sortable").append(' <li class="btn btn-outline-primary selection " data-html="' + pop_tem + '" data-position="right center" data-value="'+element+'">' + element + html + '</li>');
        else
            // @ts-ignore
            $("#sortable").append(' <li class="btn btn-outline-primary selection " data-value="'+element+'">' + element + html + '</li>');
    }
        });

    var width_li = lenght_ele * 9;
    if (width_li > 170) {
        // @ts-ignore
        $('#sortable li').css('min_width', width_li + 'px');

        // @ts-ignore
        $(".select-div").css("min_width", (width_li + 16) + 'px');
        // @ts-ignore
        $(".leftsidediv").css("min_width", (width_li + 50) + 'px');
    } else {
        // @ts-ignore
        $('#sortable li').css('min_width', 170 + 'px');
        // @ts-ignore
        $(".select-div").css("min_width", 186 + 'px');
        // @ts-ignore
        $(".leftsidediv").css("min_width", 220 + 'px');
    }
    // @ts-ignore
    $('.sorthead').show();

    // @ts-ignore
    if ($('.is-active').data('module') == 'analysis' || initialload) {
        // @ts-ignore
        $('#datamappingMain').hide();
        // @ts-ignore
        $('#dataexplorepanel').show();
    }
    else{
        // @ts-ignore
        $('#dataexplorepanel').hide();
    }

}

function ReloadChart() {
    Progress_reset(3, 'Drop');
    $protext.html('Re-Initializing Data');

    // @ts-ignore
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
    setTimeout(function () {
        FormateESRIArrayafterDragnDrop_Parallel();
    }, 200);
}


function Formate_Parallel(data) {
    Incr_progress();
    setTimeout(function () {
        $protext.html('Formating Data');
        // @ts-ignore
        $('#analysis').css('height', '100%');
        var chartData = data;
        Incr_progress();
        setTimeout(function () {
            $protext.html('Drawing Data on Chart');
            // @ts-ignore
            if ($('.is-active').data('module') == 'analysis' ) {
                // @ts-ignore
                $('#analysis').show();
            }
            if(initialload) {
              // @ts-ignore
              // $('#analysis').show();
            }
            chart_Data_End = chartData;

            if($('#breakuploadactive').hasClass('risk-break-active') && isfileData) {
                ownerfilterarray = chartData;
                var text = $('#ownerselectpanel option:selected').text();
                if(text != '' || text !== null || text != 'Select PipeLineOwner') {
                    chartData= chartData.filter(a=>a[defaultcolumn.UploadBreak] == text);
                }
            }

            // @ts-ignore
            if(!dontshowload) {
            DrawD3_Parallel(chartData);
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
        }, 700);


    }, 500);
}
function Simple_ProgressBar() {
    $progress.progress('reset');
    // @ts-ignore
    $('.bar .progress').text('100%');
    // @ts-ignore
    $('.closeicn').hide();
    // @ts-ignore
    $('.ui.progress').progress({
        duration: 100,
        total: 1
    });
    $progress.progress('reset');
    $progress.progress('increment');
    // @ts-ignore
    $('#loadermain').show();
}
//#endregion