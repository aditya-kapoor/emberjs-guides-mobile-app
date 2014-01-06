$(document).bind('pageinit', function(){
  $('.guide-links').click(function(event){
    $parent_el  = $(this).closest('ul')
    parent_dir  = $parent_el.data("source-directory").toString()
    source_file = $(this).data("source-file").toString()
    $.ajax({
      method: "GET",
      url: parent_dir+source_file,
      success: function(data, status, xhr){
        convertor = new Showdown.converter()
        html = convertor.makeHtml(data)
        $('#content-page div').html(html)
        $.mobile.navigate("#content-page")
      }
    })
    event.preventDefault();
  })
})