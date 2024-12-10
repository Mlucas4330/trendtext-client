import { React, useState } from 'react'
import { Box, TextInput, Button } from 'grommet'
import { FormView, FormViewHide } from 'grommet-icons'

const PasswordInput = () => {
    const [show, setShow] = useState(false)

    return (
        <>
            <Box direction="row">
                <TextInput plain type={show ? 'text' : 'password'} name="password" id="password" placeholder="Digite sua senha" />
                <Button onClick={() => setShow(!show)} icon={show ? <FormView /> : <FormViewHide />} />
            </Box>
        </>
    )
}

export default PasswordInput