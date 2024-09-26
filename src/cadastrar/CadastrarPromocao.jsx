import React, { useState } from 'react';
import './cadastrar.css';

const CadastrarPromocao = () => {
  const [promotions, setPromotions] = useState(JSON.parse(localStorage.getItem('promotions')) || []);
  const [formData, setFormData] = useState({
    name: '',
    currentPrice: '',
    promoPrice: '',
    type: '',
    description: '',
    validUntil: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPromotion = {
      id: Date.now(),
      ...formData
    };
    const updatedPromotions = [...promotions, newPromotion];
    setPromotions(updatedPromotions);
    localStorage.setItem('promotions', JSON.stringify(updatedPromotions));
    setFormData({
      name: '',
      currentPrice: '',
      promoPrice: '',
      type: '',
      description: '',
      validUntil: ''
    });
    window.location.href = '/promocoes';
  };

  return (
    <div className="container">
      <h1>Cadastrar Nova Promoção</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="currentPrice">Preço Atual:</label>
        <input type="number" id="currentPrice" value={formData.currentPrice} onChange={handleChange} required />

        <label htmlFor="promoPrice">Preço com Promoção:</label>
        <input type="number" id="promoPrice" value={formData.promoPrice} onChange={handleChange} required />

        <label htmlFor="type">Tipo:</label>
        <input type="text" id="type" value={formData.type} onChange={handleChange} required />

        <label htmlFor="description">Descrição:</label>
        <textarea id="description" value={formData.description} onChange={handleChange} required />

        <label htmlFor="validUntil">Data de Validade:</label>
        <input type="date" id="validUntil" value={formData.validUntil} onChange={handleChange} required />

        <button type="submit" className="btn-cadastrar-promocao">Cadastrar Promoção</button>
        </form>
    </div>
  );
};

export default CadastrarPromocao;
