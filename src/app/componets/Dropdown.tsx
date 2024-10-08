"use client";

import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig'; // Importe o axios configurado

type DropdownProps = {
  sourceType: 'api' | 'json';
  source: string; // URL da API ou caminho do JSON
  fieldResource: string; // Campo da resposta que contém as opções
  onSelect: (selected: string[]) => void; // Callback para enviar opções selecionadas ao componente pai
};

const Dropdown: React.FC<DropdownProps> = ({ sourceType, source, fieldResource, onSelect }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOptions = async () => {
    try {
      setError(null);
      if (sourceType === 'api') {
        const response = await axiosInstance.get(source);
        console.log('Response da API:', response.data);
        
        // Usa a propriedade fieldResource para definir as opções
        setOptions(response.data[fieldResource]);
      } else if (sourceType === 'json') {
        const response = await import(`${source}`);
        console.log('Dados do JSON:', response.default);
        setOptions(response.default);
      }
    } catch (error) {
      console.error('Erro ao buscar as opções:', error);
      setError('Não foi possível carregar as opções.');
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [sourceType, source]);

  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions, onSelect]);

  const handleSelect = (option: string | undefined) => {
    if (option && !selectedOptions.includes(option)) {
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  const handleRemove = (option: string) => {
    const updatedOptions = selectedOptions.filter((opt) => opt !== option);
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="container mt-4">
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="dropdown">Selecione uma opção:</label>
            <select
              id="dropdown"
              className="form-control"
              onChange={(e) => handleSelect(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Selecione uma opção</option>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="mt-3">
            <h5>Opções Selecionadas:</h5>
            <div className="selected-options d-flex flex-wrap">
              {selectedOptions.map((option) => (
                <div key={option} className="balloon d-flex align-items-center bg-light p-2 mr-2 mb-2 rounded">
                  {option}
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => handleRemove(option)}>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Estilos personalizados (se necessário) */}
      <style jsx>{`
        .selected-options {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .balloon {
          background-color: #e0e0e0;
          padding: 5px 10px;
          border-radius: 20px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
