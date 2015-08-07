/*  Copyright 2014 gokoururi
    This work is free. You can redistribute it and/or modify it under the
    terms of the Do What The Fuck You Want To Public License, Version 2,
    as published by Sam Hocevar. See the COPYING file for more details. */
function controlMascot(mascot, mascotMinWidth) {
    $(window).resize(function(event) {
        if ( $(window).width() <= mascotMinWidth && $("homepage").hasClass("mascot") ) {
            removeMascot();
        } else if( $(window).width() > mascotMinWidth && ! $("homepage").hasClass("mascot") ) {
            setMascot(mascot);
        }
    });
}

function setMascot(mascot) {
    $('homepage').addClass("mascot");
    $('homepage').css("background-image", "url(" + mascot + ")");
    $('homepage').removeClass("plain");
}

function removeMascot() {
    $('homepage').removeClass("mascot");
    $('homepage').css("background-image", "");
    $('homepage').addClass("plain");
}

$(document).ready(function(event) {
    var mascotEnable    = true;

    var mascot          = mascotPath + mascotList[Math.floor(Math.random() * mascotList.length)];
    var mascotMinWidth  = 750;

    if ( mascotEnable ) {
        setMascot(mascot);
        controlMascot(mascot, mascotMinWidth);
    } else { removeMascot(); }
});
