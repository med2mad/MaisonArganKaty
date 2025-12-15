import { useEffect, useState } from 'react';
import Nav from './Nav';
import Products from './Products';
import Footer from './Footer';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from "react-i18next";
import { productService, orderService } from './services/supabaseClient';
import CartSection from './CartSection';
import BlogSection from './BlogSection';
import BottomNav from './BottomNav';

function Home() {

  const { t } = useTranslation();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    coupon_code: ''
  });

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getProducts();
        setProducts(data.map(product => ({ ...product, quantity: 1 })));
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const ids = cartItems.map(item => item.id);

      const fetchCartProducts = async () => {
        try {
          const uniqueIds = [...new Set(ids)];
          let updatedCart = [];

          for (const id of uniqueIds) {
            const product = await productService.getProductById(id);
            const cartItem = cartItems.find(item => item.id === id);
            updatedCart.push({ ...product, quantity: cartItem ? cartItem.quantity : 1 });
          }

          setCartItems(updatedCart);
        } catch (error) {
          console.error('Error fetching cart products:', error);
        }
      };

      fetchCartProducts();
    } else {
      setCartItems([]);
    }
  }, [cartItems.map(item => item.id).join(',')]);

  const onAddToCart = (id, quantity = 1) => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(item => item.id === id);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCartItems, { id, quantity }];
      }
    });
  };

  const onRemoveFromCart = (id) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }

    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert(t('fillRequiredFields'));
      return;
    }

    try {
      const total = cartItems.reduce(
        (sum, product) => sum + Number(product.price) * product.quantity, 0
      );

      const orderPromises = cartItems.map(item => {
        const orderData = {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address,
          coupon_code: customerInfo.coupon_code,
          coupon_value: 0,
          status: 'pending',
          total: total,
          product_name: item.nameEN,
          product_price: item.price,
          quantity: item.quantity
        };

        return orderService.createOrder(orderData);
      });

      await Promise.all(orderPromises);

      alert('🎉 OK');
      setCartItems([]);
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        coupon_code: ''
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(t('orderError'));
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('shop');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile App Layout
  if (isMobile) {
    return (
      <div className="mobile-app">
        {/* Mobile Header */}
        <div className="mobile-header">
          <img src="images/logo.png" style={{ height: '30px' }} alt="logo" />
          <LanguageSelector />
        </div>

        {/* Content Container */}
        <div className="mobile-content-container">
          {activeTab === 'shop' && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '20px' }} >
                <img src={t('mobileBanner')} alt="banner" style={{ width: '95%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
              </div>
              <div className="container-fluid">
                <h3 className="mb-3">{t('trendingProducts')}</h3>
                {isLoading ? (
                  <div className="text-center my-5 py-5">
                    <img src="images/spinner.gif" alt="Loading..." style={{ width: '60px', height: '60px' }} />
                    <p className="mt-3">{t('loadingProducts')}...</p>
                  </div>
                ) : (
                  <Products products={products} onAddToCart={onAddToCart} setProducts={setProducts} />
                )}
              </div>
            </>
          )}

          {activeTab === 'cart' && (
            <div className="container-fluid">
              <CartSection
                t={t}
                cartItems={cartItems}
                updateCartItemQuantity={updateCartItemQuantity}
                onRemoveFromCart={onRemoveFromCart}
                customerInfo={customerInfo}
                handleCustomerInfoChange={handleCustomerInfoChange}
                submitOrder={submitOrder}
              />
            </div>
          )}

          {activeTab === 'blogs' && (
            <BlogSection t={t} />
          )}

          {activeTab === 'profile' && (
            <div className="container-fluid">
              <h3>{t('contact')}</h3>
              <div className="card mobile-card">
                <div className="card-body">
                  <h5>Maison Argan Katy</h5>
                  <p className="text-muted">High quality argan oil and natural products.</p>
                  <hr />
                  <p><strong>Email:</strong> contact@maisonargankaty.com</p>
                  <p><strong>Phone:</strong> +212 600 000 000</p>
                  <hr />
                  <Nav />
                  {/* Nav here renders links which might be weird in profile tab, but okay for now */}
                </div>
              </div>
            </div>
          )}
        </div>

        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        />
      </div>
    );
  }

  // Desktop Layout
  return (
    <>
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasCart" aria-labelledby="My Cart">
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <CartSection
            t={t}
            cartItems={cartItems}
            updateCartItemQuantity={updateCartItemQuantity}
            onRemoveFromCart={onRemoveFromCart}
            customerInfo={customerInfo}
            handleCustomerInfoChange={handleCustomerInfoChange}
            submitOrder={submitOrder}
          />
        </div>
      </div>

      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasSearch" aria-labelledby="Search">
      </div>

      <header id="headerid">
        <div className="container-fluid">
          <div className="row pt-3 border-bottom">
            <div className="col-sm-4 col-lg-3 text-center text-sm-start">
              <div className="main-logo">
                <a href="javascript:void(0)">
                  <img src="images/logo.png" style={{ width: '100px', cursor: 'default' }} alt="logo" className="img-fluid" />
                </a>
              </div>
            </div>

            <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block pt-3">
              <nav className="main-menu d-flex navbar navbar-expand-lg">
                <div className="offcanvas offcanvas-end">
                  <div className="offcanvas-body">
                    <Nav />
                  </div>
                </div>
              </nav>
            </div>

            <div className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
              <div className="cart text-end d-lg-block dropdown">
                <button className="border-0 bg-transparent d-flex flex-column gap-2 lh-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                  <span className="fs-6 text-muted dropdown-toggle">{t('yourCart')}</span>
                  <span className="cart-total fs-5 fw-bold">
                    {cartItems.reduce(
                      (sum, product) => sum + Number(product.price) * product.quantity, 0
                    ).toFixed(2)} DH
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section style={{ backgroundImage: "url('images/background-pattern.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="banner-blocks">
                <div className="zzzz large bg-info block-1">
                  <div className="swiper main-swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="row banner-content p-5">
                          <div className="content-wrapper col-md-7">
                            <div className="categories my-3">{t('natural')}</div>
                            <h3 className="display-4">{t('discoverArganOil')}</h3>
                            <p>{t('arganOilDescription')}</p>
                            <a href="#shopid" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1 px-4 py-3 mt-3">{t('shopNow')}</a>
                          </div>
                          <div className="img-wrapper col-md-5">
                            <img src="images/product-thumb-1.png" style={{ width: '550px !important', maxWidth: 'none' }} className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                </div>

                <div className="zzzz bg-success-subtle block-2" style={{ background: "url('images/ad-image-1.png') no-repeat", backgroundPosition: 'right bottom' }}>
                  <div className="row banner-content p-5">
                    <div className="content-wrapper col-md-7">
                      <div className="categories sale mb-3 pb-3">15% off</div>
                      <h3 className="banner-title">{t('foodAndBeauty')}</h3>
                      <a href="#shopid" className="d-flex align-items-center nav-link">{t('shopCollection')} <svg width="24" height="24"><use xlinkHref="#arrow-down"></use></svg></a>
                    </div>
                  </div>
                </div>

                <div className="zzzz bg-danger block-3" style={{ background: "url('images/ad-image-2.png') no-repeat", backgroundPosition: 'right bottom' }}>
                  <div className="row banner-content p-5">
                    <div className="content-wrapper col-md-7">
                      <div className="categories sale mb-3 pb-3">10% off</div>
                      <h3 className="item-title">{t('bakedCleanProducts')}</h3>
                      <a href="#shopid" className="d-flex align-items-center nav-link">{t('shopCollection')} <svg width="24" height="24"><use xlinkHref="#arrow-down"></use></svg></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="bootstrap-tabs product-tabs">
                <div className="tabs-header d-flex justify-content-between border-bottom mt-4">
                  <h3 id="shopid">{t('trendingProducts')}</h3>
                </div>
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                    {isLoading ? (
                      <div className="text-center my-5 py-5">
                        <img src="images/spinner.gif" alt="Loading..." style={{ width: '60px', height: '60px' }} />
                        <p className="mt-3">{t('loadingProducts')}...</p>
                      </div>
                    ) : (
                      <Products products={products} onAddToCart={onAddToCart} setProducts={setProducts} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="zzzz bg-danger mb-3" style={{ background: "url('images/ad-image-3.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }}>
                <div className="banner-content p-5">
                  <div className="categories text-primary fs-3 fw-bold">{t('upto25Off')}</div>
                  <h3 className="banner-title">{t('honey')}</h3>
                  <p>{t('honeyDescription')}</p>
                  <a href="#shopid" className="btn btn-dark text-uppercase">{t('showNow')}</a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="zzzz bg-info" style={{ background: "url('images/ad-image-4.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }}>
                <div className="banner-content p-5">
                  <div className="categories text-primary fs-3 fw-bold">{t('upto25Off')}</div>
                  <h3 className="banner-title">{t('organic100')}</h3>
                  <p>{t('organicDescription')}</p>
                  <a href="#shopid" className="btn btn-dark text-uppercase">{t('showNow')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogSection t={t} />

      <Footer />
    </>
  );
}

export default Home;