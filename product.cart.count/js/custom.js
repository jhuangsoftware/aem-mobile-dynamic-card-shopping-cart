document.addEventListener('deviceready', function () {
    var cartObj;

    function init(){
        cartObj = new Cart();

        var pageJson = cartObj.loadItems();
        pageJson.count = pageJson.cart.length;

        var theTemplateScript = $('#template-page').html().replace(/\u200B/g,'');
        var theTemplate = Handlebars.compile(theTemplateScript);
        $('#page').empty();
        $('#page').append(theTemplate(pageJson));
    }

    window.onAppear = function() {
        init();
    }

    window.setInterval(function(){
        if(cartObj.isCountFlagged()) {
            cartObj.unflagCount();

            init();
        }
    }, 500);

    init();
}, false);