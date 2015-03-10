
//erddap jsonp call url
var erdurl = "http://erddap2.marine.ie/erddap/tabledap/IWBNetwork.json?time,SeaTemperature&station_id=%22M4%22&time>=2015-02-15T00:00:00Z&time<=2015-02-27T00:00:00Z&.jsonp=ourCallback";

$.ajax({url: erdurl,
		dataType: 'jsonp',
		cache: true,
		jsonp: false,
		jsonpCallback: 'ourCallback'}).done(function (buoyData) {
	var fldata = [], tdata = buoyData.table.rows;

	$.each(tdata, function (i, value) {
		fldata.push([Date.parse(value[0]), value[1]]);
	});
	Flotr.draw(
		document.getElementById("chart"),
		[
			{ data: fldata, lines: {show: true} }
		],
		{
			title: "Sea Temperature M4 Buoy Data",
			grid: {horizontalLines: false, verticalLines: false},
			xaxis: {mode: "time"},
			yaxis: {min: 8, max: 11, tickFormatter: function (val) {return val + " &degC"; }
				}
		}
	);
});
