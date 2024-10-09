"use client";

import { useEffect, useState } from "react";
import axiosInstance from '../utils/axiosConfig'; // Importe o axios configurado


type TableProps = {
  source: string; // API endpoint or path to JSON file
  headers?: string[]; // Optional array of custom headers
};

type DataItem = {
  [key: string]: any; // General shape of a data item from the source
};

const Table: React.FC<TableProps> = ({ source, headers }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;

        // Tenta buscar os dados da API
        if (source.startsWith('http')) {
          // Fetch from an API
          response = await axiosInstance.get(source);
          setData(response.data); // Assumindo que a resposta é uma lista direta
          console.log(response.data);
        } else {
          // Load JSON file locally
          response = await fetch(source);
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [source]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          {(headers && headers.length > 0 ? headers : Object.keys(data[0])).map((header, index) => (
            <th key={index} className="border border-gray-300 px-4 py-2 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {(headers && headers.length > 0 ? headers : Object.keys(item)).map((_, idx) => (
              <td key={idx} className="border border-gray-300 px-4 py-2">
                {Object.values(item)[idx]} {/* Usa o índice para obter o valor correspondente */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
