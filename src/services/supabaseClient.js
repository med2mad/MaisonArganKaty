import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service methods for products
export const productService = {
  // Get all products
  getProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    
    return data;
  },

  // Get product by ID
  getProductById: async (id) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
    
    return data;
  }
};

// Service methods for orders
export const orderService = {
  // Get all orders
  getOrders: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }

    return data;
  },

  // Get order by ID - this will fetch all related product orders for the same customer/order
  getOrderById: async (id) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching order ${id}:`, error);
      throw error;
    }

    // For the full order details, we need to match orders with the same customer info and timestamp
    // Since we don't have a separate order ID, we'll return the single order record as is
    // In a real implementation, you might need to update your schema to have a separate order header table
    return data;
  },

  // Get order with products - for when you need related product info
  getOrderWithProducts: async (id) => {
    // First get the base order info
    const { data: baseOrder, error: baseError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (baseError) {
      console.error(`Error fetching base order ${id}:`, baseError);
      throw baseError;
    }

    // Get all orders with the same customer info and close timestamp (within 5 minutes to account for slow order processing)
    // This assumes that related products in the same order will be created around the same time
    const { data: relatedOrders, error: relatedError } = await supabase
      .from('orders')
      .select('*')
      .eq('name', baseOrder.name)
      .eq('email', baseOrder.email)
      .eq('phone', baseOrder.phone)
      .eq('address', baseOrder.address)
      .gte('created_at', new Date(new Date(baseOrder.created_at).getTime() - 300000).toISOString()) // 5 minutes before
      .lte('created_at', new Date(new Date(baseOrder.created_at).getTime() + 300000).toISOString()); // 5 minutes after

    if (relatedError) {
      console.error(`Error fetching related orders for ${id}:`, relatedError);
      throw relatedError;
    }

    // For each related order, we need to associate with product info to get the photo
    const orderPromises = relatedOrders.map(async (item) => {
      // Since we're storing product names in the order, we'll try to match with products table to get photo
      const { data: matchingProduct, error: productError } = await supabase
        .from('products')
        .select('photo')
        .ilike('nameEN', `%${item.product_name}%`)
        .limit(1)
        .single();

      return {
        ...item,
        product: {
          // Use the photo from products table if found, otherwise use a generic one
          photo: productError ? 'default.jpg' : matchingProduct.photo,
          nameEN: item.product_name // Using the product_name field
        }
      };
    });

    const order_products = await Promise.all(orderPromises);

    // Combine all the order items for this "order group"
    return {
      ...baseOrder,
      order_products
    };
  },

  // Create a new order
  createOrder: async (orderData) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    return data;
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating order ${orderId} status:`, error);
      throw error;
    }

    return data;
  },

  // Delete an order
  deleteOrder: async (orderId) => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) {
      console.error(`Error deleting order ${orderId}:`, error);
      throw error;
    }
  }
};