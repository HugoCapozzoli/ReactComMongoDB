import React, { useState, useEffect } from 'react';
import './promocoes.css';

const Promocoes = () => {
  const [promotions, setPromotions] = useState(JSON.parse(localStorage.getItem('promotions')) || []);

  useEffect(() => {
    localStorage.setItem('promotions', JSON.stringify(promotions));
  }, [promotions]);

  const deletePromotion = (id) => {
    const updatedPromotions = promotions.filter((promotion) => promotion.id !== id);
    setPromotions(updatedPromotions);
  };

  const editPromotion = (id) => {
    const promotionToEdit = promotions.find((promotion) => promotion.id === id);
    if (promotionToEdit) {
      const newName = prompt('Digite o novo nome da promoção:', promotionToEdit.name);
      const newCurrentPrice = prompt('Digite o novo preço atual:', promotionToEdit.currentPrice);
      const newPromoPrice = prompt('Digite o novo preço em promoção:', promotionToEdit.promoPrice);
      const newType = prompt('Digite o novo tipo da promoção:', promotionToEdit.type);
      const newDescription = prompt('Digite a nova descrição da promoção:', promotionToEdit.description);
      const newValidUntil = prompt('Digite a nova data de validade:', promotionToEdit.validUntil);

      if (newName && newCurrentPrice && newPromoPrice && newType && newDescription && newValidUntil) {
        const updatedPromotions = promotions.map((promotion) =>
          promotion.id === id
            ? { ...promotion, name: newName, currentPrice: newCurrentPrice, promoPrice: newPromoPrice, type: newType, description: newDescription, validUntil: newValidUntil }
            : promotion
        );
        setPromotions(updatedPromotions);
      }
    }
  };

  const handleBuy = () => {
    window.location.href = '/cadastrar';
  };

  return (
    <div className="container">
      <h1>Promoções Disponíveis</h1>
      <ul>
        {promotions.map((promotion) => (
          <li key={promotion.id}>
            <strong>{promotion.name}</strong> <br />
            Preço Atual: R$ {promotion.currentPrice} <br />
            Preço com Promoção: R$ {promotion.promoPrice} <br />
            Tipo: {promotion.type} <br />
            Descrição: {promotion.description} <br />
            Validade: {promotion.validUntil} <br />
            <button  className="btn-editar-promocao" onClick={() => editPromotion(promotion.id)}>Editar</button>
            <button  className="btn-deletar-promocao" onClick={() => deletePromotion(promotion.id)}>Excluir</button>
            <button  className="btn-comprar-promocao" onClick={handleBuy}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Promocoes;
