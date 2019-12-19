let theme_var = {
    root: document.querySelector(':root'),
    theme_dark: function () {
        this.root.style.setProperty('--header_color', '#000000');
        this.root.style.setProperty('--sidebar_color', '#101215');
        this.root.style.setProperty('--uploadbtn_color_hover', 'rgba(16, 18, 21,1)');
        this.root.style.setProperty('--uploadbtn_border_color', '#0c97be');
        this.root.style.setProperty('--uploadbtn_color', 'rgba(16, 18, 21,0.77)');
        this.root.style.setProperty('--hover-color', '#333333');
        this.root.style.setProperty('--menu-font-color', '#0c97be');
        this.root.style.setProperty('--btn-font-color', '#0c97be');
        this.root.style.setProperty('--sidebar-font_hover-color', '#0c97be');
        this.root.style.setProperty('--btn-font_hover-color', '#ffffff');
        this.root.style.setProperty('--btn_Color_Load', '#333333');
        this.root.style.setProperty('--menu-font-hover-color', '#0c97be');
        this.root.style.setProperty('--bar-color', '#202328');
        this.root.style.setProperty('--Main_background-color', 'linear-gradient(85deg, #000000,#000000)');
        this.root.style.setProperty('--Header_background-color', '#101215');
        this.root.style.setProperty('--Card_background-color', '#000000');
        this.root.style.setProperty('--Header_Font-color', '#0c97be');
        this.root.style.setProperty('--Card_Title_background-color', '#101215');
        this.root.style.setProperty('--logo-image', 'url("images/logo_2.png")');
        this.root.style.setProperty('--Background_Image', 'url("images/new-bg.png")');
        this.root.style.setProperty('--swap', 'invert(1)');
        this.root.style.setProperty('--bar_gr_begin-color', '#00d2ff');
        this.root.style.setProperty('--bar_gr_end-color', 'rgba(58, 123, 213, 0.77)');
        this.root.style.setProperty('--bar_stroke-color', '#0984a73d');
        this.root.style.setProperty('--parallel_Chart_line-color', 'rgba(0, 125, 160, 0.50)');
        this.root.style.setProperty('--Paralle_Font-color', '#21C0D9');
        this.root.style.setProperty('--Title_Name_Color', 'linear-gradient(to right, rgb(0,124,197) 0%, rgb(0,160,214) 15%, rgb(0,206,236) 30%, rgb(34,255,255) 45%);');
        this.root.style.setProperty('--Loader_Background', 'rgba(70, 70, 70, .85)');
        this.root.style.setProperty('--Modal_Color', '#333333');
        this.root.style.setProperty('--Modal_Font_color', '#ffffff');
        this.root.style.setProperty('--chartjs1', '#0c97be3b');
        this.root.style.setProperty('--Cover_Font_Color', 'linear-gradient(271deg, rgba(7, 212, 255,1),#ffffff)');
        this.root.style.setProperty('--Arrow_Color', 'rgba(7, 212, 255,1)');
        this.root.style.setProperty('--loadiconcolor','#48c8dd');
        this.root.style.setProperty('--border-r', "#212121");
        this.root.style.setProperty('--main-color', "#000000");
        this.root.style.setProperty('--chosen-single', "#464646");
        this.root.style.setProperty('--newcl1', "#65F7FF");
        this.root.style.setProperty('--newcl2', "#007da3");
        this.root.style.setProperty('--newcl3', "#3AE4FF");
        this.root.style.setProperty('--newcl4', "#007da3");
        this.root.style.setProperty('--profile-c', "#a4afb1");
        this.root.style.setProperty('--profile-c-cover', "#229ac1");
        //this.root.style.setProperty('--modal-button',"#337a78");
        this.root.style.setProperty('--modal-button',"#70afc2");
        this.root.style.setProperty('--new-light-gray',"#000000");
        this.root.style.setProperty('--hover-color-new',"#005771");
        this.root.style.setProperty('--riskviewfontcolor', '#0e0f10');
        this.root.style.setProperty('--diplaypurelogo', 'none');
        this.root.style.setProperty('--profileicocolor', '#000000');
        this.root.style.setProperty('--homescreencolor','#000000');
        this.root.style.setProperty('--chartsfillcolor','#0c97be3b');
        this.root.style.setProperty('--chartslabelcolor','#21C0D9');
        this.root.style.setProperty('--linechartlabelcolor','#21C0D9');
        this.root.style.setProperty('--linechartgridcolor', '#0c97be3b');
        this.root.style.setProperty('--d3barstroke','#21C0D9');
        this.root.style.setProperty('--d3barfill', '#0c97be3b');
        this.root.style.setProperty('--d3bar1', '#000000');
        this.root.style.setProperty('--d3bar2', '#000000');
        this.root.style.setProperty('--d3bar3', '#000000');
        this.root.style.setProperty('--d3bar4', '#000000');
        this.root.style.setProperty('--d3bar5', '#000000');
        this.root.style.setProperty('--d3bar6',  '#000000');
        this.root.style.setProperty('--d3bar7',  '#000000');
        this.root.style.setProperty('--d3bar8',  '#000000');
        this.root.style.setProperty('--d3bar9',  '#000000');
        if ($('.is-active').data('module') == 'analysis') {
            if (chart_Data_End.length > 0) {
                redraw();
            }
        }
        localStorage.setItem("current-theme","dark");

    },
    theme_light: function () {
        this.root.style.setProperty('--header_color', '#ffffff');
        this.root.style.setProperty('--sidebar_color', '#ffffff');
        this.root.style.setProperty('--uploadbtn_color_hover', 'rgba(57, 176, 236,1)');
        this.root.style.setProperty('--uploadbtn_border_color', '#007da3');
        this.root.style.setProperty('--uploadbtn_color', 'rgba(57, 176, 236,0.8)');
        this.root.style.setProperty('--hover-color', '#39b0ec');
        this.root.style.setProperty('--menu-font-color', '#616161');
        this.root.style.setProperty('--btn-font-color', '#333333');
        this.root.style.setProperty('--sidebar-font_hover-color', '#ffffff');
        this.root.style.setProperty('--btn-font_hover-color', '#ffffff');
        this.root.style.setProperty('--btn_Color_Load', 'rgba(57, 176, 236,1)');
        this.root.style.setProperty('--menu-font-hover-color', '#ffffff');
        this.root.style.setProperty('--bar-color', 'rgba(57, 176, 236,1)');
        this.root.style.setProperty('--Main_background-color', '#F2F3F5');
        this.root.style.setProperty('--Header_background-color', '#ffffff');
        this.root.style.setProperty('--Card_background-color', '#ffffff');
        this.root.style.setProperty('--Header_Font-color', '#2f3742');
        this.root.style.setProperty('--Card_Title_background-color', '#ffffff');
        this.root.style.setProperty('--logo-image', 'url("images/logo_2.png")');
        this.root.style.setProperty('--Background_Image', 'url("images/new-bg.png")');
        this.root.style.setProperty('--swap', 'invert(0)');
        this.root.style.setProperty('--bar_gr_begin-color', '#00d2ff');
        this.root.style.setProperty('--bar_gr_end-color', 'rgba(58, 123, 213, 0.77)');
        this.root.style.setProperty('--bar_stroke-color', '#0984a73d');
        this.root.style.setProperty('--parallel_Chart_line-color', 'rgba(118, 214, 254,0.3)');
        this.root.style.setProperty('--Paralle_Font-color', '#333333');
        this.root.style.setProperty('--Title_Name_Color', 'linear-gradient(271deg, #7bf5ff, #75d6ff)');
        this.root.style.setProperty('--Loader_Background', 'rgba(255, 255, 255, .85)');
        this.root.style.setProperty('--Modal_Color', '#fff');
        this.root.style.setProperty('--Modal_Font_color', '#343a40');
         this.root.style.setProperty('--chartjs1', '#ffffff');
         this.root.style.setProperty('--loadiconcolor','#616161');
        this.root.style.setProperty('--Cover_Font_Color', 'linear-gradient(271deg, #faffff, rgba(255, 255, 255, 1))');
        this.root.style.setProperty('--Arrow_Color', '#71AEC1');
        this.root.style.setProperty('--border-r', "#d4d5d6");
        this.root.style.setProperty('--main-color', "#f9f9f9");
        this.root.style.setProperty('--chosen-single', "#ffffffcc");
        this.root.style.setProperty('--newcl1', "#65F7FF");
        this.root.style.setProperty('--newcl2', "#ffffff");
        this.root.style.setProperty('--newcl3', "#3AE4FF");
        this.root.style.setProperty('--newcl4', "#b6feff");
        this.root.style.setProperty('--profile-c', "#a4afb1");
        this.root.style.setProperty('--profile-c-cover', "#229ac1");
        this.root.style.setProperty('--modal-button',"#70afc2");
        this.root.style.setProperty('--new-light-gray',"#fff");
        this.root.style.setProperty('--hover-color-new', "#005771");
        this.root.style.setProperty('--riskviewfontcolor', '#70afc2');
        this.root.style.setProperty('--diplaypurelogo', 'block');
        this.root.style.setProperty('--profileicocolor','#ffffff');
        this.root.style.setProperty('--homescreencolor','#ffffff');
        this.root.style.setProperty('--chartsfillcolor','#21C0D9');
        this.root.style.setProperty('--chartslabelcolor','#3c5c61');
        this.root.style.setProperty('--linechartlabelcolor','#858585');
        this.root.style.setProperty('--linechartgridcolor', '#E5E5E5');
        this.root.style.setProperty('--d3barstroke','#0984a73d');
        this.root.style.setProperty('--d3barfill', '#3ae4ff');
        this.root.style.setProperty('--d3bar1', "#B0B0B0");
        this.root.style.setProperty('--d3bar2', "#E8E8E8");
        this.root.style.setProperty('--d3bar3', "#2FE3FF");
        this.root.style.setProperty('--d3bar4', "#D9D9D9");
        this.root.style.setProperty('--d3bar5', "#42E5FF");
        this.root.style.setProperty('--d3bar6', "#CACACA");
        this.root.style.setProperty('--d3bar7', "#525A6B");
        this.root.style.setProperty('--d3bar8', "#21C0D9");
        this.root.style.setProperty('--d3bar9', "#B0B0B0");
        if ($('.is-active').data('module') == 'analysis') {
            if (chart_Data_End.length > 0) {
                redraw();
            }
        }
        localStorage.setItem("current-theme","light");
    }
};
