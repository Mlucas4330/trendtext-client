import { React } from 'react'
import { Anchor, Box, Button, DropButton, Header as HeaderGrommet, Image, Nav, Text } from 'grommet'
import { Menu } from 'grommet-icons'
import { useAuth } from '../contexts/AuthContext.jsx'
import { logoSize } from '../constants.js'

function Header() {
    const { user, signOut } = useAuth()

    return (
        <>
            <HeaderGrommet sticky="scrollup">
                <Button href='/'>
                    <Image height={logoSize} width={logoSize} src="/logo.png" alt="logo" />
                </Button>
                <Nav>
                    <DropButton
                        dropProps={{
                            elevation: 'none',
                            round: 'small',
                            pad: 'small',
                            background: 'background-contrast',
                            align: { right: 'right', top: 'bottom' },
                        }}
                        icon={<Menu color="control" />}
                        dropContent={
                            <Box gap={'small'} pad={'small'} align="end">
                                {user ?
                                    <>
                                        <Text size="xlarge" margin={'none'}>Créditos: {user.credits}</Text>
                                        <Anchor label="Gerar Vídeos" href="/create" />
                                        <Anchor label="Preços" href="/pricing" />
                                        <Anchor label="Sair" onClick={signOut} />
                                    </> :
                                    <>
                                        <Anchor label="Entrar" href="/sign-in" />
                                        <Anchor label="Cadastrar" href="/sign-up" />
                                    </>
                                }
                            </Box>
                        }
                    />
                </Nav>
            </HeaderGrommet>
        </>
    )
}

export default Header