import { React } from 'react'
import { Anchor, Box, Button, Form, FormField, Text, TextInput } from 'grommet'
import { useAuth } from '../contexts/AuthContext'
import PasswordInput from '../components/PasswordInput'

function SignUp() {
    const { signUp, busy } = useAuth()

    return <>
        <Box>
            <Form messages={{
                required: 'Campo obrigatório'
            }} onSubmit={({ value }) => signUp(value)}>
                <FormField htmlFor="username" name="username" required label="Usuário">
                    <TextInput name="username" id="username" placeholder="Digite seu nome de usuário" />
                </FormField>
                <FormField htmlFor="email" name="email" required label="Email">
                    <TextInput type="email" name="email" id="email" placeholder="Digite seu email" />
                </FormField>
                <FormField htmlFor="password" name="password" required label="Senha">
                    <PasswordInput />
                </FormField>
                <Button fill busy={busy} secondary type="submit" label="Cadastrar" />
                <Box pad={'small'}>
                    <Text alignSelf="center">Já tem uma conta? <Anchor href="/sign-in">Entrar</Anchor></Text>
                </Box>
            </Form>
        </Box>
    </>
}

export default SignUp