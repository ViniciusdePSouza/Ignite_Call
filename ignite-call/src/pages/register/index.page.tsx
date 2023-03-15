import {
  Button,
  Heading,
  Multistep,
  Text,
  TextInput,
} from "@itoddy-ui/react/dist";
import { ArrowRight } from "phosphor-react";
import { Container, Form, Header } from "./styles";

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Bem vindo ao iToddy-call!</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois sem problemas.
        </Text>

        <Multistep size={4} currentStep={1} />
      </Header>

      <Form as="form">
        <label>
          <Text size="sm">Nome do usuário</Text>
          <TextInput prefix="ignite.com" placeholder="seu-usuario" />
        </label>
        <label>
          <Text size="sm">Nome Completo</Text>
          <TextInput placeholder="seu nome completo" />
        </label>

        <Button>
          Seu Próximo Passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
