$(document).ready(function () {
  var main = $('#main div');
  var name = $('#name');
  var img = $('#img');
  // var scale = main.height()/270;
  var scale = $(window).width() / 480;
  // console.log(scale)
  update()
  $(window).resize(function () {
    scale = $(window).width() / 480;
    update();
  });

  function update() {
    $('div.wrapper').css('transform', `scale(${scale}) translate3d(0,0,0)`)
    name.css('left', name.attr('left') + 'px')
    name.css('top', name.attr('top') + 'px')
    $('#name h4').css('transform', `scale(${name.attr('scale')}) translate3d(0,0,0)`)
    img.css('left', img.attr('left') + 'px')
    img.css('top', img.attr('top') + 'px')
    img.css('transform', `scale(${img.attr('scale')}) translate3d(0,0,0)`)
  }
});