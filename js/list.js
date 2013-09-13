$(function(){
  $.getJSON("http://drewandjenben.com/api/rsvp", function(data) {
    $.each(data, function(key, val) {
      var items = [];

      $.each(val.names, function(key, val) {
        if(val){
          items.push('<li>' + val + '</li>');
        }
      });
      $('<span>RSVP ON '+new Date(val.lastModified*1000)+'</span>').appendTo('#names');
      $('<ul id="'+ val._id +'">'+items.join('')+'</ul>').appendTo('#names');

      $('<hr/>').appendTo('#names');
    });
  });
});
