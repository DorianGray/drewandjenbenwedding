$(function(){
  $.getJSON("/api/rsvp", function(data) {
    $.each(data, function(key, val) {
      var items = [];

      $.each(val.names, function(key, val) {
        if(val){
          items.push('<li>' + val + '</li>');
        }
      });
      $('<span style="font-size:10px;">'+new Date(val.lastModified*1000)+'</span>').appendTo("#names");
      if(val.title){
        $('<br /><span>Party Of '+val.title+'</span>').appendTo('#names');
      }
      $('<ul class="names-list" id="'+ val._id +'">'+items.join('')+'</ul>').appendTo('#names');
      if(val.message){
        $('<span>Message:<br />'+val.message+'</span>').appendTo('#names');
      }

      $('<hr/>').appendTo('#names');
    });
  });
});
