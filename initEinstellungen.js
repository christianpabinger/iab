var initEinstellungen = function () {
	var theme = "energyblue";
	
		$("#fileupload").jqxButton({theme: theme});
		$("#fileupload").on('click', function(){
			$('#fileupload').jqxFileUpload({browseTemplate: 'success', uploadTemplate: 'primary',  cancelTemplate: 'danger', width: 300, uploadUrl: 'upload.php', fileInputName: 'fileToUpload' });
		});
		
		$.ajax({
			dataType: 'json',
			url: 'einstellungen.php',
			cache: false,
			type: "GET",
			data: {getPlanungsjahr: true},
			success: function (data, status, xhr) {
					//console.log(data);
					$("#Planungsjahrdropdownbox").jqxDropDownList({width: 100, source: global_sourcejahre, theme: theme, selectedIndex: data});
					global_planungsjahrindex = data;
					global_planungsstudienjahr = global_sourcejahre[data];
			},
			error: function (jqXHR, textStatus, errorThrown) {
				  
			}
		});
		
		
		$.ajax({
			dataType: 'json',
			url: 'maileinstellungen.php',
			cache: false,
			type: "GET",
			data: {get: true},
			success: function (data, status, xhr) {
					//console.log(data);
					//$("#Planungsjahrdropdownbox").jqxDropDownList({width: 100, source: global_sourcejahre, theme: theme, selectedIndex: data});
					//global_planungsjahrindex = data;
					//global_planungsstudienjahr = global_sourcejahre[data];
					console.log(data);
					$("#Account").val(data[0]["Account"]);
					$("#Absender").val(data[0]["Absender"]);
					$("#Betreff").val(data[0]["Betreff"]);
					$("#Mailtext").val(data[0]["Mailtext"]);
					
			},
			error: function (jqXHR, textStatus, errorThrown) {
				  
			}
		});
		
		$("#Planungsjahrdropdownbox").bind('select', function(event){

			var args = event.args;
			console.log("args dropdown");
			console.log(args.index);//index der Liste
			global_planungsjahrindex = args.index;
			var item = $('#Planungsjahrdropdownbox').jqxDropDownList('getItem', args.index);
			planungsjahr = item.value;
			global_planungsstudienjar = item.value;
			console.log(planungsjahr);
			
			
			$.ajax({
				dataType: 'json',
				url: 'einstellungen.php',
				cache: false,
				type: "GET",
				data: 	{
						setPlanungsjahr: args.index
						},
				success: function (data, status, xhr) {
					  
				},
				error: function (jqXHR, textStatus, errorThrown) {
					  
				}
			});
			
			
		});
				
		$("#mailspeichern").jqxButton({theme: theme});			
		$("#Absender").jqxInput({theme: theme});	
		$("#Passwort").jqxInput({theme: theme});	
		$("#Account").jqxInput({theme: theme});   
		$("#Betreff").jqxInput({theme: theme});  
		$("#Mailtext").jqxTextArea({theme: theme, placeHolder: 'Mailtext eingeben', height: 200, width: 300, minLength: 1});
        
		$("#mailspeichern").on('click', function ()
		{
			
			$("#Ueberschrift").html("Mail-Einstellungen: gespeichert")
			//console.log($("#Passwort").val());
			$.ajax({
				dataType: 'json',
				url: 'maileinstellungen.php',
				cache: false,
				type: "GET",
				data: 	{
						save: true,
						Account: $("#Account").val(),
						Passwort: $("#Passwort").val(),
						Absender: $("#Absender").val(),
						Betreff: $("#Betreff").val(),
						Mailtext: $("#Mailtext").val()
						},
				success: function (data, status, xhr) {
					
				},
				error: function (jqXHR, textStatus, errorThrown) {
					  
				}
			});
		});//Einstellungen speichern on ckick


		$('#Absender').on('change',function () { 
			$("#Ueberschrift").html("Mail-Einstellungen:");
		});		
		$('#Account').on('change',function () { 
			$("#Ueberschrift").html("Mail-Einstellungen:");
		}); 
		$('#Passwort').on('change',function () { 
			$("#Ueberschrift").html("Mail-Einstellungen:");
		});
		$('#Betreff').on('change',function () { 
			$("#Ueberschrift").html("Mail-Einstellungen:");
		});
		$('#Mailtext').on('change',function () { 
			$("#Ueberschrift").html("Mail-Einstellungen:");
		});
		
};//initEinstellungen