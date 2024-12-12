import { React } from 'react'
import { Anchor, Box, Button, Form, FormField, Text, TextInput } from 'grommet'
import PasswordInput from '../components/PasswordInput'
import { useAuth } from '../contexts/AuthContext'

function SignIn() {
    const { signIn, busy } = useAuth()

    return <>
        <Form messages={{
            required: 'Campo obrigatório'
        }} onSubmit={({ value }) => signIn(value)}>
            <FormField htmlFor="email" name="email" required label="Email">
                <TextInput type="email" name="email" id="email" placeholder="Digite seu email" />
            </FormField>
            <FormField htmlFor="password" name="password" required label="Senha">
                <PasswordInput />
            </FormField>
            <Button busy={busy} fill secondary type="submit" label="Entrar" />
            <Box pad={'small'}>
                <Text alignSelf="center">Ainda não tem uma conta? <Anchor href="sign-up">Cadastrar</Anchor></Text>
            </Box>
        </Form>
    </>
}

export default SignIn