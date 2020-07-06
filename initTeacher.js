var initTeacher = function () {
    var theme = "energyblue";
    var datenarray = {};

	var sourceinstitute = [
						"IAB",
						"IME",
						"FE",
						"FW",
						"RP",
						"PM",
						"PV"
	
	];
						
	var sourcedienstverhaeltnis = [
						"PH1",
						"PH2/3",
						"MVLL",
						"MVBL"
						
	
	];
	
    var source =
    {
            datatype: "json",
            datafields:
            [
                    { name: 'ID_Lehrer', type: 'number' },
                    { name: 'Vorname', type: 'string' },
                    { name: 'Nachname', type: 'string' },
                    { name: 'Kurzzeichen', type: 'string' },
                    { name: 'Mailadresse', type: 'string' },
                    { name: 'Stamminstitut', type: 'string' },           
                    { name: 'Dienstverhaeltnis', type: 'string' },
					{ name: 'Kennwort', type: 'string' }
            ],

            cache: false,
            url: 'rudi-iab-lehrer.php',
            root: 'Rows',
            id: 'ID_Lehrer',
            beforeprocessing: function (data) {
                    //source.totalrecords = data[0].TotalRows;
            },
            addrow: function (rowid, rowdata, position, commit) {
                    // synchronize with the server - send insert command
                    //var data = "insert=true&" + $.param(rowdata);
                    $.ajax({
                            dataType: 'json',
                            url: 'rudi-iab-lehrer.php',
                            data: {
                                    insert: true
                            },
                            cache: false,
                            type: "GET",
                            success: function (data, status, xhr) {
                                    // insert command is executed.
                                    console.log("lehrer addrow succes");
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
                            url: 'rudi-iab-lehrer.php',
                            cache: false,
                            type: "GET",
                            data: data,
                            success: function (data, status, xhr) {
                                    // update command is executed.
                                    console.log("Lehrer updaterow success");
                                    commit(true);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                    commit(false);
                            }
                    });


            },
            deleterow: function (id_lehrer, commit) {
                    // synchronize with the server - send delete command
                    //var data = "delete=true&" + $.param({ ID_Student: rowid });

                    //console.log(id_lehrer);
                    $.ajax({
                            dataType: 'json',
                            url: 'rudi-iab-lehrer.php',
                            type: "GET",
                            cache: false,
                            data: {
                            //Hier sammeln der Übergabevariablen und deren Werte
                                    delete: true,
                                    ID_Lehrer: id_lehrer

                            },
                            success: function (data, status, xhr) {
                                    // delete command is executed.
                                    console.log("lehrer deleterow succes");
                                    commit(true);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                    commit(false);
                            }
                    });

             }

    };//source

    var dataAdapter = new $.jqx.dataAdapter(source);
			
    // initialize jqxGrid
    $("#grid").jqxGrid(
    {
        width: window.innerWidth-20,//getWidth('Grid'),
        source: dataAdapter, 
        theme: theme,
        //pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        enabletooltips: true,
        editable: true,
        editmode: 'click',//'selectedrow',
        selectionmode: 'singlerow', //'multiplecellsadvanced',//
        showtoolbar: true,
        showfilterrow: true,
        filterable: true,
        columnsresize: true,
        rendertoolbar: function(toolbar){
            var me = this;
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<input id="addrowbutton" type="button" value="Add New Row" />');
            //container.append('<input id="updaterowbutton" type="button" value="Update Selected Row" />');
            container.append('<input id="deleterowbutton" type="button" value="Delete Selected Row" />');
            container.append('<input id="printbutton" type="button" value="Print" />');
            container.append('<input id="excelbutton" type="button" value="Excel Export" />');
            container.append('<input id="pdfbutton" type="button" value="PDF Export" />');
            container.append('<input id="importlehrerbutton" type="button" value="Import Lehrer:" />');
            container.append('<input id="importlehrerinput" type="text" />');

            $("#importlehrerinput").jqxInput({theme: theme, placeHolder: "CSV-Dateiname eingeben"});
            $("#importlehrerbutton").jqxButton({theme: theme});
            $("#printbutton").jqxButton({theme: theme});
            $("#excelbutton").jqxButton({theme: theme});
            $("#pdfbutton").jqxButton({theme: theme});
            $("#addrowbutton").jqxButton({theme: theme});
            //$("#updaterowbutton").jqxButton({theme: theme});
            $("#deleterowbutton").jqxButton({theme: theme});
            $("#addrowbutton").bind('click', function () {
                    var emptyrow = {};

                    var commit = $("#grid").jqxGrid('addrow', null, emptyrow, 'first');
                    // console.log(datarow);
               // $("#grid").on("bindingcomplete", function (event) {
                    var commit = $("#grid").jqxGrid('updatebounddata');//funktioniert trotz Fehlermeldung
            });

            $("#deleterowbutton").bind('click', function () {

                    var selectedrowindex = $("#grid").jqxGrid('getselectedrowindex');
                    var rowscount = $("#grid").jqxGrid('getdatainformation').rowscount;
                    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                            var id = $("#grid").jqxGrid('getrowid', selectedrowindex);
                            $("#grid").jqxGrid('deleterow', id);
                    }
            });

            $("#printbutton").on('click', function () {
                    var gridContent = $("#grid").jqxGrid('exportdata', 'html');
                    var newWindow = window.open('', '', 'width=800, height=500'),
                    document = newWindow.document.open(),
                    pageContent =
                            '<!DOCTYPE html>\n' +
                            '<html>\n' +
                            '<head>\n' +
                            '<meta charset="utf-8" />\n' +
                            '<title>Lehrerinnen und Lehrer</title>\n' +
                            '</head>\n' +
                            '<body>\n' + gridContent + '\n</body>\n</html>';
                    document.write(pageContent);
                    document.close();
                    newWindow.print();
            });//print
            $("#excelbutton").on('click', function () {
                    $("#grid").jqxGrid('exportdata', 'xls', 'Lehrer'); 

            });

            $("#pdfbutton").on('click', function () {
                    $("#grid").jqxGrid('exportdata', 'pdf', 'Lehrer');
            });

            $("#importlehrerbutton").on('click', function () {
                    var dateiname = $("#importlehrerinput").val();
                    $.ajax({
                            dataType: 'json',
                            url: 'import-lehrer.php',
                            cache: false,
                            type: "GET",
                            data: {
                                    dateiname: dateiname,
                                    tabelle: 'Lehrer'
                            },
                            success: function (data, status, xhr) {
                                    // update command is executed.
                                    //commit(true); error: commit is not defined
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                    //commit(false);
                            }
                    });

                $("#grid").jqxGrid('updatebounddata');//funktioniert trotz Fehlermeldung
            });


        },//rendertoolbar
        columns: [
          { text: 'ID', datafield: 'ID_Lehrer', width: 50, editable: false },
          { text: 'Vorname', datafield: 'Vorname', width: 200 },
          { text: 'Nachname', datafield: 'Nachname',  width: 200 },
          { text: 'Kurzzeichen', datafield: 'Kurzzeichen', width: 100 },
          { text: 'Mailadresse', datafield: 'Mailadresse', width: 350 },
		  { text: 'Kennwort', datafield: 'Kennwort', width: 350 },
          //{ text: 'Stamminstitut', datafield: 'Stamminstitut', width: 100 },
		  {
			text: 'Stamminstitut', datafield: 'Stamminstitut', width: 100, columntype: 'combobox',
			createeditor: function (row, column, editor){
				// assign a new data source to the combobox.
				//var list = ["eins", "zwei", "drei"];
				editor.jqxComboBox({ autoDropDownHeight: true, source: sourceinstitute, promptText: "Please Choose:" });
			},
			initeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                editor.jqxComboBox({ selectedIndex: 0 });
            },
            // update the editor's value before saving it.
            cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                // return the old value, if the new value is empty.
                    if (newvalue == "") return oldvalue;
            }
		  },
          { 
			text: 'Dienstverhaeltnis', datafield: 'Dienstverhaeltnis', width: 100, columntype: 'combobox',
			createeditor: function (row, column, editor){
				// assign a new data source to the combobox.
				
				editor.jqxComboBox({ autoDropDownHeight: true, source: sourcedienstverhaeltnis, promptText: "Please Choose:" });
			},
			initeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                editor.jqxComboBox({ selectedIndex: 0 });
            },
            // update the editor's value before saving it.
            cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                // return the old value, if the new value is empty.
                    if (newvalue == "") return oldvalue;
            }
			
		  }
        ]

    });//Grid				

};//function initTeacher