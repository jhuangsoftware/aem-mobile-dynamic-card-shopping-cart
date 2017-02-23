function PageMeta() {

}

PageMeta.prototype.constructPageJson = function (currentCollection, currentEntity, imageWidth, imageHeight, callbackFunc) {
    this.getImage(currentEntity, imageWidth, imageHeight, function (data) {
        currentEntity.thumbnailimage = data;

        $.each(currentEntity.metadata.keywords, function(index, value){
            var nameValuePair = value.split(':');
            currentEntity[nameValuePair[0]] = nameValuePair[1];
        });

        var pageEntity = {'collection': currentCollection, 'entity': currentEntity};

        if(callbackFunc){
            callbackFunc(pageEntity);
        }
    });
};

PageMeta.prototype.getImage = function (entity, width, height, callbackFunc) {
    if(entity.id) {
        if (width && height) {
            entity.getThumbnailImage(
                width,
                height,
                function (data) {
                    callbackFunc(data);
                },
                function () {
                    // on error
                    callbackFunc();
                }
            );
        } else {
            callbackFunc();
        }
    }
};