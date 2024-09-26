import React, { useState } from 'react';
import './cadastrar.css';

const CadastrarAluno = () => {
  const [students, setStudents] = useState(JSON.parse(localStorage.getItem('students')) || []);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    dob: '',
    contract: '',
    veteran: false,
    discount: '',
    fromPromotion: false, // Novo campo
    promotionPlan: '',    // Valor padrão do plano
    promotionDuration: '' // Duração do plano
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se o aluno veio de uma promoção e define o valor e o tempo do plano
    const newStudent = {
      id: Date.now(),
      ...formData,
      contract: formData.fromPromotion ? formData.promotionDuration : formData.contract,
      frozen: false,
      workout: []
    };
    
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    // Resetando o formulário
    setFormData({
      name: '',
      cpf: '',
      dob: '',
      contract: '',
      veteran: false,
      discount: '',
      fromPromotion: false,
      promotionPlan: '',
      promotionDuration: ''
    });

    window.location.href = '/alunos';
  };

  return (
    <div className="container">
      <h1>Cadastrar Novo Aluno</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="cpf">CPF:</label>
        <input type="text" id="cpf" value={formData.cpf} onChange={handleChange} required />

        <label htmlFor="dob">Data de Nascimento:</label>
        <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />

        {/* Verifica se o aluno é veterano */}
        <label>
          <input
            type="checkbox"
            id="veteran"
            checked={formData.veteran}
            onChange={handleChange}
          />
          Aluno Veterano
        </label>

        {formData.veteran && (
          <>
            <label htmlFor="discount">Desconto (%):</label>
            <input
              type="number"
              id="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Digite o desconto"
              required
            />
          </>
        )}

        {/* Verifica se o aluno veio de uma promoção */}
        <label>
          <input
            type="checkbox"
            id="fromPromotion"
            checked={formData.fromPromotion}
            onChange={handleChange}
          />
          Vimmmmmmm de uma Promoção maravilhosa
        </label>

        {formData.fromPromotion && (
          <>
            <label htmlFor="promotionPlan">Valor da Promoção:</label>
            <input
              type="text"
              id="promotionPlan"
              value={formData.promotionPlan}
              onChange={handleChange}
              placeholder="Valor do plano promocional"
              required
            />

            <label htmlFor="promotionDuration">Duração do Plano (meses):</label>
            <input
              type="number"
              id="promotionDuration"
              value={formData.promotionDuration}
              onChange={handleChange}
              placeholder="Duração do plano promocional"
              required
            />
          </>
        )}

        {/* Tempo de contrato normal, caso não venha de uma promoção */}
        {!formData.fromPromotion && (
          <>
            <label htmlFor="contract">Tempo de Contrato (meses):</label>
            <input
              type="number"
              id="contract"
              value={formData.contract}
              onChange={handleChange}
              required
            />
          </>
        )}

<button type="submit" className="btn-cadastrar">Cadastrar Aluno</button>

      </form>
    </div>
  );
};

export default CadastrarAluno;
