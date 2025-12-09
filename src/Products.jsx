import { useTranslation } from "react-i18next";
import './App.css';
import { useState, useEffect } from 'react';

function Products({ products, onAddToCart, setProducts }) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateProductQuantity = (id, newQuantity) => {
    setProducts(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: newQuantity } : p)
    );
  };

  return (
    <>
      <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-3">
        {products.map((product, index) => (
          <div className="col" key={index}>
            <div className="product-item">
              <span className="badge bg-success position-absolute m-3">
                {product.promo > 0 ? -Math.round(product.promo) + '%' : ''}
              </span>
              <figure>
                <a href="javascript:void(0)" style={{ cursor: 'default' }} title={product[localStorage.getItem('name') || 'nameEN']}>
                  <img
                    src={'images/products/' + product.photo}
                    className="tab-image zzz"
                    alt={index}
                  />
                </a>
              </figure>
              <h3 style={{ cursor: 'default' }} className="productTitle fw-bold fs-5 text-truncate mb-1">
                {product[localStorage.getItem('name') || 'nameEN']}
              </h3>
              <div style={{ minHeight: '65px', fontStyle: 'italic' }}>{product[localStorage.getItem('description') || 'descriptionEN']}</div>
              <div className="price">{product.price} DH</div>
              <div className="product-actions">
                {/* Hide quantity selection on mobile */}
                {!isMobile && (
                  <div className="input-group product-qty">
                    <span className="input-group-btn">
                      <button
                        type="button"
                        className="quantity-left-minus btn btn-danger btn-number"
                        onClick={() => {
                          const newQuantity = Math.max(1, product.quantity - 1);
                          updateProductQuantity(product.id, newQuantity);
                        }}
                      >
                        <svg width="16" height="16" style={{ color: "red" }}><use xlinkHref="#minus"></use></svg>
                      </button>
                    </span>
                    <input
                      type="text"
                      id={`quantity-${product.id}`}
                      name="quantity"
                      className="form-control input-number"
                      value={product.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        updateProductQuantity(product.id, value);
                      }}
                    />
                    <span className="input-group-btn">
                      <button
                        type="button"
                        className="quantity-right-plus btn btn-success btn-number"
                        onClick={() => {
                          updateProductQuantity(product.id, product.quantity + 1);
                        }}
                      >
                        <svg width="16" height="16" style={{ color: "green" }}><use xlinkHref="#plus"></use></svg>
                      </button>
                    </span>
                  </div>
                )}
                <div>
                  <button
                    onClick={() => onAddToCart(product.id, product.quantity)}
                    className="btn btn-primary add-to-cart-btn"
                  >
                    {t('addToCart')} <svg xmlns="http://www.w3.org/2000/svg" width="32" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M21.5 15a3 3 0 0 0-1.9-2.78l1.87-7a1 1 0 0 0-.18-.87A1 1 0 0 0 20.5 4H6.8l-.33-1.26A1 1 0 0 0 5.5 2h-2v2h1.23l2.48 9.26a1 1 0 0 0 1 .74H18.5a1 1 0 0 1 0 2h-13a1 1 0 0 0 0 2h1.18a3 3 0 1 0 5.64 0h2.36a3 3 0 1 0 5.82 1a2.94 2.94 0 0 0-.4-1.47A3 3 0 0 0 21.5 15Zm-3.91-3H9L7.34 6H19.2ZM9.5 20a1 1 0 1 1 1-1a1 1 0 0 1-1 1Zm8 0a1 1 0 1 1 1-1a1 1 0 0 1-1 1Z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;