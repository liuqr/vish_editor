var VISH = VISH || {};

VISH.Mods || (VISH.Mods = {});

VISH.VERSION = '0.1';
VISH.AUTHORS = 'GING';

VISH.ImagesPath = "/vishEditor/images/";
VISH.StylesheetsPath = "/vishEditor/stylesheets/";

VISH.Editing = false;  //variable to know in the common classes between editor and viewer if we are editing


VISH.ViewerEngine = "presentation"; //can be "presentation", "game", "flashcard"

/* global variables to store slide elements and point to current slide*/
VISH.slideEls;
VISH.curSlide;
