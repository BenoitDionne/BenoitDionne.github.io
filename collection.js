/******************************************************************
 *  data for Galleria are structures with the following components:
 *
 *  thumb – the thumbnail image (optional)
 *  image – the main image (required)
 *  big – the big image for fullscreen mode (optional)
 *  title – the image title (optional)
 *  description – the image description (optional)
 *  link – the image link url (optional)
 *  layer – A layer of HTML that will be displayed on top of the
 *          content (optional)
 *  video – An URL to a video, as per 1.2.7 we support Vimeo and Youtube URLs.
 *  iframe – An URL to be displayed in an iframe.
 *  original a reference to the original IMG element (optional)
 *
 ******************************************************************/
var image_list_en = new Array();
var image_list_fr = new Array();
var image_nbr_en = 0;
var image_nbr_fr = 0;

function image_item(Thumb, Image, Big, Title, Description, Link, Layer,
		    Video, Iframe, Date) {
    this.thumb = Thumb;
    this.image = Image;
    this.big = Big;
    this.title = Title;
    this.description = Description;
    this.link = Link;
    this.layer = Layer;
    this.video = Video;
    this.iframe = Iframe;
    this.date = Date;
}

var image_collection = images_dir+"collection/";

/*
still to be used  Dday_WWII.jpg, parliament_1901.jpg
*/

/** English **/

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"UN_flag.png",
     image_collection+"UN_flag.png",
     image_collection+"UN_flag.png",
     "Universal Declaration of Human Rights - Dec. 10, 1948",
     "The Universal Declaration of Human Rights was addopted "
     +"on December 10, 1948 by the United Nations General "
     +"Assembly.  (sources: Wikipedia)", null, null, null, null, "1948/12/10");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"sesame_street.gif",
     image_collection+"sesame_street.gif",
     image_collection+"sesame_street.gif",
     "Sesame Street - Nov. 10, 1969",
     "On November 10, 1969, the first episode of <em class='MMathSStat'> "
     +"Sesame Street </em> was broadcast on PBS.  Elmo, Big Bird, Ernie "
     +"and Bert, The Count, Cookie Monster, ... have made millions of "
     +"friends around the world since then. (Sources: www.sesamestreet.org)",
     null, null, null, null, "1969/11/10");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"tulips.jpg",
     image_collection+"tulips.jpg",
     image_collection+"tulips.jpg",
     "Tulips Festival - May",
     "The Ottawa Tulips festival", null, null, null, null, "0/05/0");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"Winterlude.jpg",
     image_collection+"Winterlude.jpg",
     image_collection+"Winterlude.jpg",
     "Winterlude - February",
     "Winterlude", null, null, null, null, "0/02/0");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"kristallnacht.jpg",
     image_collection+"kristallnacht.jpg",
     image_collection+"kristallnacht.jpg",
     "Kristallnatch - Nov. 9 and 10, 1939",
     "<em class='MMathSStat'>Kristallnatch</em> refers to a wave of "
     +"violence against the Jews that took place on November 9 and 10, "
     +"1938 in Germany, Austria and the part of Czechoslovakia occupied by "
     +"the Germans.  The synagogues, houses and businesses owned by the "
     +"Jews were plundered and destroyed.  The shattered glass in the streets "
     +"have given the name of <em class='MMathSStat'>Kristallnatch</em> "
     +"(Night of Crystal) to the event.  This was a turning point in the "
     +"persecution of Jews by the Germans.  (United States Holocaust Memorial "
     +"Museum, Washington, D.C.)", null, null, null, null,
     "1939/11/09-1939/11/10");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"auschwitz.jpg",
     image_collection+"auschwitz.jpg",
     image_collection+"auschwitz.jpg",
     "Auschwitz - 1940 to 1945",
     "It is estimated that a minimum of 1.3 millions people were deported "
     +"to the Auschwitz complex between 1940 and 1945, most of them Jews. "
     +"1.1 millions of them were murdered.  The last people detained in "
     +"Auschwitz were liberated on January 27, 1945.  A resolution by the "
     +"United Nations has designated January 27 as the "
     +"<em class='MMathSStat'>International Holocaust Remembrance Day</em>. "
     +"(United States Holocaust Memorial Museum, Washington, D.C., "
     +"and Wikipedia)", null, null, null, null, "1945/01/27-1945/01/27");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"world_war_II.jpg",
     image_collection+"world_war_II.jpg",
     image_collection+"world_war_II.jpg",
     "World War II - 1939-1945",
     "On September 1, 1939, Germany invaded Poland after having secured a "
     +"non-aggression treaty with the Soviet Union.  As a consequence of "
     +"this invasion, England and France declared war to Germany on "
     +"September 3, 1939.  The result of the Second World War was the "
     +"death of about 55 millions peoples including 6 millions Jews "
     +"exterminated in German concentration camps and ghettos. "
     +"(United States Holocaust Memorial Museum, Washington, D.C.)",
     null, null, null, null, "1939/08/01-1945/09/02");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"Falaise_battle_WWII.jpg",
     image_collection+"Falaise_battle_WWII.jpg",
     image_collection+"Falaise_battle_WWII.jpg",
     "World War II - Mai 8, 1945",
     "At 2:41 a.m. on the 7 of May 1945, the Chief-of-Staff of the German "
     +"Armed Forces High Command, General Alfred Jodl, signed the "
     +"unconditional surrender of all German forces to the Allies. A similar "
     +"surrender was signed with the Soviet Union the next day. All forces "
     +"under German control ceased their operations by 23:01, Central "
     +"European Time on May 8, 1945; marking the end of the Second World War "
     +"in Europe.  It was still raging in the pacific.  Between 50 to 70 "
     +"millions people were killed during the Second World War. (Wikipedia, "
     +"The Canadian Encyclopedia)", null, null, null, null, "1945/05/08");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"juno_beach.jpg",
     image_collection+"juno_beach.jpg",
     image_collection+"juno_beach.jpg",
     "World War II, Juno Beach - June 6, 1944",
     "On June 6, 1944, began <em class=\"MMathSStat\">Operation Overlord</em>"
     +" which is better known as the invasion of Normandy.  About 156,000 "
     +"troops from the United-States, England and Canada are carried on the "
     +"shore of Normandy by about 6,900 vessels or parachuted inland in the "
     +"first phase of the invasion.  Five beaches were principaly targeted: "
     +"Utah Beach and Omaha Beach by the American troops, Gold Beach and "
     +"Sword Beach by the British troops, and Juno Beach by the British and "
     +"Canadian troops. (Wikip&eacute;dia)", null, null, null, null,
     "1944/06/06");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"hiroshima.jpg",
     image_collection+"hiroshima.jpg",
     image_collection+"hiroshima.jpg",
     "Hiroshime - August 6, 1945",
     "Hiroshima was the first city to be destroyed by a atomic bomb at "
     +"8:15 a.m. on August 6, 1945.  About 80,000 peoples were "
     +"instantaneously killed and thousands more died in the following months "
     +"as a consequence of radiation exposure. (sources: Wikipedia)",
     null, null, null, null, "1945/08/06");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"nagasaki.jpg",
     image_collection+"nagasaki.jpg",
     image_collection+"nagasaki.jpg",
     "Nagasaki - August 9, 1945",
     "After Hiroshima, Nagasaki is the second city to be destroyed by an "
     +"atomic bomb at 11:02 a.m. on August 9, 1945.  Between 40,000 and "
     +"70,000 peoples are instantaneously killed.  This does not include "
     +"the thousands who will die in the following months of exposure to "
     +"radiations. (sources: Wikipedia)", null, null, null, null, "1945/08/09");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"Iris_versicolor.jpg",
     image_collection+"Iris_versicolor.jpg",
     image_collection+"Iris_versicolor.jpg",
     "Fête nationale des Québécois - June 24",
     "The blue flag iris (Iris versicolor) is the floral emblem of Quebec. "
     +"It is not the Madonna lily (Lilium candidum L.) found on the "
     +"Quebec flag. (sources: Wikipedia)", null, null, null, null, "0/06/24");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"maple_Acer_saccharum_2.jpg",
     image_collection+"maple_Acer_saccharum_2.jpg",
     image_collection+"maple_Acer_saccharum_2.jpg",
     "Happy Birthday Canada - July 1",
     "The leaf of the sugar maple (Acer saccharum) "
     +"is displayed on the Canadian flag. (sources: Wikipedia)",
     null, null, null, null, "0/07/01");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"berlinwall.jpg",
     image_collection+"berlinwall.jpg",
     image_collection+"berlinwall.jpg",
     "Berlin Wall - Nov. 9, 1989", 
     "The construction of the Berlin Wall began on August 1961.  28 years "
     +"later on this day, the government of East Germany opened reluctantly "
     +"its border with West Germany.  Hearing that the border was open, "
     +"crowds gathered on both sides of the border, hoping to cross to the "
     +"other side.  In the euphoria of the event, they started tearing down "
     +"the wall. (Sources: Wikipedia)", null, null, null, null, "1989/11/09");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"Je_suis_Charlie.png",
     image_collection+"Je_suis_Charlie.png",
     image_collection+"Je_suis_Charlie.png",
     "Je suis Charlie",
     "When religion attacks the freedom of expression.  Twelve "
     +"peoples were killed at the offices of the satirical magazine "
     +"<q lang=\"fr\">Charlie Hebdo</q> on January 7, 2015.  It was followed "
     +"by the killing of one police officer on January 8 and four Jewish "
     +"costumers of a Kosher store in an hostage taking on January 9.",
     null, null, null, null, "2015/01/07");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"apollo_11_lauch.jpg",
     image_collection+"apollo_11_lauch.jpg",
     image_collection+"apollo_11_lauch.jpg",
     "Apollo 11 - July 16, 1969",
     "At 9:32 a.m. on July 16, 1969, Apollo 11 lifted off from the Kennedy "
     +"Space Center to put the first humans on the moon. (sources: NASA)",
     null, null, null, null, "1969/07/16");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"apollo_11_moon_landing.jpg",
     image_collection+"apollo_11_moon_landing.jpg",
     image_collection+"apollo_11_moon_landing.jpg",
     "Apollo 11 - July 20, 1969",
     "At 4:18 p.m. on July 20, 1969, the lunar module Eagle landed on the "
     +"moon with two humans on board: Neil A. Armstrong and Edwin E. Aldrin. "
     +"They were the first humans on the moon.  Micheal Collins, the third "
     +"crew member of Apollo 11, staid in the command module Colombia. "
     +"(sources: NASA)", null, null, null, null, "1969/07/20");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"apollo_11_first_step.jpg",
     image_collection+"apollo_11_first_step.jpg",
     image_collection+"apollo_11_first_step.jpg",
     "Apollo 11, First step - July 20, 1969",
     "At 10:56 p.m. on July 20, 1969, Neil A. Armstrong stepped on the moon, "
     +"becoming the first human to walk on the moon. (sources: NASA)",
     null, null, null, null, "1969/07/20");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"apollo_11_return.jpg",
     image_collection+"apollo_11_return.jpg",
     image_collection+"apollo_11_return.jpg",
     "Apollo 11 - July 24, 1969",
     "On July 24, 1969, the three astronauts of Apollo 11 were back on Earth "
     +"after a little more than eight days in space.  The splashdown of the "
     +"command module took place in the Pacific Ocean (sources: NASA)",
     null, null, null, null, "1969/07/24");

image_list_en[image_nbr_en++] = new image_item
    (image_collection+"50pc_off.gif", image_collection+"50pc_off.gif",
     image_collection+"50pc_off.gif", "Sale - June 2011",
     "In an electronic store downtown.", null, null, null, null,"0/06/0");

/** Francais  **/

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"UN_flag.png",
     image_collection+"UN_flag.png",
     image_collection+"UN_flag.png",
     "Déclaration universelle des droits de l'homme - 10 déc. 1948",
     "La déclaration universelle des droits de l'homme a été adoptée "
     +"le 10 décembre 1948 par l'assemblée générale des "
     +"Nations Unies. (source: Wikipedia)",
     null, null, null, null, "1948/12/10");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"sesame_street.gif",
     image_collection+"sesame_street.gif",
     image_collection+"sesame_street.gif",
     "Sesame Street - 19 nov. 1969",
     "C'est le 10 novembre 1969 que la première épisode de "
     +"<em class='MMathSStat'> Sesame Street </em> a été télédifussée sur "
     +"les ondes de PBS.  Elmo, Big Bird, Ernie et Bert, The Count, "
     +"Cookie Monster, ... se sont fait des millions d'ami(e)s partout "
     +"dans le monde depuis cette première épisode. "
     +"(Source: www.sesamestreet.org)",
     null, null, null, null, "1969/11/10");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"tulips.jpg",
     image_collection+"tulips.jpg",
     image_collection+"tulips.jpg",
     "Festival des tulipes - Mai",
     "Le festival des Tulipes de la ville d'Ottawa",
     null, null, null, null, "0/05/0");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"Winterlude.jpg",
     image_collection+"Winterlude.jpg",
     image_collection+"Winterlude.jpg",
     "Bal des neiges - février",
     "Le Bal des neiges", null, null, null, null, "0/02/0");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"kristallnacht.jpg",
     image_collection+"kristallnacht.jpg",
     image_collection+"kristallnacht.jpg",
     "Kristallnatch - 9 et 10 nov. 1939",
     "<em class='MMathSStat'>Kristallnatch</em> fait référence à une vaque "
     +"de violence contre les juifs qui est survenue le 9 et 10 novembre "
     +"1938 en Allemagne, en Autriche, et dans la partie de la "
     +"Tchécoslovaquie occupée par les allemands.  les synagogues, maisons "
     +"et commerces que possédaient les juifs furent pillés et détruits. "
     +"Les brisures de verre dans les rues ont données le nom de "
     +"<em class='MMathSStat'>Kristallnatch</em> (nuit de cristal) à cet "
     +"évènement. Ce fut un point tournant dans la persécution des juifs "
     +"par les Allemands. (United States Holocaust Memorial Museum, "
     +"Washington, D.C.)", null, null, null, null, "1939/11/09-1939/11/10");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"auschwitz.jpg",
     image_collection+"auschwitz.jpg",
     image_collection+"auschwitz.jpg",
     "Auschwitz - 1940 à 1945",
     "On estime qu'au minimum 1.3 millions de personnes furent déportées "
     +"au complexe de Auschwitz entre 1940 et 1945, pour la majorité des "
     +"juifs. 1.1 millions de ceux-ci furent assassinés.  Les dernières "
     +"personnes détenues à Auschwitz furent libérées le 27 janvier 1945. "
     +"Une résolution de l'Organisation des Nations Unies a désignée le "
     +"27 janvier comme la <em class='MMathSStat'>Journée internationale "
     +"dédiée à la mémoire des victimes de l’Holocauste</em> (United States "
     +"Holocaust Memorial Museum, Washington, D.C., and Wikipédia)",
     null, null, null, null, "1945/01/27-1945/01/27");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"world_war_II.jpg",
     image_collection+"world_war_II.jpg",
     image_collection+"world_war_II.jpg",
     "2<sup class=\"MMathSStat\">e</sup> guerre mondiale - 1939-1945",
     "Le 1 septembre 1939, l'Allemagne envahissait la Pologne après avoir "
     +"signé un traité de non-agression avec l'Union Soviétique.  En "
     +"réponse à cette invasion, l'Angleterre et la France déclarèrent "
     +"la guerre à l'Allemagne le 3 septembre 1939.  le résultat de la "
     +"deuxième guerre mondiale sera environ 55 millions de personnes "
     +"tuées dont 6 millions de juifs exterminés dans les camps de "
     +"concentration allemands et les ghettos. "
     +"(United States Holocaust Memorial Museum, Washington, D.C.)",
     null, null, null, null, "1939/08/01-1945/09/02");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"Falaise_battle_WWII.jpg",
     image_collection+"Falaise_battle_WWII.jpg",
     image_collection+"Falaise_battle_WWII.jpg",
     "2<sup class=\"MMathSStat\">e</sup> guerre mondiale - 8 mai 1945",
     "Le 7 mai 1945 à 2h41 a.m., Le chef d'état major du haut commandement "
     +"des forces armées allemandes, le général Alfred Jodl, signait la "
     +"reddition sans conditions de toutes les forces allemandes aux "
     +"forces alliées. Une reddition semblable fut signer avec l'Union "
     +"Soviétique le jour suivant.  Toutes les forces allemandes "
     +"cessèrent leurs activités au plus tard à 23:01, le 8 mai 1945, "
     +"heure d'Europe Central.  Cela marquait la fin de la deuxième guerre "
     +"mondiale en Europe.  Elle fessait toujours rage dans le pacifique. "
     +"Entre 50 et 70 millions de personnes furent tuées durant la "
     +"deuxième guerre mondiale. (Wikipedia, The Canadian Encyclopedia)",
     null, null, null, null, "1945/05/08");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"juno_beach.jpg",
     image_collection+"juno_beach.jpg",
     image_collection+"juno_beach.jpg",
     "2<sup class=\"MMathSStat\">e</sup> guerre mondiale, plage Juno - "
     +"6 juin 1944",
     "Le 6 juin 1944, débute la bataille de Normandie. Environ "
     +"156,000 hommes provenant des états-Unis, de l'Angleterre et "
     +"du Canada sont transportées sur les plages de la Normandie par "
     +"environ 6,900 bateaux de tous genres ou parachutés à l'intérieure "
     +"des terres dans la première phase de l'invasion.  Cinq plages sont "
     +"principalement visées: Utah Beach et Omaha Beach pour les troupes "
     +"américaines, Gold Beach et Sword Beach pour les troupes britanniques, "
     +"et Juno Beach pour les troupes britanniques et canadiennes. "
     +"(Wikip&eacute;dia)",
     null, null, null, null, "1944/06/06");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"hiroshima.jpg",
     image_collection+"hiroshima.jpg",
     image_collection+"hiroshima.jpg",
     "Hiroshime - 6 août 1945",
     "Hiroshima a été la première ville détruite par une bombe atomique le "
     +"6 août 1945 à 8h15 a.m.  Environ 80,000 personnes sont instantanément "
     +"tuées et des milliers d'autres moururent suite aux effets des "
     +"radiations. (source: Wikipedia)",
     null, null, null, null, "1945/08/06");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"nagasaki.jpg",
     image_collection+"nagasaki.jpg",
     image_collection+"nagasaki.jpg",
     "Nagasaki - 9 août 1945",
     "Après Hiroshima, Nagasaki fût la deuxième ville détruite par une bombe "
     +"atomique le 9 août 1945 à 11h02 a.m.  On estime que 40,000 à 70,000 "
     +"personnes sont instantanément tuées.  Cela exclut tous ceux qui "
     +"moururent dans les mois qui suivant suite aux effets des radiations. "
     +"(source: Wikipedia)",
     null, null, null, null, "1945/08/09");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"Iris_versicolor.jpg",
     image_collection+"Iris_versicolor.jpg",
     image_collection+"Iris_versicolor.jpg",
     "Fête nationale des Québécois - 24 juin",
     "L'iris versicolore est l'emblème floral du Québec. "
     +"Ce n'est pas le lis blanc (Lilium candidum L.) que l'on retrouve "
     +"sur son drapeau. (source: Wikipedia)",
     null, null, null, null, "0/06/24");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"maple_Acer_saccharum_2.jpg",
     image_collection+"maple_Acer_saccharum_2.jpg",
     image_collection+"maple_Acer_saccharum_2.jpg",
     "Bonne fête Canada - 1 juillet",
     "La feuille de l'érable à sucre (Acer saccharum) apparaît sur le "
     +"drapeau canadien. (source: Wikipedia)",
     null, null, null, null, "0/07/01");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"berlinwall.jpg",
     image_collection+"berlinwall.jpg",
     image_collection+"berlinwall.jpg",
     "Mur de Berlin  - 9 nov. 1989", 
     "La construction du mur de Berlin a débutée en août 1961.  28 ans plus "
     +"tard, le 9 novembre 1989, le gouvernement d'Allemagne de l'Est "
     +"ouvrait à contrecoeur sa frontière avec l'Allemagne de l'Ouest. "
     +"À l'annonce prématurée de l'ouverture de la frontière, la foule "
     +"s'amassa des deux côtés du mur pour traverser de l'autre côté;. "
     +"Dans l'enthousiaste du moment, ils commencèrent à démolir le mur. "
     +"(Source: Wikipedia)",
     null, null, null, null, "1989/11/09");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"Je_suis_Charlie.png",
     image_collection+"Je_suis_Charlie.png",
     image_collection+"Je_suis_Charlie.png",
     "Je suis Charlie",
     "Quand la religion s'attaque à la liberté d'expression.  Douze "
     +"personnes sont tuées dans les bureaux du magazine satirique "
     +"<q lang=\"fr\">Charlie Hebdo</q> le 7 janvier 2015.  Cela est suivie "
     +"par le meurtre d'un policier le 8 janvier et de quatre clients juifs "
     +"d'une épicerie Kascher de Paris lors d'une prise d'otages le 9 janvier.",
     null, null, null, null, "2015/01/07");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"apollo_11_lauch.jpg",
     image_collection+"apollo_11_lauch.jpg",
     image_collection+"apollo_11_lauch.jpg",
     "Apollo 11 - 16 juillet 1969",
     "À 9h32 a.m. le 16 juillet 1969, Apollo 11 quittait la terre pour "
     +"déposer les premiers humains sur la lune. (source: NASA)",
     null, null, null, null, "1969/07/16");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"apollo_11_moon_landing.jpg",
     image_collection+"apollo_11_moon_landing.jpg",
     image_collection+"apollo_11_moon_landing.jpg",
     "Apollo 11 - 20 juillet 1969",
     "À 4h18 p.m. le 20 juillet 1969, le module lunaire Eagle "
     +"atterrissait sur la lune avec deux humains à son bord: Neil A. "
     +"Armstrong et Edwin E. Aldrin.  Ils sont les premiers humains sur "
     +"la lune.  Micheal Collins, le troisième membre de l'équipage, est "
     +"demeuré dans le module de commande Colombia. (source: NASA)",
     null, null, null, null, "1969/07/20");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"apollo_11_first_step.jpg",
     image_collection+"apollo_11_first_step.jpg",
     image_collection+"apollo_11_first_step.jpg",
     "Apollo 11, Premier pas - 20 juillet 1969",
     "À 10h56 p.m. le 20 juillet 1969, Neil A. Armstrong posa le pied "
     +"sur la lune, devenant ainsi le premier humain à marcher sur "
     +"la lune. (source NASA)", null, null, null, null, "1969/07/20");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"apollo_11_return.jpg",
     image_collection+"apollo_11_return.jpg",
     image_collection+"apollo_11_return.jpg",
     "Apollo 11 - 24 juillet 1969",
     "Le 24 juillet 1969, les trois astronautes d'Apollo 11 revenaient sur la "
     +"terre après un voyage dans l'espace d'un peu plus de huit jours.  Le "
     +"module de commande a amerri dans l'Océan Pacifique. (source NASA)",
     null, null, null, null, "1969/07/24");

image_list_fr[image_nbr_fr++] = new image_item
    (image_collection+"50pc_off.gif",
     image_collection+"50pc_off.gif",
     image_collection+"50pc_off.gif",
     "Solde - Juin 2011",
     "Dans un magasin d'équipement électronique du centre ville",
     null, null, null, null, "0/06/0");
