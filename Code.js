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

function AuthorsToString(author[])
{
	var authors = "";

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

	if(pub != null)
		yearPub = "(" + pub + "): ";

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
		if(is == null)
			volume = vol + ". "
		else
			volume = vol + "." + is + " ";
	}

	return volume;
}

function PagesToString(ps, pe)
{
	var pages = "";

	if(ps != null and pe != null)
		pages = ps + "-" + pe + ". ";

	return pages;
}

function MLAJournal(p, at, author[], jt, vol, is, ser, pub, ps, pe, url)
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

