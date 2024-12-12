import { React } from 'react'
import { Anchor, Box, Heading, Footer as FooterGrommet, Image, Text, Button, Paragraph } from 'grommet'
import { logoSize } from '../constants'

function Footer() {
    return (
        <>
            <FooterGrommet direction="row-responsive" align="top">
                <Box>
                    <Button href="/">
                        <Image height={logoSize} width={logoSize} src="/logo.png" />
                    </Button>
                    <Paragraph size="small">Gere vídeos incríveis com a ajuda da inteligência artificial, transformando suas ideias em realidade com apenas alguns cliques, sem precisar de habilidades técnicas.</Paragraph>
                    <Text color={'border'} size="xsmall">Copyright © 2024 - Todos os direitos reservados</Text>
                </Box>
                <Box>
                    <Heading size="small" margin={'none'}>Legal</Heading>
                    <Box>
                        <Anchor color={'brand'} href={'terms-of-use'}>Termos de Uso</Anchor>
                        <Anchor color={'brand'} href={'privacy-policy'}>Política de Privacidade</Anchor>
                        <Text>CNPJ: 54.955.173/0001-92</Text>
                    </Box>
                </Box>
                <Box>
                    <Heading size="small" margin={'none'}>Meus Outros Projetos</Heading>
                    <Box>
                        <Anchor color={'brand'} target="_blank" href={'https://www.linkedin.com/in/lucas-medeiros-2b77591ab/'}>Linkedin</Anchor>
                        <Anchor color={'brand'} target="_blank" href={'https://main.dau18cobre6u8.amplifyapp.com/'}>Gerador de imagem com IA</Anchor>
                        <Anchor color={'brand'} target="_blank" href={'https://www.ninjasena.online/'}>Ninja Sena</Anchor>
                        <Anchor color={'brand'} target="_blank" href={'https://main.d3iswo5odfvwd2.amplifyapp.com/'}>Encurtador de URL</Anchor>
                    </Box>
                </Box>
            </FooterGrommet>
        </>
    )
}

export default Footer