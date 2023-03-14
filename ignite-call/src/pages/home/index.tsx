import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./styles";
import Image from "next/image";

import previewImg from "../../assets/app_preview.png";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size='4xl'>Agendamento descomplicado</Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre
        </Text>
      </Hero>

      <Preview>
        <Image
          src={previewImg}
          height={400}
          width={400}
          quality={100}
          priority
          alt="Exemplo de calendário da aplicação em funcionamento"
        />
      </Preview>
    </Container>
  )
}
