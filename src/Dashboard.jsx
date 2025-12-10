import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatusDropdown from './StatusDropdown';
import Footer2 from './Footer2';
import { orderService } from './services/supabaseClient';

function OrdersDashboard() {
  const correctPassword = '1234';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check localStorage on load
    const storedAuth = localStorage.getItem('auth_protected_page');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('auth_protected_page', 'true');
    } else {
      setError('Incorrect password');
    }
  };

  const modal = (
    <div style={styles.modalOverlay}>
      <div style={styles.modalBox}>
        <h2 style={styles.title}>🔒 Protected Access</h2>
        <p style={styles.description}>Please enter the password to view this page.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Enter password"
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Unlock</button>
        </form>
      </div>
    </div>
  );

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error1, setError1] = useState(null);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Delete this order?')) {
      try {
        await orderService.deleteOrder(orderId);
        setOrders(orders.filter(order => order.id !== orderId));
        alert('Order deleted successfully');
      }
      catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (err) {
        setError1(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-5">Loading orders...</div>;
  if (error1) return <div className="alert alert-danger">Error: {error1}</div>;

  return (
    <>
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/" className="btn btn-outline-secondary" style={{ color: 'gray' }}>
            <svg style={{ width: '20px', marginBottom: '2px', height: '17px' }} viewBox="0 0 15 26" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><path fill="#969394" d="m12.885.58 2.084 2.084L4.133 13.5l10.836 10.836-2.084 2.084L2.049 15.584-.035 13.5z" className="fill-231f20"></path></svg>
            Shop
          </Link>
          <h2>Orders</h2>
          <div></div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{'#' + String(order.id).padStart(5, '0')}</td>
                      <td>{order.name}</td>
                      <td>{order.phone}</td>
                      <td>{order.total} DH</td>
                      <td>{new Date(order.created_at).toLocaleString()}</td>
                      <td>
                        <Link to={`/orders/${order.id}`} style={{ marginRight: '10px' }} className="btn btn-sm btn-outline-info">
                          View
                        </Link>
                        <button onClick={() => handleDeleteOrder(order.id)} className="btn btn-sm btn-outline-danger">
                          Delete
                        </button>
                      </td>
                      <td>
                        <StatusDropdown
                          currentStatus={order.status}
                          orderId={order.id}
                          onStatusChange={(orderId, newStatus) => {
                            setOrders(orders.map(o =>
                              o.id === orderId ? { ...o, status: newStatus } : o
                            ));
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer2 />

      <div>
        {!isAuthenticated && modal}
        {isAuthenticated && (
          <div style={styles.pageContent}>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  description: {
    marginBottom: '1.5rem',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  error: {
    color: '#e11d48',
    marginBottom: '1rem',
  },
  pageContent: {
    padding: '2rem',
    textAlign: 'center',
  }
};

export default OrdersDashboard;