
// Adds items to cart. Creates an array of cart items and adds them to localstorage
export const addItem = (item, next) => {
    let cart = [];
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item, 
            count: 1
        });

        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id)
        });

        localStorage.setItem('cart', JSON.stringify(cart))
        next();
    }
};

// returns the total cost of the cart array in localstorage. 
export const itemTotal   = () => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0;
};

// Returns the cart array from localstorage.
export const getCart   = () => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
};

// Updates the quantity of a product within the cart array in localstorage.
export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

// Removes items from the cart array within localstorage by product Id
export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1)
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart; 
};