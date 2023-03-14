import { Button, TextInput } from "@itoddy-ui/react/dist";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { Form } from "./styles";

export default function ClaimUsernameForm () {
    const { register, handleSubmit } = useForm()

    async function handlePreRegister(data: any) {
        console.log(data)
    }

    return (
        <Form as='form' onSubmit={handleSubmit(handlePreRegister)}>
           <TextInput prefix="iToddy.com/" placeholder="seu-usuário" {...register('username')}/>
           <Button size="sm" type="submit">
            Cria usuário
            <ArrowRight/>
           </Button>
        </Form>
    )
}