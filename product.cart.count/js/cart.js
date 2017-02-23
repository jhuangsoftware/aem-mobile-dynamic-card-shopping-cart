function Cart() {
    this.localStoreKey = 'cart';
    this.localStorePriceKey = 'price-changed';
    this.localStoreCountKey = 'count-changed';
}

Cart.prototype.loadItems = function () {
    var retItems = {cart: []};
    var data = localStorage.getItem(this.localStoreKey);

    if(data){
        retItems = JSON.parse(data);
    }

    return retItems;
};

Cart.prototype.saveItem = function (name, color, size) {
    var product = {
        'guid': new Date().toJSON(),
        'name': name,
        'color': color,
        'size': size
    };

    var retItems = this.loadItems();

    retItems.cart.push(product);

    localStorage.setItem(this.localStoreKey, JSON.stringify(retItems));
};

Cart.prototype.removeItem = function (guid) {
    var cartItems = this.loadItems();
    var retItems = {cart: []};

    $.each(cartItems.cart, function(){
        if(this.guid === guid) {
            // ignore
        } else {
            retItems.cart.push(this);
        }
    });

    localStorage.setItem(this.localStoreKey, JSON.stringify(retItems));
};

Cart.prototype.flagPrice = function () {
    localStorage.setItem(this.localStorePriceKey, 'true');
};

Cart.prototype.unflagPrice = function () {
    localStorage.removeItem(this.localStorePriceKey);
};

Cart.prototype.isPriceFlagged = function () {
    if(localStorage.getItem(this.localStorePriceKey)) {
        return true;
    }

    return false;
};

Cart.prototype.flagCount = function () {
    localStorage.setItem(this.localStoreCountKey, 'true');
};

Cart.prototype.unflagCount = function () {
    localStorage.removeItem(this.localStoreCountKey);
};

Cart.prototype.isCountFlagged = function () {
    if(localStorage.getItem(this.localStoreCountKey)) {
        return true;
    }

    return false;
};

Cart.prototype.isItemInCart = function(name, color, size) {
    var ret = false;

    $.each(this.loadItems(), function(){
        if(this.name === name && this.color === color && this.size === size) {
            ret = true;
            // break
            return false;
        }
    });

    return ret;
};