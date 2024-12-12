import { Anchor, Box, Heading, Text } from 'grommet'
import { date_last_update } from '../constants'
import { React } from 'react'

function PrivacyPolicy() {
    return (
        <>
            <Box pad={{
                horizontal: 'xlarge'
            }}>
                <Heading level={2} margin={'none'}>Política de Privacidade - TrendText</Heading>

                <Text margin={{ vertical: 'small' }}>
                    Última atualização: {date_last_update}
                </Text>

                <Heading level={3} margin="none">1. Introdução</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    A TrendText compromete-se a proteger a sua privacidade. Esta política descreve como coletamos, usamos, e protegemos as informações pessoais fornecidas por você ao utilizar nossos serviços.
                </Text>

                <Heading level={3} margin="none">2. Coleta de Dados</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Coletamos dados pessoais, como nome, e-mail e informações de pagamento, para proporcionar uma experiência personalizada ao usuário. Esses dados são utilizados apenas para a criação de contas, processamento de pagamentos e geração de vídeos.
                </Text>

                <Heading level={3} margin="none">3. Uso dos Dados</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    As informações coletadas são usadas para criar e gerenciar a conta do usuário, processar transações de pagamento, e gerar vídeos solicitados. Não compartilhamos seus dados com terceiros, exceto quando necessário para o processamento de pagamentos ou conforme exigido por lei.
                </Text>

                <Heading level={3} margin="none">4. Segurança</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Tomamos medidas razoáveis para proteger seus dados pessoais, utilizando criptografia e outras tecnologias de segurança durante o processo de pagamento e no armazenamento de informações sensíveis.
                </Text>

                <Heading level={3} margin="none">5. Direitos Autorais</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Os vídeos gerados através do TrendText são de sua propriedade, mas você é responsável por garantir que o conteúdo não infrinja direitos autorais de terceiros. A TrendText não se responsabiliza por quaisquer violações de direitos autorais.
                </Text>

                <Heading level={3} margin="none">6. Alterações nesta Política</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    A TrendText pode alterar esta política de privacidade de tempos em tempos. Quaisquer mudanças serão publicadas nesta página com a data de atualização.
                </Text>

                <Heading level={3} margin="none">7. Dados de Pagamento</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Para realizar transações financeiras, coletamos informações de pagamento como números de cartão de crédito, detalhes de contas bancárias, e outros métodos de pagamento. Esses dados são criptografados e processados por nossos parceiros de pagamento, que seguem padrões de segurança rigorosos. A TrendText não armazena os dados sensíveis de pagamento diretamente em seus servidores. Usamos provedores de pagamento de confiança para garantir que suas informações estejam protegidas.
                </Text>

                <Heading level={3} margin="none">8. Contato</Heading>
                <Text margin={{
                    vertical: 'small'
                }}>
                    Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco pelo email: mlucas4330@gmail.com
                </Text>
            </Box>
            <Box align="center">
                <Anchor href="terms-of-use" label="Termos de Uso" />
                <Text size="small">Ao utilizar a TrendText, você confirma que leu e concorda com nossos Termos de Uso.</Text>
            </Box>
        </>
    )
}

export default PrivacyPolicy