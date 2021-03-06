const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, ) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProudct=(req,res)=>{
  const prodId=req.params.productId;
  Product.findById(prodId,product=>{
  res.render('shop/product-detail',{product:product,
  pageTitle:product.title,
  path:'/products'   });
  });
  
};

exports.getIndex = (req, res, ) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, ) => {

    Cart.getCart(cart=>{
      Product.fetchAll(products=>{
        const cartProducts=[];
        for(product of products){
          const cartProductsData=cart.products.find(
            prods=>prods.id===product.id
          );
          if(cartProductsData){
            cartProducts.push({productData:product,qty:cartProductsData.qty});
            
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products:cartProducts
        });
      })
    });

};

exports.postCart=(req,res)=>{
const prodId=req.body.productId;
Product.findById(prodId,product=>{
  Cart.addProduct(prodId,product.price);
});
res.redirect('/cart');
};

exports.postCartDeleteProduct=(req,res)=>{
  const prodId=req.body.productId;
  Product.findById(prodId,product=>{
    Cart.deleteProduct(prodId,product.price);
    res.redirect('/cart');
  })
};

exports.getOrders = (req, res, ) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, ) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
