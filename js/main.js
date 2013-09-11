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
