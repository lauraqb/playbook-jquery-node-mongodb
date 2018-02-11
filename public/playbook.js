var myPlaybookApp = (function() 
{
    'use strict';
  
    var DB_MODE = true;
    var db_plays = {};
    var random_plays = {};
    var i = 0;
    var interval = 0;
    var seconds = 15;
    var timeleft;
    //DOM variables
    var staticPlayName = '#static-test .play-name';
    var staticPlayNote = '#static-test .play-note';
    var staticPlayCounter = '#static-test #playCounter';
    var timingPlayName = '#timing-test .play-name';
    var timingPlayNote = '#timing-test .play-note';
    var timingPlayCounter = '#timing-test #playCounter';
    var staticButton = 'button.static-btn';
    var timingButton = 'button.timing-btn';

    // AJAX calls  
    var getPlaybook = function() {  
        if(DB_MODE)
        {        
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/ajaxcall',  
                dataType: 'json'
                })
                .done( function(data){ 
                    db_plays = data;
                    random_plays = shuffle(db_plays);
            }); 
        }
        else
            //plays shoud be in an external file
            random_plays = shuffle(plays);
    }; 

    var init = function() 
    {  
        getPlaybook();
        initEvents();
    }

    var initEvents = function() {
        initStaticTestEvents();
        initTimingEvents();
        //key event
        window.onkeydown = function(e) {
            e = e || window.event;
            if (e.keyCode == '37' && i>1) { // left arrow 
                if ($(staticButton).attr('aria-expanded') == "true") {
                    i=i-2;
                    showPlay();
                }
            }
            else if (e.keyCode == '39') // right arrow  
                if ($(staticButton).attr('aria-expanded') == "true") 
                    showPlay();
                else {
                    i++;
                    showTimingPlay();
                }
        }
    }

    var initStaticTestEvents = function() {
        $(staticButton).click(function(){
            clearInterval(interval);
            if ($(staticButton).attr('aria-expanded') != "true") {
                $('.collapse').collapse('hide'); //hide the timer button play if is extended
                i = 0;
                showPlay();
            }
        });
        //next button event
        $("button.nextPlay").click(function() {
            showPlay();
        });
        //touch event
        $(staticPlayName).swipe( {
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left')
                    showPlay();
                else if (direction == 'right' && i>1)
                    i=i-2;
                    showPlay();
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:0
        });
    }

    var initTimingEvents = function initTimingTestEvents() 
    {
        $(timingButton).click(function() {
            i=0;
            clearInterval(interval);
            initTimingEvents();
            if ($(timingButton).attr('aria-expanded') != "true") {
                $('.collapse').collapse('hide'); //hide the other button play if is extended
                showTimingPlay();
                interval = setInterval(myTimer, 1000);

                function myTimer() {
                    timeleft--;
                    $("#countdowntimer").text(timeleft);
                    $('.progress .progress-bar').css("width",
                        function() {
                            return (timeleft*100/seconds) + "%";
                        }
                    )
                    if (timeleft <=2) {
                        $(timingPlayNote).css("color", "grey")
                    }
                    if(timeleft <= 0) {
                        $(timingPlayNote).css("color", "white")
                        i++;
                        showTimingPlay();
                    }
                }
            }
        });
        //swipe event
        $(timingPlayName).swipe( {
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') {
                    i++;
                    showTimingPlay();
                }
            },
            threshold:0
        });
    }

    var showPlay = function showStaticTestPlay() 
    {
        $(staticPlayName).text(random_plays[i].name);
        $(staticPlayNote).text(random_plays[i].notes);
        i++;
        $(staticPlayCounter).text(i+"/"+random_plays.length);
        if (i==random_plays.length) {
          $("button.nextPlay").text("Volver a repasarlas");
          random_plays = shuffle(plays);
          i=0;
        }
        else
          $("button.nextPlay").text("Siguiente");
    }

    var showTimingPlay = function showTimingTestPlay()
    {
        timeleft = seconds;
        if (i==random_plays.length) { 
            clearInterval(interval);
            $("#countdowntimer").text("END");
            $('.progress .progress-bar').css("width", "0%");
        } else {
            $(timingPlayName).text(random_plays[i].name);
            $(timingPlayNote).text(random_plays[i].notes);
            $(timingPlayCounter).text((i+1)+"/"+random_plays.length);
            $("#countdowntimer").text(timeleft);
            $('.progress .progress-bar').css("width", "100%");
        }
    }

    function shuffle(sourceArray) {
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));
            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }


    return {
        init:init
    }

})();


$("document").ready(function () {
    myPlaybookApp.init();
});