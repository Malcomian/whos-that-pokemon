$(document).ready(function () {
  $("#search-filter").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#sortable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  function OrderBy(a, b, n) {
    if (n) return a - b;
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
  $('#sortable th').click(function () {
    var $th = $(this).closest('th');
    $th.toggleClass('selected');
    var isSelected = $th.hasClass('selected');
    var isInput = $th.hasClass('input');
    var column = $th.index();
    var $table = $th.closest('table');
    var isNum = $table.find('tbody > tr').children('td').eq(column).hasClass('num');
    var rows = $table.find('tbody > tr').get();
    rows.sort(function (rowA, rowB) {
      if (isInput) {
        var keyA = $(rowA).children('td').eq(column).children('input').val().toUpperCase();
        var keyB = $(rowB).children('td').eq(column).children('input').val().toUpperCase();
      } else {
        var keyA = $(rowA).children('td').eq(column).text().toUpperCase();
        var keyB = $(rowB).children('td').eq(column).text().toUpperCase();
      }
      if (isSelected) return OrderBy(keyA, keyB, isNum);
      return OrderBy(keyB, keyA, isNum);
    });
    $.each(rows, function (index, row) {
      $table.children('tbody').append(row);
    });
    return false;
  });
})