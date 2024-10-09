"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import './globals.css'; // Importe seu CSS global se tiver

import Dropdown from './components/Dropdown';
import Table from "./components/Table";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ExamplePage() {

  const inputArray = ["MG", "TO", "RJ", "SP"];

  const handleSelectedOptions = (selected: string[]) => {
    console.log('Opções selecionadas:', selected);
    // Você pode enviar isso para uma API ou armazenar no localStorage, por exemplo.
  };

  return (
    <div>
      <h1>Exemplo de Dropdown com Balões</h1>
      <Dropdown 
        sourceType="api" 
        source="api/tipos/"
        fieldResource="tipos_servico" // O campo que contém as opções
        onSelect={handleSelectedOptions}
      />
      
      <div>
      <h1>Lista de Serviços</h1>
      <Table
      source={`${apiUrl}/api/table/servicos`} 
      headers={["ID", "Nome do Serviço", "Descrição", "Tipo de Serviço", "Preço", "Duração"]}
      />

    </div>

    </div>
  );
}
