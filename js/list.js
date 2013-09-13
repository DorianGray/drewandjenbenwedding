$(function(){
  $.getJSON("http://drewandjenben.com/api/rsvp", function(data) {
    var items = [];

    $.each(data, function(key, val) {
      items.push('<li id="' + key + '">' + val + '</li>');
    });

    $('<ul/>', {
      'class': 'names-list',
      html: items.join('')
    }).appendTo('#names');
  });
});
