import {
  Button,
  Select as SelectChakra,
  Spinner,
  Td,
  Tr,
  VStack
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import { FormEvent, useEffect, useState } from 'react';
import { addInfos, useIbge } from '../redux/sliceIbge';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../services/api';
import Table from './Table';

function Select() {
  // const ibgeInfos = useSelector(useIbge);

  const dispatch = useDispatch();

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
      const { data } = await api.get(`/estados/${sigla}/municipios`);
      setCities(data);
    }
  }
  async function handleSearch(e: FormEvent, state: string, id: string) {
    e.preventDefault();
    if (state === '' || id === '') {
      return;
    } else {
      setloading(true);
      dispatch(addInfos({ state: state, city: id }));
      const { data } = await api.get(`/municipios/${id}/distritos`);
      setInfos(data);
      setCity('');
      setloading(false);
    }
  }
  const informations = infos.map(info => {
    return {
      cidade: info.municipio.nome,
      microrregiao: info.municipio.microrregiao.nome,
      mesorregiao: info.municipio.microrregiao.mesorregiao.nome,
      uf: info.municipio.microrregiao.mesorregiao.UF.sigla,
      estado: info.municipio.microrregiao.mesorregiao.UF.nome,
      regiao: info.municipio.microrregiao.mesorregiao.UF.regiao.nome,
      regiao_sigla: info.municipio.microrregiao.mesorregiao.UF.regiao.sigla
    };
  });
  useEffect(() => {
    async function loadData() {
      const { data } = await api.get('/estados');
      setDados(data);
    }
    loadData();
    if (state !== null) {
      getMunicipes(state);
    }
  }, [state]);

  return (
    <VStack as="form">
      <SelectChakra
        icon={<MdArrowDropDown />}
        value={null}
        onChange={event => handleOptionState(event.target.value)}
        placeholder="Selecione o estado"
        required
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
          value={null}
          onChange={event => handleOptionCity(event.target.value)}
          placeholder="Selecione a cidade"
          required
        >
          {!loading ? (
            cities.map(cities => (
              <option value={cities.id} key={cities.id}>
                {cities.nome}
              </option>
            ))
          ) : (
            <Spinner />
          )}
        </SelectChakra>
      )}
      <Button
        type="submit"
        disabled={loading || state === '' || city === '' ? true : false}
        onClick={event => handleSearch(event, state, city)}
      >
        Buscar informações
      </Button>
      {loading ? (
        <Spinner />
      ) : (
        <Table>
          {informations?.map(inf => (
            <>
              <Tr key={inf.uf}>
                <Td>{inf.cidade}</Td>
                <Td>{inf.estado}</Td>
                <Td>{inf.microrregiao}</Td>
                <Td>{inf.mesorregiao}</Td>
                <Td>{inf.uf}</Td>
                <Td>{inf.regiao}</Td>
                <Td>{inf.regiao_sigla}</Td>
              </Tr>
            </>
          ))}
        </Table>
      )}
    </VStack>
  );
}

export default Select;
