(function($) {

    "use strict";

    $(window).on('load', function() {

        /*Page Loader active
          ========================================================*/
        $('#preloader').fadeOut();

        // Sticky Nav
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 200) {
                $('.scrolling-navbar').addClass('top-nav-collapse');
            } else {
                $('.scrolling-navbar').removeClass('top-nav-collapse');
            }
        });

        /* ==========================================================================
           countdown timer
           ========================================================================== */

        var date = '';
        var dateRef = firebase.database().ref('eventDate');
        dateRef.on('value', function(snapshot) {
            date = snapshot.val();
            jQuery('#clock').countdown(date, function(event) {
                var $this = jQuery(this).html(event.strftime('' +
                    '<div class="time-entry days"><span>%-D</span> <b>:</b> Days</div> ' +
                    '<div class="time-entry hours"><span>%H</span> <b>:</b> Hours</div> ' +
                    '<div class="time-entry minutes"><span>%M</span> <b>:</b> Minutes</div> ' +
                    '<div class="time-entry seconds"><span>%S</span> Seconds</div> '));
            });
        });



        /* Auto Close Responsive Navbar on Click
        ========================================================*/
        function close_toggle() {
            if ($(window).width() <= 768) {
                $('.navbar-collapse a').on('click', function() {
                    $('.navbar-collapse').collapse('hide');
                });
            } else {
                $('.navbar .navbar-inverse a').off('click');
            }
        }
        close_toggle();
        $(window).resize(close_toggle);

        /* WOW Scroll Spy
    ========================================================*/
        var wow = new WOW({
            //disabled for mobile
            mobile: false
        });
        wow.init();

        /* Nivo Lightbox 
        ========================================================*/
        $('.lightbox').nivoLightbox({
            effect: 'fadeScale',
            keyboardNav: true,
        });

        // one page navigation 
        $('.navbar-nav').onePageNav({
            currentClass: 'active'
        });

        /* Counter
        ========================================================*/
        $('.counterUp').counterUp({
            delay: 10,
            time: 1500
        });

        /* Back Top Link active
        ========================================================*/
        var offset = 200;
        var duration = 500;
        $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
                $('.back-to-top').fadeIn(400);
            } else {
                $('.back-to-top').fadeOut(400);
            }
        });

        $('.back-to-top').on('click', function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 600);
            return false;
        });

        /* ==========================================================================
           loading video
           ========================================================================== */

        function load_speakers() {
            var speakersRef = firebase.database().ref('speakers');
            speakersRef.on('value', function(snapshot) {

                var html = '';
                snapshot = Array.from(snapshot.val());

                for (let speaker of snapshot) {
                    html +=
                        `
            <div class="col-lg-3 col-md-6 col-xs-12">
              <!-- Team Item Starts -->
              <div class="team-item wow fadeInUp" data-wow-delay="1.4s">
                  <div class="team-img">
                      <img class="img-fluid" src="${speaker.img}" alt="">
                      <div class="team-overlay">
                          <div class="overlay-social-icon text-center">
                              <ul class="social-icons">
                                  <li><a href="${speaker.twitter}"><i class="lni-twitter-filled" aria-hidden="true"></i></a></li>
                                  <li><a href="${speaker.google}"><i class="lni-google" aria-hidden="true"></i></a></li>
                                  <li><a href="${speaker.facebook}"><i class="lni-facebook-filled" aria-hidden="true"></i></a></li>
                                  <li><a href="${speaker.pinterest}"><i class="lni-pinterest" aria-hidden="true"></i></a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="info-text">
                      <h3><a href="${speaker.twitter}">${speaker.name}</a></h3>
                      <p>${speaker.career}</p>
                  </div>
              </div>
              <!-- Team Item Ends -->
          </div>
          `;
                }

                $("#speakersPanel").html(html);
            });
        }
        load_speakers();


        /* ==========================================================================
           loading dynamic Information
           ========================================================================== */

        function load_info() {
            var dateRef = firebase.database().ref('eventDateInWords');
            dateRef.on('value', function(snapshot) {
                $("#eventDateInwords").html(snapshot.val());
            });

            var locationRef = firebase.database().ref('eventLocation');
            locationRef.on('value', function(snapshot) {
                $("#eventLocation").html(snapshot.val());
            });

            var nameRef = firebase.database().ref('eventName');
            nameRef.on('value', function(snapshot) {
                $("#eventName").html(snapshot.val());
            });
        }
        load_info();

    });


}(jQuery));