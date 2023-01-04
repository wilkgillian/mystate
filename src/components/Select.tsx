import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Select() {
  const [dados, setDados] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      );
      setDados(data);
    }
    loadData();
  });
  return (
    <Box m="auto" w={200} h={200} overflow="auto">
      <ul>
        {dados.map(state => (
          <li key={state.id}>{state.nome}</li>
        ))}
      </ul>
    </Box>
  );
}

export default Select;
