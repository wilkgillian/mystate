import { Flex, Heading } from '@chakra-ui/react';

interface HeroProps {
  title: string;
}

export default function Hero({ title }: HeroProps) {
  return (
    <Flex
      justifyContent="center"
      height="100vh"
      bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
      bgClip="text"
    >
      <Heading fontSize="4vw">{title}</Heading>
    </Flex>
  );
}
