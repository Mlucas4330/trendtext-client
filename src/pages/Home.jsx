import { Accordion, AccordionPanel, Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Text, Video } from 'grommet'
import { frequently_asked, plans, video_height, videos, video_width } from '../constants.js'
import { StatusGood } from 'grommet-icons'
import { currency } from '../helpers.js'
import Marquee from 'react-fast-marquee'
import { useState, React } from 'react'

function Home() {
    const [activeIndex, setActiveIndex] = useState(null)

    const handleActive = (nextActiveIndex) => {
        setActiveIndex(nextActiveIndex)
    }

    return (
        <>
            <Box gap={'large'}>
                <Box align="center">
                    <Heading textAlign="center" margin={'none'}>
                        Gere&nbsp;<Text color="brand" size="inherit">vídeos virais&nbsp;</Text>em minutos com IA
                    </Heading>
                    <Text textAlign="center">Você está cansado de gastar horas editando vídeos manualmente?</Text>
                </Box>
                <Button alignSelf="center" size="medium" pad={'medium'} color="control" secondary href="/create" label="Gerar vídeos agora" />
            </Box>

            <Box gap={'large'}>
                <Marquee>
                    {videos.map((video, index) => (
                        <Video key={`videos_${index}`} margin={{ right: 'small' }} fit="cover" height={video_height.display} width={video_width.display} controls={false} loop autoPlay muted src={video.src} style={{ border: '1px solid #7D4CDB' }} />
                    ))}
                </Marquee>
            </Box>

            <Box gap={'large'}>
                <Heading alignSelf="center" textAlign="center" margin={'none'}>Preços</Heading>
                <Box direction="row-responsive" gap={'medium'}>
                    {
                        plans.map((plan, index) => (
                            <Card fill key={`plans_${index}`} pad={'medium'} gap={'medium'} border={{
                                color: 'brand',
                                size: 'medium',
                                style: 'solid',
                            }} elevation="none">
                                <CardHeader justify="center">
                                    <Heading color={'control'} size="medium" margin={'none'}>{currency(plan.price)}</Heading>
                                </CardHeader>
                                <CardBody gap={'small'}>
                                    {
                                        plan.benefits.map((benefit, index) => (
                                            <Box key={`benefits_${index}`} direction="row" align="center" gap={'small'}>
                                                <StatusGood />
                                                <Text margin={'none'} size="large">{benefit}</Text>
                                            </Box>
                                        ))
                                    }
                                </CardBody>
                                <CardFooter>
                                    <Button secondary fill style={{
                                        textAlign: 'center'
                                    }} label="Gerar Vídeos" href={`/pricing?plan=${plan.price}`} />

                                </CardFooter>
                            </Card>
                        ))
                    }
                </Box>
            </Box >

            <Box gap={'large'}>
                <Heading alignSelf="center" textAlign="center" margin={'none'}>Perguntas Frequentes</Heading>
                <Accordion onActive={handleActive}>
                    {frequently_asked.map((item, index) => (
                        <AccordionPanel key={`questions_${index}`} label={<Heading level={4} size="small" margin={{ vertical: 'small' }} color={activeIndex == index ? 'brand' : 'white'} style={{ transition: 'color 0.3s ease' }}>{item.question}</Heading>}>
                            <Box pad={'small'}>
                                <Text>{item.answer}</Text>
                            </Box>
                        </AccordionPanel>
                    ))}
                </Accordion>
            </Box>
        </>
    )
}

export default Home
