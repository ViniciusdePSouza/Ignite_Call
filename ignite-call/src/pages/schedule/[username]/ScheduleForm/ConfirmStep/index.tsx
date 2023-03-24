import { CalendarBlank, Clock } from "phosphor-react";
import { ConfirmForm, FormActions, FormHeader } from "./styles";
import { Button, Text, TextArea } from "@itoddy-ui/react/dist";
import { TextInput } from "@ignite-ui/react";

export default function ConfirmStep() {
    function handleConfirmScheduling() {}

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
                    <Text size='sm'>Nome Copleto</Text>
                    <TextInput placeholder='Seu Nome'/>
                </label>
                <label>
                    <Text size='sm'>Endereço de e-mail</Text>
                    <TextInput type='email' placeholder='Seu Nome'/>
                </label>
                <label>
                    <Text size='sm'>Observações</Text>
                    <TextArea  />
                </label>
            </FormHeader>

            <FormActions>
                <Button type='button' variant='tertiary'>Cancelar</Button>
                <Button type='submit'>Confirmar</Button>
            </FormActions>
        </ConfirmForm>
    )
}