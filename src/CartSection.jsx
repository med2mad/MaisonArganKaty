
function CartSection({
    t,
    cartItems,
    updateCartItemQuantity,
    onRemoveFromCart,
    customerInfo,
    handleCustomerInfoChange,
    submitOrder
}) {
    return (
        <div className="order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">{t('yourCart')}</span>
                <span className="badge bg-primary rounded-pill">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
            </h4>
            <ul className="list-group mb-3">
                {cartItems.map((product, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center lh-sm">
                        <div className="d-flex align-items-center" style={{ flex: 1, minWidth: 0 }}>
                            <img
                                src={'images/products/' + product.photo}
                                style={{ width: '50px', height: '50px', marginRight: '15px', flexShrink: 0 }}
                                alt={product.nameEN}
                            />
                            <h6 className="my-0" style={{ flex: 1 }}>{product.nameEN}</h6>
                        </div>
                        <div className="d-flex align-items-center" style={{ flexShrink: 0 }}>
                            <div className="input-group me-2">
                                <button
                                    className="btn btn-outline-secondary" style={{ padding: '0 5px' }}
                                    onClick={() => updateCartItemQuantity(product.id, product.quantity - 1)}
                                >
                                    -
                                </button>
                                <input
                                    id={'qtyId' + index}
                                    type="text"
                                    className="form-control text-center px-0"
                                    value={product.quantity}
                                    style={{ width: '20px' }}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value) || 1;
                                        updateCartItemQuantity(product.id, value);
                                    }}
                                />
                                <button
                                    className="btn btn-outline-secondary" style={{ padding: '0 5px' }}
                                    onClick={() => updateCartItemQuantity(product.id, product.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-body-secondary me-1" style={{ minWidth: '50px', textAlign: 'right' }}>
                                {(product.price * product.quantity).toFixed(2)}
                            </span>
                            <button
                                onClick={() => onRemoveFromCart(product.id)}
                                className="btn btn-sm btn-outline-danger py-0 px-2"
                            >
                                X
                            </button>
                        </div>
                    </li>
                ))}
                <li className="list-group-item d-flex justify-content-end">
                    <span>{t('total')} :&nbsp;</span>
                    <strong>{cartItems.reduce((sum, product) => sum + Number(product.price) * product.quantity, 0).toFixed(2)} DH</strong>
                </li>
            </ul>

            <div className="mb-3">
                <h5 className="mb-3">{t('yourInformations')}</h5>

                <div className='row'>
                    <div className="col mb-3">
                        <label htmlFor="name" className="form-label required">{t('fullName')}</label>
                        <input
                            type="text"
                            className="form-control infos"
                            id="name"
                            name="name"
                            value={customerInfo.name}
                            onChange={handleCustomerInfoChange}
                            required
                        />
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="phone" className="form-label required">{t('phoneNumber')}</label>
                        <input
                            type="tel"
                            className="form-control infos"
                            id="phone"
                            name="phone"
                            value={customerInfo.phone}
                            onChange={handleCustomerInfoChange}
                            required
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className="col mb-3">
                        <label htmlFor="email" className="form-label">{t('email')}</label>
                        <input
                            type="email"
                            className="form-control infos"
                            id="email"
                            name="email"
                            value={customerInfo.email}
                            onChange={handleCustomerInfoChange}
                        />
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="coupon_code" className="form-label">{t('couponCode')}</label>
                        <input
                            type="text"
                            className="form-control infos"
                            id="coupon_code"
                            name="coupon_code"
                            value={customerInfo.coupon_code}
                            onChange={handleCustomerInfoChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">{t('shippingAddress')}</label>
                    <textarea
                        className="form-control infos"
                        id="address"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleCustomerInfoChange}
                        rows="2"
                    ></textarea>
                </div>
            </div>

            <div>
                <button
                    onClick={submitOrder}
                    className="w-100 btn btn-primary btn-lg"
                    type="submit"
                    disabled={cartItems.length === 0 || !customerInfo.name || !customerInfo.phone}
                >
                    {t('submitOrder')}
                </button>
            </div>
        </div>
    );
}

export default CartSection;
