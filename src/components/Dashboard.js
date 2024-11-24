import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import background from '../assets/background.jpg';
import eggs from '../assets/eggs.jpeg';
import kfc from '../assets/KFC.jpeg';
import biscuits from '../assets/Biscuits.jpeg';

const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Change this according to your storage method
    navigate('/login'); // Redirect to login after logout
  };

  const images = [background, eggs, kfc, biscuits];

  return (
    <div className="container" style={{ fontFamily: 'Arial', backgroundColor: 'palevioletred', margin: 0, padding: 0 }}>
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2.2em' }}>Dashboard</h2>
      <header className="header" style={{ backgroundColor: '#333', color: '#fff', padding: '15px 25px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <nav className="navigation">
          <Link to="/products" style={{ marginRight: '15px', color: '#fff' }}>Product Management</Link>
          <Link to="/users" style={{ marginRight: '15px', color: '#fff' }}>User Management</Link>
          <button onClick={handleLogout} style={{ padding: '5px 10px', backgroundColor: 'none', borderRadius: '5px' }}>Logout</button>
        </nav>
      </header>

      <section style={{ marginTop: '20px' }}>
        {products.length === 0 ? (
          <p>No products have been added yet.</p>
        ) : (
          <div>
            <ProductBarChart products={products} /> {/* Render the ProductBarChart */}
            <table style={{ width: '50%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr>
                  <th style={{ border: '4px solid #ddd', padding: '5px', background: '#f4f4f4' }}>Name</th>
                  <th style={{ border: '4px solid #ddd', padding: '5px', background: '#f4f4f4' }}>Description</th>
                  <th style={{ border: '4px solid #ddd', padding: '5px', background: '#f4f4f4' }}>Price</th>
                  <th style={{ border: '4px solid #ddd', padding: '5px', background: '#f4f4f4' }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ border: '4px solid #ddd', padding: '5px' }}>{product.name}</td>
                    <td style={{ border: '4px solid #ddd', padding: '5px' }}>{product.description}</td>
                    <td style={{ border: '4px solid #ddd', padding: '5px' }}>${formatPrice(product.price)}</td>
                    <td style={{ border: '4px solid #ddd', padding: '5px' }}>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Image Carousel */}
      <section style={{ marginTop: '20px' }}>
        <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false} showStatus={false}>
          {images.map((image, index) => (
            <div key={index}>
              <img 
                src={image} 
                alt={`Slide ${index + 1}`} 
                style={{ maxHeight: '500px', maxWidth: '50%', objectFit: 'cover', margin: 'auto' }} 
              />
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default Dashboard;
