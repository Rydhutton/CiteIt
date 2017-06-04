function MLAJournal()
{
    var print = document.getElementById("print");
    var articleTitle = document.getElementById("articleTitle");
    var authors = document.getElementById("authors");
    var journalTitle = document.getElementById("journalTitle");
    var volume = document.getElementById("volume");
    var issue = document.getElementById("issue");
    var series = document.getElementById("series");
    var yearPub = document.getElementById("yearPub");
    var pagestart = document.getElementById("pagestart");
    var pageend = document.getElementById("pageend");
    var url = document.getElementById("url");

    var pr = print.value || "";
    var at = articleTitle.value || "";
    var au = authors.value || "";
    var jt = journalTitle.value || "";
    var vol = volume.value || "";
    var iss = issue.value || "";
    var ser = series.value || "";
    var yp = yearPub.value || "";
    var ps = pagestart.value || "";
    var pe = pageend.value || "";
    var ul = url.value || "";
    
    var citation = MLAJournalToString(pr, at, au, jt, vol, iss, ser, yp, ps, pe, ul);
    alert(citation);
}

function MLAWebsite()
{
    
}



//var citation = submit.addEventListener("click", MLAJournal(pr, at, au, jt, ser, vol, yp, ps, pe, ul));
//alert(citation);

// What should the add-on do after it is installed
function onInstall() 
{
 	 onOpen();
}

// What should the add-on do when a document is opened
function onOpen() 
{
 	 DocumentApp.getUi()
  		.createMenu()
  		.addItem("Start", "showSidebar")
  		.addToUi();  // Run the showSidebar function when someone clicks the menu
}

function showSidebar() 
{
  	var ui = HtmlService.createHtmlOutputFromFile('Sidebar') //get template from Sidebar.html
    	.setTitle("CiteIt - Citation Machine") // The title shows in the sidebar
    	.setWidth(300);
  	DocumentApp.getUi()
  		.showSidebar(ui);
}






/* citation formatting functions below this point */

function AuthorsToString(author)
{
	var authors = "";
    /*
	for(i = 0; i < author.length; i++)
	{
		authors += author[i][3] + ", " + author[i][1] + " " + author[i][2];

		if(i + 1 == author.length) //if we are at the last author add .
			authors += ". ";
		else //else we need a comma.
			authors += ", ";

		if(i + 2 == author.length) // if we are about to hit the last item in the list add word and
			authors += "and ";
	}
    */
    
    authors = author + ", ";
    
	return authors;
}

function PrintToString(p)
{
	var print;

	if (p == true) 
		print == "Print.";
	else
		p = "Online.";

	return print;
}

function YearPublishedToString(yp)
{
	var yearPub = "";

	if(yp != null)
		yearPub = "(" + yp + "): ";

	return yearPub;
}

function ArticleTitleToString(at)
{
	var title = "";

	if(at != null)
		title = "\"" + at + ".\" ";

	return title;
}

function JournalTitleToString(jt)
{
	var title = "";

	if(jt != null)
		title = jt.italics() + ". ";

	return title;
}

function SeriesToString(ser)
{
	var series = "";

	if(ser != null)
		series = ser + " ";

	return series;
}

function VolumeToString(vol)
{
	var volume = "";

	if(vol != null)
		volume = vol + ". ";

	return volume;
}

function VolumeToString(vol, iss)
{
	var volume = "";

	if(vol != null)
	{
		if(iss == null)
			volume = vol + ". "
		else
			volume = vol + "." + iss + " ";
	}

	return volume;
}

function PagesToString(ps, pe)
{
	var pages = "";

	if(ps != null && pe != null)
		pages = ps + "-" + pe + ". ";

	return pages;
}

function MLAJournalToString(p, at, author, jt, vol, is, ser, yp, ps, pe, url)
{   
	var print = PrintToString(p);
	var articleTitle = ArticleTitleToString(at);
	var authors = AuthorsToString(author);
	var journalTitle = JournalTitleToString(jt);
	var series = SeriesToString(ser);
	var volume = VolumeToString(vol, is);
	var yearPub = YearPublishedToString(yp);
	var pages = PagesToString(ps, pe);

	var citation = authors + articleTitle + journalTitle + series + volume + yearPub + pages;
	return citation;
}





/* JQuery stuff */

$(document).ready(function(){
    //var currentStep = 0;
    
    $("#MLAJournalpanel").hide();
    $("#MLAWebsitepanel").hide();
    
    $("#btnMLAJournal").click(function(){
        $("#MLAWebsitepanel").hide();
        $("#MLAJournalpanel").show();
        
        //currentStep = 1;
    });
    
    $("#btnMLAWebsite").click(function(){
        $("#MLAJournalpanel").hide();
        $("#MLAWebsitepanel").show();
        
        //currentStep = 2;
    });
   
});
