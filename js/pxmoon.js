var _1years = 1229 // 3474.8 15.2329
var life = 15.2329
var unit = 'years'
var delimeter = ','
var decimalmark = '.'
var unitname = 'years'
var currentRAFID = 0
var unitTable = {
    years: 1,
    pixels: 0.000813651421205,
    morrisonGovernments: 0.265456186456,
    queenLives: 0.0103926445019,
    lives: 1 / life
}
var startX = window.pageXOffset
$(document).ready(function() {
    $('html, body').mousewheel(function(e, delta) {
        if (Math.abs(e.deltaX)) {
            return
        } else {
            this.scrollLeft -= (e.deltaY * 15);
        }
        e.preventDefault();
    });
    updateDistance()
});
$(function() {
    if (typeof window.performance === 'undefined') {
        window.performance = {};
    }
    if (!window.performance.now) {
        var nowOffset = Date.now();
        if (performance.timing && performance.timing.navigationStart) {
            nowOffset = performance.timing.navigationStart
        }
        window.performance.now = function now() {
            return Date.now() - nowOffset;
        }
    }
    $('ul.nav a.planetjump').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollLeft: $($anchor.attr('href')).offset().left
        }, 5000, 'easeInOutExpo');
        event.preventDefault();
    })
    var essayMarks = [];
    $('.essay').each(function() {
        essayMarks.push($(this).offset().left - 200)
    });
    var eventMarks = [$('#cretaceous-paleogene').offset().left - 200, $('#triassic-jurassic').offset().left - 200, $("#permian-triassic").offset().left - 200, $("#late-devonian").offset().left - 200, $("#ordovician-silurian").offset().left - 200, $("#moon-creation").offset().left - 200];
    var destinations = $.makeArray(essayMarks).concat($.makeArray(eventMarks));
    destinations.sort(function(a, b) {
        return a - b
    });
    var destinationNext = destinations[0];
    $('ul.nav a.nextjump').bind('click', function(event) {
        var currentDist = (window.pageXOffset);
        $.each(destinations, function(index, value) {
            if (currentDist >= value - 100) {
                destinationNext = destinations[index + 1];
            } else {
                return false
            }
        });
        $('html, body').stop().animate({
            scrollLeft: destinationNext
        }, 4500, 'easeInOutQuad');
        event.preventDefault();
    })
    $('ul.nav a.prevjump').bind('click', function(event) {
        var currentDist = (window.pageXOffset);
        $.each(destinations, function(index, value) {
            if (currentDist <= value + 100) {
                destinationNext = destinations[index - 1];
                return false
            }
        });
        $('html, body').stop().animate({
            scrollLeft: destinationNext
        }, 4500, 'easeInOutQuad');
        event.preventDefault();
    })
    $('#distance-counter').on('click', function(e) {
        var $units = $('#unitselect')
        $units.css('display', $units.css('display') == 'none' ? 'block' : 'none')
    })
    $('#unitselect li').on('click', function(e) {
        unit = $(e.target).attr('id')
        unitname = $(e.target).text()
        updateDistance()
        $('#unitselect').css('display', 'none')
        return false
    })
});

function updateDistance() {
    var px = (window.pageXOffset - $('#bigspace').position().left + $(window).width() / 2);
    var years = px * _1years;
    var distance = years * unitTable[unit];
    $('#counter').text(Math.max(0, distance.toFixed(1)).toString().replace(".", decimalmark).replace(/\B(?=(\d{3})+(?!\d))/g, delimeter) + ' ' + $('#' + unit).text());
    const bs = $("#bigspace")
    switch (true) {
        case (0 <= years && years < 600000000): // Hadean
            bs.css("background-color", "#541414");
            break;
        case (600000000 <= years && years < 2100000000): // Archean
            bs.css("background-color", "#555659");
            changeContrast(false)
            break;
        case (2100000000 <= years && years < 4059000000): // Proterozoic
            bs.css("background-color", "#ffffff");
            changeContrast(true)
            break;
        case (4059000000 <= years && years < 4349000000): // Paleozoic
            bs.css("background-color", "#415742");
            changeContrast(false)
            break;
        case (4349000000 <= years && years < 4534000000): // Mesozoic
            bs.css("background-color", "#745f3c");
            break;
        case (4534000000 <= years && years < 4619731200): // Cenozoic
            bs.css("background-color", "#492c28");
            break;
    }
}

function changeContrast(black) {
    if (black == true) {
        $("a").css("color", "#000")
        $(".essay").css("color", "#000")
        $("#counter").css("color", "#000")
        $("#bigspace").css("background-image", "url('img/ticks2black.svg')")
        $("#selectarrow").html("<img src='img/selectarrowblack.svg'>")
        $(".nextjump").html("<img src='img/jumpnextblack.svg'>")
        $(".prevjump").html("<img src='img/jumpprevblack.svg'>")
    } else {
        $("a").css("color", "#aaa")
        $(".essay").css("color", "#cdcdcd")
        $("#counter").css("color", "#aaa")
        $("#bigspace").css("background-image", "url('img/ticks2.svg')")
        $("#selectarrow").html("<img src='img/selectarrow.svg'>")
        $(".nextjump").html("<img src='img/jumpnext.svg'>")
        $(".prevjump").html("<img src='img/jumpprev.svg'>")
    }
}

$('#monitors').text(Math.floor($('#bigspace').width() / screen.availWidth / window.devicePixelRatio));
$(window).scroll(updateDistance);