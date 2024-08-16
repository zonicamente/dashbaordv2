import React, { useEffect, useState } from 'react'
import './Fases.css';
import { fase01 } from '../types/BackendData';


const Fase01 = () => {

  const [data, setData] = useState<fase01[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/fdata')
      .then(response => response.json())
      .then((data: fase01[]) => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Fase 01</h1>
      <hr className="divisor"></hr>
      <div className="tarjeta">
        <div className="table-info">
          <table>
            <tr>
              <th>PROCESOS</th>
              <th>FECHA FINALIZACION         </th>
              <th>MADRUGADA</th>
            </tr>
            {data.filter(item => item.HABILITADO === 'SI').map((item, index) => (
              <tr>
                <td>{item.PROCESO}</td>
                <td>{item.FECHA.toString()}</td>
                <td>{item.ESTATUS}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Fase01;
