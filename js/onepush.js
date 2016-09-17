var arrWebsites = [];

$(document).ready(function () {
    var search = $("#search").val();
    var url = "https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites"; 
    getData(url);   
    
    $("#search").autocomplete({
        minLength: 0,
        source: arrWebsites,
        focus: function (event, ui) {
            $("#search").val(ui.item.label);
            return false;
        },
        select: function (event, ui) {            
            var searchKey = ui.item.value;            
            //url = "https://api.github.com/search/repositories?q=stars:>="+ starMin + "+stars:<" + starMax + "+language:" + searchKey + "&sort=stars&order=desc";
            //alert(key);
            //getData(url);
            return false;
        }
    });
    
   	$("#submit").click(function(){
   		
   		if(getCookie("onePushSubmitLimit") != "submitted"){		
				        	
		   		var valid = validation();
		   		var pushUrl = "https://hackerearth.0x10.info/api/one-push?type=json&query=push&title=" + $("#title").val() + "&url=" + $("#url").val() + "&tag=" + $("#tag").val() + "";
		   		if(Boolean(valid)){
		   			$.ajax({
		   				url: pushUrl,
		   				type:"POST",
		   				beforeSend: function (xhr) {
				            if (xhr && xhr.overrideMimeType) {
				                xhr.overrideMimeType('application/json;charset=utf-8');
				            }
				        },
				        dataType: 'json',
				        success : function(data){
				        	setCookie("onePushSubmitLimit", "submitted");
				        	alert(data.message);
				        },
				        eror : function(){
				        	alert("Error");
				        }
		   			})
		   		}		
   		}   		
   	}) 
   	
    
    
});

function validation(){
	
	if($("#title").val() == ""){
		return false;
	}
	if($("#url").val() == ""){
		return false;
	}
		
	if($("#tag").val() == ""){
		return false;
	}
	
	return true;

}

function getData(url) {

    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (data) {
            arrWebsites = data.websites;
            $(".result-count").html("");
            $(".result-count").append("<p class='result-msg'>We\'ve found <strong id='count'>" + data.websites.length + "</strong> results</p>")
            $(".result-count").css("display", "block");

            $("#results").html("");

            $.each(data.websites, function (index, value) {

                var htmlurl = value.url_address;    
                var fullName = value.title;       
                

				var temp_html = "<div class ='result' style = 'width: 40%; height:130px; float: left;border: 2px solid grey;margin: 2%;border-radius: 10px;'>" +
								"<div id='icon' style='width: 10%; margin:3%;float: left;'><img width=75 style='border-radius: 35px;' src='" + value.favicon_image + "'/> </div>" +
								"<div class='content' style='width: 82%; margin-left:2%;float: left;'>" +
								"<div class='title' style='width: 95%; margin-left:1%; float: left;'><h3>" + fullName + "</h3></div>" +
								"<div class='tag' style='width: 95%; margin-left:1%; float: left;'>" +					
								"<img style='float: left;margin-right: 2%;margin-top: 2%;' width='20' src='../SiteAssets/Image/tag.png' /><p style='width: 25%; font-family: cursive; margin-top:1%; margin-left:1%; float: left;'>" + value.tag + "</p>" +				
								"<img class='link' style='float: left;margin-top: 2%;' width='20' src='../SiteAssets/Image/link-symbol.png'/><a style='width: 60%; overflow-wrap: break-word; font-family: cursive; margin-top:1%; margin-left:1%; float: left;' id='title-link' target='_blank' href='" + htmlurl +"'>" + htmlurl + "</a>" +
								"</div></div></div><div id='pagination'></div>";         

               
	             $("#results").append(temp_html);

            });

            if (data.websites.length == 0)
            {
                $("#results").append("<div class='result'>No result found!! </div>");
            }
        }
    });
}


function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + 60*60*1000);
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}













