jQuery(function($){
  var $doc = $(document);
  
  function getLoader(){
    return $('[jf-loading-template]').html();
  }
  
  $doc.on('click', '[jf-load]', function(e){
    var $this = $(this)
    var url = $(this).attr('jf-load');
    var $container = $('[jf-container="'+$this.attr('jf-into')+'"]');
    if ($container.length  === 0) {
      $container = $this.closest('[jf-container]');
    }
    $container.load(url);
    $container.html(getLoader());
    e.preventDefault();
  });
  
  $('[jf-container]').each(function(){
    var url = $(this).attr('jf-init');
    if (url) {
      $(this).load(url);
      $(this).html(getLoader());
    }
  });
  
  $doc.on('click', '[jf-container] [jf-clear]', function(e){
    e.preventDefault();
    var $target = $(this).closest('[jf-container]');
    $target.html('');
  });
  
  $doc.on('submit', 'form[jf-form]', function(e){
    e.preventDefault();
    var $form = $(this);
    if ($form.is('[jf-replace]')) {
      var $target = $form
    } else{
      var $target = $form.closest('[jf-container]');
    }
    
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      
      success: function(response, status, xhr) {
        if (response.redirect) {
          window.location.replace(response.redirect);
        }
        else{
          $target.html(response);
        }
      }
    });
    $target.html(getLoader());
  });
});
