function str_replace(search, replace, subject, count) {
	var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0, f = [].concat(search), r = [].concat(replace), s = subject, ra = Object.prototype.toString.call(r) === '[object Array]', sa = Object.prototype.toString.call(s) === '[object Array]';
	s = [].concat(s);
	if (count) {
		this.window[count] = 0;
	}

	for ( i = 0, sl = s.length; i < sl; i++) {
		if (s[i] === '') {
			continue;
		}
		for ( j = 0, fl = f.length; j < fl; j++) {
			temp = s[i] + '';
			repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
			s[i] = (temp).split(f[j]).join(repl);
			if (count && s[i] !== temp) {
				this.window[count] += (temp.length - s[i].length) / f[j].length;
			}
		}
	}
	return sa ? s : s[0];
}

function fa2En(str) {

	str = str_replace(",", "", str);
	str = str_replace("۰", "0", str);
	str = str_replace("۱", "1", str);
	str = str_replace("۲", "2", str);
	str = str_replace("۳", "3", str);
	str = str_replace("۴", "4", str);
	str = str_replace("۵", "5", str);
	str = str_replace("۶", "6", str);
	str = str_replace("۷", "7", str);
	str = str_replace("۸", "8", str);
	str = str_replace("۹", "9", str);
	return str;
}

function loadTitles() {

	$.ajax({
		type : "POST",
		url : "http://boum.ir/test/proxy.php",
		dataType : "json",
		data : {
			url : "http://api.khabarfarsi.net/api/news/top/1?tid=12&output=json"
		},
		async : true,
		success : function(data) {
			for (var x in data["items"]) {
				title = data["items"][x]["title"];
				text = data["items"][x]["teaser"];
				$("#newsBar1 ul").append("<li><b style='color:#FFF;'>" + title + "</b>  " + "</li>");
			}
			$("#newsBar1 ul").liScroll();
		},
		error : function(data) {
		}
	});

}

function loadTitles2() {

	$.ajax({
		type : "POST",
		url : "http://boum.ir/test/proxy.php",
		dataType : "json",
		data : {
			url : "http://api.khabarfarsi.net/api/news/top/1?tid=*&output=json"
		},
		async : true,
		success : function(data) {
			for (var x in data["items"]) {
				title = data["items"][x]["title"];
				text = data["items"][x]["teaser"];
				$("#newsBar2 ul").append("<li><b style='color:#FFF;'>" + title + "</b>  " + "</li>");
			}
			$("#newsBar2 ul").liScroll();
		},
		error : function(data) {
		}
	});

}


function getGold18Price() {
	return fa2En($("#tala div div:nth-child(4) span").text());
}

function getSekehPrice() {
	return fa2En($("#sekeh div div:nth-child(2) span").text());
}

function getOnsPrice() {
	return fa2En($("#tala div div:nth-child(2) span").text());
}


$(document).ready(function() {
	var url = "";
	var winWidth = $(window).width();
	var winHeight = $(window).height();

	var myDate = new Date();
	var fullDate = myDate.getFullYear() + "." + myDate.getMonth() + "." + myDate.getDate();
	var price = [];
	//gold 18
	var sekeh = [];
	var ons = [];
	//-------------------------------------------
	var cMin = parseInt(myDate.getMinutes());
	var b5 = Math.floor(cMin/5)+1;
	b5 = b5*5;
	
	var nextRefreshTime = (b5 - cMin) * 60000;
	
	
	setTimeout(function() {
		location.reload()
	}, nextRefreshTime);

	//-------------------------------------------
	if (!localStorage[fullDate]) {
		localStorage[fullDate] = 1;
		localStorage['price'] = "";
		localStorage['sekeh'] = "";
		localStorage['ons'] = "";
	} else {
		storedPrices = JSON.parse(localStorage['price']);
		storedSekeh = JSON.parse(localStorage['sekeh']);
		storedOns = JSON.parse(localStorage['ons']);
		for (var i = 0; i < (24*60); i=i+5) {
			if (storedPrices[i]) {
				price[i] = storedPrices[i];
				sekeh[i] = storedSekeh[i];
				ons[i] = storedOns[i];
			}
		}
    
		var bb = (myDate.getHours()*60)+myDate.getMinutes();
        var bb = Math.floor(bb/5);
        
		price[bb] = getGold18Price();
		sekeh[bb] = getSekehPrice();
		ons[bb] = getOnsPrice();
		
	}
	//-------------------------------------------

	localStorage['price'] = JSON.stringify(price);
	var storedPrices = JSON.parse(localStorage['price']);

	var myChart = new JSChart('chart_container', 'line', '');

	var myData = new Array();
	var temp1 = new Array();
	
	
	for (var i = 0; i < (24*60); i=i+5) {
		if (parseFloat(storedPrices[i/5]) > 0) {
			temp1[i/5] = [i/5, parseFloat(storedPrices[i/5])];
		} else {
			temp1[i/5] = [i/5, 0];
		}
	}
	for ( i = 144; i < 228; i++) {
        myData[i-144] = temp1[i];
    }
	
	
	myChart.setDataArray(myData);

	myChart.setSize(winWidth / 3, (300 * winWidth / 3) / 600);
	myChart.setLineColor('#F04E23');
	myChart.setTitle('');
	myChart.setTitleFontSize(22);
	myChart.setIntervalStartY(0);
	myChart.setShowXValues(false);
    myChart.setShowYValues(false);
    myChart.setAxisNameX('');
    myChart.setAxisNameY('');
	myChart.draw();
	//-------------------------------------------

	localStorage['sekeh'] = JSON.stringify(sekeh);
	var storedSekeh = JSON.parse(localStorage['sekeh']);

	var myChart2 = new JSChart('chart_container2', 'line', '');

	var myData2 = new Array();
	var temp2 = new Array();
	
	
	for (var i = 0; i < (24*60); i=i+5) {
        if (parseFloat(storedSekeh[i/5]) > 0) {
            temp2[i/5] = [i/5, parseFloat(storedSekeh[i/5])];
        } else {
            temp2[i/5] = [i/5, 0];
        }
    }
    for ( i = 144; i < 228; i++) {
        myData2[i-144] = temp2[i];
    }
	
	myChart2.setDataArray(myData2);
	myChart2.setSize(winWidth / 3, (300 * winWidth / 3) / 600);
	myChart2.setLineColor('#F04E23');
	myChart2.setTitle('');
	myChart2.setTitleFontSize(22);
	myChart2.setIntervalStartY(0);
	myChart2.setShowXValues(false);
    myChart2.setShowYValues(false);
    myChart2.setAxisNameX('');
    myChart2.setAxisNameY('');
	myChart2.draw();
	//-------------------------------------------

	localStorage['ons'] = JSON.stringify(ons);
	var storedOns = JSON.parse(localStorage['ons']);

	var myChart3 = new JSChart('chart_container3', 'line', '');

	var myData3 = new Array();
	var temp3 = new Array();

   for (var i = 0; i < (24*60); i=i+5) {
       if (parseFloat(storedOns[i/5]) > 0) {
           temp3[i/5] = [i/5, parseFloat(storedOns[i/5])];
       } else {
           temp3[i/5] = [i/5, 0];
       }
   }
   for ( i = 144; i < 228; i++) {
       myData3[i-144] = temp3[i];
   }
	   
	myChart3.setDataArray(myData3);
	myChart3.setSize(winWidth / 3, (300 * winWidth / 3) / 600);
	myChart3.setLineColor('#F04E23');
	myChart3.setTitle('');
	myChart3.setTitleFontSize(16);
	myChart3.setIntervalStartY(0);
	myChart3.setShowXValues(false);
	myChart3.setShowYValues(false);
    myChart3.setAxisNameX('');
    myChart3.setAxisNameY('');
	myChart3.draw();
	//-------------------------------------------

	$('#tehran-clock').clock({
		offset : '4.5',
		type : 'digital'
	});
	$('#london-clock').clock({
		offset : '0',
		type : 'digital'
	});
	$('#newYork-clock').clock({
		offset : '-5',
		type : 'digital'
	});

	//-------------------------------------------

	$(".price .box div div:nth-child(n+2)").each(function() {
		var cHtml = $(this).html();
		var pHtml = $(this).find("span").html();
		$(this).find("span").remove();
		var nHtml = $(this).html();
		var htm = "<span>" + nHtml + "</span>" + "<span style='float:left;'>" + pHtml + "</span>";
		$(this).html(htm);

	});

	loadTitles();
	loadTitles2();

	$("#arz").append("<div style='height:32px;padding: 3px;background: #FFF;'></div>");
	$("#tala").append("<div style='height:32px;padding: 3px;background: #FFF;'></div>");

});

