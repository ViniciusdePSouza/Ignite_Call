import { ArrowRight } from "phosphor-react";
import { TextInput } from "@ignite-ui/react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Heading,
  Multistep,
  Text,
  Button,
  TextArea,
  Avatar,
} from "@itoddy-ui/react/dist";
import { Container, Header } from "../styles";
import { FormAnnotation, ProfileBox } from "./styles";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { buildNextAthOptions } from "@/pages/api/auth/[...nextauth].api";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

const updateProfileFormSchema = z.object({
  bio: z.string(),
});

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfile() {
  const session = useSession()
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  });

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('users/profile', {
      bio: data.bio
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem vindo ao iToddy-call!</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois sem problemas.
        </Text>

        <Multistep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto de Perfil</Text>
          <Avatar src={session.data?.user.avatar_url} alt='Foto de perfil do usuário' />
        </label>

        <label>
          <Text size="sm">Sobre você</Text>
          <TextArea {...register("bio")} />

          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido na sua página pessoal
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Seu Próximo Passo
          <ArrowRight />
        </Button>
      </ProfileBox>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAthOptions(req, res)
  );

  return {
    props: {
      session
    }
  }
}
