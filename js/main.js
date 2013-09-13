$(function(){
  $('.nav a').on('click', function(){
    $(".navbar-toggle").click();
  });

  $('#map').gmap3({
    map: {
      options: {
        maxZoom: 14
      }
    },
    marker: {
      latLng: [33.850628,-84.713793],
      //address: "5436 HILL ROAD. POWDER SPRINGS, GA. 30127",
      options: {}
    }
  },
  "autofit" );

  $("#rsvp").on("click", ".btn-party-add", function(e) {
    var group = $(this).parent().parent().clone();
    group.children(":first").val('');
    group.insertAfter($(this).parent().parent());

    $(this)
      .toggleClass("btn-party-add")
      .toggleClass("btn-party-remove")
      .children(":first")
      .toggleClass("glyphicon-plus")
      .toggleClass("glyphicon-minus");
    e.preventDefault();
    return false;
  });

  $("#rsvp")
    .on("click", ".btn-party-remove", function(e) {
      e.preventDefault();
      $(this).parent().parent().remove();
      return false;
    })
    .on("click", "#rsvp-send", function(e) {

      var names = [];
      $("#rsvp-form input[name='party[]']").each(function() {
        names.push($(this).val());
      });
      var data = {
        names : names,
        title: $("#rsvp-form input[name='title']").val(),
        message: $("#rsvp-form textarea[name='message']").val()
      }
      var jqxhr = $.ajax({
        type: "POST",
        url: "/api/rsvp",
        data: JSON.stringify(data),
        success: function() { $("#rsvp-success").toggleClass("hidden"); $("#rsvp-form").toggleClass("hidden"); },
        dataType: "json",
        contentType: "application/json",
        processData: false,
        error: function() { $("#rsvp-failure").toggleClass("hidden"); }
      });
    });
});
