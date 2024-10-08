"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css'; // Importe seu CSS global se tiver

import Dropdown from './componets/Dropdown';

export default function ExamplePage() {
  const handleSelectedOptions = (selected: string[]) => {
    console.log('Opções selecionadas:', selected);
    // Você pode enviar isso para uma API ou armazenar no localStorage, por exemplo.
  };

  return (
    <div>
      <h1>Exemplo de Dropdown com Balões</h1>
      <Dropdown 
        sourceType="api" 
        source="/api/p_estados/?sg_uf=MG"
        fieldResource="cidades" // O campo que contém as opções
        onSelect={handleSelectedOptions}
      />

    </div>
  );
}
