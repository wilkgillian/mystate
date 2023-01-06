import { Text } from '@chakra-ui/react';

import Hero from '../components/Hero';
import { Container } from '../components/Container';
import { Main } from '../components/Main';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Footer } from '../components/Footer';
import Select from '../components/Select';

const Index = () => (
  <Container height="100vh">
    <Hero title="MyState" />
    <Main>
      <Select />
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text>Created by Wilk Gillian.</Text>
    </Footer>
  </Container>
);

export default Index;
