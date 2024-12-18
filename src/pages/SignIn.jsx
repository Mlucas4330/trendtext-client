import { React } from 'react'
import { Anchor, Box, Button, Form, FormField, Text, TextInput } from 'grommet'
import PasswordInput from '../components/PasswordInput'
import { useAuth } from '../contexts/AuthContext'
import { GoogleLogin } from '@react-oauth/google'

function SignIn() {
    const { signIn, busy } = useAuth()

    const handleLoginSuccess = (response) => {
        console.log("Login Successful:", response);
    };

    const handleLoginFailure = (response) => {
        console.log("Login Failed:", response);
    };

    return <>
        <Box>
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
                    <Text alignSelf="center">Ainda não tem uma conta? <Anchor href="/sign-up">Cadastrar</Anchor></Text>
                </Box>

                <Box margin={{
                    vertical: 'medium'
                }} style={{
                    position: 'relative'
                }}>
                    <hr style={{
                        width: '100%'
                    }} />
                    <Text style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        padding: '1rem',
                        background: '#111827',
                        transform: 'translate(-50%, -50%)'
                    }}>Ou</Text>
                </Box>

                <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
            </Form>
        </Box>
    </>
}

export default SignIn