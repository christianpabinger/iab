var initPlanung = function () {
    var theme = "energyblue";
	
	
	var planungsjahrindex;
	//Einlesen des Planungsjahres und einstellen der dropdownbox
	$.ajax({
        dataType: 'json',
		url: 'einstellungen.php',
		cache: false,
		type: "GET",
		data:{
				getPlanungsjahr: true
			},
		success: function (data, status, xhr) {
				//console.log(data);
				planungsjahrindex = data;
			   
		},
		error: function (jqXHR, textStatus, errorThrown) {
			  
		}
    });
	
        //--------Grid LV---------------------------------------------------------------
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
        id: 'ID_LV'
    };//sourcelv

    var dataAdapterlv = new $.jqx.dataAdapter(sourcelv);
    $("#gridPlanung").jqxGrid(
    {
            width: window.innerWidth-20,//getWidth('Grid'),
            source: dataAdapterlv, 
            theme: theme,
            pageable: true,
            autoheight: true,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            //editable: true,
            editmode: 'click',
            selectionmode: 'singlerow',
            showtoolbar: true,
            showfilterrow: true,
            filterable: true,
            columnsresize: true,
            columns: [
              { text: 'ID', datafield: 'ID_LV', width: 50, editable: false },
              { text: 'st-sem', datafield: 'st_sem', width: 50 },
              { text: 'St-R', datafield: 'St_R',  width: 50 },
              { text: 'Studium', datafield: 'Studium', width: 150},
              { text: 'Kategorie', datafield: 'Kategorie', width: 150 },
              { text: 'LV-KZZ', datafield: 'LV_KZZ', width: 150 },
              { text: 'Modultitel', datafield: 'Modultitel', width: 150 },
              { text: 'Sem', datafield: 'Sem', width: 50 },
              { text: 'LVA-Titel', datafield: 'LVA_Titel', width: 250 },
              { text: 'LA-Art', datafield: 'LA_Art', width: 50  },
              { text: 'TN', datafield: 'TN', width: 50 },
              { text: 'WST', datafield: 'WST', width: 50  },
              { text: 'Anmerkungen', datafield: 'Anmerkungen', width: 250  },
              //{ text: 'WST-Lehrer', datafield: 'WST_Lehrer', width: 50  },
              //{ text: 'Wertigkeit', datafield: 'Wertigkeit', width: 50 },
              //{ text: 'Werteinheiten', datafield: 'Werteinheiten', width: 50},
              { text: 'PHO-Eintrag', columntype: 'checkbox', datafield: 'PHO_Eintrag', width: 60 },
              { text: 'Aenderungen', columntype: 'checkbox', datafield: 'Aenderungen', width: 60 }
            ]
            
    });//GridLV
    
    //-----------Grid Lehrer (id: gridPlanungLVLehrer)--------------------------------------------- 
    var sourceLehrer =
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
                { name: 'Dienstverhaeltnis', type: 'string' }
        ],
        cache: false,
        url: 'rudi-iab-lehrer.php',
        root: 'Rows',
        id: 'ID_Lehrer'
    };//source lehrer  
    var dataAdapterLehrer = new $.jqx.dataAdapter(sourceLehrer);
    $("#gridPlanungLVLehrer").jqxGrid(
    {
        width: window.innerWidth-20,//getWidth('Grid'),
            source: dataAdapterLehrer, 
            theme: theme,
            pageable: true,
            autoheight: true,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            //editable: true,
            editmode: 'selectedrow',
            selectionmode: 'singlerow', //'multiplecellsadvanced',//
            showtoolbar: true,
            showfilterrow: true,
            filterable: true,
            columnsresize: true,
            columns: [
              { text: 'ID', datafield: 'ID_Lehrer', width: 50, editable: false },
              { text: 'Vorname', datafield: 'Vorname', width: 200 },
              { text: 'Nachname', datafield: 'Nachname',  width: 200 },
              { text: 'Kurzzeichen', datafield: 'Kurzzeichen', width: 100 },
              //{ text: 'Mailadresse', datafield: 'Mailadresse', width: 350 },
              { text: 'Stamminstitut', datafield: 'Stamminstitut', width: 100 },
              { text: 'Dienstverhaeltnis', datafield: 'Dienstverhaeltnis', width: 100 }

            ],
            rendered: function(type)
            {
                // select all grid cells.
                var gridCells = $('#gridPlanungLVLehrer').find('.jqx-grid-cell');
                // initialize the jqxDragDrop plug-in. Set its drop target to the second Grid.
                gridCells.jqxDragDrop({
                    appendTo: 'body',  dragZIndex: 99999,
                    dropAction: 'none',
                    initFeedback: function (feedback) {
                            feedback.height(25);
                    },
                    dropTarget: $('#gridAuswahl'), revert: true
                });
                gridCells.off('dragStart');
                gridCells.off('dragEnd');
                gridCells.off('dropTargetEnter');
                gridCells.off('dropTargetLeave');
                // disable revert when the dragged cell is over the second Grid.
                gridCells.on('dropTargetEnter', function () {
                        gridCells.jqxDragDrop({ revert: false });
                });
                // enable revert when the dragged cell is outside the second Grid.
                gridCells.on('dropTargetLeave', function () {
                        gridCells.jqxDragDrop({ revert: true });
                });
                // initialize the dragged object.
                gridCells.on('dragStart', function (event) {
                    var value = $(this).text();
                    var position = $.jqx.position(event.args);
                    var cell = $("#gridPlanungLVLehrer").jqxGrid('getcellatposition', position.left, position.top);
                    $(this).jqxDragDrop('data', {
                            value: value
                    });
                });
                // set the new cell value when the dragged cell is dropped over the second Grid.      
                gridCells.on('dragEnd', function (event) {
                    var value = $(this).text();
                    var position = $.jqx.position(event.args);//x und y position
                    console.log("position");
                    console.log(position);
                    var cell = $("#gridAuswahl").jqxGrid('getcellatposition', position.left, position.top);
                    console.log("cellrow");
                    console.log(cell.row);
                    if (cell !== null) {
                            $("#gridAuswahl").jqxGrid('setcellvalue', cell.row, cell.column, value);
                    }
                    //row focus
                    $("#gridAuswahl").jqxGrid('selectrow', cell.row );
                });
            }//Render function
    });//gridPlanungLVLeher 
 
	
 
//-------------------Zuordnung der Lehrer zu den LVs
   /* var dataFieldsLeherplanung = [
        { name: 'ID_Lehrer', type: 'number' },
        { name: 'Vorname', type: 'string' },
        { name: 'Nachname', type: 'string' },
        { name: 'Kurzzeichen', type: 'string' },
        { name: 'Stamminstitut', type: 'string' },
        { name: 'LV_KZZ', type: 'string' },
        { name: 'Modultitel', type: 'string' }, 
        { name: 'Sem', type: 'number' },
        { name: 'LVA_Titel', type: 'string' },
        { name: 'LA_Art', type: 'string' },
        { name: 'WST', type: 'number' },
        { name: 'Anmerkungen', type: 'string' },
        { name: 'WST_Lehrer', type: 'number' },
        { name: 'Wertigkeit', type: 'number' },
        { name: 'Werteinheiten', type: 'number' }
    ];*/
    var dataFieldsLehrerPlanung = [
        { name: 'ID_Planung', type: 'number' },
		{ name: 'Studienjahr', type: 'string'},
		{ name: 'st_sem', type: 'string'},
		{ name: 'Semester', type: 'string'},
        { name: 'ID_LV', type: 'number' },
        { name: 'LV_KZZ', type: 'string' },
        { name: 'LVA_Titel', type: 'string' },
		{ name: 'WST', type: 'number' },
		{ name: 'Wertigkeit', type: 'number' },
        { name: 'Werteinheiten', type: 'number' },
        { name: 'Vorname', type: 'string' },
        { name: 'Nachname', type: 'string' },
        { name: 'Kurzzeichen', type: 'string' },
        { name: 'Gruppen', type: 'string' },
        { name: 'Anmerkungen', type: 'string' },
        { name: 'Dienstverhaeltnis', type: 'string' }
    ];
                                
//------------Grid Zuordnung der Lehrer zu den LVs--gridAuswahl----------------------------------------------------------  
    //diese url liefert leeres array, damit das Auswahlgrid erscheint aber ohne Daten
    var url = "rudi-iab-planung-lehrer.php";
    var sourceLehrerplanung = {
         datatype: "json",
         id: "ID_Planung",
         url: url,
         datafields: dataFieldsLehrerPlanung
       
    };
    var sourcejahre = ["20/21", "21/22", "22/23", "23/24", "24/25", "25/26", "26/27", "27/28"];
    
    var LehrerplanungAdapter = new $.jqx.dataAdapter(sourceLehrerplanung);
    $("#gridAuswahl").jqxGrid(
    {
        width: window.innerWidth-20,//getWidth('Grid'),
        source: LehrerplanungAdapter,
        theme: theme,
        altrows: true,
        editable: true,
        editmode:'singlecell',
        selectionmode: 'singlerow',
        autoheight: true,
        showtoolbar: true,
        showfilterrow: true,
        filterable: true,
        columnsresize: true,
        columns: [
            { text: 'IDPL', datafield: 'ID_Planung', width: 50, editable: false },
            { text: 'IDLV', datafield: 'ID_LV', width: 50, editable: false },
            { text: 'Studienjahr', datafield: 'Studienjahr', width: 100 },
			{ text: 'st_sem', datafield: 'st_sem', width: 100 },
			{ text: 'aktuell Sem', datafield: 'Semester', width: 100 },
            { text: 'LV-KZZ', datafield: 'LV_KZZ', width: 100, editable: false },
            { text: 'LVA-Titel', datafield: 'LVA_Titel', width: 250, editable: false },
			{ text: 'Vorname', datafield: 'Vorname', width: 250 , editable: false},
            { text: 'Nachname', datafield: 'Nachname', width: 250, editable: false },
            { text: 'LKZZ', datafield: 'Kurzzeichen', width: 100 },
            { text: 'Gruppe', datafield: 'Gruppen', width: 80 },
            { text: 'Anmerkungen', datafield: 'Anmerkungen', width: 100 },
			{ text: 'Stamminstitut', datafield: 'Stamminstitut', width: 100 },
            { text: 'Dienstverhaeltnis', datafield: 'Dienstverhaeltnis', width: 100 },
			{ text: 'WST', datafield: 'WST', width: 80 },
			{ text: 'Wertigkeit', datafield: 'Wertigkeit', width: 80 },
			{ text: 'Werteinheiten', datafield: 'Werteinheiten', width: 80 }
			
        ],
        rendertoolbar: function(toolbar){
            var me = this;

            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);

            
            container.append('<input id="addrowbutton"  type="button" value="Add New Row" />');
            container.append('<input id="deleterowbutton" type="button" value="Delete Selected Row" />');
            container.append('<input id="upaterowbutton"  type="button" value="Update Selected Row" />');
            container.append('<div id="dropdownbox" style="float:left"></div>');
            //$("#dropdownbox").jqxDropDownList({width: 100, source: sourcejahre, theme: theme, selectedIndex: 1});
			$("#dropdownbox").jqxDropDownList({width: 100, source: sourcejahre, theme: theme, selectedIndex: planungsjahrindex});
			console.log(planungsjahrindex);
            $("#addrowbutton").jqxButton({theme: theme});
            $("#deleterowbutton").jqxButton({theme: theme});
            $("#upaterowbutton").jqxButton({theme: theme});
            $("#dropdownbox").bind('select', function(event){

                var args = event.args;
                console.log("args dropdown");
                console.log(args.index);
                var item = $('#dropdownbox').jqxDropDownList('getItem', args.index);

                studienjahr = item.value;
                console.log(studienjahr);

                var rowindex = $("#gridPlanung").jqxGrid('getselectedrowindex');
                console.log("rowindex");
                console.log(rowindex);
                var rowdata = $("#gridPlanung").jqxGrid('getrowdata', rowindex);
                console.log(rowdata);
                var lvID =rowdata.ID_LV; //$("#gridPlanung").jqxGrid('getrowdata', rowindex).ID_LV;
                console.log("getrowdata  mit lvid bei doropdowbx selected");
                
                console.log(lvID);
                
                var url = "rudi-iab-planung.php?select=true&ID_LV="+lvID+"&Studienjahr="+studienjahr;
                var studentsource = {
                    datatype: "json",
                    dataFields:[
                            { name: 'ID_Planung', type: 'number' },
                            { name: 'Studienjahr', type: 'string'},
							{ name: 'st_sem', type: 'string'},
							{ name: 'Semester', type: 'string'},
                            { name: 'ID_LV', type: 'number' },
                            { name: 'LV_KZZ', type: 'string' },
                            { name: 'LVA_Titel', type: 'string' },
							{ name: 'WST', type: 'number' },
							{ name: 'Wertigkeit', type: 'number' },
                            { name: 'Werteinheiten', type: 'number' },
                            { name: 'Vorname', type: 'string' },
                            { name: 'Nachname', type: 'string' },
                            { name: 'Kurzzeichen', type: 'string' },
                            { name: 'Gruppen', type: 'string' },
                            { name: 'Anmerkungen', type: 'string' },
                            { name: 'Dienstverhaeltnis', type: 'string' }
                    ],
                    id: "ID_Planung",
                    url: url
                };
                var adapterjahre = new $.jqx.dataAdapter(studentsource);                                                
                $("#gridAuswahl").jqxGrid({ source: adapterjahre });//
            });//dropdown box select

            $("#addrowbutton").bind('click', function () {
                //es ist die ID_Lehrer zu übertragen sowie insert=true, das Studienjahr wird innerhalb des PHP-Skripts abgefragt
                //$("#gridLehrerplanungAuswahl").jqxGrid('addrow', null, emptyrow, 'first');

                //die ID_LV der selektierten Zeile in der LV-Tabelle suchen
                var rowindex = $('#gridPlanung').jqxGrid('getselectedrowindexes');
                var idlv = $("#gridPlanung").jqxGrid('getrowdata', rowindex).ID_LV;
				var akt_sem = $("#gridPlanung").jqxGrid('getrowdata', rowindex).st_sem;
				console.log($("#gridPlanung").jqxGrid('getrowdata', rowindex));
                console.log("idlv in addrowbutton click");
                console.log(idlv);
                
                var index = $("#dropdownbox").jqxDropDownList('getSelectedIndex');
                //var itemvalue = $('#dropdownbox').jqxDropDownList('getItem', index).value;//Studienjahr
				var itemvalue = global_sourcejahre[index];
                console.log("itemvalue Studienjahr");
                console.log(itemvalue);
                
                var url = "rudi-iab-planung.php?insert=true&ID_LV="+idlv+"&Studienjahr="+itemvalue+"&Semester="+akt_sem;
                var studentsource = {
                    datatype: "json",
                    dataFields: [
                            { name: 'ID_Planung', type: 'number' },
                            { name: 'Studienjahr', type: 'string'},
							{ name: 'st_sem', type: 'string'},
							{ name: 'Semester', type: 'string'},
                            { name: 'ID_LV', type: 'number' },
                            { name: 'LV_KZZ', type: 'string' },
                            { name: 'LVA_Titel', type: 'string' },
							{ name: 'WST', type: 'number' },
							{ name: 'Wertigkeit', type: 'number' },
                            { name: 'Werteinheiten', type: 'number' },
                            { name: 'Vorname', type: 'string' },
                            { name: 'Nachname', type: 'string' },
                            { name: 'Kurzzeichen', type: 'string' },
                            { name: 'Gruppen', type: 'string' },
                            { name: 'Anmerkungen', type: 'string' },
                            { name: 'Stamminstitut', type: 'string' },
							{ name: 'Dienstverhaeltnis', type: 'string' }
                    ],
                    id: "ID_Planung",
                    url: url
                };

                var addadapter = new $.jqx.dataAdapter(studentsource);                                                
                $("#gridAuswahl").jqxGrid({ source: addadapter });
                
           });//paddrowbutton

            $("#deleterowbutton").bind('click', function () {
                    
                    var selectedrowindex = $("#gridAuswahl").jqxGrid('getselectedrowindex');
                    console.log("delete rowindex");
                    console.log(selectedrowindex);
                    console.log( $("#gridAuswahl").jqxGrid('getdatainformation'));
                    var rowscount = $("#gridAuswahl").jqxGrid('getdatainformation').rowscount;
                    if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                            var id = $("#gridAuswahl").jqxGrid('getrowid', selectedrowindex);
                            var rowdata =  $("#gridAuswahl").jqxGrid('getrowdata', id);
                            console.log("id");
                            console.log(id);
                           // console.log("rowdata");
                          // console.log(rowdata);
                            //id Planung übergeben
                        var url = "rudi-iab-planung.php?delete=true&ID_Planung="+id;
                        var deletesource = {
                            datatype: "json",
                             
							dataFields: [
                                { name: 'ID_Planung', type: 'number' },
                                { name: 'Studienjahr', type: 'string'},
								{ name: 'st_sem', type: 'string'},
                                { name: 'ID_LV', type: 'number' },
                                { name: 'LV_KZZ', type: 'string' },
                                { name: 'LVA_Titel', type: 'string' },
								{ name: 'WST', type: 'number' },
								{ name: 'Wertigkeit', type: 'number' },
                                { name: 'Werteinheiten', type: 'number' },
                                { name: 'Vorname', type: 'string' },
                                { name: 'Nachname', type: 'string' },
                                { name: 'Kurzzeichen', type: 'string' },
                                { name: 'Gruppen', type: 'string' },
                                { name: 'Anmerkungen', type: 'string' },
								{ name: 'Stamminstitut', type: 'string' },
                                { name: 'Dienstverhaeltnis', type: 'string' }
                            ],
                            id: "ID_Planung",
                            url: url
                        };

                        var deleteadapter = new $.jqx.dataAdapter(deletesource);                                                
                        $("#gridAuswahl").jqxGrid({ source: deleteadapter });
                    }//if
                
            });//deleterowbutton click
            $("#upaterowbutton").bind('click', function () {
                     
                var selectedrowindex = $("#gridAuswahl").jqxGrid('getselectedrowindex');
                    console.log("updaterow rowindex");
                    console.log(selectedrowindex);
                   // console.log( $("#gridLehrerplanungAuswahl").jqxGrid('getdatainformation'));

                var rowdata = $('#gridAuswahl').jqxGrid('getrowdata', selectedrowindex);
                    console.log("rowdata");
                    console.log(rowdata);
                    
                var rowscount = $("#gridAuswahl").jqxGrid('getdatainformation').rowscount;


                if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
                        var id = $("#gridAuswahl").jqxGrid('getrowid', selectedrowindex);
                       // console.log("id in button");
                        //console.log(id);

                        //Studienjahr       
                        //var index = $("#ldropdownbox").jqxDropDownList('getSelectedIndex');
                        //var item = $('#ldropdownbox').jqxDropDownList('getItem', index);	
                        // das Studienjahr steht in item.value        

                        //Studienjahr steckt in rowdata
                        //var data = "update=true&"+ $.param(rowdata);//+"&Studienjahr="+item.value;
                        var url = "rudi-iab-planung.php?update=true&"+ $.param(rowdata);
                       console.log("update Daten");
                       console.log($.param(rowdata));
						
						
                        var studentsource = {
                                datatype: "json",

                                dataFields: [
									{ name: 'ID_Planung', type: 'number' },
									{ name: 'Studienjahr', type: 'string'},
									{ name: 'st_sem', type: 'string'},
									{ name: 'Semester', type: 'string'},
									{ name: 'ID_LV', type: 'number' },
									{ name: 'LV_KZZ', type: 'string' },
									{ name: 'LVA_Titel', type: 'string' },
									{ name: 'WST', type: 'number' },
									{ name: 'Wertigkeit', type: 'number' },
									{ name: 'Werteinheiten', type: 'number' },
									{ name: 'Vorname', type: 'string' },
									{ name: 'Nachname', type: 'string' },
									{ name: 'Kurzzeichen', type: 'string' },
									{ name: 'Gruppen', type: 'string' },
									{ name: 'Anmerkungen', type: 'string' },
									{ name: 'Stamminstitut', type: 'string' },
									{ name: 'Dienstverhaeltnis', type: 'string' }
								],
                                id: "ID_Planung",
                                url: url
                            };
                        
                        var updateadapter = new $.jqx.dataAdapter(studentsource);                                                
                        $("#gridAuswahl").jqxGrid({ source: updateadapter });
                        
						//Den Lehrer auch gleich der Tabelle Freigaben anlegen für das Studienjahr
						$.ajax({
							dataType: 'json',
							url: 'freigabe-on-off.php',
							data: {
								addwithkzz: true,
								Kurzzeichen: rowdata.Kurzzeichen,
								Studienjahr: rowdata.Studienjahr,
								Freigabe : 0
							},
							cache: false,
							type: "GET",
							success: function (data, status, xhr) {
								
							},
							error: function (jqXHR, textStatus, errorThrown) {
								//commit(false);
							}
						});



						
                }//if

                 
            });//updatebutton


        }//render toolbar                            

    });//#gridLehrerplanungAuswahl    
    
    
    
    $("#gridPlanung").on('rowselect', function(event){
        
        var lvID = event.args.row.ID_LV;
        console.log("lvID");
        console.log(lvID);
        
        var index = $("#dropdownbox").jqxDropDownList('getSelectedIndex');
        //var itemvalue = $('#dropdownbox').jqxDropDownList('getItem', index).value;//Studienjahr
		var itemvalue = global_sourcejahre[index];
        console.log("itemvalue");
        console.log(itemvalue);
      
        var url = "rudi-iab-planung.php?select=true&ID_LV="+lvID+"&Studienjahr="+itemvalue;
        var studentsource = {
               datatype: "json",
               /*
               dataFields: [
                   { name: 'ID_Planung', type: 'number' },
                   { name: 'ID_Lehrer', type: 'number' },
                   { name: 'Studienjahr', type: 'string' },
                   { name: 'Vorname', type: 'string' },
                   { name: 'Nachname', type: 'string' },
                   { name: 'Kurzzeichen', type: 'string' },
                   { name: 'Stamminstitut', type: 'string' },
                   { name: 'LV_KZZ', type: 'string' },
                   { name: 'Modultitel', type: 'string' }, 
                   { name: 'Sem', type: 'number' },
                   { name: 'LVA_Titel', type: 'string' },
                   { name: 'LA_Art', type: 'string' },
                   { name: 'WST', type: 'number' },
                   { name: 'Anmerkungen', type: 'string' },
                   { name: 'WST_Lehrer', type: 'number' },
                   { name: 'Wertigkeit', type: 'number' },
                   { name: 'Werteinheiten', type: 'number' }
               ],*/
                 dataFields: [
                    { name: 'ID_Planung', type: 'number' },
                    { name: 'Studienjahr', type: 'string'},
					{ name: 'st_sem', type: 'string'},
					{ name: 'Semester', type: 'string'},
                    { name: 'ID_LV', type: 'number' },
                    { name: 'LV_KZZ', type: 'string' },
                    { name: 'LVA_Titel', type: 'string' },
					{ name: 'WST', type: 'number' },
					{ name: 'Wertigkeit', type: 'number' },
                    { name: 'Werteinheiten', type: 'number' },
                    { name: 'Vorname', type: 'string' },
                    { name: 'Nachname', type: 'string' },
                    { name: 'Kurzzeichen', type: 'string' },
                    { name: 'Gruppen', type: 'string' },
                    { name: 'Anmerkungen', type: 'string' },
					{ name: 'Stamminstitut', type: 'string' },
                    { name: 'Dienstverhaeltnis', type: 'string' }
                ],
               id: "ID_Planung",
               url: url
        };
        var adapterjahre = new $.jqx.dataAdapter(studentsource);                                                
        $("#gridAuswahl").jqxGrid({ source: adapterjahre });//

       
       
    });//(gridLehrerplanungLehrer).on('rowselect')
    
    
    
    

};//initPlanungTeacher




