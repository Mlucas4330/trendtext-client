import { Box, Button, Form, FormField, Heading, Text, TextInput } from 'grommet'
import { videoDurations, videoQuantities } from '../constants'
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
    const [videoPreviews, setVideoPreviews] = useState([])

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
            <Box gap={'large'} margin={{
                horizontal: 'xlarge'
            }}>
                <Box>
                    <Heading margin={'none'} textAlign='center'>Dados</Heading>
                    <Text textAlign='center'>Preencha os dados para gerar seus vídeos</Text>
                </Box>
                <Form>
                    <FormField htmlFor="content" required label="Conteúdo">
                        <TextInput value={content} onChange={e => setContent(e.target.value)} placeholder='Quero vídeos de humor, envolvendo cachorros salsichas' />
                    </FormField>

                    <FormField margin={{
                        top: 'medium'
                    }} required label="Duração">
                        <Box pad={'small'} direction='row' gap={'small'}>
                            {
                                videoDurations.map((videoDuration_, index) => (
                                    <Button key={`video_durations_${index}`} onClick={() => setVideoDuration(videoDuration_.value)} primary={videoDuration === videoDuration_.value} color={'brand'} label={videoDuration_.label} />
                                ))
                            }
                        </Box>
                    </FormField>

                    <FormField margin={{
                        top: 'medium'
                    }} required label="Quantidade">
                        <Box pad={'small'} direction='row' gap={'small'}>
                            {
                                videoQuantities.map((videoQuantity_, index) => (
                                    <Button key={`video_quantities_${index}`} onClick={() => setVideoQuantity(videoQuantity_.value)} primary={videoQuantity === videoQuantity_.value} color={'brand'} label={videoQuantity_.label} />
                                ))
                            }
                        </Box>
                    </FormField>

                    <Button margin={{ top: 'medium' }} fill="horizontal" busy={busy} onClick={handleSubmit} secondary pad={'small'} label="Gerar Vídeos" />
                </Form>
                {
                    videoPreviews.length > 0 &&
                    <Box>
                        {
                            videoPreviews.map((video, index) => (
                                <Preview src={video.src} text={video.text} key={`video_previews_${index}`} />
                            ))
                        }
                    </Box>
                }
            </Box>
            {/* <Box direction="row-responsive" gap={'xlarge'}>
                <Box flex >

                    <Form>
                        {show && <Layer background={'#111827'} style={{
                            padding: '1rem'
                        }} onEsc={() => setShow(false)} responsive={false} onClickOutside={() => setShow(false)}>
                            <Box align='end'>
                                <Button onClick={() => setShow(false)} icon={<Close />} />
                            </Box>
                            <FormField htmlFor="niche" label="Escolha o Nicho">
                                <Box direction="row">
                                    <Box flex>
                                        <Select plain id="niche" options={niches} value={niche} onChange={({ option }) => setNiche(option.value)} labelKey="label" valueKey="value" placeholder="Selecione" />
                                    </Box>
                                </Box>
                            </FormField>
                            <Button onClick={handleIA} label="Gerar Frases" />
                        </Layer>}

                        {showPhrasesSplitter && <Layer responsive={false} background={'#111827'} style={{
                            padding: '1rem'
                        }} onEsc={() => setShowPhrasesSplitter(false)} onClickOutside={() => setShowPhrasesSplitter(false)}>
                            <Box align='end'>
                                <Button onClick={() => setShowPhrasesSplitter(false)} icon={<Close />} />
                            </Box>
                            <FormField htmlFor="splitter" label="Separar frases por">
                                <TextInput id='splitter' onChange={(e) => setSplitter(e.target.value)} value={splitter} />
                            </FormField>
                            <Button onClick={handleSplitter} label="Gerar Frases" />
                        </Layer>}

                        <FormField htmlFor="videos" required label="Vídeos de fundo">
                            <FileInput id="videos" name="videos" accept="video/*" multiple onChange={handleFiles} messages={{
                                dropPromptMultiple: 'Arraste os arquivos aqui ou',
                                browse: 'Buscar'
                            }} />
                        </FormField>

                        <Box margin={{
                            top: 'medium'
                        }} >
                            <FormField label="Adicione Frases Manualmente">
                                <Box direction="row">
                                    <Box flex>
                                        <TextInput onPaste={handlePaste} value={phrase} plain onKeyDown={handleKeyDown} onChange={e => setPhrase(e.target.value)} placeholder='Ex. Minha vida é um meme, e eu sou o protagonista!' />
                                    </Box>
                                    {phrase && <Button hoverIndicator icon={<Add />} onClick={handlePhrase} />}
                                    <Tip dropProps={{
                                        align: {
                                            top: 'bottom',
                                            right: 'left'
                                        }
                                    }} content="Gerar as frases automaticamente com Inteligência Artificial">
                                        <Button hoverIndicator icon={<Magic />} onClick={() => setShow(true)} />
                                    </Tip>
                                </Box>
                            </FormField>
                            {
                                phrases.length > 0 && <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="phrases" type="list" direction="vertical">
                                        {(provided) => (
                                            <Box gap={'small'} ref={provided.innerRef} {...provided.droppableProps}>
                                                {phrases.map((phrase, index) => (
                                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                                        {(provided) => (
                                                            <Box direction="row"
                                                                align="center"
                                                                justify="between"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}>
                                                                <Button icon={<Drag />} hoverIndicator />
                                                                <TextInput onChange={e => handleEditPhrase(e.target.value, index)} value={phrase} />
                                                                <Button
                                                                    icon={<Close />}
                                                                    onClick={() => deletePhrase(index)}
                                                                    hoverIndicator
                                                                />
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Box>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            }
                        </Box>


                    </Form>
                </Box>
                <Box align="center" gap={'large'}>
                    <Box>
                        <Heading margin={'none'} textAlign="center">Prévia</Heading>
                        <Text textAlign="center">Como vão ficar os seus vídeos</Text>
                    </Box>
                </Box>
            </Box> */}
        </>
    )
}

export default Create