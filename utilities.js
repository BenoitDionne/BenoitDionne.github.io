/**************************************************************************
 *  javascript codes for the personal website of Benoit Dionne,
 *  February 2025
 **************************************************************************/
/* Location of the website */
var location_bd = "https://BenoitDionne.github.io/";

/* Location of the departmental website */
var location_dept_en = "https://www.uottawa.ca/faculty-science/mathematics-statistics";
var location_dept_fr = "https://www.uottawa.ca/faculte-sciences/mathematiques-statistique";

var loc_full = window.location.toString();
var index_loc_full = loc_full.search('\\?');
var loc = "";
if ( index_loc_full >=0 )
    loc = loc_full.substring(0, index_loc_full);
else
    loc = loc_full;
if ( loc.search("/home/bdionne/") != -1 ) {
    location_bd = "file:///home/bdionne/public_html/";
}

/* Location of almost all the images. */
var images_dir = location_bd+"images/";

/* Logo of the university */
var UOlogo = images_dir+"uottawa_hor_white.png";

/* For the list of web sites */
var websites = new Array();
var websites_nbr = 0;

/**********************************************************************
 * Some useful non-DOM functions
 **********************************************************************/
/* Function to select a random integer number N such that 0 <= N < nbr */
function getRandom(nbr) {
    return Math.floor(Math.random()*nbr);
}

/* To remove blank spaces before and after a word */
function trim(str) {
    var nstr = new String(str);
    var blank = new String(" ");
    var pos1 = 0, pos2 = nstr.length;
    while ( pos1 < pos2 ) {
	if ( blank.charAt(0) == nstr.charAt(pos1) ) {
	    ++pos1;
	    continue;
	}
	else
	    break;
    }
    while ( pos1 < pos2 ) {
	if ( blank.charAt(0) == nstr.charAt(pos2) ) {
	    --pos2;
	    continue;
	}
	else
	    break;
    }
    return str.substring(pos1, pos2);
}

/**********************************************************************
 * Functions to modify the style of items and/or respond to actions
 * in the window.
 **********************************************************************/
/* Get the style property of an element with the given ID */
function getStyleObject(id) {
    var elm = null;
    if (document.getElementById) {
	elm = document.getElementById(id);
	if (elm)
	    if (elm.style)
		return elm.style;
    }
    return null;
}

/* Set the style attribute of an element with the given ID .
   Doesn't seem to work. */
function getElementAttribute(id, attributE) {
    var elm = null;
    if (document.getElementById) {
	elm = document.getElementById(id);
	if (elm) {
	    if (elm.getAttribute) {
		return elm.getAttribute(attributE);
	    }
	}
    }
    return null;
}

/* Set the style attribute of an element with the given ID .
   Doesn't seem to work. */
function setElementAttribute(id, attributE, valuE) {
    var elm = null;
    if (document.getElementById) {
	elm = document.getElementById(id);
	if (elm) {
	    elm.setAttribute(attributE, valuE);
	}
    }
    return;
}

/* Remove the style attribute of an element with the given ID .
   Doesn't seem to work. */
function removeElementAttribute(id, attributE) {
    var elm = null;
    if (document.getElementById) {
	elm = document.getElementById(id);
	if (elm) {
	    elm.removeAttribute(attributE);
	}
    }
    return;
}

function setNewColor(id, new_color) {
    var styleObject = getStyleObject(id);

    if (styleObject)
	styleObject.color = new_color;
}

function getColor(id) {
    var styleObject = getStyleObject(id);

    if (styleObject)
	return styleObject.color;
    else
	return null;
}

function setValueElement(id, val) {
    var elm = null;

    if (document.getElementById)
	elm = document.getElementById(id);
    if (elm)
	elm.value = val;
}

function getValueElement(id) {
    var elm = null;

    if (document.getElementById)
	elm = document.getElementById(id);
    if (elm)
	return elm.value;
    else
	return "null";
}

function hideElement(id) {
    var styleObject = getStyleObject(id);

    if (styleObject)
	styleObject.visibility = 'hidden';
}

function showElement(id) {
    var styleObject = getStyleObject(id);

    if (styleObject)
	styleObject.visibility = 'visible';
}

function clickMenuIcon(given_url) {
    window.parent.location.href=given_url;
}

/* Function used in the header to switch from French to
   English and vice-versa.  Note that it is not robust because, for instance,
   it is easy to create url with many =Francais that does not give
   the english equivalent page if we replace =Francais by =English, */
function switch_language(lang) {
    var new_url = "";
    var old_url = new String(window.top.location);

    if ( lang.length > 0 ) {
	/* This variable can overwrite any other language instruction. */
	if ( ch_lang_url != null && ch_lang_url != "" )
	    new_url = ch_lang_url;
	else {
	    var tmp = "";
	    if ( lang == "en" ) {
		tmp = old_url.replace("bienvenue.html","welcome.html");
		if ( tmp != old_url )
		    new_url = tmp;
		else {
		    tmp = old_url.replace("_fr.html","_en.html");
		    if ( tmp != old_url )
			new_url = tmp;
		    else {
			tmp = old_url.replace("=Francais","=English");
			if ( tmp != old_url )
			    new_url = tmp;
		    }
		}
	    }
	    else {
		tmp = old_url.replace("welcome.html","bienvenue.html");
		if ( tmp != old_url )
		    new_url = tmp;
		else {
		    tmp = old_url.replace("_en.html","_fr.html");
		    if ( tmp != old_url )
			new_url = tmp;
		    else {
			tmp = old_url.replace("=English","=Francais");
			if ( tmp != old_url )
			    new_url = tmp;
		    }
		}
	    }
	}
	if ( new_url.length == 0 )
	    new_url = old_url;
    }
    else {
	new_url = old_url;
    }

    var reader = new XMLHttpRequest();

    reader.open('get', new_url, true);

    reader.onreadystatechange = checkReadyState;
    function checkReadyState() {
	if (reader.readyState === XMLHttpRequest.DONE) {
	    const status = reader.status;
	    if (status === 0 || (status >= 200 && status < 400)) {
		document.location.href = new_url;
	    }
	    else {
		window.alert("Website does not exist.");
		return;
	    }
	}
    }
    reader.send(null);

    /* To force the change of website right away, it suffices to uncomment
       the self.location.href = ... line. */
    /*
    return new_url;
    self.location.href = new_url;
    */
}

/**********************************************************************
 * This was initially for the old version of talks (the C version).
 * This functions was used by the three buttons below the departemental
 * title to change language, return to home page of Talks, and start
 * a personal query.
 * This function is still used but only in special rare cases.
 **********************************************************************/
function clickTopButton(url) {
    self.location.href=url;
}

/**********************************************************************
 * Structures for the images
 **********************************************************************/

/* Function to create the images */
function myImage(Src, Link_fr, Link_en, Descr_fr, Descr_en, Target, Id,
		 Width, Height, Src_icon) {
    this.src = Src;              /* location of the image */
    this.link_fr = Link_fr;      /* go to this site if the image is clicked. */
    this.link_en = Link_en;      /* go to this site if the image is clicked. */
    this.descr_fr = Descr_fr;    /* French description of the image */
    this.descr_en = Descr_en;    /* English description of the image */
    this.target = Target;        /* the browser frame to display the website
                                    associated to the link */
    this.id = Id;                /* the unique id of this image */
    if ( Width != null )
	this.width = Width;      /* width of the image if known */
    else
	this.width = null;
    if ( Height != null )
	this.height = Height;    /* height of the image if known */
    else
	this.height = null;
    this.src_icon = Src_icon;    /* location of the icon for this image
				    if there is one. */
}

/* Function to display an image with a caption.
   ClasS is the class of the table.
   The tag <td> is used for the image and the tag  <th>  is used for
   the caption. */
function image_caption(image_src, caption, clasS) {
    document.write
	("<center> <table class=\"clasS\">"
	 +"<tr><td><img src=\""+image_src+"\"> </td> </tr>"
	 +"<tr> <th>" + caption + "</th> </tr> </table></center>");
}

/**********************************************************************
 * Functions used to create elements of a web page.
 * e.g. To create the links, ...,
 **********************************************************************/
/* Function to create the links in the text. */
function buildLinK( Url, Text, Class, ID, Target, Name) {
    if ( Target == null )
	Target = "_self";
    if ( Name == null )
	Name = "";

    document.write("<a class=\""+Class+"\" target=\""+Target
		   +"\" href=\""+Url+"\" id=\""+ID+"\" name=\""+Name+"\">"
		   +Text+"</a>");
}

/**********************************************************************
 * Setup a clock in French (fr) or English (en) that can be attached to
 * a form
 *  like
 *  <form name="clock_form">
 *  <input type="text" name="clock">
 *  </form>
 **********************************************************************/
function clockTick(formName, inputName, lang) {
    var Months, Days;
    if ( lang == "fr" ) {
	Months = new Array("janvier", "f\u00E9vrier", "mars", "avril",
			   "may", "juin", "juillet", "ao\u00FBt", "septembre",
			   "octobre", "novembre", "d\u00E9cembre");
	Days = new Array("dimanche", "lundi", "mardi", "mercredi",
			 "jeudi", "vendredi", "samedi");
    }
    else {
	Months = new Array("January", "February", "March", "April",
			   "May", "June", "July", "August", "September",
			   "October", "November", "December");
	Days = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
			 "Thursday", "Friday", "Saturday");
    }

    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var day_of_week = time.getDay();
    var day_of_month = time.getDate();
    var month = time.getMonth();
    var year = time.getFullYear();

    var temps = "" + Days[day_of_week] + ", " + day_of_month + " "
	+ Months[month] + " " + year.toString();
    temps += ", " + ((hour>12)? hour-12 : ((hour == 0 )? "12" : hour));
    temps += ((minute < 10) ? ":0" : ":") + minute;
    temps += ((second < 10) ? ":0" : ":") + second;
    temps += (hour >= 12) ? " p.m." : " a.m.";
    eval("window.document."+formName+"."+inputName+".value = \""+temps+"\";");
    window.setTimeout("clockTick(\""+formName+"\",\""
		      +inputName+"\",\""+lang+"\")", 1000);
}

/**********************************************************************
 * My address
 *   Not used:  +tt3+" 613-562-5800 "+tt5+" 3516<br>"
 *              +"150 Louis Pasteur, "+tt6+" 517<br>"
 **********************************************************************/
function MyAddress(lang) {
    var tt1 = "D&eacute;partement de math&eacute;matiques et de statistique";
    var tt2 = "Universit&eacute; d'Ottawa";
    var tt3 = "T&eacute;l:";
    var tt4 = "Courriel:";
    var tt5 = "poste";
    var tt6 = "pi&egrave;ce";
    if ( lang == "en" || lang == "English" ) {
	tt1 = "Department of Mathematics and Statistics";
	tt2 = "University of Ottawa";
	tt3 = "Tel:";
	tt4 = "Email:";
	tt5 = "ext.";
	tt6 = "room";
    }
    document.write("<address class=\"MMathSStat\"> Benoit Dionne <br>"
		   +tt1+"<br>"+tt2+"<br>"
		   +"Ottawa, Ontario, K1N 6N5 <br>"
		   +tt4+" <a href=\"mailto:bdionne@uottawa.ca\">"
		   +"bdionne@uottawa.ca </a> </address>");
}

/**************************************************************************
 * Functions to display the date at which the web page was last modified.
 **************************************************************************/
function date_de_mise_a_jour(lang) {
    var date = new Date(document.lastModified);      
    var months;
    var ajour;
    if ( lang == "en" || lang == "English" ) {
	months = ["January","February","March","April","May","June","July",
		  "August","September","October","November","December"];
	ajour = months[date.getMonth()]+' '+date.getDate()
	    +', '+date.getFullYear();
    }
    else if ( lang == "sp" || lang == "Spanish" ) {
	months = ["enero","febrero","marzo","abril","mayo","junio","julio",
		  "agosto","septiembre","octubre","noviembre","diciembre"];
	ajour = date.getDate()+' ' +months[date.getMonth()]+' '
	    +date.getFullYear();
    }
    else if ( lang == "it" || lang == "Italian" ) {
	months = ["gennaio","febbraio","marzo","aprile","maggio","giugno",
		  "luglio","agosto","settembre","ottobre","novembre",
		  "dicembre"];
	ajour = months[date.getMonth()]+' '+date.getDate()
	    +', '+date.getFullYear();
    }
    else if ( lang == "po" || lang == "Portuguese" ) {
	months = ["janeiro","fevereiro","mar&ccedil;o","abril","maio","junho",
		  "julho", "agosto","setembro","outubro","novembro",
		  "dezembro"];
	ajour = months[date.getMonth()]+' '+date.getDate()
	    +', '+date.getFullYear();
    }
    else {
	months = ["janvier","f&eacute;vrier","mars","avril","mai","juin",
		  "juillet", "ao&ucirc;t","septembre","octobre","novembre",
		  "d&eacute;cembre"];
	ajour = date.getDate()
	    +' ' +months[date.getMonth()]+' '+date.getFullYear();
    }
    return ajour;
}

function mise_a_jour(lang) {
    if ( lang == "en" || lang == "English" ) {
	ajour = "Last update: "+ date_de_mise_a_jour("en");
    }
    else if ( lang == "sp" || lang == "Spanish" ) {
	ajour = "...: "+ date_de_mise_a_jour("sp");
    }
    else if ( lang == "it" || lang == "Italian" ) {
	ajour = "...: "+ date_de_mise_a_jour("it");
    }
    else if ( lang == "po" || lang == "Portuguese" ) {
	ajour = "...: "+ date_de_mise_a_jour("po");
    }
    else {
	ajour = "Derni&egrave;re mise &agrave; jour: "
	    + date_de_mise_a_jour("fr");
    }
    document.write("<br><hr class=\"MMathSStat\"> <center>"+ajour
		   +"</center>");
}

function main_title(text, textClass) {
    document.write("<h1 class=\""+textClass+"\">"+text+"</h1>");
}

/**************************************************************************
 * A menu item
 **************************************************************************/
function item(Text_fr, Text_en, Url_fr, Url_en, Parent, Menu, Submenu,
	      Id, Target, Name) {
    this.text_fr = Text_fr;   /* French label of the item */
    this.text_en = Text_en;   /* English label of the item */
    this.url_fr = Url_fr;     /* url for the link associated to the French
				 version of this item */
    this.url_en = Url_en;     /* url for the link associated to the French
				 version of this item */

    this.parent = Parent;     /* The item from which  this.menu  comes from
				 Set it to  null  if this item is part of
				 the root menu (no parents) */
    this.menu = Menu;         /* the menu to which this item belongs.
				 This is an array of item's */
    this.submenu = Submenu;   /* The submenu that can be reached by
				 selecting this item.  Set it to null
				 if there is no submenu.
				 This is an array of item's */
    this.id = Id;    /* This is the id of the <li> ... </li> tags
			containing the item. */

    /* Target to display the url associated to this item.  The possible
       values are  _top, _blank, _self (default), _parent, ... */
    this.target = "_self";
    if ( Target != null && Target.length > 0 )
	this.target = Target;

    /* The name of the javascript variable for this item.  This is used
       for the onMouseOver() and onMOuseOut() function. */
    this.name = Name;

    /* This is the id of the <div> ... </div> tags containing the menu
       to which the item belongs.  The name of the first item of the menu
       is used to define the id.*/
    this.menuId;

    /* This is the timer used to determine when a menu should be hidden. */
    /*
      this.displayTimer;
      this.hideElement = hideElement;
    */
}

/* Initialize the parent, menu and submenu in the class item */
function initItem(Item, Parent, Menu, Submenu) {
    Item.parent = Parent;
    Item.menu = Menu;
    Item.submenu = Submenu;

    if ( Menu.length > 0 )
	Item.menuId = Menu[0].menuId;
    else
	Item.menuId = Item.name+getRandom(100);

    return Item;
}

/**********************************************************************
 *  Function to display the tree structure of the web site
 *  rooT is the initial array of items for the tree structure.
 *  lang is either "fr" or "en".
 *  seed is a word that is added to the id at each recursive call.
 **********************************************************************/
function display_struct(rooT, seed, lang) {
    var M = rooT.length;

    document.write("<ul class=\"MMathSStat\" >");
    for ( var m=0 ; m < M ; ++m ) {
	document.write("<li>");
	if ( lang == "fr" )
	    buildLinK( rooT[m].url_fr, rooT[m].text_fr, "MMathSStat",
		       seed+m, rooT[m].target);
	else
	    buildLinK( rooT[m].url_en, rooT[m].text_en, "MMathSStat",
		       seed+m, rooT[m].target);
	var new_rooT = rooT[m].submenu;
	if ( new_rooT != null && new_rooT.length > 0 )
	    display_struct(new_rooT, seed+m+seed, lang);
	document.write("</li>");
    }
    document.write("</ul>");
}

/******************************************************************
 * The function to create the header of each site.
 * The argument ITEM is the name of an item in the Menu structure.
 * The argument LANG can take the values "fr" and "en" only
 * (the default is "fr").
 ******************************************************************/
function top_function(ITEM, LANG) {
    rec_function(ITEM, ITEM, LANG, null);
}

function rec_function(ITEM, INIT, LANG, IN) {
    var nbrItems;
    if ( ITEM.parent.id == "ROOT" ) {
	document.write("<div id=\"header\"><table class=\"header\">\n");
	nbrItems = hrow_function(ITEM, INIT, LANG);
    }
    else {
	nbrItems = rec_function(ITEM.parent, INIT, LANG, "IN");
    }
    if ( ITEM.parent.id != "ROOT" )
	srow_function(ITEM, LANG, nbrItems);
    if ( IN == null ) {
	if ( ITEM.submenu != null ) {
	    mrow_function(ITEM.submenu, LANG, nbrItems);
	}
	document.write("</table></div>\n");
    }
    return nbrItems;
}

function hrow_function(ITEM, INIT, LANG) {
    var MENU = ITEM.menu;
    var nbrItems = MENU.length;
    document.write("<tr><td id=\"logo\"><a href=\"");
    if ( LANG == "en" ) {
	document.write(uo_home_page_en);
    }
    else {
	document.write(uo_home_page_fr);
    }
    document.write("\"><img id=\"logo\" src=\""+UOlogo
		   +"\"></a> </td>\n");

    if ( LANG == "en" ) {
	for ( var m=0 ; m < nbrItems ; m++ ) {
	    if ( MENU[m] == ITEM )
		document.write("<td class=\"visited\"");
	    else
		document.write("<td class=\"active\"");
	    document.write(" onclick=\"window.location='"+MENU[m].url_en
			   +"'\"> <a href=\""+MENU[m].url_en+"\">"
			   +MENU[m].text_en+"</a></td>");
	}
	document.write("<td class=\"active\" onclick=\"window.location='"
		       +INIT.url_fr+"'\"><a href=\""+INIT.url_fr
		       +"\">Fran&ccedil;ais</a></td>");
    }
    else {
	for ( var m=0 ; m < nbrItems ; m++ ) {
	    if ( MENU[m] == ITEM )
		document.write("<td class=\"visited\"");
	    else
		document.write("<td class=\"active\"");
	    document.write(" onclick=\"window.location='"+MENU[m].url_fr
			   +"'\"><a href=\""+MENU[m].url_fr+"\">"
			   +MENU[m].text_fr+"</a></td>");
	}
	document.write("<td class=\"active\" onclick=\"window.location='"
		       +INIT.url_en+"'\"><a href=\""+INIT.url_en
		       +"\">English</a></td>\n");
    }
    document.write("</tr>\n");
    return nbrItems+2;  /* The number of columns */
}

function mrow_function(MENU, LANG, NBC) {
    var nbrItems = MENU.length;

    /* Each column will have a column span of 1.  If there is
       an extra column, it is not used. */
    var c = 1;
    var K = Math.floor(NBC/c);
    var m = 0;
    var d = Math.floor(nbrItems/K);
    var D = nbrItems -K*d;
    var dd = d;
    document.write("<tr>");
    for ( var k=0 ; k<K ; k++ ) {   /* There will be three columns */
	if ( k < D )
	    ++dd;
	document.write("<td class=\"activeM\" colspan=\""+c+"\"> <ul>");
	if ( LANG == "en" ) {
	    for ( ; m < dd ; m++ ) {
		document.write("<li><a href=\""+MENU[m].url_en+"\">"
			       +MENU[m].text_en+"</a></li>");
	    }
	}
	else {
	    for ( ; m < dd ; m++ ) {
		document.write("<li><a href=\""+MENU[m].url_fr+"\">"
			       +MENU[m].text_fr+"</a></li>");
	    }
	}
	dd = dd+d;
	document.write("</ul></td>");
    }
    if ( K < NBC/c ) {
	document.write("<td class=\"activeM\"> </td>");
    }
    document.write("</tr>");
}

function srow_function(ITEM, LANG, NBC) {
    if ( LANG == "en" )
	document.write("<tr><td class=\"visited\" colspan=\""+NBC
		       +"\" onclick=\"window.location='"+ITEM.url_en
		       +"'\"><a href=\""+ITEM.url_en+"\">"
		       +ITEM.text_en+"</a></td></tr>\n");
    else
	document.write("<tr><td class=\"visited\" colspan=\""+NBC
		       +"\" onclick=\"window.location='"+ITEM.url_fr
		       +"'\"><a href=\""+ITEM.url_fr+"\">"
		       +ITEM.text_fr+"</a></td></tr>\n");
}

function bottom_function(ITEM, LANG) {
    ;  /* does nothing for now */
}



/**************************************************************************
 * A function to determine the academic year
 **************************************************************************/
function academic_year() {
    var date = new Date();
    var year1 = date.getFullYear();
    var month = date.getMonth();
    var year2 = year1;

    if ( month < 4 ) {
	--year1;
    }
    else {
	++year2;
    }
    document.write(year1+"-"+year2);
}
