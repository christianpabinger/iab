var initAnsichtLehrer = function () {
    var theme = "energyblue";
    //var sourcejahre = ["20/21", "21/22", "22/23", "23/24", "24/25", "25/26", "26/27", "27/28"];

    studienjahr = global_sourcejahre[global_planungsjahrindex];
    console.log("studienjahrrrr");
    console.log(global_planungsstudienjahr);
    console.log(global_planungsjahrindex);

    var sourceLehrer = {
        datatype: "json",
        datafields: [
            {
                name: 'ID_Lehrer',
                type: 'number'
            },
            {
                name: 'Vorname',
                type: 'string'
            },
            {
                name: 'Nachname',
                type: 'string'
            },
            {
                name: 'Kurzzeichen',
                type: 'string'
            },
                //{ name: 'Mailadresse', type: 'string' },
            {
                name: 'Stamminstitut',
                type: 'string'
            },
            {
                name: 'Dienstverhaeltnis',
                type: 'string'
            },
            {
                name: 'Freigabe',
                type: 'number'
            }

        ],
        cache: false,
        url: 'freigabe-on-off.php?Studienjahr=' + global_planungsstudienjahr, //24/25',//rudi-iab-lehrer.php',//'freigabe-on-off.php?Studienjahr=20/21',// + globalstudienjahr,  //
        root: 'Rows',
        id: 'ID_Lehrer',
        //updaterow um das Hackerl der Freigabe in der Tabelle freigaben zu speichern 
        updaterow: function (rowid, rowdata, commit) {

            var dropdownlistindex = $('#LAnsichtdropdownbox').jqxDropDownList('selectedIndex');
            var jahr = $('#LAnsichtdropdownbox').jqxDropDownList('getItem', dropdownlistindex).value;
            console.log(jahr);

            //Hackerl dem php Skript übergeben
            var urlfreigabe = "freigabe-on-off.php?update=true&" + $.param(rowdata) + "&Studienjahr=" + jahr;
            console.log("rowdata in update");
            console.log(rowdata);

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
                    // update command is executed.
                    console.log("LV updaterow success");
                    //$("#gridAnschtLehrer").jqxGrid('updatebounddata');

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
        selectionmode: 'singlerow', //'multiplecellsadvanced',//
        showtoolbar: true,
        showfilterrow: true,
        filterable: true,
        columnsresize: true,
        columns: [
            {
                text: 'ID',
                datafield: 'ID_Lehrer',
                width: 50,
                editable: false
            },
            {
                text: 'Vorname',
                datafield: 'Vorname',
                width: 200,
                editable: false
            },
            {
                text: 'Nachname',
                datafield: 'Nachname',
                width: 200,
                editable: false
            },
            {
                text: 'Kurzzeichen',
                datafield: 'Kurzzeichen',
                width: 100,
                editable: false
            },
            {
                text: 'Stamminstitut',
                datafield: 'Stamminstitut',
                width: 100,
                editable: false
            },
            {
                text: 'Dienstverhaeltnis',
                datafield: 'Dienstverhaeltnis',
                width: 100,
                editable: false
            },
            {
                text: 'Freigabe',
                columntype: 'checkbox',
                datafield: 'Freigabe',
                width: 80
            }

        ],
        rendertoolbar: function (toolbar) {
            var me = this;

            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);

            //container.append('<input id="freigeben" type="button" value="Freigeben" />');
            //container.append('<input id="sperren" type="button" value="Sperren" />');
            container.append('<input id="pdfLehrerAnsicht" type="button" value="PDF Export" />');


            container.append('<div id="LAnsichtdropdownbox" style="float:left"></div>');

            //$("#LAnsichtdropdownbox").jqxDropDownList({width: 100, source: sourcejahre, theme: theme, selectedIndex: 2});
            $("#LAnsichtdropdownbox").jqxDropDownList({
                width: 100,
                source: global_sourcejahre,
                theme: theme,
                selectedIndex: global_planungsjahrindex
            });
            $("#pdfLehrerAnsicht").jqxButton({
                theme: theme
            });
            //$("#freigeben").jqxButton({theme: theme});
            //$("#sperren").jqxButton({theme: theme});

            //Button für den Ausdruck
            $("#pdfLehrerAnsicht").on('click', function () {
                //https://www.guriddo.net/documentation/guriddo/javascript/user-guide/exporting/
                var gridContent = $("#gridAusgewaehlteLehrerWS").jqxGrid('exportdata', 'html'); //, 'Besch�ftigungsausweis-'+LKZZ
                var newWindow = window.open('', '', 'width=800, height=500'),
                    document = newWindow.document.open(),
                    pageContent =
                    '<!DOCTYPE html>\n' +
                    '<html>\n' +
                    '<head>\n' +
                    '<meta charset="utf-8" />\n' +
                    '<title>Besch�ftigungsliste</title>\n' +
                    '<style>body {font-family: Arial, Helvetica, sans-serif; fontSize: 1.3em}  </style>\n' +
                    '</head>\n' +
                    '<body>\n' +
                    'Besch�ftigungsliste Studienjahr: ' + studienjahr + '<hr>' +
                    LKZZ + "    " + Vorname + " " + Nachname + '<br>' + 'Stamminstitut: ' + Stamminstitut + '      ' + '  / ' + Dienstverhaeltnis + '<hr>' +

                    gridContent + '\n</body>\n</html>';
                document.write(pageContent);
                document.close();
                newWindow.print();
            }); //Button für den Ausdruck pdf print

            /////
            /*
            $("#LAnsichtdropdownbox").bind('select', function (event) {

                var args = event.args;
                console.log("args dropdown");
                console.log(args.index);

                var item = $('#LAnsichtdropdownbox').jqxDropDownList('getItem', args.index);
                studienjahr = item.value;
                console.log("studienjahr");
                console.log(studienjahr);
                ////	
                var sourceLehrer = {
                    datatype: "json",
                    datafields: [
                        {
                            name: 'ID_Lehrer',
                            type: 'number'
                        },
                        {
                            name: 'Vorname',
                            type: 'string'
                        },
                        {
                            name: 'Nachname',
                            type: 'string'
                        },
                        {
                            name: 'Kurzzeichen',
                            type: 'string'
                        },
                
                        {
                            name: 'Stamminstitut',
                            type: 'string'
                        },
                        {
                            name: 'Dienstverhaeltnis',
                            type: 'string'
                        },
                        {
                            name: 'Freigabe',
                            type: 'number'
                        }

                    ],
                    cache: false,
                    url: 'freigabe-on-off.php?Studienjahr=' + studienjahr, //24/25',//rudi-iab-lehrer.php',//'freigabe-on-off.php?Studienjahr=20/21',// + globalstudienjahr,  //
                    root: 'Rows',
                    id: 'ID_Lehrer',
                    //updaterow um das Hackerl der Freigabe in der Tabelle freigaben zu speichern 
                    updaterow: function (rowid, rowdata, commit) {

                        var dropdownlistindex = $('#LAnsichtdropdownbox').jqxDropDownList('selectedIndex');
                        var jahr = $('#LAnsichtdropdownbox').jqxDropDownList('getItem', dropdownlistindex).value;
                        console.log(jahr);


                        var urlfreigabe = "freigabe-on-off.php?update=true&" + $.param(rowdata) + "&Studienjahr=" + jahr;
                        console.log("rowdata in update");
                        console.log(rowdata);

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
                                // update command is executed.
                                console.log("LV updaterow success");
                                //$("#gridAnschtLehrer").jqxGrid('updatebounddata');

                                commit(true);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                commit(false);
                            }
                        });


                    } //Update Row
                }; //source lehrer  
                var dataAdapterLehrer = new $.jqx.dataAdapter(sourceLehrer);


                ////			

                /*
                var rowindex = $("#gridAnsichtLehrer").jqxGrid('getselectedrowindex');
                var lehrerID = $("#gridAnsichtLehrer").jqxGrid('getrowdata', rowindex).ID_Lehrer;
                console.log("getrowdata  mit lehrerid bei doropdowbx selected");
                console.log(lehrerID);
                
				
                ws="WS";
                var urlws = "read-lehrer-ansicht.php?ID_Lehrer="+lehrerID+"&Studienjahr="+studienjahr+"&Semester="+ws;
                 console.log(urlws);
                var Lehreransichtsourcews = {
                    datatype: "json",
                    dataFields: [
                        { name: 'ID_Planung', type: 'number' },
                        { name: 'ID_Lehrer', type: 'number' },
                        { name: 'Studienjahr', type: 'string' },
                        { name: 'Vorname', type: 'string' },
                        { name: 'Nachname', type: 'string' },
                        { name: 'Kurzzeichen', type: 'string' },
                        { name: 'Stamminstitut', type: 'string' },
						{ name: 'Dienstverhaeltnis', type: 'string' },
						
                        { name: 'LV_KZZ', type: 'string' },
                        { name: 'Modultitel', type: 'string' }, 
                        { name: 'Sem', type: 'number' },
                        { name: 'LVA_Titel', type: 'string' },
                        { name: 'LA_Art', type: 'string' },
                       // { name: 'WST', type: 'number' },
                        { name: 'Anmerkungen', type: 'string' },
                        //{ name: 'WST_Lehrer', type: 'number' },
                       // { name: 'Wertigkeit', type: 'number' },
                        { name: 'Werteinheiten', type: 'number' }
                    ],
                    id: "ID_Planung",
                    url: urlws
                };
                var adapterjahrews = new $.jqx.dataAdapter(Lehreransichtsourcews);                                                
                $("#gridAusgewaehlteLehrerWS").jqxGrid({ source: adapterjahrews });//
                
                
                ss="SS";
                var urlss = "read-lehrer-ansicht.php?ID_Lehrer="+lehrerID+"&Studienjahr="+studienjahr+"&Semester="+ss;
                var Lehreransichtsourcess = {
                    datatype: "json",
                    dataFields: [
                        { name: 'ID_Planung', type: 'number' },
                        { name: 'ID_Lehrer', type: 'number' },
                        { name: 'Studienjahr', type: 'string' },
                        { name: 'Vorname', type: 'string' },
                        { name: 'Nachname', type: 'string' },
                        { name: 'Kurzzeichen', type: 'string' },
                        { name: 'Stamminstitut', type: 'string' },
						{ name: 'Dienstverhaeltnis', type: 'string' },
						
                        { name: 'LV_KZZ', type: 'string' },
                        { name: 'Modultitel', type: 'string' }, 
                        { name: 'Sem', type: 'number' },
                        { name: 'LVA_Titel', type: 'string' },
                        { name: 'LA_Art', type: 'string' },
                        //{ name: 'WST', type: 'number' },
                        { name: 'Anmerkungen', type: 'string' },
                       // { name: 'WST_Lehrer', type: 'number' },
                       // { name: 'Wertigkeit', type: 'number' },
                        { name: 'Werteinheiten', type: 'number' }
                    ],
                    id: "ID_Planung",
                    url: urlss
                };
				
                var adapterjahress = new $.jqx.dataAdapter(Lehreransichtsourcess);                                                
               $("#gridAusgewaehlteLehrerSS").jqxGrid({ source: adapterjahress });//
			  
            }); //dropdown box select
        ////

        */

        } //render toolbar 
    }); //gridPlanungLVLeher 


/*
    //Einlesen des Planungsjahres und einstellen der dropdownbox auf das Planungsjahr
    $.ajax({
        dataType: 'json',
        url: 'einstellungen.php',
        cache: false,
        type: "GET",
        data: {
            getPlanungsjahr: true
        },
        success: function (data, status, xhr) {
            //console.log(data);
            //wird dann in der Funktion rendertoolbar der dropdownliste als index übergeben
            planungsjahrindex = data;
            console.log(planungsjahrindex);
            $("#LAnsichtdropdownbox").jqxDropDownList('selectItem', global_sourcejahre[planungsjahrindex]);


        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
*/
    //------------Grid Ansicht ausgewaehlter Lehrer------------------------------------------------------------  
    //diese url liefert leeres array, damit das Auswahlgrid erscheint aber ohne Daten
    var url = "rudi-iab-planung-lehrer.php";

    var sourceLehrerAnsichtWS = {
        datatype: "json",
        id: "ID_Planung",
        url: url,
        dataFields: [
            {
                name: 'ID_Planung',
                type: 'number'
            },
            {
                name: 'ID_Lehrer',
                type: 'number'
            },
            {
                name: 'Studienjahr',
                type: 'string'
            },
            {
                name: 'Vorname',
                type: 'string'
            },
            {
                name: 'Nachname',
                type: 'string'
            },
            {
                name: 'Kurzzeichen',
                type: 'string'
            },
            {
                name: 'Stamminstitut',
                type: 'string'
            },
            {
                name: 'Dienstverhaeltnis',
                type: 'string'
            },
            {
                name: 'LV_KZZ',
                type: 'string'
            },
            {
                name: 'Modultitel',
                type: 'string'
            },
            {
                name: 'Sem',
                type: 'number'
            },
            {
                name: 'LVA_Titel',
                type: 'string'
            },
            {
                name: 'LA_Art',
                type: 'string'
            },
             //{ name: 'WST', type: 'number' },
            {
                name: 'Anmerkungen',
                type: 'string'
            },
             //{ name: 'WST_Lehrer', type: 'number' },
             //{ name: 'Wertigkeit', type: 'number' },
            {
                name: 'Werteinheiten',
                type: 'number'
            }
         ]
    };



    //Studienjahr sollte in einer Einstellung immer das aktuelle sein
    //var studienjahr = "21/22";
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

            {
                text: 'LV-KZZ',
                datafield: 'LV_KZZ',
                width: 100,
                editable: false
            },
            {
                text: 'LVA-Titel',
                datafield: 'LVA_Titel',
                width: 250,
                editable: false
            },
            {
                text: 'Gruppe',
                datafield: 'Gruppen',
                width: 80
            },
            {
                text: 'Modultitel',
                datafield: 'Modultitel',
                width: 250,
                editable: false
            },
            {
                text: 'LA Art',
                datafield: 'LA_Art',
                width: 50,
                editable: false
            },
            {
                text: 'Anmerkungen',
                datafield: 'Anmerkungen',
                width: 200
            },
            {
                text: 'Werteinheiten',
                datafield: 'Werteinheiten',
                width: 100
            }




        ],
        rendertoolbar: function (toolbar) {
            var me = this;

            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);

            //container.append('<input id="pdfLehrerAnsicht" type="button" value="PDF Export" />');

            container.append('<span style="font-size: 1.2em">Wintersemester Werteinheiten:  <span id="wertws"></span></span>');



        } //render toolbar                            

    }); //#gridAusgewaehlteLehrerWS" 


    var sourceLehrerAnsichtSS = {
        datatype: "json",
        id: "ID_Planung",
        url: url,
        dataFields: [
            {
                name: 'ID_Planung',
                type: 'number'
            },
            {
                name: 'ID_Lehrer',
                type: 'number'
            },
            {
                name: 'Studienjahr',
                type: 'string'
            },
            {
                name: 'Vorname',
                type: 'string'
            },
            {
                name: 'Nachname',
                type: 'string'
            },
            {
                name: 'Kurzzeichen',
                type: 'string'
            },
            {
                name: 'Stamminstitut',
                type: 'string'
            },
            {
                name: 'Dienstverhaeltnis',
                type: 'string'
            },
            {
                name: 'LV_KZZ',
                type: 'string'
            },
            {
                name: 'Modultitel',
                type: 'string'
            },
            {
                name: 'Sem',
                type: 'number'
            },
            {
                name: 'LVA_Titel',
                type: 'string'
            },
            {
                name: 'LA_Art',
                type: 'string'
            },
            {
                name: 'WST',
                type: 'number'
            },
            {
                name: 'Anmerkungen',
                type: 'string'
            },
            {
                name: 'WST_Lehrer',
                type: 'number'
            },
            {
                name: 'Wertigkeit',
                type: 'number'
            },
            {
                name: 'Werteinheiten',
                type: 'number'
            }
         ]
    };

    //var sourcejahre = ["19/20", "20/21", "21/22", "22/23", "23/24", "24/25", "25/26"];

    //Studienjahr sollte in einer Einstellung immer das aktuelle sein
    //var studienjahr = "21/22";
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

            {
                text: 'LV-KZZ',
                datafield: 'LV_KZZ',
                width: 100,
                editable: false
            },
            {
                text: 'LVA-Titel',
                datafield: 'LVA_Titel',
                width: 250,
                editable: false
            },
            {
                text: 'Gruppe',
                datafield: 'Gruppen',
                width: 80
            },
            {
                text: 'Modultitel',
                datafield: 'Modultitel',
                width: 250,
                editable: false
            },
            {
                text: 'LA Art',
                datafield: 'LA_Art',
                width: 50,
                editable: false
            },
            {
                text: 'Anmerkungen',
                datafield: 'Anmerkungen',
                width: 200
            },
			//{ text: 'WST_Lehrer', datafield: 'WST', width: 50 }
            {
                text: 'Werteinheiten',
                datafield: 'Werteinheiten',
                width: 100,
                editable: false
            },



        ],
        rendertoolbar: function (toolbar) {
            var me = this;

            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<span style="font-size: 1.2em">Sommersemester Werteinheiten:  <span id="wertss"></span></span>');
            //container.append('<input id="pdfLehrerAnsicht" type="button" value="PDF Export" />');




            $("#LAnsichtdropdownbox").bind('select', function (event) {

                var args = event.args;
                console.log("args dropdown");
                console.log(args.index);

                var item = $('#LAnsichtdropdownbox').jqxDropDownList('getItem', args.index);
                studienjahr = item.value;
                console.log(studienjahr);

                var rowindex = $("#gridAnsichtLehrer").jqxGrid('getselectedrowindex');
                var idlehrer = $("#gridAnsichtLehrer").jqxGrid('getrowdata', rowindex).ID_Lehrer;
                console.log("getrowdata  mit lehrerid bei doropdowbx selected");
                console.log(idlehrer);



                ws = "WS";

                var urlws = "read-lehrer-ansicht.php?ID_Lehrer=" + idlehrer + "&Studienjahr=" + studienjahr + "&Semester=" + ws;
                console.log(urlws);
                var studentsourcews = {
                    datatype: "json",

                    dataFields: [
                        {
                            name: 'ID_Planung',
                            type: 'number'
                        },
                        {
                            name: 'ID_Lehrer',
                            type: 'number'
                        },
                        {
                            name: 'Studienjahr',
                            type: 'string'
                        },
                        {
                            name: 'Vorname',
                            type: 'string'
                        },
                        {
                            name: 'Nachname',
                            type: 'string'
                        },
                        {
                            name: 'Kurzzeichen',
                            type: 'string'
                        },
                        {
                            name: 'Stamminstitut',
                            type: 'string'
                        },

                        {
                            name: 'LV_KZZ',
                            type: 'string'
                        },
                        {
                            name: 'Modultitel',
                            type: 'string'
                        },
                        {
                            name: 'Sem',
                            type: 'number'
                        },
                        {
                            name: 'LVA_Titel',
                            type: 'string'
                        },
                        {
                            name: 'LA_Art',
                            type: 'string'
                        },
                  // { name: 'WST', type: 'number' },
                        {
                            name: 'Anmerkungen',
                            type: 'string'
                        },
                  // { name: 'WST_Lehrer', type: 'number' },
                  // { name: 'Wertigkeit', type: 'number' },
                        {
                            name: 'Werteinheiten',
                            type: 'number'
                        }
               ],
                    id: "ID_Planung",
                    url: urlws
                };
                var adapterjahrews = new $.jqx.dataAdapter(studentsourcews);
                $("#gridAusgewaehlteLehrerWS").jqxGrid({
                    source: adapterjahrews
                }); //

                ss = "SS";
                var urlss = "read-lehrer-ansicht.php?select=true&ID_Lehrer=" + idlehrer + "&Studienjahr=" + studienjahr + "&Semester=" + ss;
                var studentsourcess = {
                    datatype: "json",

                    dataFields: [
                        {
                            name: 'ID_Planung',
                            type: 'number'
                        },
                        {
                            name: 'ID_Lehrer',
                            type: 'number'
                        },
                        {
                            name: 'Studienjahr',
                            type: 'string'
                        },
                        {
                            name: 'Vorname',
                            type: 'string'
                        },
                        {
                            name: 'Nachname',
                            type: 'string'
                        },
                        {
                            name: 'Kurzzeichen',
                            type: 'string'
                        },
                        {
                            name: 'Stamminstitut',
                            type: 'string'
                        },

                        {
                            name: 'LV_KZZ',
                            type: 'string'
                        },
                        {
                            name: 'Modultitel',
                            type: 'string'
                        },
                        {
                            name: 'Sem',
                            type: 'number'
                        },
                        {
                            name: 'LVA_Titel',
                            type: 'string'
                        },
                        {
                            name: 'LA_Art',
                            type: 'string'
                        },
                  //{ name: 'WST', type: 'number' },
                        {
                            name: 'Anmerkungen',
                            type: 'string'
                        },
                   //{ name: 'WST_Lehrer', type: 'number' },
                  // { name: 'Wertigkeit', type: 'number' },
                        {
                            name: 'Werteinheiten',
                            type: 'number'
                        }
               ],
                    id: "ID_Planung",
                    url: urlss
                };
                var adapterjahress = new $.jqx.dataAdapter(studentsourcess);

                $("#gridAusgewaehlteLehrerSS").jqxGrid({
                    source: adapterjahress
                }); //


            }); //dropdown box select




        } //render toolbar                            

    }); //#gridAusgewaehlteLehrerSS" 




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
        //var item = $('#LAnsichtdropdownbox').jqxDropDownList('getItem', args.index);
        //console.log(item);
        //studienjahr = "20/21";//item.value;

        ws = "WS";

        var urlws = "read-lehrer-ansicht.php?ID_Lehrer=" + idlehrer + "&Studienjahr=" + studienjahr + "&Semester=" + ws;
        console.log(urlws);
        var studentsourcews = {
            datatype: "json",

            dataFields: [
                {
                    name: 'ID_Planung',
                    type: 'number'
                },
                {
                    name: 'ID_Lehrer',
                    type: 'number'
                },
                {
                    name: 'Studienjahr',
                    type: 'string'
                },
                {
                    name: 'Vorname',
                    type: 'string'
                },
                {
                    name: 'Nachname',
                    type: 'string'
                },
                {
                    name: 'Kurzzeichen',
                    type: 'string'
                },
                {
                    name: 'Stamminstitut',
                    type: 'string'
                },

                {
                    name: 'LV_KZZ',
                    type: 'string'
                },
                {
                    name: 'Modultitel',
                    type: 'string'
                },
                {
                    name: 'Sem',
                    type: 'number'
                },
                {
                    name: 'LVA_Titel',
                    type: 'string'
                },
                {
                    name: 'LA_Art',
                    type: 'string'
                },
                   //{ name: 'WST', type: 'number' },
                {
                    name: 'Anmerkungen',
                    type: 'string'
                },
                   //{ name: 'WST_Lehrer', type: 'number' },
                   //{ name: 'Wertigkeit', type: 'number' },
                {
                    name: 'Werteinheiten',
                    type: 'number'
                }
               ],
            id: "ID_Planung",
            url: urlws
        };
        var adapterjahrews = new $.jqx.dataAdapter(studentsourcews);
        $("#gridAusgewaehlteLehrerWS").jqxGrid({
            source: adapterjahrews
        }); //

        ss = "SS";
        var urlss = "read-lehrer-ansicht.php?select=true&ID_Lehrer=" + idlehrer + "&Studienjahr=" + studienjahr + "&Semester=" + ss;
        var studentsourcess = {
            datatype: "json",

            dataFields: [
                {
                    name: 'ID_Planung',
                    type: 'number'
                },
                {
                    name: 'ID_Lehrer',
                    type: 'number'
                },
                {
                    name: 'Studienjahr',
                    type: 'string'
                },
                {
                    name: 'Vorname',
                    type: 'string'
                },
                {
                    name: 'Nachname',
                    type: 'string'
                },
                {
                    name: 'Kurzzeichen',
                    type: 'string'
                },
                {
                    name: 'Stamminstitut',
                    type: 'string'
                },

                {
                    name: 'LV_KZZ',
                    type: 'string'
                },
                {
                    name: 'Modultitel',
                    type: 'string'
                },
                {
                    name: 'Sem',
                    type: 'number'
                },
                {
                    name: 'LVA_Titel',
                    type: 'string'
                },
                {
                    name: 'LA_Art',
                    type: 'string'
                },
                   //{ name: 'WST', type: 'number' },
                {
                    name: 'Anmerkungen',
                    type: 'string'
                },
                   //{ name: 'WST_Lehrer', type: 'number' },
                   //{ name: 'Wertigkeit', type: 'number' },
                {
                    name: 'Werteinheiten',
                    type: 'number'
                }
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

                //commit(true);
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

                for (var i = 0; i < data.length; i++) {
                    wertss = wertss + parseFloat(data[i].Werteinheiten);
                }
                //console.log(wertss);
                document.getElementById("wertss").innerHTML = wertss.toFixed(3);

                //document.getElementById("Lehrerinfo").innerHTML = parseFloat(wertss + wertws).toFixed(3);
                // $("#Lehrerinfo").append(parseFloat(wertss + wertws).toFixed(3));
                //var gesamtwert = parseFloat(wertss + wertws).toFixed(3);
                //gesamtwert = wertss + wertws;
                //commit(true);
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
                //console.log(wertss);
                document.getElementById("wertss").innerHTML = wertss.toFixed(3);

                //document.getElementById("Lehrerinfo").innerHTML = parseFloat(wertss + wertws).toFixed(3);
                $("#Lehrerinfo").append(parseFloat(wert).toFixed(3));
                //var gesamtwert = parseFloat(wertss + wertws).toFixed(3);
                //gesamtwert = wertss + wertws;
                //commit(true);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //commit(false);
            }
        });




    }); //(gridLehrerplanungLehrer).on('rowselect')





}; //initAnsichtTeacher
