import {
  Box,
  Button,
  filter,
  Flex,
  Input,
  Select as SelectChakra,
  VStack
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Select() {
  const [dados, setDados] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [infos, setInfos] = useState([]);
  const [loading, setloading] = useState(false);

  function handleOptionState(state: string) {
    setState(state);
  }
  function handleOptionCity(city: string) {
    setCity(city);
  }
  async function getMunicipes(sigla: string) {
    if (sigla === '') {
      return;
    } else {
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`
      );
      setCities(data);
    }
  }
  async function handleSearch(state: string, id: string) {
    if (state === '' || id === '') {
      return;
    } else {
      const { data } = await axios.get(
        ` https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${id}/distritos`
      );

      setInfos(data);
    }
  }
  useEffect(() => {
    async function loadData() {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      );
      setDados(data);
    }
    loadData();
    getMunicipes(state);
  }, [state]);

  console.log(infos);

  return (
    <VStack>
      <SelectChakra
        icon={<MdArrowDropDown />}
        onChange={event => handleOptionState(event.target.value)}
        placeholder="Selecione o estado"
      >
        {dados.map(state => (
          <option value={state.sigla} key={state.id}>
            {state.nome}
          </option>
        ))}
      </SelectChakra>
      {state !== '' && (
        <SelectChakra
          icon={<MdArrowDropDown />}
          onChange={event => handleOptionCity(event.target.value)}
          placeholder="Selecione a cidade"
        >
          {cities.map(cities => (
            <option value={cities.id} key={cities.id}>
              {cities.nome}
            </option>
          ))}
        </SelectChakra>
      )}
      <Button type="submit" onClick={() => handleSearch(state, city)}>
        Buscar informações
      </Button>
      <ul>
        {infos === null
          ? ''
          : infos.map(inf => <li key={inf.id}>{inf.nome}</li>)}
      </ul>
    </VStack>
  );
}

export default Select;
