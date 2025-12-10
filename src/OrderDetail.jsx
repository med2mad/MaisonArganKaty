import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer2 from './Footer2';
import { orderService } from './services/supabaseClient';

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Delete this order?')) {
      try {
        await orderService.deleteOrder(order.id);
        alert('Order deleted successfully');
        navigate('/dashboard/orders');
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrderWithProducts(id);
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center py-5">Loading order...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!order) return <div className="alert alert-warning">Order not found</div>;

  return (
    <>
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/admin" className="btn btn-outline-secondary" style={{ color: 'gray' }}>
            <svg style={{ width: '20px', marginBottom: '2px', height: '17px' }} viewBox="0 0 15 26" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><path fill="#969394" d="m12.885.58 2.084 2.084L4.133 13.5l10.836 10.836-2.084 2.084L2.049 15.584-.035 13.5z" className="fill-231f20"></path></svg>
            Order List
          </Link>
          <h2>Order : {'#' + String(order.id).padStart(5, '0')}</h2>
          <button onClick={handleDelete} type="button" className="btn btn-outline-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
            </svg>
            Delete Order
          </button>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5>Customer Information</h5>
              </div>
              <div className="card-body">
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Email:</strong> {order.email || 'N/A'}</p>
                <p><strong>Address:</strong> {order.address || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5>Order Summary</h5>
              </div>
              <div className="card-body">
                <div className='mb-3'><strong>Status:</strong> <span>
                  <div className="status-badge" style={{
                    backgroundColor: order.status === 'cancelled' ? '#f44336' :
                      order.status === 'completed' ? '#4caf50' : '#ffeb3b',
                    color: order.status === 'pending' ? '#000000' : '#ffffff',
                    padding: '0px 10px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {order.status}
                  </div>
                </span></div>
                <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
                <p><strong>Total:</strong> {order.total} DH</p>
                {order.coupon_code && (
                  <p><strong>Coupon:</strong> {order.coupon_code}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Order Items</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(order.order_products) && order.order_products.length > 0 ? (
                    order.order_products.map(order_product => (
                      <tr key={order_product.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={'/images/products/' + order_product.product.photo}
                              alt={order_product.product.name}
                              style={{ width: '50px', marginRight: '15px' }}
                            />
                            <div>
                              <h6 className="mb-0">{order_product.product.nameEN}</h6>
                              <small className="text-muted">{order_product.product.nameCH}</small>
                            </div>
                          </div>
                        </td>
                        <td>{order_product.product.price} DH</td>
                        <td>{order_product.quantity}</td>
                        <td>{(order_product.product.price * order_product.quantity).toFixed(2)} DH</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No products found for this order.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer2 />
    </>
  );
}



export default OrderDetail;