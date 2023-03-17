import { Button, Heading, Multistep, Text } from "@itoddy-ui/react/dist";
import { ArrowRight } from "phosphor-react";
import { Container, Header } from "../styles";
import { TextInput } from "@ignite-ui/react";

import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { ConnectBox, ConnectItem } from "./styles";
import { signIn } from "next-auth/react";

export default function CalendarConnection() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda ! </Heading>

        <Text>
          Conecte seu calendario para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados
        </Text>

        <Multistep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calender</Text>
          
          <Button variant="secondary" size="sm" onClick={ () => signIn('google')}>
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button>
          Seu Próximo Passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
