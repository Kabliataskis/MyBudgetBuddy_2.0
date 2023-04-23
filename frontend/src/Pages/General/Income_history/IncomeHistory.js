import React from "react";

//Icons
import { FaPiggyBank } from "react-icons/fa";

export default function IncomeHistory() {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
          <th>Pavadinimas</th>
          <th>Suma</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Alga</td>
          <td className="green">+10.99€</td>
        </tr>
        <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Skola</td>
          <td className="green">+10.99€</td>
        </tr>
        <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Dovana</td>
          <td className="green">+10.99€</td>
        </tr>
        <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Alga</td>
          <td className="green">+10.99€</td>
        </tr>
        <tr>
          <td>
            <FaPiggyBank />
          </td>
          <td>2022-03-22</td>
          <td>Alga</td>
          <td className="green">+10.99€</td>
        </tr>
      </tbody>
    </table>
  );
}
