EmberApp = {
  convertor: {},
  bindEvents: function(){
    $(document).delegate('a', "click", function(event){
      if($(this).hasClass("guide-links")){
        EmberApp.handleAJAXforGuideLinks($(this))
        event.preventDefault();
      }else{
        if($(this).attr("href").indexOf("/guides") == 0){
          EmberApp.sendAJAX(window.location.pathname + $(this).attr("href") + ".md", $(this).text())
          event.preventDefault()
        }
      }
    })
  },
  handleAJAXforGuideLinks: function(element){
    $parent_el  = $(element).closest('ul')
    parent_dir  = $parent_el.data("source-directory").toString()
    source_file = $(element).data("source-file").toString()
    EmberApp.sendAJAX(parent_dir+source_file+".md", $(element).text())
  },
  sendAJAX: function(url, page_title){
    $.ajax({
      method: "GET",
      url: url,
      success: function(data, status, xhr){
        page_html = EmberApp.makeHtml(data)
        EmberApp.navigateToPage(page_html, page_title)
      }
    })
  },
  makeHtml: function(data){
    EmberApp.convertor = new Showdown.converter()
    return EmberApp.convertor.makeHtml(data.toString())
  },
  navigateToPage: function(html, title){
    $('#content-page #page-title').html(title)
    $('#content-page #page-body').html(html)
    $.mobile.navigate("#content-page")
  }
}

$(document).bind('pageinit', function(){
  EmberApp.bindEvents()
})