import { Button, Heading, Multistep, Text } from "@itoddy-ui/react/dist";
import { ArrowRight } from "phosphor-react";
import { Container, Form, FormValidationAdvisor, Header } from "./styles";
import { TextInput } from "@ignite-ui/react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/lib/axios";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O nome de usuário deve ter no mínimo 3 caracteres" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "Apenas letras e hifens são permitidos",
    })
    .transform((username) => username.toLowerCase()),

  name: z
    .string()
    .min(6, { message: "O nome deve ter no mínimo 6 caracteres" }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegisterUser(data: RegisterFormData) {
    try{
      await api.post('users', {
        name: data.name,
        username: data.username
      })
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

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

      <Form as="form" onSubmit={handleSubmit(handleRegisterUser)}>
        <label>
          <Text size="sm">Nome do usuário</Text>
          <TextInput
            prefix="ignite.com/"
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
            {...register("name")}
          />
          <FormValidationAdvisor size="sm">
            {errors.name ? errors.name.message : ""}
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
