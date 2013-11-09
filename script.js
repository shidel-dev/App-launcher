window.onload = function() {

    var wheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" ; //changes event type depending on browser
    var menu = document.getElementById('menu');
    var container = document.getElementById('pop_container');
    var popup = document.getElementById('popup');
    var up = false; // boolean stating if launcher in showing
    var eTarget;
    var top = true; // boolean stating if launcher window is scrolled to top
    
    for (i = 0; i < 9; i++) {
        popup.innerHTML += "<img class='icon' onClick='linkFunk()' src='icon.png'>" ;// adding icons to launcher
    }
    popup.innerHTML += "<div id='spacer'><div id='more' >More</div></div>"; //adding a div
    for (i = 0; i < 9; i++) {
        popup.innerHTML += "<img class='icon' onClick='linkFunk()' src='icon.png'>"; // adding more icons
    }
    popup.innerHTML += "<div id='space'>Have a Good Day!</div>"; //message at end
    var more = document.getElementById('more');
    menu.addEventListener("click", trigger); //adding event for clicks on launcher icon

        function trigger() { //function handles bringing launcher up and down

            if (up == false) {
                popup.style.overflowY = "hidden";
                more.style.height = "40px";
                container.style.visibility = 'visible';
                more.style.fontSize = "12pt";
                popup.scrollTop = 0;


                top = true;

                up = true;
            } else if (up == true) {

                container.style.visibility = 'hidden';
                up = false;


            }

        }

       //adding event listeners for scrolling depending on browser 
    if (popup.attachEvent) { //if IE (and Opera depending on user setting)
        popup.attachEvent("on" + wheelevt, scrollView);
    } else if (popup.addEventListener) { //WC3 browsers
        document.addEventListener(wheelevt, scrollView, false);
    };


    function scrollView() { // function that handles mouse wheel and scroll gestures


        if (popup.scrollTop == 0 && top == true) {

            popup.style.overflowY = "scroll";

        }
        if (popup.scrollTop > 1 && top == true) {
            more.style.height = "2px";
            more.style.fontSize = "0pt";
            top = false;




        }

    }


    more.addEventListener('click', function() {
        popup.style.overflowY = "scroll";
        more.style.height = "2px";
        more.style.fontSize = "0pt";
        top = false;

        scrollTo(popup, space.offsetTop, 400)// triggers animated scroll to bottom of launcher



    })

    function scrollTo(element, to, duration) { //function achieves animated scrolling without jQuery
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function() {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    Math.easeInOutQuad = function(t, b, c, d) { //adds ease in animation to scrollTo function
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };





    popup.onscroll = function() {//handles scroll events on popup element


        if (popup.scrollTop == 0 && top == false) {

            more.style.height = "40px";
            more.style.fontSize = "12pt"
            popup.style.overflowY = "hidden";
            top = true;
            console.log("ons");

        }
    }

    function childOf(c, p) { // function detects if element is a child of another
        while ((c = c.parentNode) && c !== p);
        return !!c
    }


    window.addEventListener('click', function(e) { // handles click outside of launcher in order to hide it
        eTarget = e.target;
        if (childOf(eTarget, popup) != true && eTarget != menu) {
            up = true;
            trigger();

        }
    })


}

function linkFunk() { // links top my website :-)

    window.location.assign("http://www.shidel.com")



}