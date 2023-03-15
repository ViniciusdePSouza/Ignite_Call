import {
  Button,
  Heading,
  Multistep,
  Text,
  TextInput,
} from "@itoddy-ui/react/dist";
import { ArrowRight } from "phosphor-react";
import { Container, Form, FormValidationAdvisor, Header } from "./styles";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3)
    .regex(/^([a-z\\-]+)$/i, {
      message: "Apenas letras e hifens são permitidos",
    })
    .transform((username) => username.toLowerCase()),

  fullname: z
    .string()
    .min(6)
    .regex(/^([a-z]+)$/i, {
      message: "Apenas letras são permitidos",
    }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

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
          <TextInput
            prefix="ignite.com"
            placeholder="seu-usuario"
            {...register("username")}
          />
          <FormValidationAdvisor>
            {errors.username ? errors.username.message : ""}
          </FormValidationAdvisor>
        </label>
        <label>
          <Text size="sm">Nome Completo</Text>
          <TextInput
            placeholder="seu nome completo"
            {...register("fullname")}
          />
          <FormValidationAdvisor>
            {errors.fullname ? errors.fullname.message : ""}
          </FormValidationAdvisor>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Seu Próximo Passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  );
}
