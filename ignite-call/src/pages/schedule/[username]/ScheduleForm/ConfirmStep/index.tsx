import { CalendarBlank, Clock } from "phosphor-react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { Button, Text, TextArea } from "@itoddy-ui/react/dist";
import { TextInput } from "@ignite-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";

const confirmStepFormSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter ao menos 3 caracteres" }),
  email: z.string().email({ message: "digite um email válido" }),
  observations: z.string().nullable(),
});

type ConfirmStepFormData = z.infer<typeof confirmStepFormSchema>;

interface ConfirmStepProps {
  schedulingDate: Date;
  onReturnToCalendar: () => void;
}

export function ConfirmStep({
  schedulingDate,
  onReturnToCalendar,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmStepFormData>({
    resolver: zodResolver(confirmStepFormSchema),
  });

  const dateFormatted = dayjs(schedulingDate).format("DD[ de ]MMMM[ de ]YYYY");
  const timeFormatted = dayjs(schedulingDate).format("HH:mm[h]");

  const router = useRouter();
  const username = String(router.query.username);

  async function handleCreateEvent(data: ConfirmStepFormData) {
    const { name, email, observations } = data;

    const newEvent = {
      name,
      email,
      observations,
      date: schedulingDate
    };

    await api.post(`/users/${username}/schedule`, newEvent);

    onReturnToCalendar()
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleCreateEvent)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {dateFormatted}
        </Text>

        <Text>
          <Clock />
          {timeFormatted}
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu Nome" {...register("name")} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>
      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput type="email" placeholder="Seu Nome" {...register("email")} />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register("observations")} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onReturnToCalendar}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}
