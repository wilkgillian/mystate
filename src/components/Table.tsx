import {
  Table as TableChakra,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

function Table({ children }: TableProps) {
  return (
    <TableContainer>
      <TableChakra variant="simple">
        <Thead>
          <Tr>
            <Th>Cidade</Th>
            <Th>Estado</Th>
            <Th>Microrregiao</Th>
            <Th>Mesorregiao</Th>
            <Th>Uf</Th>
            <Th>Regiao</Th>
            <Th>Sigla</Th>
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </TableChakra>
    </TableContainer>
  );
}

export default Table;
