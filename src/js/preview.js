$(document).ready(() => {
  $('#preview-text').text($('input[name="name"]').val())
  $('#preview-text').css('left', $('input[name="text-left"]').val() + 'px')
  $('#preview-text').css('top', $('input[name="text-top"]').val() + 'px')
  $('#preview-text').css('transform', `scale(${$('input[name="text-scale"]').val()})`)

  $('.preview-image').css('left', $('input[name="img-left"]').val() + 'px')
  $('.preview-image').css('top', $('input[name="img-top"]').val() + 'px')
  $('.preview-image').css('transform', `scale(${$('input[name="img-scale"]').val()})`)
  $('.preview-image').addClass($('select[name="rendering"]').val())
  console.log($('select[name="rendering"]').val() + '')

  $('input[name="name"]').keyup(function (e) {
    $('#preview-text').text($(this).val());
  });


  $('input[name="text-left"]').change(function (e) {
    $('#preview-text').css('left', $(this).val() + 'px');
  });
  $('input[name="text-top"]').change(function (e) {
    $('#preview-text').css('top', $(this).val() + 'px');
  });
  $('input[name="text-scale"]').change(function (e) {
    $('#preview-text').css('transform', `scale(${$(this).val()})`);
  });


  $('.preview-image').attr('src', $('input[name="url"]').val())
  $('input[name="url"]').keyup(function (e) {
    $('.preview-image').attr('src', $(this).val());
  });

  $('input[name="img-left"]').change(function (e) {
    $('.preview-image').css('left', $(this).val() + 'px');
  });
  $('input[name="img-top"]').change(function (e) {
    $('.preview-image').css('top', $(this).val() + 'px');
  });
  $('input[name="img-scale"]').change(function (e) {
    $('.preview-image').css('transform', `scale(${$(this).val()})`);
  });


  $('select[name="rendering"]').change(function (e) {
    $('.preview-image').toggleClass('pixelated');
  })

  var numPokemon = 809;
  for (var i = 1; i <= numPokemon; i++) {
    var str = '<tr class="pokemon" id="' + i + '"></tr>';
    $('#pokeAPI').append(str);
  }
  var pokedex = [];
  for (var i = 1; i <= numPokemon; i++) {
    if(i * 0.1 < 1) {
      $('.pokemon#' + i).append(`<td>00${i}</td>`);
    } else if (i * 0.1 < 10) {
      $('.pokemon#' + i).append(`<td>0${i}</td>`);
    } else {
      $('.pokemon#' + i).append(`<td>${i}</td>`);
    }
    $.get('https://pokeapi.co/api/v2/pokemon/' + i, function (res) {
      pokedex[res.id] = res;
      var url = res.sprites.front_default;
      var img = `<img src="${url}">`;
      $('.pokemon#' + res.id).append(`<td>${img}</td><td>${res.name}</td><td><input type="text" value="${url}" class="form-control"></td>`);
    }, 'json');
  }
})