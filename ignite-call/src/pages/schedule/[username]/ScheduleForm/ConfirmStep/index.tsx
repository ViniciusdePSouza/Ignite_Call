import { CalendarBlank, Clock } from "phosphor-react";
import { ConfirmForm, FormActions, FormHeader } from "./styles";
import { Button, Text, TextArea } from "@itoddy-ui/react/dist";
import { TextInput } from "@ignite-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const confirmStepFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string().nullable(),
});

type ConfirmStepFormData = z.infer<typeof confirmStepFormSchema>;

export function ConfirmStep() {
  function handleConfirmScheduling() {
    console.log('ola')
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmStepFormData>({
    resolver: zodResolver(confirmStepFormSchema)
  });

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2023
        </Text>

        <Text>
          <Clock />
          18:00h
        </Text>

      </FormHeader>
        <label>
          <Text size="sm">Nome Completo</Text>
          <TextInput placeholder="Seu Nome" {...register("name")} />
        </label>
        <label>
          <Text size="sm">Endereço de e-mail</Text>
          <TextInput
            type="email"
            placeholder="Seu Nome"
            {...register("email")}
          />
        </label>
        <label>
          <Text size="sm">Observações</Text>
          <TextArea {...register("observations")} />
        </label>

      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  );
}
