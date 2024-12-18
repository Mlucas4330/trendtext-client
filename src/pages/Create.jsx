import { Box, Button, Form, FormField, Heading, Select, Text, TextInput } from 'grommet'
import { videoDurations, videoQuantities, videos } from '../constants'
import { useEffect, useState, React } from 'react'
import axios from 'axios'
import Preview from '../components/Preview'
import { createClient } from 'pexels'

function Create() {
    const [busy, setBusy] = useState(false)
    const [content, setContent] = useState('')
    const [pexels, setPexels] = useState(null)
    const [videoQuantity, setVideoQuantity] = useState(7)
    const [videoDuration, setVideoDuration] = useState(10)
    const [videoPreviews, setVideoPreviews] = useState([{
        src: videos[0].src,
        text: 'Teste frase longa'
    }, {
        src: videos[0].src,
        text: 'Teste frase longa'
    }, {
        src: videos[0].src,
        text: 'Teste frase longa'
    }])

    const handleSubmit = async () => {
        // if (!user || user.credits < 7) {
        //     toast.error('Sem créditos o suficiente para gerar vídeos!')
        //     return
        // }

        setBusy(true)

        try {
            const videoPreviews = []
            // const { data } = await axios.post('', { content }, { withCredentials: true })

            const data = [
                'Sonhe Grande, Trabalhe Duro E Nunca Desista. Videos'
            ]

            for (let i = 0; i < videoQuantity; i++) {
                data[i]

                const { videos } = await pexels.videos.search({ query: data[i], orientation: 'portrait', size: 'medium', locale: 'pt-BR', per_page: 1 })

                videoPreviews.push({
                    text: data[i],
                    src: videos[0].video_files[0].link
                })
            }

            setVideoPreviews(videoPreviews)
        } catch (error) {
            console.err('Erro ao gerar preview: ' + error.message)
        } finally {
            setBusy(false)
        }
    }

    useEffect(() => {
        const pexelsClient = createClient(import.meta.env.VITE_PEXELS_API_KEY);

        setPexels(pexelsClient)
    }, [])

    return (
        <>
            <Box gap={'large'}>
                <Box>
                    <Heading margin={'none'} alignSelf='center' textAlign='center'>Dados</Heading>
                    <Text textAlign='center'>Preencha os dados para gerar seus vídeos</Text>
                </Box>
                <Form>
                    <FormField htmlFor="content" required label="Conteúdo">
                        <TextInput value={content} onChange={e => setContent(e.target.value)} placeholder='Quero vídeos de humor, envolvendo cachorros salsichas' />
                    </FormField>

                    <FormField margin={{
                        top: 'medium'
                    }} required label="Duração">
                        <Box pad={'small'} direction='row-responsive' gap={'small'}>
                            {
                                videoDurations.map((videoDuration_, index) => (
                                    <Button key={`video_durations_${index}`} onClick={() => setVideoDuration(videoDuration_.value)} primary={videoDuration === videoDuration_.value} color={'brand'} label={videoDuration_.label} />
                                ))
                            }
                        </Box>
                    </FormField>

                    <FormField margin={{
                        top: 'medium'
                    }} htmlFor='videoQuantity' required label="Quantidade">
                        <Select id='videoQuantity' value={videoQuantity} labelKey={'label'} valueKey={'value'} onChange={({ option }) => setVideoQuantity(option.value)} options={videoQuantities} />
                    </FormField>

                    <Button margin={{ top: 'medium' }} fill="horizontal" busy={busy} onClick={handleSubmit} secondary pad={'small'} label="Gerar Vídeos" />
                </Form>
            </Box>
            {
                videoPreviews.length > 0 &&
                <Box gap={'medium'}>
                    <Box wrap gap={{
                        column: 'medium',
                        row: 'medium'
                    }} direction='row-responsive'>
                        {
                            videoPreviews.map((video, index) => (
                                <Preview src={video.src} text={video.text} key={`video_previews_${index}`} />
                            ))
                        }
                    </Box>
                    <Button label="Baixar todos" />
                </Box>
            }
        </>
    )
}

export default Create