var initAnsichtLehrer = function () {
    var theme = "energyblue";
    //var sourcejahre = ["20/21", "21/22", "22/23", "23/24", "24/25", "25/26", "26/27", "27/28"];

	//bedingt global innerhalb initAnsichtLehrer() um auf die Werte bei den inneren Funktionen zugriff zu haben
	var g_wertws = 0;
	var g_wertss = 0;
	var g_wert = 0;
	var g_dateiname = "";
	
    studienjahr = global_sourcejahre[global_planungsjahrindex];
    console.log("Globale Variablen zu Beginn");
    console.log(global_planungsstudienjahr);
    console.log(global_planungsjahrindex);
	
	var sourceLehrer = {
        datatype: "json",
        datafields: [
            {name: 'ID_Lehrer',   type: 'number'},
            {name: 'Vorname',type: 'string'},
            {name: 'Nachname',type: 'string'},
            {name: 'Kurzzeichen',type: 'string' },
            {name: 'Stamminstitut',type: 'string'},
            {name: 'Dienstverhaeltnis'},
            {name: 'Freigabe',type: 'number'}

        ],
        cache: false,
		//nur Lehrer in der Tabellenansicht für welche auch im Studienjahr eine Zuordnung gemacht wurde werden angezeigt. Sie sind in Tabelle freigabe gelistet
        url: 'freigabe-on-off.php?Studienjahr=' + global_planungsstudienjahr,
        root: 'Rows',
        id: 'ID_Lehrer',
       
        updaterow: function (rowid, rowdata, commit) {
			//wird nie aufgerufen/ausgeführt, statt dessen in StudienjahrDropdown select
            var dropdownlistindex = $('#LAnsichtdropdownbox').jqxDropDownList('selectedIndex');
            var jahr = $('#LAnsichtdropdownbox').jqxDropDownList('getItem', dropdownlistindex).value;
           

            //Hackerl dem php Skript übergeben
            console.log("rowdata und jahr in updaterow in sourceLehrer zuerst");
            console.log(rowdata);
			console.log(jahr);
            $.ajax({
                dataType: 'json',
                url: 'freigabe-on-off.php',
                cache: false,
                type: "GET",
                data: {
                    update: true,
                    ID_Lehrer: rowdata.ID_Lehrer,
                    Studienjahr: jahr,
                    Freigabe: rowdata.Freigabe
                },
                success: function (data, status, xhr) {
                    console.log("LV updaterow success");
                    commit(true);
					
					
				},
                error: function (jqXHR, textStatus, errorThrown) {
                    commit(false);
                }
            });
		} //Update Row
		
    }; //source lehrer 

    var dataAdapterLehrer = new $.jqx.dataAdapter(sourceLehrer);
	
	//Grid  mit Lehrern für das jeweilige Studienjahr, welche auch schon einen Eintrag in der freigabe-Tabelle haben
    //Dieser Eintrag erfolgt bei Lehrerpalnung initPlanungTeacher
    $("#gridAnsichtLehrer").jqxGrid({
        width: window.innerWidth - 20, //getWidth('Grid'),
        source: dataAdapterLehrer,
        theme: theme,
        pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        editable: true,
        //editmode: 'selectedrow',
        editmode: 'click',
		//editmode: 'selectedcell',
        //selectionmode: 'singlecell',
		selectionmode: 'singlerow', //'multiplecellsadvanced',//
        showtoolbar: true,
        showfilterrow: true,
        filterable: true,
        columnsresize: true,
        columns: [
            {text: 'ID', datafield: 'ID_Lehrer',width: 50,editable: false},
            {text: 'Vorname', datafield: 'Vorname',width: 200,editable: false},
            {text: 'Nachname', datafield: 'Nachname',width: 200,editable: false},
            {text: 'Kurzzeichen', datafield: 'Kurzzeichen',width: 100,editable: false},
            {text: 'Stamminstitut',datafield: 'Stamminstitut',width: 100,editable: false},
            {text: 'Dienstverhaeltnis',datafield: 'Dienstverhaeltnis',width: 100,editable: true},
            {text: 'Freigabe',columntype: 'checkbox',datafield: 'Freigabe',width: 80, editable: true}
		],
        rendertoolbar: function (toolbar) {
            var me = this;

            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<input id="pdfLehrerAnsicht" type="button" value="PDF Export" />');
			container.append('<div id="LAnsichtdropdownbox" style="float:left"></div>');
			
			$("#LAnsichtdropdownbox").jqxDropDownList({
                width: 100,
                source: global_sourcejahre,
                theme: theme,
                selectedIndex: global_planungsjahrindex
				//disabled: true 
            });
			
            $("#pdfLehrerAnsicht").jqxButton({
                theme: theme
            });
            
            //Button für den Ausdruck
            $("#pdfLehrerAnsicht").on('click', function () {
                //https://www.guriddo.net/documentation/guriddo/javascript/user-guide/exporting/
                var gridContentWS = $("#gridAusgewaehlteLehrerWS").jqxGrid('exportdata', 'html'); //, 'Besch�ftigungsausweis-'+LKZZ
				var gridContentSS = $("#gridAusgewaehlteLehrerSS").jqxGrid('exportdata', 'html');
				console.log(gridContentWS);
                var newWindow = window.open('', '', 'width=800, height=500'),
                    document = newWindow.document.open(),
                    pageContent =
                    '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '<head>\n' +
                    '<meta charset="utf-8" />\n' +
                    '<title>Beschäftigungsliste</title>\n' +
                    '<style>body {font-family: Arial, Helvetica, sans-serif; fontSize: 1.3em}  </style>\n' +
                    '</head>\n' +
                    '<body>\n' +
                    'Beschäftigungsliste Studienjahr: ' + studienjahr + '<hr>' +
                    LKZZ + "    " + Vorname + " " + Nachname + '<br>' + 'Stamminstitut: ' + Stamminstitut + '      ' + '  / ' + Dienstverhaeltnis + '<hr>' +

                    gridContentWS + '\n<p>'+ gridContentSS +'</body>\n</html>';
                document.write(pageContent);
                document.close();
                newWindow.print();
            }); //Button für den Ausdruck pdf print
		
		
			//das Studienjahr kann ausgewält werden
			$("#LAnsichtdropdownbox").bind('select', function (event) {

                var args = event.args;
                console.log("args dropdown");
                console.log(args.index);

                var item = $('#LAnsichtdropdownbox').jqxDropDownList('getItem', args.index);
                studienjahr = item.value;
                console.log("studienjahr");
                console.log(studienjahr);
             /*   ////	
                var sourceLehrer = {
                    datatype: "json",
                    datafields: [
                        {name: 'ID_Lehrer',type: 'number'},
                        {name: 'Vorname',type: 'string'},
                        {name: 'Nachname',type: 'string'},
                        {name: 'Kurzzeichen',type: 'string'},
						{name: 'Stamminstitut',type: 'string'},
                        {name: 'Dienstverhaeltnis',type: 'string'},
                        {name: 'Freigabe',type: 'number'}
					],
                    cache: false,
                    url: 'freigabe-on-off.php?Studienjahr=' + studienjahr, 
                    root: 'Rows',
                    id: 'ID_Lehrer',
                    //updaterow um das Hackerl der Freigabe in der Tabelle freigaben zu speichern 
					//Diese update row Funktion wird ausgeführt, nachdem das Jahr in der dropdownbox ausgewählt wurde
                    updaterow: function (rowid, rowdata, commit) {

                        var dropdownlistindex = $('#LAnsichtdropdownbox').jqxDropDownList('selectedIndex');
                        var jahr = $('#LAnsichtdropdownbox').jqxDropDownList('getItem', dropdownlistindex).value;
                        console.log(jahr);
						g_dateiname = rowdata.ID_Lehrer+"-"+jahr.slice(0,2)+".pdf";//Weil ei Slash im Dateinamen nicht geht nur ersten Teil des Studienjares
						console.log("g_dateiname");
						console.log(g_dateiname);
                        //var urlfreigabe = "freigabe-on-off.php?update=true&" + $.param(rowdata) + "&Studienjahr=" + jahr;
                        console.log("rowdata  in update");
                        console.log(rowdata);
						//Die Freigabe in die Datenbank schreiben
                        $.ajax({
                            dataType: 'json',
                            url: 'freigabe-on-off.php',
                            cache: false,
                            type: "GET",
                            data: {
                                update: true,
                                ID_Lehrer: rowdata.ID_Lehrer,
                                Studienjahr: jahr,
                                Freigabe: rowdata.Freigabe
                            },
                            success: function (data, status, xhr) {
                               console.log("LV updaterow success");
							   commit(true);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                commit(false);
                            }
                        });
						
						//Zuerst pdf Erstellen und im Ordner listen speichern und dann als Attachment sendden
						//Generierung der PDF-Datei und speichern am Server
						console.log("g_wert in freigabe");
						console.log(g_wert);
						$.ajax({
                            dataType: 'json',
                            url: 'generate-pdf.php',
                            cache: false,
                            type: "GET",
                            data: {
                                
                                ID_Lehrer: rowdata.ID_Lehrer,
                                Studienjahr: jahr, 
								wertws: g_wertws,
								wertss: g_wertss,
								wert: g_wert,
								Dateiname: g_dateiname
                                
                            },
                            success: function (data, status, xhr) {
                               console.log("LV updaterow success");
							   					
                               commit(true);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                commit(false);
                            }
                        });
						
						
						//nur wenn Hackerl der Freigabe auf 1 geht, dann Mail versenden
						if(rowdata.Freigabe == 1){
							$.ajax({
								dataType: 'json',
								url: 'mail-outlook.php',
								cache: false,
								type: "GET",
								data: {
									send: true,
									ID_Lehrer: rowdata.ID_Lehrer,
									Dateiname: g_dateiname
								},
								success: function (data, status, xhr) {
									console.log("send Mail success");
									//commit(true);
								},
								error: function (jqXHR, textStatus, errorThrown) {
									//commit(false);// Auskommentieren sonst bleibt Hackerl nicht, obwohl es gespeichert wird
									console.log("Mail Fehler");
								}
								
							});	
						}//if
						

						
						

                    } //Update Row
			
                }; //source lehrer  
                var dataAdapterLehrer = new $.jqx.dataAdapter(sourceLehrer);
				$("#gridAnsichtLehrer").jqxGrid({ source: dataAdapterLehrer });
		*/	  
            }); //dropdown box select für das Studienjahr
			
			//$("#LAnsichtdropdownbox").jqxDropDownList('updaterow');
			//$("#grid").jqxGrid('deleterow', id);

        } //render toolbar 
	}); //gridPlanungLVLeher 
	
	
	
	
	
	
	//Ereignis Rowselect wenn in der Lehrertabelle ein Lehrer ausgewält wird müssen in der Tabelle für WS und SS die LVs kommen
	$("#gridAnsichtLehrer").on('rowselect', function (event) {
		
		

        console.log("event in Rowselect");
        console.log(event);
        var idlehrer = event.args.row.ID_Lehrer;
        LKZZ = event.args.row.Kurzzeichen; //in die globale Variable LKZZ schreiben um sie im Dateinamen anzu�ngen beim html export
        Vorname = event.args.row.Vorname;
        Nachname = event.args.row.Nachname;
        Stamminstitut = event.args.row.Stamminstitut;
        Dienstverhaeltnis = event.args.row.Dienstverhaeltnis;
		




        document.getElementById("Lehrerinfo").style = "font-size: 2em; margin-top:50px; margin-left:20px";
        document.getElementById("Lehrerinfo").innerHTML = Vorname + " " + Nachname + "    " + LKZZ + " / " + Dienstverhaeltnis + " / " + Stamminstitut +
            "<br> Werteinheiten: ";

        console.log(idlehrer);
        console.log(studienjahr);
       
        ws = "WS";

        var urlws = "read-lehrer-ansicht.php?ID_Lehrer=" + idlehrer + "&Studienjahr=" + studienjahr + "&Semester=" + ws;
        console.log(urlws);
        var studentsourcews = {
            datatype: "json",
			dataFields: [
                {name: 'ID_Planung',type: 'number'},
                {name: 'ID_Lehrer',type: 'number'},
                {name: 'Studienjahr',type: 'string'},
                {name: 'Vorname',type: 'string'},
                {name: 'Nachname',type: 'string'},
                {name: 'Kurzzeichen',type: 'string'},
                {name: 'Stamminstitut',type: 'string'},
				{name: 'LV_KZZ',type: 'string'},
                {name: 'Modultitel',type: 'string'},
                {name: 'Sem',type: 'number'},
                {name: 'LVA_Titel',type: 'string'},
                {name: 'LA_Art',type: 'string'},
                {name: 'Anmerkungen',type: 'string'},
				{name: 'Werteinheiten',type: 'number'}
            ],
            id: "ID_Planung",
            url: urlws
        };
        var adapterjahrews = new $.jqx.dataAdapter(studentsourcews);
        $("#gridAusgewaehlteLehrerWS").jqxGrid({source: adapterjahrews}); 

        ss = "SS";
        var urlss = "read-lehrer-ansicht.php?select=true&ID_Lehrer=" + idlehrer + "&Studienjahr=" + studienjahr + "&Semester=" + ss;
        var studentsourcess = {
            datatype: "json",
			dataFields: [
                {name: 'ID_Planung',type: 'number'},
                {name: 'ID_Lehrer',type: 'number'},
                {name: 'Studienjahr',type: 'string'},
                {name: 'Vorname',type: 'string'},
                {name: 'Nachname',type: 'string'},
                {name: 'Kurzzeichen',type: 'string'},
                {name: 'Stamminstitut',type: 'string'},
				{name: 'LV_KZZ',type: 'string'},
                {name: 'Modultitel',type: 'string'},
                {name: 'Sem',type: 'number'},
                {name: 'LVA_Titel',type: 'string'},
                {name: 'LA_Art',type: 'string'},
                {name: 'Anmerkungen',type: 'string'},
				{name: 'Werteinheiten',type: 'number'}
            ],
            id: "ID_Planung",
            url: urlss
        };
        var adapterjahress = new $.jqx.dataAdapter(studentsourcess);
        $("#gridAusgewaehlteLehrerSS").jqxGrid({
            source: adapterjahress
        }); //


        var wertws = 0.0;
        $.ajax({
            dataType: 'json',
            url: 'read-lehrer-ansicht.php',
            data: {
                ID_Lehrer: idlehrer,
                Studienjahr: studienjahr,
                Semester: ws
            },
            cache: false,
            type: "GET",
            success: function (data, status, xhr) {
                //console.log(data);
                //console.log(data[0].Werteinheiten);
                //console.log(data.length);

                for (var i = 0; i < data.length; i++) {
                    wertws = wertws + parseFloat(data[i].Werteinheiten);
                }
                //console.log(wertss);
                document.getElementById("wertws").innerHTML = wertws.toFixed(3);
				g_wertws = wertws.toFixed(3);//g_wertws ist global innerhalb init
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //commit(false);
            }
        });



        var wertss = 0.0;
        var gesamtwert = 3.0;
        $.ajax({
            dataType: 'json',
            url: 'read-lehrer-ansicht.php',
            data: {
                ID_Lehrer: idlehrer,
                Studienjahr: studienjahr,
                Semester: ss
            },
            cache: false,
            type: "GET",
            success: function (data, status, xhr) {
                //console.log(data);
                //console.log(data[0].Werteinheiten);
                //console.log(data.length);

				//Summe der Werteinheiten für das SS
                for (var i = 0; i < data.length; i++) {
                    wertss = wertss + parseFloat(data[i].Werteinheiten);
                }
				g_wertss = wertss.toFixed(3);//g_wertss ist global innerhalb init
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //commit(false);
            }
        });

        var wert = 0;
        $.ajax({
            dataType: 'json',
            url: 'read-lehrer-ansicht-all.php',
            data: {
                selectall: true,
                ID_Lehrer: idlehrer,
                Studienjahr: studienjahr

            },
            cache: false,
            type: "GET",
            success: function (data, status, xhr) {
                //console.log(data);
                //console.log(data[0].Werteinheiten);
                //console.log(data.length);

                for (var i = 0; i < data.length; i++) {
                    wert = wert + parseFloat(data[i].Werteinheiten);
                }
				g_wert = wert.toFixed(3);
                //console.log(wertss);
                document.getElementById("wertss").innerHTML = wertss.toFixed(3);
                $("#Lehrerinfo").append(parseFloat(wert).toFixed(3));

            },
            error: function (jqXHR, textStatus, errorThrown) {
                //commit(false);
            }
        });
	}); //(gridLehrerplanungLehrer).on('rowselect')	 Ausgabe und der LVs in WS und SS Tabelle und Berechnung der Werteinheiten
	
	
	//Mit dieser url kommt erst mal beim Start der Seite leere Tabellen aber die Tabellen werden angezeigt
	var url = "rudi-iab-planung-lehrer.php";

    var sourceLehrerAnsichtWS = {
        datatype: "json",
        id: "ID_Planung",
        url: url,
        dataFields: [
            {name: 'ID_Planung',type: 'number'},
            {name: 'ID_Lehrer',type: 'number'},
            { name: 'Studienjahr',type: 'string'},
            {name: 'Vorname',type: 'string'},
            {name: 'Nachname',type: 'string'},
            {name: 'Kurzzeichen',type: 'string'},
            {name: 'Stamminstitut',type: 'string'},
            {name: 'Dienstverhaeltnis',type: 'string'},
            {name: 'LV_KZZ',type: 'string'},
            {name: 'Modultitel',type: 'string'},
            {name: 'Sem',type: 'number'},
            {name: 'LVA_Titel',type: 'string'},
            { name: 'LA_Art',type: 'string'},
            {name: 'Anmerkungen',type: 'string'},
            { name: 'Werteinheiten',type: 'number'}
        ]
    };
	
	//Wintersemester Grid
    var LKZZ = "";
    var Vorname = "";
    var Nachname = "";
    var Stamminstitut = "";
    var Dienstverhaeltnis = "";

    var LehrerAnsichtAdapterWS = new $.jqx.dataAdapter(sourceLehrerAnsichtWS);

    $("#gridAusgewaehlteLehrerWS").jqxGrid({
        width: window.innerWidth - 20, //getWidth('Grid'),
        source: LehrerAnsichtAdapterWS,
        theme: theme,
        altrows: true,
        editable: false,
        editmode: 'singlecell',
        selectionmode: 'singlerow',
        autoheight: true,
        showtoolbar: true,
        showfilterrow: false,
        filterable: false,
        columnsresize: true,
        columns: [
			{text: 'LV-KZZ',datafield: 'LV_KZZ',width: 100,editable: false},
            {text: 'LVA-Titel',datafield: 'LVA_Titel', width: 250,editable: false},
            {text: 'Gruppe',datafield: 'Gruppen',width: 80},
            {text: 'Modultitel', datafield: 'Modultitel',width: 250,editable: false},
            {text: 'LA Art',datafield: 'LA_Art',width: 50,editable: false},
            {text: 'Anmerkungen',atafield: 'Anmerkungen',width: 200},
            {ext: 'Werteinheiten',datafield: 'Werteinheiten', width: 100}
		],
        rendertoolbar: function (toolbar) {
            var me = this;
			var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
			container.append('<span style="font-size: 1.2em">Wintersemester Werteinheiten:  <span id="wertws"></span></span>');
		} //render toolbar                            

    }); //#gridAusgewaehlteLehrerWS" 
	
	
	var sourceLehrerAnsichtSS = {
        datatype: "json",
        id: "ID_Planung",
        url: url,
        dataFields: [
            {name: 'ID_Planung',type: 'number'},
            {name: 'ID_Lehrer',type: 'number'},
            {name: 'Studienjahr',type: 'string'},
            {name: 'Vorname',type: 'string'},
            {name: 'Nachname',type: 'string'},
            {name: 'Kurzzeichen',type: 'string'},
            {name: 'Stamminstitut',type: 'string'},
            {name: 'Dienstverhaeltnis',type: 'string'},
            {name: 'LV_KZZ',type: 'string'},
            {name: 'Modultitel',type: 'string'},
            {name: 'Sem',type: 'number'},
            {name: 'LVA_Titel',type: 'string'},
            {name: 'LA_Art',type: 'string'},
            {name: 'Anmerkungen',type: 'string'},
            {name: 'Werteinheiten',type: 'number'}
        ]
    };

	//Sommersemester Grid
    var LKZZ = "";
    var Vorname = "";
    var Nachname = "";
    var Stamminstitut = "";
    var Dienstverhaeltnis = "";

    var LehrerAnsichtAdapterSS = new $.jqx.dataAdapter(sourceLehrerAnsichtSS);


    $("#gridAusgewaehlteLehrerSS").jqxGrid({
        width: window.innerWidth - 20, //getWidth('Grid'),
        source: LehrerAnsichtAdapterSS,
        theme: theme,
        altrows: true,
        editable: false,
        editmode: 'singlecell',
        selectionmode: 'singlerow',
        autoheight: true,
        showtoolbar: true,
        showfilterrow: false,
        filterable: false,
        columnsresize: true,
		columns: [
			{text: 'LV-KZZ',datafield: 'LV_KZZ',width: 100,editable: false},
            {text: 'LVA-Titel',datafield: 'LVA_Titel', width: 250,editable: false},
            {text: 'Gruppe',datafield: 'Gruppen',width: 80},
            {text: 'Modultitel', datafield: 'Modultitel',width: 250,editable: false},
            {text: 'LA Art',datafield: 'LA_Art',width: 50,editable: false},
            {text: 'Anmerkungen',atafield: 'Anmerkungen',width: 200},
            {ext: 'Werteinheiten',datafield: 'Werteinheiten', width: 100}
		],
        rendertoolbar: function (toolbar) {
            var me = this;
			var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<span style="font-size: 1.2em">Sommersemester Werteinheiten:  <span id="wertss"></span></span>');
		} //render toolbar                            

    }); //#gridAusgewaehlteLehrerSS" 

	
	
	
	
};//initAnsichtLehrer