import { useState } from 'react';

function StatusDropdown({ currentStatus, orderId, onStatusChange }) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  // Custom color styles
  const statusStyles = {
    pending: {
      backgroundColor: '#ffeb3b', // Bright yellow
      color: '#000000',          // Black text
      border: '1px solid #ffc107'
    },
    completed: {
      backgroundColor: '#4caf50', // Green
      color: '#ffffff',           // White text
      border: '1px solid #388e3c'
    },
    cancelled: {
      backgroundColor: '#f44336', // Red
      color: '#ffffff',           // White text
      border: '1px solid #d32f2f'
    }
  };

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    setIsUpdating(true);

    try {
      // const _UrlPort = `http://localhost:5081/orders/${orderId}/status`;
      // const _UrlPort = `http://localhost:8000/orders/${orderId}/status`;
      // const _UrlPort = `https://mak.ct.ws/orders/${orderId}/status`;
      const _UrlPort = "/api/orders/${orderId}/status";

      const response = await fetch(_UrlPort, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Update failed');

      setStatus(newStatus);
      onStatusChange && onStatusChange(orderId, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isUpdating}
      style={{
        ...statusStyles[status],
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        minWidth: '120px',
        outline: 'none'
      }}
    >
      <option value="completed" style={{ backgroundColor: 'green', color: 'white' }}>Completed</option>
      <option value="pending" style={{ backgroundColor: 'yellow', color: 'black' }}>Pending</option>
      <option value="cancelled" style={{ backgroundColor: 'red', color: 'white' }}>Cancelled</option>
    </select>
  );
}

export default StatusDropdown;