import { Button, Text } from "@itoddy-ui/react/dist";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormAnnotation } from "./styles";
import { TextInput } from "@ignite-ui/react";
import { useRouter } from "next/router";

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O usuário precisa de ao menor 3 caracteres" })
    .regex(/^([a-z\\-]+)$/i, {
      message: "Apenas letras e hifens são permitidos",
    })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export default function ClaimUsernameForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          prefix="iToddy.com/"
          placeholder="seu-usuário"
          {...register("username")}
        />
        <Button size="sm" type="submit">
          Cria usuário
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
        {errors.username
          ? errors.username.message
          : "Digite o nome de usuário desejado !"}
        </Text>
      </FormAnnotation>
    </>
  );
}
