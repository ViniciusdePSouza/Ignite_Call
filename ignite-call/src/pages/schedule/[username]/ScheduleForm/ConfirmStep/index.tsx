import { CalendarBlank, Clock } from "phosphor-react";
import { ConfirmForm, FormActions, FormHeader } from "./styles";
import { Button, Text, TextArea } from "@itoddy-ui/react/dist";
import { TextInput } from "@ignite-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ConfirmStepFormSchema = z.object({
    name: z.string().min(3),
    email: z.string().min(7),
    observations: z.string()
})

type ConfirmStepFormData = z.infer<typeof ConfirmStepFormSchema>

export default function ConfirmStep() {
    function handleConfirmScheduling() {}

    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<ConfirmStepFormData>({
        resolvers: zodResolver(ConfirmStepFormSchema)
    })

    return (
        <ConfirmForm as='form' onSubmit={handleConfirmScheduling}>
            <FormHeader>
                <Text>
                    <CalendarBlank/>
                    22 de Setembro de 2023
                </Text>

                <Text>
                    <Clock/>
                    18:00h
                </Text>

                <label>
                    <Text size='sm'>Nome Completo</Text>
                    <TextInput placeholder='Seu Nome' {...register('name')}/>
                </label>
                <label>
                    <Text size='sm'>Endereço de e-mail</Text>
                    <TextInput type='email' placeholder='Seu Nome'  {...register('email')}/>
                </label>
                <label>
                    <Text size='sm'>Observações</Text>
                    <TextArea  {...register('observations')}/>
                </label>
            </FormHeader>

            <FormActions>
                <Button type='button' variant='tertiary'>Cancelar</Button>
                <Button type='submit' disabled={isSubmitting}>Confirmar</Button>
            </FormActions>
        </ConfirmForm>
    )
}