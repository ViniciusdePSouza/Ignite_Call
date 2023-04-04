import { prisma } from "@/lib/prisma";
import { Avatar, Heading, Text } from "@itoddy-ui/react/dist";
import { GetStaticPaths, GetStaticProps } from "next";
import { ScheduleForm } from "./ScheduleForm";
import { Container, UserHeader } from "./styled";
import { NextSeo } from "next-seo";

interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatarUrl: string;
  };
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Marque um horário com ${user.name}| iToddy Call `} />

      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} alt="foto de perfil do usuário" />
          <Heading>{user.name}</Heading>
          <Text size="sm">{user.bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },

    revalidate: 60 * 60 * 24, //1 day
  };
};
