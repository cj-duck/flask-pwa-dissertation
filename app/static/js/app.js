// Register Service Worker
var swRegistration = null;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./service-worker.js')
    .then(function(registration) {
        console.log('[ServiceWorker] Service Worker Registered');
        swRegistration = registration;
        return registration;
    })
    .catch(function(err) {
        console.error('[ServiceWorker] Unable to register service worker.', err);
    });
}

console.log(swRegistration);

const pushButton = document.getElementById('js-push-btn');
pushButton.addEventListener('click', askPermission);
notificationButtonUpdate();

if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
    pushButton.hidden;
  }

$(function () {
  $('[data-toggle="popover"]').popover({
    html: true,
    placement: 'right',
    content: function () { return '<div><img src="' + $(this).data('img') + ' " style="width:100%" /></div>'; }
   })
});

$(function () {
  $('[data-toggle="popover-left"]').popover({
    html: true,
    placement: 'left',
   })
});

$('.popover-dismiss').popover({
  trigger: 'focus'
});

function askPermission(evt) {
  pushButton.disabled = true;
  Notification.requestPermission().then(function(permission) { notificationButtonUpdate(); });

}

function notificationButtonUpdate() {
  if (Notification.permission == 'granted') {
    pushButton.disabled = true;
  } else {
    pushButton.disabled = false;
  }
}

$("#photofile").click(function () {
    $("#photofile1").trigger('click');
});

const target = document.getElementById('location-target');

function appendLocation(location, verb) {
  verb = verb || 'updated';
  var newLocation = document.createElement('p');
  newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
  target.appendChild(newLocation);
}

if ('geolocation' in navigator) {
  document.getElementById('askLocation').addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
      appendLocation(location, 'fetched');
    });
  });
} else {
  target.innerText = 'Geolocation API not supported.';
}

$(document).ready(function () {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  document.querySelector('#contentBody').addEventListener('click', function () {
    if ($(window).width() < 768) {
      if ($('#sidebar, #content').hasClass('active')) {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      }
    }
  });


  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });

  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
