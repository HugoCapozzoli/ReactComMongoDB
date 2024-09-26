import React, { useState, useEffect } from 'react';
import './alunos.css';

const Alunos = () => {
  const [students, setStudents] = useState(JSON.parse(localStorage.getItem('students')) || []);
  const [deletedStudents, setDeletedStudents] = useState([]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const deleteStudent = (id) => {
    const studentToDelete = students.find((student) => student.id === id);
    if (studentToDelete) {
      setDeletedStudents([...deletedStudents, studentToDelete]);
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    }
  };

  const restoreStudent = () => {
    if (deletedStudents.length > 0) {
      const lastDeleted = deletedStudents[deletedStudents.length - 1];
      setStudents([...students, lastDeleted]);
      setDeletedStudents(deletedStudents.slice(0, -1));
    }
  };

  const toggleFrozen = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, frozen: !student.frozen } : student
    );
    setStudents(updatedStudents);
  };

  const manageWorkout = (id) => {
    localStorage.setItem('currentStudentId', id);
    window.location.href = '/treino';
  };

  const editStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    if (studentToEdit) {
      const newName = prompt('Digite o novo nome do aluno:', studentToEdit.name);
      const newCpf = prompt('Digite o novo CPF do aluno:', studentToEdit.cpf);
      const newDob = prompt('Digite a nova data de nascimento do aluno:', studentToEdit.dob);
      const newContract = prompt('Digite o novo número de meses do contrato:', studentToEdit.contract);

      if (newName && newCpf && newDob && newContract) {
        const updatedStudents = students.map((student) =>
          student.id === id
            ? { ...student, name: newName, cpf: newCpf, dob: newDob, contract: newContract }
            : student
        );
        setStudents(updatedStudents);
      }
    }
  };

  return (
    <div className="container">
      <h1>Alunos Matriculados</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <strong>{student.name}</strong> - CPF: {student.cpf} <br />
            Data de Nascimento: {student.dob} <br />
            Contrato: {student.contract} meses <br />
            Status: {student.frozen ? 'Contrato Congelado' : 'Ativo'} <br />
            {student.veteran && student.discount && (
              <>
                Desconto: {student.discount}% <br />
              </>
            )}
            {/* Verificação se o aluno veio de uma promoção */}
            {student.fromPromotion && (
              <>
                <strong>Promoção Ativada:</strong> <br />
                Valor da Promoção: {student.promotionPlan} <br />
                Duração do Plano: {student.promotionDuration} meses <br />
              </>
            )}
            <button className="btn-congelar" onClick={() => toggleFrozen(student.id)}>
              {student.frozen ? 'Descongelar Contrato' : 'Congelar Contrato'}
            </button>
            <button className="btn-gerenciar" onClick={() => manageWorkout(student.id)}>Gerenciar Treinos</button>
            <button className="btn-excluir" onClick={() => deleteStudent(student.id)}>Excluir</button>
            <button className="btn-editar" onClick={() => editStudent(student.id)}>Editar</button>
          </li>
        ))}
      </ul>
      {deletedStudents.length > 0 && (
        <button onClick={restoreStudent} className="restore-btn">Recuperar Último Aluno Excluído</button>
      )}
    </div>
  );
};

export default Alunos;
