/**************************************************************************
 *  javascript codes for my personal website
 *   Benoit Dionne, August 2015
 **************************************************************************/

/* My name */
var MyName = "Benoit Dionne";

/* Location of my website */
var home_page_en = location_bd+"welcome.html";
var home_page_fr = location_bd+"bienvenue.html";

/* Name of the website */
var MStexte = "D&eacute;partement de math&eacute;matiques et de statistique<br>Benoit Dionne";
var MStext = "Department of Mathematics and Statistics<br>Benoit Dionne";

/* Web site of the Department */
var dept_website_fr = location_dept_fr;
var dept_website_en = location_dept_en;

/* U of O home page */
var uo_home_page_fr = "http://www.uottawa.ca/fr";
var uo_home_page_en = "http://www.uottawa.ca/en";

/******************************************************************
 * Main Ottawa website
 ******************************************************************/
var uOttawa = new item
    ("Universit&eacute; d'Ottawa", "University of Ottawa",
     uo_home_page_fr, uo_home_page_en, null, null, null,
     "uOttawa", "_blank", "uOttawa");
websites[websites_nbr++] = uOttawa;

/******************************************************************
 * Section in construction
 ******************************************************************/
var construction = new myImage
    (images_dir+"page_construction.gif", "", "",
     "en construction", "in construction", "", "");

/******************************************************************
 * Main menu
 ******************************************************************/
var welcomeMenu = new item
    ("Acceuil", "Home",
     home_page_fr, home_page_en, null, null, null,
     "welcomeMenu", "_self", "welcomeMenu");

/* Map of the web site */
var plan = new item("Plan du site", "Site Map",
		    location_bd+"plan/plan_fr.html",
		    location_bd+"plan/plan_en.html", null, null, null,
		    "planMenu", "_self", "planMenu");
websites[websites_nbr++] = plan;

/* Department of Math. and Stat. */
var MSdept = new item("D&eacute;partement", "Department",
		      dept_website_fr, dept_website_en, null, null, null,
		      "dept_math_stat", "_self", "dept_math_stat");
websites[websites_nbr++] = MSdept;

/******************************************************************
 * under welcomeMenu
 ******************************************************************/
/* Websites about teaching */
var teachMenu = new item
    ("Enseignement", "Teaching",
     location_bd+"teaching/teaching_fr.html",
     location_bd+"teaching/teaching_en.html", null, null, null,
     "teachMenu", "_self", "teachMenu");
websites[websites_nbr++] = teachMenu;

/* Research */
  var researchMenu = new item
    ("Recherche", "Research",
     location_bd+"research/research_fr.html",
     location_bd+"research/research_en.html", null, null, null,
     "researchMenu", "_self", "researchMenu");
websites[websites_nbr++] = researchMenu;

/* Mathematics and statistics contents */
var mathMenu = new item
    ("Les Math&eacute;matiques et la statistique", "Mathematics and Statistics",
     location_bd+"math_stat/math_stat_fr.html",
     location_bd+"math_stat/math_stat_en.html", null, null, null,
     "mathMenu", "_self", "mathMenu");
websites[websites_nbr++] = mathMenu;

/******************************************************************
 * under teachMenu
 ******************************************************************/
/* FAQ for Mobius */
var Mobius = new item
    ("M&ouml;bius : Foire aux questions",
     "M&ouml;bius : Frequently Asked Questions",
     location_bd+"teaching/Mobius/Mobius_fr.html",
     location_bd+"teaching/Mobius/Mobius_en.html", null, null, null,
     "Mobius", "_self", "Mobius");
websites[websites_nbr++] = Mobius;

/* Mobius administration */
var Mbs = new item
    ("M&ouml;bius pour les enseignants",
     "M&ouml;bius for the Instructors",
     location_bd+"teaching/Mobius_Admin/Mobius_fr.html",
     location_bd+"teaching/Mobius_Admin/Mobius_en.html", null, null, null,
     "Mbs", "_self", "Mbs");
websites[websites_nbr++] = Mbs;

/* Calculus text book */
var LectureNotes = new item
    ("Notes de cours", "Lecture notes",
     location_bd+"teaching/lecture_notes_fr.html",
     location_bd+"teaching/lecture_notes_en.html", null, null, null,
     "LectureNotes", "_self", "LectureNotes");
websites[websites_nbr++] = LectureNotes;

/******************************************************************
 *  under mathMenu
 ******************************************************************/
/* Applications of Mathematics and Statistics */
var math_impact = new item
    ("L'utilit&eacute; des math&eacute;matiques et de la statistique",
     "Impact of Mathematics and Statistics",
     location_bd+"math_stat/applied_math_fr.html",
     location_bd+"math_stat/applied_math_en.html",
     null, null, null, "math_impact", "_self", "math_impact");
websites[websites_nbr++] = math_impact;

/* Math. Contents */
var math_disc = new item
    ("Les math&eacute;matiques, un monde &agrave; d&eacute;couvrir",
     "Mathematics, a world to discover",
     location_bd+"math_stat/discovery_fr.html",
     location_bd+"math_stat/discovery_en.html",
     null, null, null, "math_disc", "_self", "math_disc");
websites[websites_nbr++] = math_disc;

/* Intro to Matlab */
var matlab = new item
    ("Introduction &agrave; Matlab", "Introduction to Matlab",
     location_bd+"math_stat/matlab/matlab_fr.html",
     location_bd+"math_stat/matlab/matlab_en.html",
     null, null, null, "matlab", "_self", "matlab");
websites[websites_nbr++] = matlab;

/* Intro to Maple */
var maple = new item
    ("Introduction &agrave; Maple", "Introduction to Maple",
     location_bd+"math_stat/maple/maple_fr.html",
     location_bd+"math_stat/maple/maple_en.html",
     null, null, null, "maple", "_self", "maple");
websites[websites_nbr++] = maple;

/******************************************************************
 *  under Mbs
 ******************************************************************/
/* Using Mobius */
var Mbs_using = new item
    ("Comment utiliser M&ouml;bius",
     "How to Use M&ouml;bius",
     location_bd+"teaching/Mobius_Admin/Mbs_using_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_using_en.html", null, null, null,
     "Mbs_using", "_self", "Mbs_using");
websites[websites_nbr++] = Mbs_using;

/* Using Mobius with BrightSpace */
var Mbs_using_BS = new item
    ("Comment utiliser M&ouml;bius avec BrightSpace",
     "How to Use M&ouml;bius with BrightSpace",
     location_bd+"teaching/Mobius_Admin/Mbs_using_BS_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_using_BS_en.html", null, null, null,
     "Mbs_using_BS", "_self", "Mbs_using_BS");
websites[websites_nbr++] = Mbs_using_BS;

/* Creating content */
var Mbs_content = new item
    ("Cr&eacute;er le contenu pour M&ouml;bius",
     "Creating Content for M&ouml;bius",
     location_bd+"teaching/Mobius_Admin/Mbs_content_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_content_en.html", null, null, null,
     "Mbs_content", "_self", "Mbs_content");
websites[websites_nbr++] = Mbs_content;

/******************************************************************
 *  under Mbs_using
 ******************************************************************/
/* Previewing questions */
var Mbs_quest_prev = new item
    ("Visionner les Questions", "Previewing Questions",
     location_bd+"teaching/Mobius_Admin/Mbs_quest_prev_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_quest_prev_en.html", null,
     null, null, "Mbs_quest_prev", "_self", "Mbs_quest_prev");
websites[websites_nbr++] = Mbs_quest_prev;

/* Creating assignments */
var Mbs_assign = new item
    ("Comment cr&eacute;er des devoirs", "How to Create Assignments",
     location_bd+"teaching/Mobius_Admin/Mbs_assign_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_assign_en.html", null,
     null, null, "Mbs_assign", "_self", "Mbs_assign");
websites[websites_nbr++] = Mbs_assign;

/* Policies for assignments */
var Mbs_policy = new item
    ("R&egrave;gles pour les devoirs", "Rules for the Assignments",
     location_bd+"teaching/Mobius_Admin/Mbs_policy_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_policy_en.html", null,
     null, null, "Mbs_policy", "_self", "Mbs_policyv");
websites[websites_nbr++] = Mbs_policy;

/* Creating adaptive assignments */
var Mbs_adaptive = new item
    ("Comment cr&eacute;er des devoirs adaptatifs",
     "How to Create Adaptive Assignments",
     location_bd+"teaching/Mobius_Admin/Mbs_adaptive_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_adaptive_en.html", null,
     null, null, "Mbs_adaptive", "_self", "Mbs_adaptive");
websites[websites_nbr++] = Mbs_adaptive;

/* Proctor tools */
var Mbs_proctor = new item
    ("Outils pour les surveillants", "Proctor Tools",
     location_bd+"teaching/Mobius_Admin/Mbs_proctor_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_proctor_en.html", null,
     null, null, "Mbs_proctor", "_self", "Mbs_proctor");
websites[websites_nbr++] = Mbs_proctor;

/* Reviewing and modifying grades */
var Mbs_grade_review = new item
    ("R&eacute;viser des notes", "Reviewing Grades",
     location_bd+"teaching/Mobius_Admin/Mbs_grade_review_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_grade_review_en.html", null,
     null, null, "Mbs_grade_review", "_self", "Mbs_grade_review");
websites[websites_nbr++] = Mbs_grade_review;

/* Exporting grades from Mobius to BrightSpace */
var Mbs_grades = new item
    ("Comment exporter les notes", "How to Export Grades",
     location_bd+"teaching/Mobius_Admin/Mbs_grades_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_grades_en.html", null,
     null, null, "Mbs_grades", "_self", "Mbs_grades");
websites[websites_nbr++] = Mbs_grades;

/* Exporting and importing questions and assignments */
var Mbs_management = new item
    ("G&eacute;rer les questions et devoirs",
     "Managing Questions and Assignments",
     location_bd+"teaching/Mobius_Admin/Mbs_management_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_management_en.html", null,
     null, null, "Mbs_management", "_self", "Mbs_management");
websites[websites_nbr++] = Mbs_management;

/* Ownership of an assignment */
var Mbs_owner = new item
    ("Qui a affich&eacute; ce devoir?", "Who Posted this Assignment?",
     location_bd+"teaching/Mobius_Admin/Mbs_owner_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_owner_en.html", null,
     null, null, "Mbs_owner", "_self", "Mbs_owner");
websites[websites_nbr++] = Mbs_owner;

/******************************************************************
 *  under Mbs_using_BS
 ******************************************************************/
/* Creating a link to a class on Mobius */
var Mbs_link_class = new item
    ("Cr&eacute;er un lien &agrave; un cours sur M&ouml;bius",
     "Creating a Link to a Class on M&ouml;bius",
     location_bd+"teaching/Mobius_Admin/Mbs_link_class_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_link_class_en.html", null,
     null, null, "Mbs_link_class", "_self", "Mbs_link_class");
websites[websites_nbr++] = Mbs_link_class;

/* BrighSpace module for Mobius assignments */
var Mbs_BS_module = new item
    ("Module de BrightSpace pour les devoirs sur M&ouml;bius",
     "BrighSpace Module for M&ouml;bius Assignments",
     location_bd+"teaching/Mobius_Admin/Mbs_BS_module_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_BS_module_en.html", null,
     null, null, "Mbs_BS_module", "_self", "Mbs_BS_module");
websites[websites_nbr++] = Mbs_BS_module;

/* Creating links to assignments on Mobius */
var Mbs_link_assign = new item
    ("Cr&eacute;er les liens aux devoirs sur M&ouml;bius",
     "Creating Links to Assignments on M&ouml;bius",
     location_bd+"teaching/Mobius_Admin/Mbs_link_assign_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_link_assign_en.html", null,
     null, null, "Mbs_link_assign", "_self", "Mbs_link_assign");
websites[websites_nbr++] = Mbs_link_assign;

/* Creating a link to Gradebook on Mobius */
var Mbs_link_gradebook = new item
    ("Cr&eacute;er un lien &agrave; Gradebook sur M&ouml;bius",
     "Creating a Link to Gradebbok on M&ouml;bius",
     location_bd+"teaching/Mobius_Admin/Mbs_link_gradebook_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_link_gradebook_en.html", null,
     null, null, "Mbs_link_gradebook", "_self", "Mbs_link_gradebook");
websites[websites_nbr++] = Mbs_link_gradebook;

/* Some information on BrightSpace */
var Mbs_brightspace = new item
    ("Quelques fonctionnalit&eacute;s de BrightSpace",
     "Some Features of BrightSpace",
     location_bd+"teaching/Mobius_Admin/Mbs_brightspace_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_brightspace_en.html", null,
     null, null, "Mbs_brightspace", "_self", "Mbs_brightspace");
websites[websites_nbr++] = Mbs_brightspace;

/******************************************************************
 *  under Mbs_content
 ******************************************************************/
/* Mobius structure */
var Mbs_structure = new item
    ("Structure de M&ouml;bius", "M&ouml;bius Structure",
     location_bd+"teaching/Mobius_Admin/Mbs_structure_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_structure_en.html", null,
     null, null, "Mbs_structure", "_self", "Mbs_structure");
websites[websites_nbr++] = Mbs_structure;

/* Mobius content */
var Mbs_quest_creat = new item
    ("Cr&eacute;er des questions pour M&ouml;bius",
     "Creating Questions for M&ouml;bius",
     location_bd+"teaching/Mobius_Admin/Mbs_quest_creat_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_quest_creat_en.html", null,
     null, null, "Mbs_quest_creat", "_self", "Mbs_quest_creat");
websites[websites_nbr++] = Mbs_quest_creat;

/******************************************************************
 *  under Mbs_quest_creat
 ******************************************************************/
var Mbs_maple_graded = new item
    ("Questions corrig&eacute;es par Maple",
     "Maple Graded Questions",
     location_bd+"teaching/Mobius_Admin/Mbs_maple_graded_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_maple_graded_en.html", null,
     null, null, "Mbs_maple_graded", "_self", "Mbs_maple_graded");
websites[websites_nbr++] = Mbs_maple_graded;

var Mbs_algo = new item
    ("Sections pour les algorithmes", "Algorithm Section",
     location_bd+"teaching/Mobius_Admin/Mbs_algo_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_algo_en.html", null,
     null, null, "Mbs_algo", "_self", "Mbs_algo");
websites[websites_nbr++] = Mbs_algo;

var Mbs_algo_maple = new item
    ("Sections pour les algorithmes avec Maple",
     "Algorithm Section with Maple",
     location_bd+"teaching/Mobius_Admin/Mbs_algo_maple_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_algo_maple_en.html", null,
     null, null, "Mbs_algo_maple", "_self", "Mbs_algo_maple");
websites[websites_nbr++] = Mbs_algo_maple;

/* Maple Math App */
var Mbs_math_app = new item
    ("Math Apps","Math Apps",
     location_bd+"teaching/Mobius_Admin/Mbs_math_app_fr.html",
     location_bd+"teaching/Mobius_Admin/Mbs_math_app_en.html", null,
     null, null, "Mbs_math_app", "_self", "Mbs_math_app");
websites[websites_nbr++] = Mbs_math_app;

/******************************************************************
 *  under math_disc
 ******************************************************************/
/* Fractal Geometry */
var fractal1 = new item
    ("Syst&egrave;mes it&eacute;ratif de fonctions",
     "Iterative Function systems",
     location_bd+"math_stat/fractal/fractal1_fr.html",
     location_bd+"math_stat/fractal/fractal1_en.html",
     null, null, null, "fractal1", "_top", "fractal1");
websites[websites_nbr++] = fractal1;

var fractal2 = new item
    ("Dimensions fractal", "Fractal Dimensions",
     location_bd+"math_stat/fractal/fractal2_fr.html",
     location_bd+"math_stat/fractal/fractal2_en.html",
     null, null, null, "fractal2", "_top", "fractal2");
websites[websites_nbr++] = fractal2;

var fractal3 = new item
    ("L'application logistique", "Logistic Map",
     location_bd+"math_stat/fractal/fractal3_fr.html",
     location_bd+"math_stat/fractal/fractal3_en.html",
     null, null, null, "fractal3", "_top", "fractal3");
websites[websites_nbr++] = fractal3;

var fractal4 = new item
    ("Ensembles de Mandelbrot et Julia", "Mandelbrot and Julia Sets",
     location_bd+"math_stat/fractal/fractal4_fr.html",
     location_bd+"math_stat/fractal/fractal4_en.html",
     null, null, null, "fractal4", "_top", "fractal4");
websites[websites_nbr++] = fractal4;

/******************************************************************
 *  under maple
 ******************************************************************/

var lin_alg = new item
    ("Alg&egrave;bre lin&eacute;aire", "Linear Algebra",
     location_bd+"math_stat/maple/lin_alg_fr.html",
     location_bd+"math_stat/maple/lin_alg_en.html",
     null, null, null, "lin_alg", "_top", "lin_alg");
websites[websites_nbr++] = lin_alg;

var solv_equ = new item
    ("R&eacute;soudre des &eacute;quations", "Solving Equations",
     location_bd+"math_stat/maple/solv_equ_fr.html",
     location_bd+"math_stat/maple/solv_equ_en.html",
     null, null, null, "solv_equ", "_top", "solv_equ");
websites[websites_nbr++] = solv_equ;

var data_sets = new item
    ("Manipuler des ensembles de donn&eacute;es", "Manipulating Data Sets",
     location_bd+"math_stat/maple/data_sets_fr.html",
     location_bd+"math_stat/maple/data_sets_en.html",
     null, null, null, "data_sets", "_top", "data_sets");
websites[websites_nbr++] = data_sets;

var ODE_O1 = new item
    ("EDO d'ordre un", "First Order ODE",
     location_bd+"math_stat/maple/ODE_O1_fr.html",
     location_bd+"math_stat/maple/ODE_O1_en.html",
     null, null, null, "ODE_O1", "_top", "ODE_O1");
websites[websites_nbr++] = ODE_O1;

var ODE_O2_const_coeff = new item
    ("EDO d'ordre deux avec coefficients constants",
     "Second Order ODE with Constant Coefficients",
     location_bd+"math_stat/maple/ODE_O2_const_coeff_fr.html",
     location_bd+"math_stat/maple/ODE_O2_const_coeff_en.html",
     null, null, null, "ODE_O2_const_coeff", "_top", "ODE_O2_const_coeff");
websites[websites_nbr++] = ODE_O2_const_coeff;

var ODE_systems = new item
    ("Syst&egrave;mes d'EDO", "Systems of ODE",
     location_bd+"math_stat/maple/ODE_systems_fr.html",
     location_bd+"math_stat/maple/ODE_systems_en.html",
     null, null, null, "ODE_systems", "_top", "ODE_systems");
websites[websites_nbr++] = ODE_systems;

var Laplace_transf = new item
    ("Transformations de Laplace", "Laplace transforms",
     location_bd+"math_stat/maple/Laplace_transf_fr.html",
     location_bd+"math_stat/maple/Laplace_transf_en.html",
     null, null, null, "Laplace_transf", "_top", "Laplace_transf");
websites[websites_nbr++] = Laplace_transf;

var Fourier_series = new item
    ("S&eacute;ries de Fourier", "Fourier Series",
     location_bd+"math_stat/maple/Fourier_series_fr.html",
     location_bd+"math_stat/maple/Fourier_series_en.html",
     null, null, null, "Fourier_series", "_top", "Fourier_series");
websites[websites_nbr++] = Fourier_series;

var ODE_O2_var_coeff = new item
    ("EDO d'ordre deux avec coefficients variables",
     "Second Order ODE with Variable Coefficients",
     location_bd+"math_stat/maple/ODE_O2_var_coeff_fr.html",
     location_bd+"math_stat/maple/ODE_O2_var_coeff_en.html",
     null, null, null, "ODE_O2_var_coeff", "_top", "ODE_O2_var_coeff");
websites[websites_nbr++] = ODE_O2_var_coeff;

var PDE = new item
    ("&Eacute;quations aux d&eacute;riv&eacute;es partielles",
     "Partial Differential Equations",
     location_bd+"math_stat/maple/PDE_fr.html",
     location_bd+"math_stat/maple/PDE_en.html",
     null, null, null, "PDE", "_top", "PDE");
websites[websites_nbr++] = PDE;

var Maple_programs = new item
    ("Programmation en Maple", "Maple Programming",
     location_bd+"math_stat/maple/Maple_programs_fr.html",
     location_bd+"math_stat/maple/Maple_programs_en.html",
     null, null, null, "Maple_programs", "_top", "Maple_programs");
websites[websites_nbr++] = Maple_programs;

/******************************************************************
 *  under plan
 ******************************************************************/
/* Table of contents */
var index_websites = new item
    ("Index des sites Internets", "Index of websites",
     location_bd+"plan/index_websites_fr.html",
     location_bd+"plan/index_websites_en.html",
     null, null, null, "index_websites", "_self", "index_websites");

/******************************************************************
 * Items for teachMenu
 ******************************************************************/
var Mobius_site = new item
    ("M&ouml;bius pour UO", "M&ouml;bius for UO",
     "https://uottawa.mobius.cloud",
     "https://uottawa.mobius.cloud",
     null, null, null,
     "Mobius_site", "_blank", "Mobius_site");
websites[websites_nbr++] = Mobius_site;

/******************************************************************
 * Items for mathMenu
 ******************************************************************/
/* In applied_math_en.html */

/* Societe math. de France (SMF), only cited in the index of website. */
var SMFrance = new item
    ("Soci&eacute;t&eacute; Math&eacute;matique de France",
     "French Mathematical Society",
     "http://smf.emath.fr/", "http://smf.emath.fr/",
     null, null, null, "SMFrance", "_blank", "SMFrance");
websites[websites_nbr++] = SMFrance;

/* Societe de math. appliquees et industrielles de France (SMAI), only
   cited in the index of website. */
var SMAIFrance = new item
    ("Soci&eacute;t&eacute; de math&eacute;matique appliqu&eacute;es et industrielles",
     "Soci&eacute;t&eacute; de math&eacute;matique appliqu&eacute;es et industrielles",
     "http://smai.emath.fr/?lang=fr", "http://smai.emath.fr/?lang=fr",
     null, null, null, "SMAIFrance", "_blank", "SMAIFrance");
websites[websites_nbr++] = SMAIFrance;

/* Site des applications de math. par la SMAI */
var SMAIexplosion = new item
    ("L'explosion des math&eacute;matiques (SMAI)",
     "L'explosion des math&eacute;matiques (SMAI)",
     "http://smai.emath.fr/spip.php?article121&lang=fr",
     "http://smai.emath.fr/spip.php?article121&lang=fr",
     null, null, null, "SMAIexplosion", "_blank", "SMAIexplosion");
websites[websites_nbr++] = SMAIexplosion;

/* Site des applications de math. par la SMAI */
var SMAIexplosionContinue = new item
    ("Math&eacute;matiques, l'explosion continue (SMAI)",
     "Math&eacute;matiques, l'explosion continue (SMAI)",
     "http://smai.emath.fr/spip.php?article486\&lang=fr",
     "http://smai.emath.fr/spip.php?article486\&lang=fr",
     null, null, null, "SMAIexplosionContinue", "_blank",
     "SMAIexplosionContinue");
websites[websites_nbr++] = SMAIexplosionContinue;

/* Site of the applications of math. by the AMS */
var AMSmoments = new item
    ("Moments in Mathematics from the American Mathematical Society (AMS)",
     "Moments in Mathematics from the American Mathematical Society (AMS)",
     "http://www.ams.org/samplings/mathmoments/browsemoments?lang=french",
     "http://www.ams.org/ams/mathmoments.html",
     null, null, null, "AMSmoments", "_blank", "AMSmoments");
websites[websites_nbr++] = AMSmoments;

/* Site of the applications of math. by the SIAM */
var SIAMcounts = new item
    ("Math Matters, Apply It! from the Society for Industrial and Applied Mathemaitcs (SIAM)",
     "Math Matters, Apply It! from the Society for Industrial and Applied Mathemaitcs (SIAM)",
     "https://www.siam.org/programs-initiatives/education-resources/resources-for-k-12-students/math-matters-apply-it/",
     "https://www.siam.org/programs-initiatives/education-resources/resources-for-k-12-students/math-matters-apply-it/",
     null, null, null, "SIAMcounts", "_blank", "SIAMcounts"); 
websites[websites_nbr++] = SIAMcounts;

/* Site by the MAA */
var MAAcasestudies = new item
    ("Mathematics and the Real World from the Mathematical Society of America (MAA)",	  
     "Mathematics and the Real World from the Mathematical Society of America (MAA)",
     "https://maa.org/math-values/mathematics-and-the-real-world/",
     "https://maa.org/math-values/mathematics-and-the-real-world/",
     null, null, null, "MAAcasestudies", "_blank", "MAAcasestudies"); 
websites[websites_nbr++] = MAAcasestudies;

/******************************************************************
 * Menu structure
 ******************************************************************/

var ROOT = new Array();
var root_nbr = 0;

/* This is a fictive item for the root of the menu only */
var ROOT_item = new item(null, null, null, null, null, null, ROOT,
			 "ROOT", "ROOT", "ROOT");

/**/
var welcomeLinks = new Array();
ROOT[root_nbr] = initItem(welcomeMenu, ROOT_item, ROOT, welcomeLinks);
{
    var welcome_nbr = 0;

    var teachLinks = new Array();
    welcomeLinks[welcome_nbr] = initItem
	(teachMenu, ROOT[root_nbr], welcomeLinks, teachLinks);
    {
	var teach_nbr = 0;
	teachLinks[teach_nbr++] = initItem(Mobius, welcomeLinks[welcome_nbr],
					   teachLinks, null);

	var mobiusLinksA = new Array();
	teachLinks[teach_nbr] = initItem(Mbs, welcomeLinks[welcome_nbr],
					   teachLinks, mobiusLinksA);
	{
	    var mobius_nbrA = 0;
	    var mobiusLinksB = new Array();
	    mobiusLinksA[mobius_nbrA] = initItem
		(Mbs_using, teachLinks[teach_nbr], mobiusLinksA, mobiusLinksB);
	    {
		var mobius_nbrB = 0;
		mobiusLinksB[mobius_nbrB++] = initItem
		    (Mbs_quest_prev, mobiusLinksA[mobius_nbrA],
		     mobiusLinksB, null);
		mobiusLinksB[mobius_nbrB++] = initItem
		    (Mbs_assign, mobiusLinksA[mobius_nbrA],
		     mobiusLinksB, null);
		mobiusLinksB[mobius_nbrB++] = initItem
		    (Mbs_policy, mobiusLinksA[mobius_nbrA],
		     mobiusLinksB, null);
		mobiusLinksB[mobius_nbrB++] = initItem
		    (Mbs_adaptive, mobiusLinksA[mobius_nbrA],
		     mobiusLinksB, null);
		mobiusLinksB[mobius_nbrB++] = initItem
		    (Mbs_proctor, mobiusLinksA[mobius_nbrA],
		     mobiusLinksB, null);
		mobiusLinksB[mobius_nbrB++] = initItem
		    (Mbs_grade_review, mobiusLinksA[mobius_nbrA],
		     mobiusLinksB, null);
		mobiusLinksB[mobius_nbrB++] = initItem
		    (Mbs_grades, mobiusLinksA[mobius_nbrA],
		     mobiusLinksB, null);
		mobiusLinksB[mobius_nbrB++] = initItem
		    (Mbs_management, mobiusLinksA[mobius_nbrA],
		     mobiusLinksB, null);
		mobiusLinksB[mobius_nbrB++] = initItem
		    (Mbs_owner, mobiusLinksA[mobius_nbrA],
		     mobiusLinksB, null);
	    }
	    mobius_nbrA++;
	    var mobiusLinksC = new Array();
	    mobiusLinksA[mobius_nbrA] = initItem
		(Mbs_using_BS, teachLinks[teach_nbr], mobiusLinksA,
		 mobiusLinksC);
	    {
		var mobius_nbrC = 0;
		mobiusLinksC[mobius_nbrC++] = initItem
		    (Mbs_link_class, mobiusLinksA[mobius_nbrA],
		     mobiusLinksC, null);
		mobiusLinksC[mobius_nbrC++] = initItem
		    (Mbs_BS_module, mobiusLinksA[mobius_nbrA],
		     mobiusLinksC, null);
		mobiusLinksC[mobius_nbrC++] = initItem
		    (Mbs_link_assign, mobiusLinksA[mobius_nbrA],
		     mobiusLinksC, null);
		mobiusLinksC[mobius_nbrC++] = initItem
		    (Mbs_link_gradebook, mobiusLinksA[mobius_nbrA],
		     mobiusLinksC, null);
		mobiusLinksC[mobius_nbrC++] = initItem
		    (Mbs_brightspace, mobiusLinksA[mobius_nbrA],
		     mobiusLinksC, null);
	    }
	    mobius_nbrA++;
	    var mobiusLinksD = new Array();
	    mobiusLinksA[mobius_nbrA] = initItem
		(Mbs_content, teachLinks[teach_nbr], mobiusLinksA,
		 mobiusLinksD);
	    {
		var mobius_nbrD = 0;
		mobiusLinksD[mobius_nbrD++] = initItem
		    (Mbs_structure, mobiusLinksA[mobius_nbrA],
		     mobiusLinksD, null);
		var mobiusLinksE = new Array();
		mobiusLinksD[mobius_nbrD] = initItem
		    (Mbs_quest_creat, mobiusLinksA[mobius_nbrA],
		     mobiusLinksD, mobiusLinksE);
		{
		    var mobius_nbrE = 0;
		    mobiusLinksE[mobius_nbrE++] = initItem
			(Mbs_maple_graded, mobiusLinksD[mobius_nbrD],
			 mobiusLinksE, null);
		    mobiusLinksE[mobius_nbrE++] = initItem
			(Mbs_algo, mobiusLinksD[mobius_nbrD],
			 mobiusLinksE, null);
		    mobiusLinksE[mobius_nbrE++] = initItem
			(Mbs_algo_maple, mobiusLinksD[mobius_nbrD],
			 mobiusLinksE, null);
		    mobiusLinksE[mobius_nbrE++] = initItem
			(Mbs_math_app, mobiusLinksD[mobius_nbrD],
			 mobiusLinksE, null);
		}
	    }
	}
	teach_nbr++;

	teachLinks[teach_nbr++] = initItem
	    (LectureNotes, welcomeLinks[welcome_nbr], teachLinks, null);
    }
    welcome_nbr++;
    
    var mathLinks = new Array();
    welcomeLinks[welcome_nbr] = initItem(mathMenu, ROOT[root_nbr],
					   welcomeLinks, mathLinks);
    {
	var math_nbr = 0;
	mathLinks[math_nbr++] = initItem
	    (math_impact, welcomeLinks[welcome_nbr], mathLinks, null);

	var applyLinks = new Array();
	mathLinks[math_nbr] = initItem
	    (math_disc, welcomeLinks[welcome_nbr], mathLinks, applyLinks);
	{
	    var apply_nbr = 0;
	    applyLinks[apply_nbr++]
		= initItem(fractal1, mathLinks[math_nbr], applyLinks, null); 
	    applyLinks[apply_nbr++]
		= initItem(fractal2, mathLinks[math_nbr], applyLinks, null); 
	    applyLinks[apply_nbr++]
		= initItem(fractal3, mathLinks[math_nbr], applyLinks, null); 
	    applyLinks[apply_nbr++]
		= initItem(fractal4, mathLinks[math_nbr], applyLinks, null); 
	}
	math_nbr++;

	mathLinks[math_nbr++] = initItem
	    (matlab, welcomeLinks[welcome_nbr], mathLinks, null);

	var mapleLinks = new Array();
	mathLinks[math_nbr] = initItem
	    (maple, welcomeLinks[welcome_nbr], mathLinks, mapleLinks);
	{
	    var maple_nbr = 0;
	    mapleLinks[maple_nbr++]
		= initItem(lin_alg, mathLinks[math_nbr], mapleLinks, null); 
	    mapleLinks[maple_nbr++]
		= initItem(solv_equ, mathLinks[math_nbr], mapleLinks, null); 
	    mapleLinks[maple_nbr++]
		= initItem(data_sets, mathLinks[math_nbr], mapleLinks, null); 
	    mapleLinks[maple_nbr++]
		= initItem(ODE_O1, mathLinks[math_nbr], mapleLinks, null);
	    mapleLinks[maple_nbr++]
		= initItem(ODE_O2_const_coeff, mathLinks[math_nbr], mapleLinks,
			   null); 
	    mapleLinks[maple_nbr++]
		= initItem(ODE_systems, mathLinks[math_nbr], mapleLinks, null); 
	    mapleLinks[maple_nbr++]
		= initItem(Laplace_transf, mathLinks[math_nbr], mapleLinks,
			   null); 
	    mapleLinks[maple_nbr++]
		= initItem(Fourier_series, mathLinks[math_nbr], mapleLinks,
			   null); 
	    mapleLinks[maple_nbr++]
		= initItem(ODE_O2_var_coeff, mathLinks[math_nbr], mapleLinks,
			   null); 
	    mapleLinks[maple_nbr++]
		= initItem(PDE, mathLinks[math_nbr], mapleLinks, null); 
	    mapleLinks[maple_nbr++]
		= initItem(Maple_programs, mathLinks[math_nbr], mapleLinks, null); 
	}
	math_nbr++;
    }
    welcome_nbr++;

    welcomeLinks[welcome_nbr++] = initItem(researchMenu, ROOT[root_nbr],
					   welcomeLinks, null);
}
root_nbr++

/**/
ROOT[root_nbr++] = initItem(MSdept, ROOT_item, ROOT, null);

/**/
var planLinks = new Array();
ROOT[root_nbr] = initItem(plan, ROOT_item, ROOT, planLinks);
{
    var plan_nbr = 0;
    planLinks[plan_nbr] = initItem
	(index_websites, ROOT[root_nbr], planLinks, null);
}
root_nbr++
