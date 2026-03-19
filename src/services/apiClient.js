// API Service for ASP.NET Back-end

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
  }
  
  return response.json();
}

// Product service
export const productService = {
  // Get all products
  getProducts: async () => {
    const response = await apiCall('/');
    return response.rows || [];
  },

  // Get multiple products by IDs
  getProductsByIds: async (ids) => {
    const response = await apiCall(`/cart/z?ids=${ids.join(',')}`);
    return response.rows || [];
  },

  // Get product by ID
  getProductById: async (id) => {
    return await apiCall(`/${id}`);
  },

  // Create product
  createProduct: async (productData) => {
    return await apiCall('/', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update product
  updateProduct: async (id, productData) => {
    return await apiCall(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Delete product
  deleteProduct: async (id) => {
    return await apiCall(`/${id}`, {
      method: 'DELETE',
    });
  }
};

// Order service
export const orderService = {
  // Get all orders
  getOrders: async () => {
    return await apiCall('/Orders');
  },

  // Get order by ID with products
  getOrderById: async (id) => {
    return await apiCall(`/Orders/${id}`);
  },

  // Create order
  createOrder: async (orderData) => {
    const response = await apiCall('/Orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    return response.order || response;
  },

  // Update order
  updateOrder: async (orderId, orderData) => {
    return await apiCall(`/Orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    return await apiCall(`/Orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Delete order
  deleteOrder: async (orderId) => {
    return await apiCall(`/Orders/${orderId}`, {
      method: 'DELETE',
    });
  }
};
