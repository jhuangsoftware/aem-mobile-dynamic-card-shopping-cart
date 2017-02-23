document.addEventListener('deviceready', function () {
    function init(){
        $('#page .row:first').empty();

        var cartObj = new Cart();

        var cartJson = cartObj.loadItems();

        $.each(cartJson.cart, function(){
            var cartEntity = this;

            // get latest version of the article meta
            window.cq.mobile.context.getEntity(
                cartEntity.name,
                'article',
                true,
                function(data){
                    var pageMetaObj = new PageMeta();
                    var currentCollection;
                    var currentEntity = data;

                    pageMetaObj.constructPageJson(currentCollection, currentEntity, 100, 100, function(pageJson){
                        pageJson.cartentity = cartEntity;
                        var theTemplateScript = $('#template-page').html().replace(/\u200B/g,'');
                        var theTemplate = Handlebars.compile(theTemplateScript);
                        $('#page .row:first').append(theTemplate(pageJson));
                    });
                },
                function(){
                    console.log('failed ' + cartEntity.name);
                }
            );
        });

        $('#page').on('click', '.thumbnail .caption .btn', function(){
            cartObj.removeItem($(this).attr('data-guid'));
            $(this).closest('.thumbnail').parent().remove();

            cartObj.flagCount();
            cartObj.flagPrice();
        });
    }

    window.onAppear = function() {
        init();
    };

    init();
}, false);