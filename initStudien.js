var initStudien = function () {
				var theme = "energyblue";
				var datenarray = {}; 
				
				var source =
				{
					datatype: "json",
					
					datafields:
					[
						{ name: 'ID_Studien', type: 'number' },
						{ name: 'Bezeichnung', type: 'string' }         
						
					],
					
					cache: false,
					url: 'rudi-iab-studien.php',
					root: 'Rows',
					id: 'ID_Studien',
					beforeprocessing: function (data) {
						//source.totalrecords = data[0].TotalRows;
					},
					addrow: function (rowid, rowdata, position, commit) {
						// synchronize with the server - send insert command
						//var data = "insert=true&" + $.param(rowdata);
						$.ajax({
							dataType: 'json',
							url: 'rudi-iab-studien.php',
							data: {
								insert: true
							},
							cache: false,
							type: "GET",
							success: function (data, status, xhr) {
								// insert command is executed.
                                                                console.log("studien addrow succes");
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
						
						$.ajax({
							dataType: 'json',
							url: 'rudi-iab-studien.php',
							cache: false,
							type: "GET",
							data: data,
							success: function (data, status, xhr) {
								// update command is executed.
                                                                console.log("Studien updaterow success");
								commit(true);
							},
							error: function (jqXHR, textStatus, errorThrown) {
								commit(false);
							}
						});
						 
						
					},
					deleterow: function (id_studien, commit) {
						// synchronize with the server - send delete command
						//var data = "delete=true&" + $.param({ ID_Student: rowid });
						
						//console.log(id_lehrer);
						$.ajax({
							dataType: 'json',
							url: 'rudi-iab-studien.php',
							type: "GET",
							cache: false,
							data: {
							//Hier sammeln der Übergabevariablen und deren Werte
								delete: true,
								ID_Studien: id_studien
								
							},
							success: function (data, status, xhr) {
								// delete command is executed.
                                                                console.log("studien deleterow succes");
								commit(true);
							},
							error: function (jqXHR, textStatus, errorThrown) {
								commit(false);
							}
						});
					   
					 },

				};//source
			
				var dataAdapter = new $.jqx.dataAdapter(source);
            /*
				var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
					if (value < 20) {
						return '<span style="margin: 4px; margin-top:8px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
					}
					else {
						return '<span style="margin: 4px; margin-top:8px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
					}
				};//cellrenderer
	*/			
				// initialize jqxGrid
				$("#gridStudien").jqxGrid(
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
                                        editmode: 'selectedrow',
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
						//container.append('<input id="printbutton" type="button" value="Print" />');
						//container.append('<input id="excelbutton" type="button" value="Excel Export" />');
						//container.append('<input id="pdfbutton" type="button" value="PDF Export" />');
						//container.append('<input id="importlehrerbutton" type="button" value="Import Lehrer:" />');
						//container.append('<input id="importlehrerinput" type="text" />');
						
						//$("#importlehrerinput").jqxInput({theme: theme, placeHolder: "CSV-Dateiname eingeben"});
						//$("#importlehrerbutton").jqxButton({theme: theme});
						//$("#printbutton").jqxButton({theme: theme});
						//$("#excelbutton").jqxButton({theme: theme});
						//$("#pdfbutton").jqxButton({theme: theme});
						$("#addrowbutton").jqxButton({theme: theme});
						//$("#updaterowbutton").jqxButton({theme: theme});
						$("#deleterowbutton").jqxButton({theme: theme});
						$("#addrowbutton").bind('click', function () {
							var emptyrow = {};

							var commit = $("#gridStudien").jqxGrid('addrow', null, emptyrow, 'first');
							// console.log(datarow);
						   // $("#grid").on("bindingcomplete", function (event) {
							var commit = $("#gridStudien").jqxGrid('updatebounddata');//funktioniert trotz Fehlermeldung
						});
					
						$("#deleterowbutton").bind('click', function () {
							 
							var selectedrowindex = $("#gridStudien").jqxGrid('getselectedrowindex');
							var rowscount = $("#gridStudien").jqxGrid('getdatainformation').rowscount;
							if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
								var id = $("#gridStudien").jqxGrid('getrowid', selectedrowindex);
								$("#gridStudien").jqxGrid('deleterow', id);
							}
						});
						
						
												
						
					},
					columns: [
					  { text: 'ID', datafield: 'ID_Studien', width: 50, editable: false },
					  { text: 'Bezeichnung', datafield: 'Bezeichnung', width: 500 }
					  
					]
					
				});//GridStudien				
				
				
			
			};//function initStudien

