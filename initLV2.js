var initLV = function () {
    var theme = "energyblue";
    var datenarray = {};

    var sourcelv =
    {
        datatype: "json",
        datafields:
        [
                { name: 'ID_LV', type: 'number' },
                { name: 'st_sem', type: 'string' },
                { name: 'St_R', type: 'string' },
                { name: 'Studium', type: 'string' },
                { name: 'Kategorie', type: 'string' },
                { name: 'LV_KZZ', type: 'string' },
                { name: 'Modultitel', type: 'string' }, 
                { name: 'Sem', type: 'number' },
                { name: 'LVA_Titel', type: 'string' },
                { name: 'LA_Art', type: 'string' },
                { name: 'TN', type: 'number' },
                { name: 'WST', type: 'number' },
                { name: 'Anmerkungen', type: 'string' },
                //{ name: 'WST_Lehrer', type: 'number' },
                //{ name: 'Wertigkeit', type: 'number' },
                //{ name: 'Werteinheiten', type: 'number' },
                { name: 'PHO_Eintrag', type: 'number' },
                { name: 'Aenderungen', type: 'number'}
        ],
        cache: false,
        url: 'rudi-iab-lv.php',
        root: 'Rows',
        id: 'ID_LV',
        beforeprocessing: function (data) {
                //source.totalrecords = data[0].TotalRows;
        },
        addrow: function (rowid, rowdata, position, commit) {
            // synchronize with the server - send insert command
            //var data = "insert=true&" + $.param(rowdata);
            $.ajax({
                    dataType: 'json',
                    url: 'rudi-iab-lv.php',
                    data: {
                        insert: true
                    },
                    cache: false,
                    type: "GET",
                    success: function (data, status, xhr) {
                        // insert command is executed.
                        console.log("lv addrow succes");
                        commit(true);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        commit(false);
                    }
            });

        },
        updaterow: function (rowid, rowdata, commit) {
                // synchronize with the server - send update command
                var data = "update=true&" + $.param(rowdata);
                console.log("rowdata in update");
                console.log(rowdata);
                $.ajax({
                        dataType: 'json',
                        url: 'rudi-iab-lv.php',
                        cache: false,
                        type: "GET",
                        data: data,
                        success: function (data, status, xhr) {
                                // update command is executed.
                                console.log("LV updaterow success");
                                commit(true);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                                commit(false);
                        }
                });
                $("#gridLV").jqxGrid('updatebounddata');

        },
        deleterow: function (id_lv, commit) {
                // synchronize with the server - send delete command
                //var data = "delete=true&" + $.param({ ID_Student: rowid });

                //console.log(id_lehrer);
                $.ajax({
                        dataType: 'json',
                        url: 'rudi-iab-lv.php',
                        type: "GET",
                        cache: false,
                        data: {
                        //Hier sammeln der Übergabevariablen und deren Werte
                                delete: true,
                                ID_LV: id_lv

                        },
                        success: function (data, status, xhr) {
                                // delete command is executed.
                                console.log("lv deleterow succes");
                                commit(true);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                                commit(false);
                        }
                });

         }

    };//source

    var dataAdapterlv = new $.jqx.dataAdapter(sourcelv);
			
    // initialize jqxGrid
    $("#gridLV").jqxGrid(
    {
        width: window.innerWidth-20,//getWidth('Grid'),
        source: dataAdapterlv, 
        theme: theme,
        //pageable: true,
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
        rendertoolbar: function(toolbar){
            var me = this;
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<input id="lvaddrowbutton" type="button" value="Add New Row" />');
            //container.append('<input id="updaterowbutton" type="button" value="Update Selected Row" />');
            container.append('<input id="lvdeleterowbutton" type="button" value="Delete Selected Row" />');
            container.append('<input id="lvprintbutton" type="button" value="Print" />');
            container.append('<input id="lvexcelbutton" type="button" value="Excel Export" />');
            container.append('<input id="lvpdfbutton" type="button" value="PDF Export" />');
            container.append('<input id="lvimportbutton" type="button" value="Import LV:" />');
            container.append('<input id="lvimportinput" type="text" />');
            //umschalten von enzelner Zelle und ganzer Reihe bearbeiten
            container.append('Edit Mode: <input id="editmodeclick" type="radio" name="editmode" value="click" checked="checked">Cell<input id="editmodesinglerow" type="radio" name="editmode" value="singlerow" >Row');

            $("#lvimportinput").jqxInput({theme: theme, placeHolder: "CSV-Dateiname eingeben"});
            $("#lvimportbutton").jqxButton({theme: theme});
            $("#lvprintbutton").jqxButton({theme: theme});
            $("#lvexcelbutton").jqxButton({theme: theme});
            $("#lvpdfbutton").jqxButton({theme: theme});
            $("#lvaddrowbutton").jqxButton({theme: theme});
            //$("#updaterowbutton").jqxButton({theme: theme});
            $("#lvdeleterowbutton").jqxButton({theme: theme});
            $("#lvaddrowbutton").bind('click', function () {
                    var emptyrow = {};

                    var commit = $("#gridLV").jqxGrid('addrow', null, emptyrow, 'first');
                    // console.log(datarow);
               // $("#gridLV").on("bindingcomplete", function (event) {
                    var commit = $("#gridLV").jqxGrid('updatebounddata');//funktioniert trotz Fehlermeldung
            });

            $("#lvdeleterowbutton").bind('click', function () {

                    var selectedrowindex = $("#gridLV").jqxGrid('getselectedrowindex');
                    var rowscount = $("#gridLV").jqxGrid('getdatainformation').rowscount;
                    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                            var id = $("#gridLV").jqxGrid('getrowid', selectedrowindex);
                            $("#gridLV").jqxGrid('deleterow', id);
                    }
            });

            $("#lvprintbutton").on('click', function () {
                    var gridContent = $("#gridLV").jqxGrid('exportdata', 'html');
                    var newWindow = window.open('', '', 'width=800, height=500'),
                    document = newWindow.document.open(),
                    pageContent =
                            '<!DOCTYPE html>\n' +
                            '<html>\n' +
                            '<head>\n' +
                            '<meta charset="utf-8" />\n' +
                            '<title>Lehrveranstaltungen</title>\n' +
                            '</head>\n' +
                            '<body>\n' + gridContent + '\n</body>\n</html>';
                    document.write(pageContent);
                    document.close();
                    newWindow.print();
            });//print
            $("#lvexcelbutton").on('click', function () {
                    $("#gridLV").jqxGrid('exportdata', 'xls', 'Lehrveranstaltungen'); 

            });

            $("#lvpdfbutton").on('click', function () {
                    $("#gridLV").jqxGrid('exportdata', 'pdf', 'Lehrveranstaltungen');
            });

            $("#lvimportbutton").on('click', function () {
                    var dateiname = $("#lvimportinput").val();
                    $.ajax({
                            dataType: 'json',
                            url: 'import-lv.php',
                            cache: false,
                            type: "GET",
                            data: {
                                    dateiname: dateiname,
                                    tabelle: 'lv'
                            },
                            success: function (data, status, xhr) {
                                    // update command is executed.
                                    //commit(true); error: commit is not defined
                                    console.log("Import lv success");
                                    console.log(dateiname);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                    //commit(false);
                            }
                    });

                $("#gridLV").jqxGrid('updatebounddata');//funktioniert trotz Fehlermeldung
            });
            $("#editmodeclick").on('click', function (event) {
                $("#gridLV").jqxGrid({ editmode: 'click' });
            });
            $("#editmodesinglerow").on('click', function (event) {
                $("#gridLV").jqxGrid({ editmode: 'selectedrow' });
            });


        },//rendertoolbar
        columns: [
              { text: 'ID', datafield: 'ID_LV', width: 50, editable: false },
              { text: 'st-sem', datafield: 'st_sem', width: 50 },
              { text: 'St-R', datafield: 'St_R',  width: 50 },
              { text: 'Studium', datafield: 'Studium', width: 150 },
              { text: 'Kategorie', datafield: 'Kategorie', width: 150 },
              { text: 'LV-KZZ', datafield: 'LV_KZZ', width: 150 },
              { text: 'Modultitel', datafield: 'Modultitel', width: 150 },
              { text: 'Sem', datafield: 'Sem', width: 50 },
              { text: 'LVA-Titel', datafield: 'LVA_Titel', width: 250 },
              { text: 'LA-Art', datafield: 'LA_Art', width: 50 },
              { text: 'TN', datafield: 'TN', width: 50 },
              { text: 'WST', datafield: 'WST', width: 50 },
              { text: 'Anmerkungen', datafield: 'Anmerkungen', width: 250 },
              //{ text: 'WST-Lehrer', datafield: 'WST_Lehrer', width: 50 },
             // { text: 'Wertigkeit', datafield: 'Wertigkeit', width: 50 },
              //{ text: 'Werteinheiten', datafield: 'Werteinheiten', width: 50 },
              { text: 'PHO-Eintrag', columntype: 'checkbox', datafield: 'PHO_Eintrag', width: 50 },
              { text: 'Aenderungen', columntype: 'checkbox', datafield: 'Aenderungen', width: 50 }

        ]

    });//Grid				

};//function initTeacher

