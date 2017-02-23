document.addEventListener('deviceready', function () {
    var cartObj = new Cart();
    var pageMetaObj = new PageMeta();
    var pageJson;

    var currentEntity;
    var currentCollection;

    if(window.cq) {
        //currentCollection = window.cq.mobile.context.collection;
        currentEntity = window.cq.mobile.context.entity;
    }

    pageMetaObj.constructPageJson(currentCollection, currentEntity, 1000, 1000, function(data){
        pageJson = data;
        var theTemplateScript = $('#template-page').html().replace(/\u200B/g,'');
        var theTemplate = Handlebars.compile(theTemplateScript);
        $('#page').empty();
        $('#page').append(theTemplate(pageJson));
    });

    $('body').on('click', '.add-to-cart', function(){
        var name = $('.product-name').text();
        var color = $('.product-color .active input').val();
        var size = $('.product-size .active input').val();
        cartObj.saveItem(name, color, size);
        pageJson.cartentity = {
            'name': name,
            'color': color,
            'size': size
        };

        var theTemplateScript = $('#template-confirmation-dialog').html().replace(/\u200B/g,'');
        var theTemplate = Handlebars.compile(theTemplateScript);
        $('#confirmation-dialog').empty();
        $('#confirmation-dialog').append(theTemplate(pageJson));
        $('#confirmation-dialog .modal').modal('show');
    });
}, false);
