
function ManageBorderArray(segment) {
    const colorbind = new GetColorArray($("#themetype option:selected").index());
    const rslt = borderarray.filter(a => a.name == segment._chart.canvas.id && a.value == segment._chart.config.data.labels[segment._index]);
    if (rslt.length < 1) {
        borderarray.push(
            {
                name: segment._chart.canvas.id,
                column: segment._chart.config.data.datasets[0].Column,
                value: segment._chart.config.data.labels[segment._index],
                index: segment._index
            });
        if(segment._chart.canvas.id == 'chartjs1') {
            segment._chart.config.data.datasets[0].backgroundColor[segment._index] = colorbind.Selected;
            segment._chart.config.data.datasets[0].hoverBackgroundColor[segment._index] = colorbind.Selected;
        } 
    } else {
        borderarray = deleteobject(borderarray,rslt[0]);
        if(segment._chart.canvas.id == 'chartjs1') {
            segment._chart.config.data.datasets[0].backgroundColor[segment._index] = colorbind.Selected;
            segment._chart.config.data.datasets[0].hoverBackgroundColor[segment._index] = colorbind.Selected;
        } 
        
    }
    segment._chart.config.data.datasets[0].backgroundColor = ["#3AE4FF", "#E8E8E8", "#2FE3FF", "#D9D9D9", "#42E5FF", "#CACACA", "#525A6B", "#21C0D9", "#B0B0B0"];
    const indexarray = borderarray.filter( s => s.name == segment._chart.canvas.id).map( a=> a.index);
     const arrayofcolor = segment._chart.config.data.datasets[0].backgroundColor;
        let count = 0;
        arrayofcolor.forEach( t => {
        if(!indexarray.includes(count)) {
            segment._chart.config.data.datasets[0].backgroundColor[count] = colorbind.UnSelected;
        } else {
            segment._chart.config.data.datasets[0].backgroundColor[count] = colorbind.Selected;
        }
        count += 1;  
    });
     segment._chart.update();
    FilterArrayUsingParameter();
}
function Attach_click_Tree(nameofchart, column, value) {
    const colorbind = new GetColorArray($("#themetype option:selected").index());
    
    const rslt = borderarray.filter(a => a.name == nameofchart && a.value == value);
    if (rslt.length < 1) {
        borderarray.push(
            {
                name: nameofchart,
                column: column,
                value: value,
                index: null
            });
    } else {
        borderarray = deleteobject(borderarray,rslt[0]);
     }
    const arraya = $('#'+nameofchart+ ' .d3plus_rect');
    const indexarray = borderarray.filter( s => s.name == nameofchart).map( a=> 'd3plus_group_'+ a.value.replace(/ /g, '_') +'_rect');
    for (let index = 0; index < arraya.length; index++) {
        const element = arraya[index];
         $('#'+nameofchart+ ' #'+$(element)[0].id + ' .d3plus_data').css('fill',colorbind.Selected);
    }
    for (let index = 0; index < arraya.length; index++) {
        const element = arraya[index];
        if(!indexarray.includes($(element)[0].id)){
            $('#'+nameofchart+ ' #'+$(element)[0].id + ' .d3plus_data').css('fill',colorbind.UnSelected);
        } 
    }
    FilterArrayUsingParameter();
}
function deleteobject(array,obj){
    const arr = new Array(); 
    array.forEach( v => {
        if(v.name == obj.name && v.value == obj.value){
        } else {
            arr.push(v);
        }
    });
    return arr;
}
function OtherOptions(column,tempmaindt) {
    let tempdata = new Array();
    let tempdata4 = tempmaindt;
    OtherOptionArray[0].forEach(a => {
        var text = a.key;
        let tempdata2 = tempdata4.filter(a => a[column] == text);
        Array.prototype.unshift.apply(tempdata, tempdata2);
    });
    return tempdata;
}
function FilterArrayUsingParameter() {
    const nameof = [...new Set(borderarray.map(a=> a.name))];
    let tempnew = new Array();
    nameof.forEach( e => {
        let temp2 = new Array();
        if(tempnew.length < 1) {
            borderarray.filter( q => q.name == e).forEach(element => {
                if( e == 'chartjs3' && element.value == 'Other') {
                    const tempcurrent =  OtherOptions(element.column,tempmaindt);
                    Array.prototype.push.apply(temp2,tempcurrent); 
                } else {
                    const tempcurrent = tempmaindt.filter( a => a[element.column] == element.value);
                    Array.prototype.push.apply(temp2,tempcurrent); 
                }
            });
            Array.prototype.push.apply(tempnew,temp2); 
        } else {
            borderarray.filter( q => q.name == e).forEach(element => {
                if( e == 'chartjs3' && element.value == 'Other') {
                    const tempcurrent =  OtherOptions(element.column ,tempnew);
                    Array.prototype.push.apply(temp2,tempcurrent); 
                } else {
                const tempcurrent = tempnew.filter( a => a[element.column] == element.value);
                Array.prototype.push.apply(temp2,tempcurrent); 
                }
            });
            tempnew = temp2;
        }
       
    });
     if(tempnew.length>0){
        Draw_Dashboard_2ndSource(tempnew, nameof);
     } else {
        Draw_Dashboard_2ndSource(tempmaindt, []);
     }
} 