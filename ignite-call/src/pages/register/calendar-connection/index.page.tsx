import { Button, Heading, Multistep, Text } from "@itoddy-ui/react/dist";
import { ArrowRight, Check } from "phosphor-react";
import { Container, Header } from "../styles";

import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CalendarConnection() {
  const router = useRouter();
  const session = useSession();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === "authenticated";
  
  async function handleCalendarConnection() {
    await signIn('google', {callbackUrl: '/register/calendar-connection'})
  }

  async function handleNextStep() {
    await router.push('/register/time-intervals')
  }

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

          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCalendarConnection}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedIn} onClick={handleNextStep}>
          Seu Próximo Passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  );
}
