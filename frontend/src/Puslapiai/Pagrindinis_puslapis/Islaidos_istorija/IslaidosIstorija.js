import React from "react";

//Icons
import {FaShoppingCart, FaHandHoldingMedical} from "react-icons/fa";
import {AiFillCar} from "react-icons/ai";


export default function IslaidosIstorija () {
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
                <td><FaShoppingCart/></td>
                <td>2022-03-22</td>
                <td>MAXIMA</td>
                <td className="red">-10.99€</td>
              </tr>
              <tr>
                <td><FaHandHoldingMedical/></td>
                <td>2022-03-22</td>
                <td>Poliklinika</td>
                <td className="red">-10.99€</td>
              </tr>
              <tr>
                <td><AiFillCar/></td>
                <td>2022-03-22</td>
                <td>Mašinos remontas</td>
                <td className="red">-105.99€</td>
              </tr>
              <tr>
                <td><FaShoppingCart/></td>
                <td>2022-03-22</td>
                <td>Norfa</td>
                <td className="red">-10.99€</td>
              </tr>
              <tr>
                <td><FaHandHoldingMedical/></td>
                <td>2022-03-22</td>
                <td>Poliklinika</td>
                <td className="red">-10.99€</td>
              </tr>
            </tbody>
          </table>
  );
}
