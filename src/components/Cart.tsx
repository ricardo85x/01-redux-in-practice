import { useSelector } from "react-redux";

export const Cart: React.FC = () => {

  const state = useSelector(state => state)

  console.log(state)

  
  return (
    <table>
      <thead>
        <tr>
          <th> Produto</th>
          <th> Preço</th>
          <th>Quantidade</th>
          <th>SubTotal</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};
