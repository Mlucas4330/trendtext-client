import { React } from 'react'
import { Anchor, Box, Heading, Text } from 'grommet'
import { date_last_update } from '../constants'

function TermsOfUse() {
    return (
        <>
            <Box pad={{
                horizontal: 'xlarge'
            }}>
                <Heading level={2} margin="none">Termos de Uso - TrendText</Heading>

                <Text margin={{ vertical: 'small' }}>
                    Última atualização: {date_last_update}
                </Text>

                <Heading level={3} margin="none">1. Conta de Usuário</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    O usuário deve criar uma conta utilizando seu email e senha. A conta será protegida por credenciais de acesso fornecidas pelo próprio usuário, sendo de responsabilidade deste manter a confidencialidade e segurança de seus dados de login.
                </Text>

                <Heading level={3} margin="none">2. Compra de Créditos</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Para gerar vídeos, o usuário precisa adicionar créditos à sua conta. Os créditos podem ser comprados por meio de **Pix**, **Cartão de Crédito** ou **Boleto Bancário**. A TrendText não armazena dados financeiros do usuário; os pagamentos são processados por plataformas terceirizadas seguras.
                </Text>

                <Heading level={3} margin="none">3. Geração de Vídeos</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Após a compra de créditos, o usuário pode utilizar o saldo para criar vídeos personalizados. Os vídeos gerados são exclusivos do usuário e podem ser baixados e compartilhados como desejar.
                </Text>

                <Heading level={3} margin="none">4. Propriedade dos Vídeos</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    O usuário é o proprietário dos vídeos gerados por meio da TrendText, e tem o direito de usá-los como desejar. A TrendText não detém nenhum direito sobre os vídeos criados, exceto para fins operacionais e de melhoria dos serviços da plataforma.
                </Text>

                <Heading level={3} margin="none">5. Direitos Autorais</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    A TrendText não se responsabiliza por quaisquer infrações relacionadas aos direitos autorais do conteúdo gerado. O usuário deve garantir que possui os direitos necessários para usar qualquer conteúdo inserido na plataforma (como texto, imagens, etc.). A TrendText se exime de qualquer responsabilidade sobre o uso indevido de conteúdo protegido por direitos autorais.
                </Text>

                <Heading level={3} margin="none">6. Responsabilidade do Usuário</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    O usuário concorda em utilizar a plataforma de forma responsável, não realizando ações que possam violar leis locais ou internacionais, como difamação, assédio, uso de linguagem ofensiva ou conteúdo impróprio. O usuário deve garantir que seus vídeos não violam os direitos de terceiros, incluindo direitos autorais, marcas registradas e privacidade.
                </Text>

                <Heading level={3} margin="none">7. Limitação de Responsabilidade</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    A TrendText não se responsabiliza por danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar a plataforma, incluindo, mas não se limitando a, perda de dados, falhas no sistema ou danos a dispositivos do usuário.
                </Text>

                <Heading level={3} margin="none">8. Alterações nos Termos</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    A TrendText se reserva o direito de alterar ou modificar estes Termos de Uso a qualquer momento. Quando isso acontecer, a plataforma notificará o usuário por meio do site ou por email. O uso contínuo da plataforma após alterações nos Termos indicará que o usuário concorda com as novas condições.
                </Text>

                <Heading level={3} margin="none">9. Rescisão</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    A TrendText se reserva o direito de suspender ou encerrar a conta de qualquer usuário que violar estes Termos de Uso, sem aviso prévio. O usuário poderá rescindir sua conta a qualquer momento, mas isso não isenta o usuário de cumprir suas obrigações pendentes, como o pagamento de créditos adquiridos.
                </Text>

                <Heading level={3} margin="none">10. Lei Aplicável</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa relacionada ao uso da plataforma será resolvida nos tribunais competentes da cidade de Novo Hamburgo, RS.
                </Text>


                <Heading level={3} margin="none">11. Contato</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo email: mlucas4330@gmail.com
                </Text>
            </Box>
            <Box align="center">
                <Anchor href="/privacy-policy" label="Política de Privacidade" />
                <Text textAlign='center' size="small">Ao utilizar a TrendText, você confirma que leu e concorda com nossos Termos de Uso.</Text>
            </Box>
        </>
    )
}

export default TermsOfUse