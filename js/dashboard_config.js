// @ts-nocheck
let TypeofAttr_array = new Array();
var numerictype = new Object();
let obj_indicator = new Object();
let Top_indicator = new Object();
var $protext = $('.progress .label');
var ajazrequest;
let fulllist_dashboard = new Array();
let fulllist_parallel = new Array();
let LeftSideList_dashboard = new Array();
let showattriList_dashboard = new Array();
let redraw_dashboard = new Array();
let LeftSideList_Parallel = new Array();
let showattriList_Parallel = new Array();
let unformated_array_Dashboard = new Array();
let unformated_array_Parallel = new Array();
let Owner_represent = [];
let isfileData =false;
let typeofSource = 'risk';
let isloaded = false;
let onlyloadhigh = false;
let uploadedarray= new Array();
let pofcat = new Array();
let chart_Data_End = new Array();
let dontshowload = false;
let initialload = false;
let backgroundata= new Array();
let initialloadingarray = new Array();
  hideloadingforback= false;
  let defaultcolumn = new Object({Risk: 'PipeCount', Break : 'BreakCause', UploadBreak: 'PipeLineOwner'});
  let ownerfilterarray= new Array();
let html_code_mapping = $('#datamappingdiv').html();
// array for handling attribute mapping
let Mapping_Array = new Array({
    PoF_Year: 'PoF_Year',
    PipeCount: 'PipeCount',
    BreakCount: 'BreakCount',
    Length_Mi: 'Length_Mi',
    InstallYear: 'InstallYear',
    PipeMaterial: 'PipeMaterial',
    Probability: 'Probability',
    PipeDiameter: 'PipeDiameter',
    CoFCategory: 'CoFCategory',
    Contract: 'Contract',
    PoFCategory: 'PoFCategory'
}, {
        BreakCause: 'BreakCause',
        OBJECTID: 'OBJECTID',
        BreakYear: 'BreakYear',
        Length_Mi: 'Length_Mi',
        InstallYear: 'InstallYear',
        PipeMaterial: 'PipeMaterial',
        PipeDiameter: 'PipeDiameter',
        SoilType: 'SoilType',
        BreakType: 'BreakType',
        BreakCount: 'BreakCount',
        OperatingPressure: 'OperatingPressure'

});

//This handles the queues

//This handles the queues
(function ($) {
    var ajaxQueue = $({});
    $.ajaxQueue = function (ajaxOpts) {
        var oldComplete = ajaxOpts.complete;
        ajaxQueue.queue(function (next) {
            if ($.xhrPool.length > 0) {
                ajaxOpts.complete = function () {
                    if (oldComplete) oldComplete.apply(this, arguments);
                    setTimeout(() => {
                        next();
                    }, 30);
                };
                $.ajax(ajaxOpts);
            }
        });
    };

})(jQuery);

$.xhrPool = []; // array of uncompleted requests

$.xhrPool.abortAll = function () { // our abort function
    $(this).each(function (idx, jqXHR) {
        jqXHR.abort();
    });
    (function ($) {
        var ajaxQueue = $({});
        $.ajaxQueue = function (ajaxOpts) {
            var oldComplete = ajaxOpts.complete;

            ajaxQueue.queue(function (next) {
                if ($.xhrPool.length > 0) {
                    ajaxOpts.complete = function () {
                        if (oldComplete) oldComplete.apply(this, arguments);
                        next();
                    };
                    $.ajax(ajaxOpts);
                }
            });
        };

    })(jQuery);
    $.xhrPool.length = 0

};

$.ajaxSetup({
    beforeSend: function (jqXHR) { // before jQuery send the request we will push it to our array
        $.xhrPool.push(jqXHR);
    },
    complete: function (jqXHR) { // when some of the requests completed it will splice from the array
        var index = $.xhrPool.indexOf(jqXHR);
        if (index > -1) {
            $.xhrPool.splice(index, 1);
        }
    }
});

$(document).ready(function () {
    ///////////////////progress bar code
    $('#sortable').closest('div').css('overflow-y', 'unset');
    //#endregion
    $('.dtsrc').click(function () {


        ControlDashboard();
        $('#sortable').empty();
        $('.sorthead').hide();
        $('#ownheader').empty();
        $('#sortable').closest('div').css('overflow-y', 'unset');
        $('.listview').remove();
        $('#m_1').html('0');
        $('#m_2').html('0');
        $('#m_3').html('0');
        $('#m_4').html('0');
        $('.parcoords .card-block').each(function () {
            $(this).closest('.flipper').removeClass('flip');
        });
        $('#dataexplorepanel').hide();
        redraw_dashboard = new Array();
        $('#analysis').hide();
        $('#datamappingdiv').html(html_code_mapping);
        $('#optionmodal').modal('show');
    });
    // to hide data source modal
    // $('[data-module=metrics]').css('pointer-events', 'none');
    // $('[data-module=analysis]').css('pointer-events', 'none');
    // $('#optionmodal').modal('show');
    $('.glb').click(function () {
        typeofSource = $(this).attr('data-type');
        ControlDashboard();
        $('.main-title').hide();
        $('.l-main').removeClass('background');
        $('.content-wrapper-with-bg').show();
        $('#optionmodal').modal('hide');
        FetchData_PoF_Year();
    });
    $('.upld').click(function () {
        $('#fileUpload').click();
    });
    $('.btnchoice').click(function () {
        numerictype[$('#nummodal').attr('data-value')] = $(this).text();
        $('#nummodal').modal('hide');
        ReloadChart();
    });
    $('.risk-break-single').click(function(){

        $('#pofyear').show();
        let value = $(this).attr('data-type');
        if(value=== 'risk') {
             isfileData= false;
            $('.pofyear').show();
            $('.lengthmilesinput').hide();
            $('.ownerselectpanel').hide();
            $('#riskactive').addClass('risk-break-active');
            $('#breakactive').removeClass('risk-break-active');
            $('#breakuploadactive').removeClass('risk-break-active');
        } else if (value ==='break') {
            isfileData= false;
            $('.pofyear').show();
            $('.lengthmilesinput').hide();
            $('.ownerselectpanel').hide();
            $('#breakactive').addClass('risk-break-active');
            $('#riskactive').removeClass('risk-break-active');
            $('#breakuploadactive').removeClass('risk-break-active');
        } else if (value ==='breakuploaded') {
            isfileData= true;
            $('.pofyear').hide();
            $('.lengthmilesinput').show();
            $('.ownerselectpanel').show();
            $('#breakuploadactive').addClass('risk-break-active');
            $('#breakactive').removeClass('risk-break-active');
            $('#riskactive').removeClass('risk-break-active');
            value = 'break';
        }
        $('#sortable').empty();
        $('.sorthead').hide();
        $('#ownheader').empty();
        $('#sortable').closest('div').css('overflow-y', 'unset');
        $('.listview').remove();
        $('#m_1').html('0');
        $('#m_2').html('0');
        $('#m_3').html('0');
        $('#m_4').html('0');
        $('.parcoords .card-block').each(function () {
            $(this).closest('.flipper').removeClass('flip');
        });
        $('#dataexplorepanel').hide();
       redraw_dashboard = new Array();
        $('#analysis').hide();
        $('#datamappingdiv').html(html_code_mapping);
        setTimeout(() => {
            typeofSource = value;
        ControlDashboard();
        $('.main-title').hide();
        $('.l-main').removeClass('background');
        $('.content-wrapper-with-bg').show();
        LoadSourceAgain();
        }, 100);
    });

    $('.c-menu_item').click(function () {
        /*if ($('.is-opened').is(':visible')) {
            $(".js-hamburger").click();
        }*/
        if ($(this).data('module') == 'metrics') {
            if ($('.background').is(':visible')) {
                $('.main-title').hide();
                $('.l-main').removeClass('background');
                $('.content-wrapper-with-bg').show();
            }
            $('.container-fluid').show();
            $('#dataexplorepanel').hide();
            $('.mainstage .user-dashboard').find('h4').text('Key Metrics');
            $('#metrics').show();
            $('#spatial').hide();
            $('.grouppofyear').hide();
            $('.ownerselectpanel').hide();
            $('.lengthmilesinput').hide();
            if (redraw_dashboard.length > 0) {
                if (typeofSource == 'break') {
                    Draw_Dashboard(redraw_dashboard);
                } else {
                    Draw_Dashboard_2ndSource(redraw_dashboard,[]);
                }
            }
            if (unformated_array_Dashboard.length < 1) {
                FetchData_PoF_Year();
                isloaded = true;
            }
            // $('#datamappingMain').show();
            $('.mainstage').css('overflow','none');
            $('#analysis').hide();

        } else if ($(this).data('module') == 'Meters_analysis') {
            if ($('.background').is(':visible')) {
                $('.main-title').hide();
                $('.l-main').removeClass('background');
                $('.content-wrapper-with-bg').show();
            }
            $('.container-fluid').hide();
            $('#dataexplorepanel').hide();
            // $('.mainstage .user-dashboard').find('h4').text('Data Analysis');
            $('#metrics').hide();
            $('#spatial').hide();
            $('#analysis').show();

            $('#datamappingMain').hide();
            $('.mainstage').css('overflow','none');
            // $("#analysis").css("height", parseFloat(parseFloat($(window).height() - 143)) + 'px');

            // if (!$('#analysis iframe').length) {
            //     $('#analysis').html('<iframe src="MetersAnalysis/index.html" seamless></iframe>');
            // }

        } else if ($(this).data('module') == 'spatial') {
            $('.mainstage').css('overflow','none');
            $('#datamappingMain').hide();
            $('#dataexplorepanel').hide();
            $('#analysis').hide();
            $('#metrics').hide();
            $('.main-title').hide();
            $('.l-main').removeClass('background');
            $('.container-fluid').hide();
            $('.content-wrapper-with-bg').show();
            if ($('.background').is(':visible')) {
                $('.main-title').hide();
                $('.l-main').removeClass('background');
                $('.content-wrapper-with-bg').show();
            }
            $('#spatial').show();
            // $('.mainstage .user-dashboard').find('h4').text('Spatial Analysis');
            // if (!$('#spatial iframe').length) {
            //     $('#spatial').html('<iframe src="MianBreak_Analysis/index.html" seamless></iframe>');
            // }
        }
    });

    $('.is-active').click();

    function hasExtension(inputID, exts) {
        var fileName = document.getElementById(inputID).value;
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }
    $('#fileUpload').change(function () {
        isfileData =true;
        $('#pofyear').hide();
        showattriList_Parallel= new Array();
        if (
            hasExtension('fileUpload', ['.csv', '.txt'])
        ) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#optionmodal').modal('hide');
                    $('.main-title').hide();
                    $('.l-main').removeClass('background');
                    $('.content-wrapper-with-bg').show();
                    Progress_reset(4, 'option');
                    $protext.html('Reading CSV File');
                    FormateCSV(e);

                }
                reader.readAsText($("#fileUpload")[0].files[0]);

            } else {
                alert("This browser does not support HTML5.");
            }
        } else if (
            hasExtension('fileUpload', ['.xlsx', '.xls'])
        ) {
            var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
            if ($("#fileUpload").val().toLowerCase().indexOf(".xlsx") > 0) {
                xlsxflag = true;
            }
            /*Checks whether the browser supports HTML5*/
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;

                    $('#optionmodal').modal('hide');
                    $('.main-title').hide();
                    $('.l-main').removeClass('background');
                    $('.content-wrapper-with-bg').show();
                    Progress_reset(4, 'option');
                    $protext.html('Reading Excel File');
                    setTimeout(function () {
                        /*Converts the excel data in to object*/
                        if (xlsxflag) {
                            var workbook = XLSX.read(data, {
                                type: 'binary'
                            });
                        } else {
                            var workbook = XLS.read(data, {
                                type: 'binary'
                            });
                        }
                        /*Gets all the sheetnames of excel in to a variable*/
                        var sheet_name_list = workbook.SheetNames;

                        var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
                        sheet_name_list.forEach(function (y) {
                            /*Iterate through all sheets*/
                            /*Convert the cell value to Json*/
                            if (xlsxflag) {
                                var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                            } else {
                                var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                            }
                            if (exceljson.length > 0 && cnt == 0) {
                                FormateExcel(exceljson);
                                cnt++;
                            }
                        });
                    }, 100);


                }
                if (xlsxflag) {
                    /*If excel file is .xlsx extension than creates a Array Buffer from excel*/
                    reader.readAsArrayBuffer($("#fileUpload")[0].files[0]);
                } else {
                    reader.readAsBinaryString($("#fileUpload")[0].files[0]);
                }
            } else {
                showerror("Sorry! Your browser does not support HTML5!");
            }
        } else {
            alert("Please upload a valid CSV/Excel  file.");
        }
    });
});

function ControlDashboard() {
    if (typeofSource == 'break') {
        $('#datamappingdiv').css('max-height', '52vh');
        $('#riskdb').show();
        $('#breakdb,.breakdb').hide();
        $('.grouppofyear').hide();
    } else {
        $('#datamappingdiv').css('max-height', '62vh');
        $('#riskdb').hide();
        $('.grouppofyear').show();
        $('#breakdb,.breakdb').show();
    }
}
// will replace represent key with PipeCount Attribute
$.fn.destroyDropdown = function () {
    return $(this).each(function () {
        $(this).parent().dropdown('destroy').replaceWith($(this));
    });
};

function replaceKeys(obj, find, replace) {
    return Object.keys(obj).reduce(
        (acc, key) => Object.assign(acc, {
            [key.replace(find, replace)]: obj[key]
        }), {});
}

function FormateCSV(e) {
    TypeofAttr_array = new Array();
    setTimeout(function () {
        var rows = e.target.result.split("\n");
        var ifPipeOwnerExist = false;
        var array_Owner = new Array();
        var pipeIndex = -1;
        var attributes = new Array();
        var subarrayAttr = new Array();
        var justforone = true;
        for (var i = 0; i < rows.length; i++) {

          var cells = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            var subarry = new Array();
            var obj = {};
            var counti = 0;
            
            for (var j = 0; j < cells.length; j++) {
                ////
                let cellvalue = cells[j] != null ? cells[j].replace(/"/g, '').replace(/'/g, '') : cells[j];
                if (cellvalue == replace_Owner) {
                    cellvalue = defaultcolumn.UploadBreak;
                    Owner_represent = new Array(cellvalue);
                }
                
                if (cellvalue == defaultcolumn.UploadBreak && justforone) {
                    ifPipeOwnerExist = true;
                    pipeIndex = j;
                    justforone = false;
                } 
                if (ifPipeOwnerExist && pipeIndex == j) {

                    if (!array_Owner.includes(cellvalue) && cellvalue.trim() != '' && cellvalue != null && cellvalue != 'NULL')
                        array_Owner.push(cellvalue);
                }
                if (i == 0) {
                    attributes.push(cellvalue);
                } else {
                    if (cellvalue.trim() != '' && cellvalue != null && cellvalue != 'NULL') {
                        obj[attributes[j]] = cellvalue;

                        if ($.isNumeric(cellvalue)) {
                            var item = attributes[j];
                            if (TypeofAttr_array.indexOf(item) === -1)
                                TypeofAttr_array.push(item);
                        }

                    } else
                        obj[attributes[j] != null ? attributes[j].replace(/"/g, '').replace(/ /g, '').replace(/'/g, '') : attributes[j]] = '';
                    //  subarry.push(obj);
                }
                /////
            }
            if (i > 0 && !$.isEmptyObject(obj[attributes[0]])) {
                if(!obj.hasOwnProperty('Length_Mi')){
                   obj['Length_Mi'] = $('#lengthpipe').val();
                };
                subarrayAttr.push({
                    attributes: obj
                });
            }
        }
        if (ifPipeOwnerExist) {
            var mainarray = new Array();
            var obj = new Object();
            obj['features'] = subarrayAttr;
            mainarray.push(obj);
            //  AppendtoList_DashBoardUsingCSV(array_Owner, mainarray[0].features);
            Incr_progress();
            $protext.html('Initializing Data');
            uploadedarray= mainarray[0].features;
            $('.risk-break-switch').css('width','400px');
            $('#breakuploadactive').show();
            if($('body').hasClass('menu-toggle-switch1')){
                $('body').removeClass('menu-toggle-switch1');
                $('body').addClass('menu-toggle-switch1-not');
            }
            if($('body').hasClass('menu-toggle-switch2')){
                $('body').removeClass('menu-toggle-switch2');
                $('body').addClass('menu-toggle-switch2-not');
            }
             setTimeout(function () {
                $('#breakuploadactive').click();
                }, 200);

        } else {
            var columns = new Object();
            for (var i = 0; i <= attributes.length; i++) {
                columns[attributes[i]] = 'Key';
            }
            ShowSelectBox_Dashboard(columns);
        }
    }, 100);
}

function FormateExcel(data) {
    var subarrayAttr = new Array();
    var ifPipeOwnerExist = false;
    var array_Owner = new Array();
    var attributeslist;
    
    if (replace_Owner != '' && replace_Owner != null) {
        console.log(replace_Owner,defaultcolumn.UploadBreak);
        data = data.map(obj => replaceKeys(obj, replace_Owner, defaultcolumn.UploadBreak));
    }
    for (var key in data[0]) {
        if (key.trim() == defaultcolumn.UploadBreak.trim()) {
            replace_Owner = '';
            Owner_represent = new Array(key);
            ifPipeOwnerExist = true;
        }
    }
    attributeslist = data[0];
    data = data.filter(item => {
        return (item[Owner_represent[0]] != '' && item[Owner_represent[0]] != null && item[Owner_represent[0]] != 'NULL');
    });
    if (ifPipeOwnerExist) {
        replace_Owner = '';
        for (var i = 0; i < data.length; i++) {
            if (!array_Owner.includes(data[i][defaultcolumn.UploadBreak]) && data[i][defaultcolumn.UploadBreak].trim() != '' && data[i][defaultcolumn.UploadBreak] != null && data[i][defaultcolumn.UploadBreak] != 'NULL'){
                array_Owner.push(data[i][defaultcolumn.UploadBreak]);
            }
            if(!data[i].hasOwnProperty('Length_Mi')){
                    data[i]['Length_Mi'] = $('#lengthpipe').val();
            };
            subarrayAttr.push({
                attributes: data[i]
            });
        }
        var mainarray = new Array();
        var obj = new Object();
        obj['features'] = subarrayAttr;
        mainarray.push(obj);
        // AppendtoList_DashBoardUsingCSV(array_Owner, mainarray[0].features);
        Incr_progress();
        $protext.html('Initializing Data');
        uploadedarray= mainarray[0].features;
            $('.risk-break-switch').css('width','400px');
            $('#breakuploadactive').show();
            if($('body').hasClass('menu-toggle-switch1')){
                $('body').removeClass('menu-toggle-switch1');
                $('body').addClass('menu-toggle-switch1-not');
            }
            if($('body').hasClass('menu-toggle-switch2')){
                $('body').removeClass('menu-toggle-switch2');
                $('body').addClass('menu-toggle-switch2-not');
            }
           setTimeout(function () {
            $('#breakuploadactive').click();
            }, 200);

    } else {

        ShowSelectBox_Dashboard(attributeslist);

    }

}
let replace_Owner;

function ShowSelectBox_Dashboard(data) {
    $('#loadermain').hide();
    $('#sortable').empty();
    $('.sorthead').hide();
    $('.selectview').remove();
    $("#ownerselectmodal .represent").html('<p style="font-weight: 400;">Please Select Following Missing Columns Representation</p> <div> <div class="input-group mb-3"> <div class="input-group-prepend " style="margin-bottom: 0.4rem!important;"> <span class="input-group-text chosen-single" id="basic-addon3">'+ defaultcolumn.UploadBreak +'</span> <select id="ownerselect" class="chosen-select btn mb-3 selectview"> <option value="" disabled selected>Select Field</option> </select> </div> </div> <div class="input-group mb-3"> <div class="input-group-prepend " style="margin-bottom: 0.4rem!important;"> <span class="input-group-text chosen-single" id="basic-addon3">Pipe Length </span> <input type="number" id="lengthpipe" value="2000"/> </div> </div> </div>');
    for (var key in data) {
        if (key != '' && key != 'NULL' && key != null){
            $("#ownerselect").append('<option value="' + key + '">' + key + '</option>');
        }
    }
    $("#ownerselect").chosen();
    $("#ownerselect").change(function () {
        var text = $('#ownerselect option:selected').text();
        if(text == '' || text == null || text == 'Select Field') {
            $("#ownerselect_chosen").css('border','1px solid red');
        } else {
            $("#ownerselect_chosen").css('border','1px solid #d4d9e3');
        }
    });
    $('#lengthpipe').change(function(){
        var length = $('#lengthpipe').val();
        if (length > 0) {
            $('#lengthpipe').css('border','1px solid #d4d9e3');
        } else {
            $('#lengthpipe').css('border','1px solid red');
        }
      });

      $('#lengthmilesinput').change(function(){
        var length = $('#lengthmilesinput').val();
        if (length > 0) {
            $('#lengthmilesinput').css('border','1px solid #d4d9e3');
        } else {
            $('#lengthmilesinput').css('border','1px solid red');
        }
      });
      $('#lengthmilesinput').focusout(function(){
        var length = $('#lengthmilesinput').val();
        if (length > 0) {
            UpdateLenghtMileColumn(length );
            $('#lengthmilesinput').css('border','1px solid #d4d9e3');
        } else {
            $('#lengthmilesinput').css('border','1px solid red');
        }
      });
      $('#saveowner').click(function(){
        var text = $('#ownerselect option:selected').text();
        var length = $('#lengthpipe').val();
        if (text != '' && text !== null && text != 'Select Field' &&length > 0) {
            $('#ownerselectmodal').modal('hide');
            replace_Owner = text;
            $('#fileUpload').change();
        }
        if(length < 1 ) {
            $('#lengthpipe').css('border','1px solid red');
        }
        if(text == '' || text == null || text == 'Select Field') {
            $("#ownerselect_chosen").css('border','1px solid red');
        }
     });
    $('#ownerselectmodal').modal('show');

}

function UpdatePipeLineOwnerColumn(){
    let pipeowner = new Array();
    for(let i=0;i< uploadedarray.length;i++){
        if(pipeowner.indexOf(uploadedarray[i].attributes[defaultcolumn.UploadBreak]) > -1) {
          //  pipeowner.push(uploadedarray[i].attributes[defaultcolumn.UploadBreak]);
        } else {
            if(uploadedarray[i].attributes[defaultcolumn.UploadBreak] != null && uploadedarray[i].attributes[defaultcolumn.UploadBreak]!= ''){
                pipeowner.push(uploadedarray[i].attributes[defaultcolumn.UploadBreak]);
            }
        }
       }
       $(".ownerselectpanel").html('<div class="input-group-prepend " style="margin-bottom: 0.4rem!important;"> <span class="input-group-text chosen-single" id="basic-addon3">PipeLineOwner</span> <select id="ownerselectpanel" class="chosen-select datamapping"> <option value="" disabled selected>Select PipeLineOwner</option> </select> </div>');
       for(let i=0;i< pipeowner.length;i++){
        $("#ownerselectpanel").append('<option value="' + pipeowner[i] + '" selected>' + pipeowner[i] + '</option>');
       }
       $("#ownerselectpanel").chosen();
       $("#ownerselectpanel").change(function () {
        var text = $('#ownerselectpanel option:selected').text();
        if(text != '' || text !== null || text != 'Select Field') {
            console.log('running');
            Progress_reset(2,'');
            Formate_Parallel(ownerfilterarray); 
        } 
    });
      
}
function UpdateLenghtMileColumn(length ){
   for(let i=0;i< uploadedarray.length;i++){
    uploadedarray[i].attributes['Length_Mi'] = length;
   }
   setTimeout(function () {
    if($('body').hasClass('menu-toggle-switch1')){
        $('body').removeClass('menu-toggle-switch1');
        $('body').addClass('menu-toggle-switch1-not');
    }
    if($('body').hasClass('menu-toggle-switch2')){
        $('body').removeClass('menu-toggle-switch2');
        $('body').addClass('menu-toggle-switch2-not');
    }
    $('#breakuploadactive').click();
    }, 200);
}
function GroupBy() {
    $("#showattrselect").chosen({
        no_results_text: "Oops, nothing found!"
    });
    showattriList_Parallel = new Array();
    $("#showattrselect").change(function () {
        if ($("#showattrselect").chosen().val().length) {

            if (Owner_represent.sort().toString() !== $("#showattrselect").chosen().val().sort().toString()) {
                Progress_reset(2);
                $protext.html('Reloading Chart');
                Owner_represent = $("#showattrselect").chosen().val();
                if (Owner_represent.length < 1) {
                    Owner_represent = [defaultcolumn.Risk];
                }
                showattriList_Parallel = showattriList_Parallel.filter(a => a != defaultcolumn.Risk && a != defaultcolumn.Break);
                Array.prototype.unshift.apply(showattriList_Parallel, Owner_represent);
                FormateESRIArray_Parallel(unformated_array_Parallel);
            }
        }
    });
}

function AppendPofYear(data) {
    $("#pofyearselect").html('<option value="" disabled selected>Select PoF_Year</option>');
    $("#pofcatlist").html('<option value="" disabled > Select </option>');
    let yeararray = new Array();
    pofcat = new Array();
    data.forEach(element => {
        if (yeararray.filter(a => a == element.attributes.PoF_Year).length < 1) {
            const minid = Math.min.apply(null, data.filter(a => a.attributes.PoF_Year == element.attributes.PoF_Year).map(a => a.attributes.MinID));
            const maxid = Math.max.apply(null, data.filter(a => a.attributes.PoF_Year == element.attributes.PoF_Year).map(a => a.attributes.MaxID));
            $("#pofyearselect").append('<option value="' + element.attributes.PoF_Year +
                '" selected data-min="' + minid + '" data-max="' + maxid + '" >' +
                element.attributes.PoF_Year + '</option>');
            yeararray.push(element.attributes.PoF_Year);
        }
        if (pofcat.filter(a => a == element.attributes.PoFCategory).length < 1) {
            if (element.attributes.PoFCategory == 'High') {
                $("#pofcatlist").append('<option value="' + element.attributes.PoFCategory +
                    '" selected  >' + element.attributes.PoFCategory + '</option>');
                pofcat.push(element.attributes.PoFCategory);
            } else {
                $("#pofcatlist").append('<option value="' + element.attributes.PoFCategory +
                    '" >' + element.attributes.PoFCategory + '</option>');
                pofcat.push(element.attributes.PoFCategory);
            }

        }
    });
    $("#pofyearselect").chosen();
    $("#pofcatlist").chosen();
    $("#pofyearselect").change(function () {
        var text = $('#pofyearselect option:selected').text();
        var MinID = $('#pofyearselect option:selected').data('min');
        var MaxID = $('#pofyearselect option:selected').data('max');
        if (text != '' && text !== null) {
            FetchData_OwnerRecord(text, MinID, MaxID);
        }
    });
    $("#pofcatlist").change(function () {
        if ($('#pofcatlist').chosen().val().length > 0) {
            Progress_reset(2, 'option');
            Incr_progress();
            setTimeout(() => {
                DrawD3_Parallel(chart_Data_End);
            }, 700);
        }
    });
    FetchData_OwnerRecord('High', 0, 1);
    onlyloadhigh = true;
    $('#analysisicon').hide();
    $('#analysisloader').show();
    $('#launchloader').show();
    $('#launch-btn').attr("disabled", true);
    $('#launch-btn').attr("disabled", true);
    $('#metricsloader').show();
    $('.risk-break-single').css('pointer-events','none');
    $('#metricsicon').hide();
    $("#pofcatlist").prop('disabled', true).trigger("chosen:updated");

}
///code for read Data Source
function FetchData_PipeCount() {
    Progress_reset(2, 'option');
    $protext.html('Loading From AIA Failure DB');
    $.ajax({
        url: "https://arcgis.puretechltd.com/purearcgis/rest/services/HowardCounty/HowardCountyMainBreakApp_ChartStatistics/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=Pipelineowner&outStatistics=%5B%7B%22statisticType%22%3A%22min%22%2C%22onStatisticField%22%3A%22objectid%22%2C+%22outStatisticFieldName%22%3A%22MinID%22%7D%0D%0A%2C%0D%0A%7B%22statisticType%22%3A%22max%22%2C%22onStatisticField%22%3A%22objectid%22%2C+%22outStatisticFieldName%22%3A%22MaxID%22%7D%5D%0D%0A%0D%0A&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson",
        jsonp: "callback",
        type: 'GET',
        dataType: "jsonp",
        success: function (response) {
            Incr_progress();
            setTimeout(function () {
                AppendtoList_DashBoard(response);
            }, 600);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            ErrorModal(errorMessage);
        }
    });
}

///code for read Data Source
function FetchData_PoF_Year() {
    Progress_reset(5, 'load_attr');
    GroupBy();
    $protext.html('Loading PipeLine Owner Attributes');
    var url = "https://arcgis.puretechltd.com/purearcgis/rest/services/HowardCountyFailureAnalysis/HowardCountyFailureRisk_FSv2/MapServer/9/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=false&returnTrueCurves=true&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=PoF_Year%2CPoFCategory&outStatistics=%5B%7B%22statisticType%22%3A%22min%22%2C%22onStatisticField%22%3A%22objectid%22%2C+%22outStatisticFieldName%22%3A%22MinID%22%7D%0D%0A%2C%0D%0A%7B%22statisticType%22%3A%22max%22%2C%22onStatisticField%22%3A%22objectid%22%2C+%22outStatisticFieldName%22%3A%22MaxID%22%7D%5D%0D%0A&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
    if (typeofSource == 'break') {
        url = "https://arcgis.puretechltd.com/purearcgis/rest/services/HowardCounty/HowardCountyMainBreakApp_ChartStatistics/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=%5B%7B%22statisticType%22%3A%22min%22%2C%22onStatisticField%22%3A%22objectid%22%2C+%22outStatisticFieldName%22%3A%22MinID%22%7D%0D%0A%2C%0D%0A%7B%22statisticType%22%3A%22max%22%2C%22onStatisticField%22%3A%22objectid%22%2C+%22outStatisticFieldName%22%3A%22MaxID%22%7D%5D%0D%0A&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
    }
    $.ajax({
        url: url,
        jsonp: "callback",
        type: 'GET',
        dataType: "jsonp",
        success: function (response) {
            Incr_progress();
            if (typeofSource == 'break') {
                 $('#pofyear').hide();
                  FetchData_OwnerRecord('', response.features[0].attributes.MinID, response.features[0].attributes.MaxID);
            } else {
                $('#pofyear').show();
                AppendPofYear(response.features);
            }
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            ErrorModal(errorMessage);
        }
    });
}
const pertimevalue = 2300;
function get_Calculations(min, max) {
    var total = max - min;
    var totalloop = Math.ceil(total / pertimevalue);
    return totalloop;
}
function FetchData_OwnerRecord(value, min, max) {

    var ttl = get_Calculations(min, max);
    Progress_reset(3 + (ttl), 'load_attr');
    Incr_progress();
    var lop = 1;
    var combine = new Array();
    for (var i = 0; i < ttl; i++) {
        var startid = (min) + (pertimevalue * i);
        var endid = (min - 1) + (pertimevalue * (i + 1));
        var url = "https://arcgis.puretechltd.com/purearcgis/rest/services/HowardCountyFailureAnalysis/HowardCountyFailureRisk_FSv2/MapServer/9/query?where=PoF_Year+%3D+%27" + value + "%27+and+OBJECTID+between+" + startid + "+and+" + endid + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=PoFCategory%2CCoFCategory%2CCOF_Total_Percentile_95%2CRiskCategory%2CContract%2CAssetType%2CInstallYear%2CPipeMaterial%2CPipeDiameter%2CLastInspectedYear%2CHistoricWireBreaks%2CRepaired%2CReplaced%2CRehabilitated%2CRemedyType%2CLength_Mi%2CLength_KM%2CPoF_Year+%2CBreakCount+%2CProbability+%2CPipeCount&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=PoFCategory&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
        if (value == 'High') {
            url = "https://arcgis.puretechltd.com/purearcgis/rest/services/HowardCountyFailureAnalysis/HowardCountyFailureRisk_FSv2/MapServer/9/query?where=PoF_Year+%3D+%27" + $('#pofyearselect option:selected').text() + "%27+and+PoFCategory+%3D+%27" + value + "%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=PoFCategory%2CCoFCategory%2CCOF_Total_Percentile_95%2CRiskCategory%2CContract%2CAssetType%2CInstallYear%2CPipeMaterial%2CPipeDiameter%2CLastInspectedYear%2CHistoricWireBreaks%2CRepaired%2CReplaced%2CRehabilitated%2CRemedyType%2CLength_Mi%2CLength_KM%2CPoF_Year+%2CBreakCount+%2CProbability+%2CPipeCount&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=PoFCategory&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
        }
        if (typeofSource == 'break') {
            url = "https://arcgis.puretechltd.com/purearcgis/rest/services/HowardCounty/HowardCountyMainBreakApp_ChartStatistics/MapServer/1/query?where=OBJECTID+between+" + startid + "+and+" + endid + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=BreakCause%2COBJECTID%2CBreakYear%2CLength_Mi%2CInstallYear%2CPipeMaterial%2CPipeDiameter%2CSoilType%2CBreakType%2CBreakCount%2COperatingPressure&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
        }
        $.ajaxQueue({
            url: url,
            jsonp: "callback",
            async: false,
            dataType: "jsonp",
            success: function (response) {
                Incr_progress();
                combine = combine.concat(response.features);
                if (lop == ttl) {
                    Incr_progress();
                    setTimeout(function () {
                        $protext.html('Initializing Data');
                        if (typeofSource == 'break') {
                            Owner_represent = new Array(defaultcolumn.Break);
                        } else {
                            Owner_represent = new Array(defaultcolumn.Risk);
                        }
                        showattriList_Parallel = new Array();
                        if(combine[0] == undefined) {
                            ErrorModal('API Error');
                        } else {
                            if ($('.is-active').data('module') == 'metrics') {
                                FormateESRIArray_Dashboard(combine, 1);
                                FormateESRIArray_Parallel(combine);
                            } else if ($('.is-active').data('module') == 'analysis' || dontshowload) {
                                FormateESRIArray_Parallel(combine);
                                if (!onlyloadhigh) {
                                    initialloadingarray= combine;
                                    FormateESRIArray_Dashboard(combine, 1);
                                }
                            } else if (initialload) {
                                FormateESRIArray_Parallel(combine);
                            }
                        }
                    }, 100);
                }
                lop += 1;
            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                ErrorModal(errorMessage);
            }
        });
    }
}
function LoadSourceAgain() {
    Progress_reset(3, 'load_attr');
    let combine = new Array();
    $protext.html('Initializing Data');
    if (typeofSource == 'break') {
       
        if($('#breakuploadactive').hasClass('risk-break-active')){
            Owner_represent = new Array(defaultcolumn.UploadBreak);
            isfileData = true;
            UpdatePipeLineOwnerColumn();
            combine = uploadedarray ;
        } else {
            Owner_represent = new Array(defaultcolumn.Break);
            isfileData = false;
            combine = backgroundata;
        }
             

    } else {
        Owner_represent = new Array(defaultcolumn.Risk);
        isfileData = false;
        combine =initialloadingarray;
    }
    showattriList_Parallel = new Array();
    if(combine[0] == undefined) {
        ErrorModal('API Error');
    } else {
        if ($('.is-active').data('module') == 'metrics') {
            FormateESRIArray_Dashboard(combine, 1);
            FormateESRIArray_Parallel(combine);
        } else if ($('.is-active').data('module') == 'analysis' || dontshowload) {
            FormateESRIArray_Parallel(combine);
            if (!onlyloadhigh) {
                FormateESRIArray_Dashboard(combine, 1);
            }
        } else if (initialload) {
            FormateESRIArray_Parallel(combine);
        }
    }
}
///code for read Data Source
function FetchData_PoF_Year_background() {
    $('#breakactive span').hide();
    $('#breakloader').show();
    url = "https://arcgis.puretechltd.com/purearcgis/rest/services/HowardCounty/HowardCountyMainBreakApp_ChartStatistics/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=%5B%7B%22statisticType%22%3A%22min%22%2C%22onStatisticField%22%3A%22objectid%22%2C+%22outStatisticFieldName%22%3A%22MinID%22%7D%0D%0A%2C%0D%0A%7B%22statisticType%22%3A%22max%22%2C%22onStatisticField%22%3A%22objectid%22%2C+%22outStatisticFieldName%22%3A%22MaxID%22%7D%5D%0D%0A&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
    $.ajax({
        url: url,
        jsonp: "callback",
        type: 'GET',
        dataType: "jsonp",
        success: function (response) {
            FetchData_OwnerRecord_Background(response.features[0].attributes.MinID, response.features[0].attributes.MaxID);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText
            ErrorModal(errorMessage);
        }
    });
}
function FetchData_OwnerRecord_Background(min, max) {

    var ttl = get_Calculations(min, max);
    var lop = 1;
    var combine = new Array();
    for (var i = 0; i < ttl; i++) {
        var startid = (min) + (pertimevalue * i);
        var endid = (min - 1) + (pertimevalue * (i + 1));
          url = "https://arcgis.puretechltd.com/purearcgis/rest/services/HowardCounty/HowardCountyMainBreakApp_ChartStatistics/MapServer/1/query?where=OBJECTID+between+" + startid + "+and+" + endid + "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=BreakCause%2COBJECTID%2CBreakYear%2CLength_Mi%2CInstallYear%2CPipeMaterial%2CPipeDiameter%2CSoilType%2CBreakType%2CBreakCount%2COperatingPressure&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&f=pjson";
        $.ajaxQueue({
            url: url,
            jsonp: "callback",
            async: false,
            dataType: "jsonp",
            success: function (response) {
                Incr_progress();
                combine = combine.concat(response.features);
                if (lop == ttl) {
                    ////save array here
                    backgroundata = new Array();
                    backgroundata =combine;
                    $('.risk-break-single').css('pointer-events','all');
                    $('#breakactive span').show();
                    $('#breakloader').hide();
                }
                lop += 1;
            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                ErrorModal(errorMessage);
            }
        });
    }
}
function ErrorModal(message) {
    $('#errormodal .modal-body h4').html(message);
    $('#errormodal').modal();
}
//////function for formating array
function FormateESRIArray_Dashboard(data, tabinx) {
    fulllist_dashboard = new Array();
    TypeofAttr_array = new Array();
    LeftSideList_dashboard = new Array();
    showattriList_dashboard = new Array();
    unformated_array_Parallel = new Array();
    unformated_array_Parallel = data;
    unformated_array_Dashboard = new Array();
    unformated_array_Dashboard = data;
    if (tabinx == 1) {
        data.forEach(function (object) {
            for (var key in object.attributes) {
                if (object.attributes[key] == null || object.attributes[key] == '' || object.attributes[key] == ' ')
                    if (key == 'PipeDiameter' || key == 'LastInspectedYear' || key == 'InstallYear') object.attributes[key] = '0';
                    else object.attributes[key] = 'Unknown';
                else
                    object.attributes[key] = '' + object.attributes[key].toString();
            }
        });

        insert_Attr_To_Panel_Dashboard(data);
        return;
    }

    var formatedArray = new Array();

    for (var key in data[0].attributes) {
        LeftSideList_dashboard.push(key);
    }

    showattriList_dashboard = LeftSideList_dashboard;

    for (var i = 0; i < LeftSideList_dashboard.length; i++) {
        var sp = data[0].attributes;

        if ($.isNumeric(sp[LeftSideList_dashboard[i]])) {
            var item = LeftSideList_dashboard[i];
            if (TypeofAttr_array.indexOf(item) === -1)
                TypeofAttr_array.push(item);
        }
    }

    var sum_ = 0;
    for (let h = 0; h < data.length; h++) {

        var sp = data[h].attributes;

        var obj = {};

        for (var i = 0; i < showattriList_dashboard.length; i++) {

            //////////////////////// Formate_Dashboard for sum or count or unique

            if ($.isNumeric(sp[showattriList_dashboard[i]])) {


                var numtype = numerictype[showattriList_dashboard[i]];

                numtype = 'Unique';


                if (numtype == 'Sum') {
                    if (h < 1) {
                        sum_ = 0;

                        for (let j = 0; j < data.length; j++) {
                            var sp2 = data[j].attributes;

                            sum_ += parseFloat(sp2[showattriList_dashboard[i]]);
                        }
                    }

                    obj[showattriList_dashboard[i]] = parseInt(sum_).toString() + ' ';
                } else if (numtype == 'Count') {
                    obj[showattriList_dashboard[i]] = data.length.toString() + ' ';

                } else {
                    var val = sp[showattriList_dashboard[i]] == null ? 0 : sp[showattriList_dashboard[i]];

                    obj[showattriList_dashboard[i]] = '' + val;
                }
            } else {
                var val = sp[showattriList_dashboard[i]] == null || sp[showattriList_dashboard[i]] == '' ? 'null' : sp[showattriList_dashboard[i]];
                obj[showattriList_dashboard[i]] = '' + val;
            }
            ////////////////////////////
        }

       // obj['Length_Mi'] = '' + (h + 1);
        formatedArray.push(obj);
    }
    formatedArray = formatedArray.filter(item => {
        return (item[Owner_represent[0]] != null && item[Owner_represent[0]] != '' && item[Owner_represent[0]] != ' ');
    });
    fulllist_dashboard = formatedArray;
    Formate_Dashboard(formatedArray);
}

Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += parseFloat(this[i][prop]);
    }
    return total
}

function Formate_Dashboard(data) {
    Incr_progress();
    setTimeout(function () {

        $protext.html('Formating Data');
        $('#wrapper').css('height', '100%');
        var chartData = data;
        Incr_progress();
        setTimeout(function () {
            $protext.html('Drawing Data on Charts');
            $('#wrapper').show();
            redraw_dashboard = chartData;
            if (typeofSource == 'break') {
                Draw_Dashboard(chartData);
            } else {
                Draw_Dashboard_2ndSource(chartData,[]);
            }
        }, 700);
    }, 500);
}

function insert_Attr_To_Panel_Dashboard(array) {
    $('#datamappingdiv .select-div').html('');
    let dtsource = new Array();
    if (typeofSource == 'break') {
        dtsource = Mapping_Array[1];
    } else {
        dtsource = Mapping_Array[0];
    }
    for (const [key, value] of Object.entries(dtsource)) {
        $('#datamappingdiv .select-div').append('<div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon3">' +
            key + '</span><select id="' + key + '" class="chosen-select datamapping"><option value="" disabled selected>Select</option></select></div></div>');
    }
    $('#datamappingdiv select').each(function () {
        var $select = this;
        var txt_attr = $($select).attr('id');
        // $('#' + txt_attr + ' .datamapping').replaceWith("<select id='" + txt_attr + "' class='chosen-select btn mb-3 datamapping '><option value='' disabled selected>Select</option></select>");
        Object.keys(array[0].attributes).forEach(function (v) {
            if (txt_attr.trim() == v.trim()) {
                $('#' + txt_attr).append('<option value="' + v + '" selected>' + v + '</option>');
            } else {
                $('#' + txt_attr).append('<option value="' + v + '">' + v + '</option>');
            }
        });
        var txt_selected = $('#' + txt_attr).val();
        if (txt_selected == null) {
            if (typeofSource == 'break') {
                Mapping_Array[1][txt_attr] = '';
            } else {
                Mapping_Array[0][txt_attr] = '';
            }

        } else {
            if (typeofSource == 'break') {
                Mapping_Array[1][txt_attr] = txt_selected;
            } else {
                Mapping_Array[0][txt_attr] = txt_selected;
            }

        }
    });


    $('#datamappingMain select option:selected').each(function () {
        var txt_selct = $(this)[0].parentElement.id;
        $('#' + txt_selct).chosen('destroy');
        $("#BreakYear option[value!='']").removeAttr('disabled');

        $('#datamappingMain select option:selected').each(function () {
            $("#" + txt_selct + " option[value='" + $(this).text() + "']").attr('disabled', 'true');
        });
        $('#' + txt_selct).chosen();
        $('#' + txt_selct).change(function () {
            if (typeofSource == 'break') {
                Mapping_Array[1][txt_selct] = $('#' + txt_selct + ' option:selected').val();
            } else {
                Mapping_Array[0][txt_selct] = $('#' + txt_selct + ' option:selected').val();
            }
            if (!$('.progress').is(':visible')) {
                Progress_reset(3, 'option');
                $protext.html('Drawing Charts');
            }
            FormateESRIArray_Dashboard(unformated_array_Dashboard, 0);

        });

    });

    if ($('.is-active').data('module') == 'metrics') {
        $('#datamappingMain').show();

    } else {
        $('#datamappingMain').hide();
    }
    if (!$('.progress').is(':visible')) {
        Progress_reset(3, 'option');
        $protext.html('Drawing Charts');
    }
    FormateESRIArray_Dashboard(unformated_array_Dashboard, 0);
}
function CheckAll_Select() {
    var bol_val = true;
    $('#datamappingdiv select').each(function () {
        if ($(this).val() == null)
            bol_val = false;
    });
    return bol_val;
}
//#endregion

var $progress = $('.ui.progress'),
    updateEvent;

function Progress_reset(value, obj) {
    //
    // $progress.progress('reset');
    // if (obj == 'option' || obj == 'load_attr') {
    //     $('.closeicn').show();
    //     // $('#loadermain').attr('object', obj);
    // } else {
    //     $('.closeicn').hide();
    // }
    // $('.ui.progress').progress({
    //     duration: 400,
    //     total: value
    // });
    // $progress.progress('reset');
    // if (!dontshowload) {
    //     if(!hideloadingforback) {
    //         // $('#loadermain').show();
    //     }
    //
    // }
}

function Incr_progress() {
    $progress.progress('increment');
}
$('#ownerselectmodal .icon').click(function () {

    $('#fileUpload').val('');
    $('#ownerselectmodal').modal('hide');
    $('.dtsrc').click();


});
$(document).ready(function () {

    /////
    $(".bg-img").hide();
    $("#main-content-div").addClass("main-content-div-relative");
    if(isMobileDevice()){
        $("#analysisDivIcon").hide();
        $("#spatialAn").click();
    } else {
        $("#spatialAn").click();
    }
    $("#bg-main").removeClass("home-screen");

    $('#analysisloader').show();
    $('#analysisicon').hide();
    $('#breakuploadactive').hide();
    FetchData_PoF_Year();
    initialload = true;
});
$('.closeicn').click(function () {
    $('#loadermain').hide();
    $.xhrPool.abortAll();
    let call_from = $('#loadermain').attr('object');
    setTimeout(function () {
        switch (call_from) {
            case 'option':
                $('.dtsrc').click();
                break;
            case 'load_attr':
                $('#ownername_chosen .chosen-single').trigger('mousedown');
                break;
            default:
                break;
        }
    }, 500);


});
