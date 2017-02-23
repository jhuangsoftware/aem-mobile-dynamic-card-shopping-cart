document.addEventListener('deviceready', function () {
    var cartObj;

    function drawCartPrice(cartJson){
        var theTemplateScript = $('#template-page').html().replace(/\u200B/g,'');
        var theTemplate = Handlebars.compile(theTemplateScript);
        $('#page').empty();
        $('#page').append(theTemplate(cartJson));
    };

    function init(){
        cartObj = new Cart();

        var cartJson = cartObj.loadItems();
        cartJson.count = cartJson.cart.length;
        var cartJsonProcessed = 0;

        // init price
        cartJson.price = 0;

        if(cartJson.count == 0){
            drawCartPrice(cartJson);
        }

        $.each(cartJson.cart, function(){
            var entityName = this.name;

            // get latest version of the article meta
            window.cq.mobile.context.getEntity(
                entityName,
                'article',
                true,
                function(data){
                    var pageMetaObj = new PageMeta();
                    var currentCollection;
                    var currentEntity = data;

                    pageMetaObj.constructPageJson(currentCollection, currentEntity, undefined, undefined, function(pageJson){
                        cartJson.price += parseFloat(pageJson.entity.price);

                        cartJsonProcessed++;

                        if(cartJsonProcessed == cartJson.count) {
                            drawCartPrice(cartJson);
                        }
                    });
                },
                function(){
                    console.log('failed ' + entityName);
                }
            );
        });
    }

    window.onAppear = function() {
        init();
    };

    window.setInterval(function(){
        if(cartObj.isPriceFlagged()) {
            cartObj.unflagPrice();

            init();
        }
    }, 500);

    init();
}, false);