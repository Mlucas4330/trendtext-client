import { Box, Button, FileInput, Form, FormField, Heading, Select, Tab, Tabs, Text, TextInput, Tip } from 'grommet'
import { niches, templates, video_height, video_width } from '../constants'
import { useLocation } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState, React } from 'react'
import { Add, Close, Drag, LinkBottom, LinkTop, Magic, Shift } from 'grommet-icons'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { loadVideo } from '../helpers'
import axios from 'axios'

function Create() {
    const canvasRef = useRef(null)
    const [niche, setNiche] = useState('humor')
    const [phrases, setPhrases] = useState([])
    const [phrase, setPhrase] = useState('')
    const [files, setFiles] = useState([])
    const [index, setIndex] = useState(0)
    const [busy, setBusy] = useState(false)
    const [template, setTemplate] = useState(templates[0])
    const [activeButton, setActiveButton] = useState(0)
    const [activeAlignment, setActiveAlignment] = useState('middle')
    const [ctx, setCtx] = useState(null)
    const [canvasPrev, setCanvasPrev] = useState(null)
    const [isPlayingPreview, setIsPlayingPreview] = useState(false)
    const [urls, setUrls] = useState([])
    const timeoutRef = useRef(null)
    const location = useLocation()
    const [activeIndex, setActiveIndex] = useState(0)
    const { user, decrementCredits } = useAuth()

    const setValuesByQuery = () => {
        const query = new URLSearchParams(location.search)
        const niche = query.get('niche')

        if (niche) {
            setNiche(niche)
        }
    }

    const handleTemplate = (template, index) => {
        setTemplate(template)
        setActiveButton(index)
    }

    const handleFiles = (_e, { files }) => {
        const files_ = files.map(file => {
            return {
                name: file.name,
                src: URL.createObjectURL(file)
            }
        })

        setFiles(files_)
    }

    const handleIA = async () => {
        try {
            if (!user || user.credits < 7) {
                toast.error('Sem créditos o suficiente para gerar frases!')
                return
            }

            const { data } = await toast.promise(
                axios.post(import.meta.env.VITE_BASE_URL + '/openai/assistant', { niche }, { withCredentials: true }),
                {
                    loading: 'Gerando frases...',
                    success: 'Frases geradas com sucesso!',
                    error: 'Erro ao gerar as frases!',
                })

            setPhrases(prevPhrases => [...prevPhrases, ...data])

            await decrementCredits(7)
        } catch (error) {
            console.error('Erro ao gerar frases: ' + error.message)
        }
    }

    const deletePhrase = (index) => {
        setPhrases(phrases.filter((_, i) => i !== index))
    }

    const handleEditPhrase = (phrase, index) => {
        const updatedPhrases = [...phrases]

        updatedPhrases[index] = phrase

        setPhrases(updatedPhrases)
    }

    const handleSubmit = () => {
        if (files.length === 0 || phrases.length === 0 || !template) {
            toast.error('Preencha os campos!')
            return
        }

        if (!user || user.credits < 7) {
            toast.error('Sem créditos o suficiente para gerar vídeos!')
            return
        }

        setBusy(true)

        const processVideo = async (index = 0) => {
            try {
                if (index >= files.length) {
                    setBusy(false)
                    toast.success('Vídeos gerados com sucesso!')
                    return
                }

                const video = document.createElement('video')
                video.src = files[index].src
                video.loop = false
                video.muted = true

                const phrase = phrases[index % phrases.length]

                const canvas = document.createElement('canvas')
                canvas.width = video_width.real
                canvas.height = video_height.real

                const ctx = canvas.getContext('2d')

                const recordedChunks = []

                const stream = canvas.captureStream(60)

                const mediaRecorder = new MediaRecorder(stream, {
                    mimeType: 'video/mp4',
                    videoBitsPerSecond: 25000000
                })

                await loadVideo(video)

                drawToCanvas(canvas, ctx, video, phrase)

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        recordedChunks.push(e.data)
                    }
                }

                mediaRecorder.onstop = async () => {
                    const blob = new Blob(recordedChunks, { type: 'video/mp4' })
                    const url = URL.createObjectURL(blob)

                    setUrls(prevUrls => [...prevUrls, url])

                    processVideo(index + 1)

                    canvas.remove()
                    video.remove()

                    await decrementCredits(20)
                }

                video.onended = () => {
                    if (mediaRecorder.state === 'recording') {
                        mediaRecorder.stop()
                    }
                }

                mediaRecorder.start()
            } catch (error) {
                console.error('Erro ao processar videos: ' + error)
                toast.error('Erro ao gerar seguinte vídeo: ' + files[index].name, {
                    style: {
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                    }
                })
                processVideo(index + 1)
            }
        }

        processVideo()
    }

    const drawVideoToCanvas = (canvas, ctx, video) => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    }

    const drawTextToCanvas = (canvas, ctx, phrase, template, activeAlignment) => {
        const centerX = canvas.width / 2
        const fontSize = canvas.width * 0.1
        const maxWidth = canvas.width * 0.8
        const lineHeight = fontSize * 1.2

        ctx.font = `${fontSize}px ${template.fontFamily}`
        ctx.fillStyle = template.color

        const words = phrase.split(' ')
        let lines = []
        let line = ''

        const splitWord = (word) => {
            const parts = []
            let current = ''
            for (let char of word) {
                if (ctx.measureText(current + char).width > maxWidth) {
                    parts.push(current)
                    current = char
                } else {
                    current += char
                }
            }
            if (current) parts.push(current)
            return parts
        }

        for (let i = 0; i < words.length; i++) {
            let word = words[i]
            if (ctx.measureText(word).width > maxWidth) {
                const parts = splitWord(word)
                for (let part of parts) {
                    if (ctx.measureText(line + part).width > maxWidth && line !== '') {
                        lines.push(line)
                        line = part + ' '
                    } else {
                        line += part + ' '
                    }
                }
            } else {
                if (ctx.measureText(line + word).width > maxWidth && line !== '') {
                    lines.push(line)
                    line = word + ' '
                } else {
                    line += word + ' '
                }
            }
        }

        if (line) lines.push(line)

        const totalHeight = lines.length * lineHeight

        let y
        switch (activeAlignment) {
            case 'top':
                y = lineHeight
                break
            case 'bottom':
                y = canvas.height - totalHeight + lineHeight / 2
                break
            case 'middle':
            default:
                y = (canvas.height / 2) - (totalHeight / 2) + lineHeight / 2
                break
        }

        for (let i = 0; i < lines.length; i++) {
            const textWidth = ctx.measureText(lines[i]).width
            ctx.fillText(lines[i], centerX - textWidth / 2, y)

            if (template.stroke !== 'none') {
                ctx.lineWidth = fontSize * 0.05
                ctx.strokeStyle = 'black'
                ctx.strokeText(lines[i], centerX - textWidth / 2, y)
            }

            y += lineHeight
        }
    }

    const drawToCanvasPrev = (canvas, video, phrase, template, activeAlignment) => {
        if (!video) {
            return
        }

        video.currentTime = 0
        video.play()

        const update = () => {
            drawVideoToCanvas(canvas, ctx, video)
            drawTextToCanvas(canvas, ctx, phrase, template, activeAlignment)
            requestAnimationFrame(update)
        }

        update()
    }

    const drawToCanvas = (canvas, ctx, video, phrase) => {
        if (!video) {
            return
        }

        video.play()

        let intervalId

        intervalId = setInterval(() => {
            drawVideoToCanvas(canvas, ctx, video)
            drawTextToCanvas(canvas, ctx, phrase, template)

            if (video.ended) {
                clearInterval(intervalId)
            }
        }, 16) // Aproximadamente 60 FPS
    }

    const playPreview = useCallback(async () => {
        const video = document.createElement('video')
        video.src = files[index].src
        video.muted = true
        video.loop = false

        await loadVideo(video)

        drawToCanvasPrev(canvasPrev, video, phrases[index % phrases.length], template, activeAlignment)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % files.length)
            setIsPlayingPreview(false)
        }, 3000)

        setIsPlayingPreview(true)
    }, [index, files, phrases, template, activeAlignment])

    const handleDragEnd = async (result) => {
        if (!result.destination) {
            return
        }

        const start = result.source.index
        const end = result.destination.index

        const updatedPhrases = [...phrases]

        const [removed] = updatedPhrases.splice(start, 1)
        updatedPhrases.splice(end, 0, removed)

        setPhrases(updatedPhrases)
    }

    const handleKeyDown = (e) => {
        if (e.key == 'Enter') {
            handlePhrase()
        }
    }

    const handlePhrase = () => {
        if (!phrase) {
            return
        }

        setPhrases(prevPhrases => [...prevPhrases, phrase.trim()])

        setPhrase('')
    }

    const onActive = (index) => {
        setActiveIndex(index)
    }

    useEffect(() => {
        setValuesByQuery()

        const canvasPrev = canvasRef.current

        setCanvasPrev(canvasPrev)

        const ctx = canvasPrev.getContext('2d')

        setCtx(ctx)
    }, [])

    useEffect(() => {
        if (files.length !== 0 && phrases.length !== 0 && !isPlayingPreview) {
            playPreview()
        }
    }, [index, files, phrases, template, playPreview, isPlayingPreview])

    return (
        <>
            <Box direction="row-responsive" gap={'xlarge'}>
                <Box flex gap={'large'}>
                    <Box>
                        <Heading textAlign="center" margin={'none'}>Dados</Heading>
                        <Text textAlign="center">Preencha os dados para gerar seus vídeos</Text>
                    </Box>
                    <Tabs onActive={onActive} activeIndex={activeIndex}>
                        <Tab title="Dados">
                            <Form>
                                <FormField htmlFor="videos" required label="Vídeos de fundo">
                                    <FileInput id="videos" name="videos" accept="video/*" multiple onChange={handleFiles} messages={{
                                        dropPromptMultiple: 'Arraste os arquivos aqui ou',
                                        browse: 'Buscar'
                                    }} />
                                </FormField>

                                <FormField htmlFor="niche" label="Escolha o Nicho">
                                    <Box direction="row">
                                        <Box flex>
                                            <Select plain id="niche" options={niches} value={niche} onChange={({ option }) => setNiche(option.value)} labelKey="label" valueKey="value" placeholder="Selecione" />
                                        </Box>
                                        <Tip dropProps={{
                                            align: {
                                                top: 'bottom',
                                                right: 'left'
                                            }
                                        }} content="Gerar as frases automaticamente com Inteligência Artificial">
                                            <Button hoverIndicator icon={<Magic />} onClick={handleIA} />
                                        </Tip>
                                    </Box>
                                </FormField>

                                <Box>
                                    <FormField label="Adicione Frases Manualmente">
                                        <Box direction="row">
                                            <Box flex>
                                                <TextInput value={phrase} plain onKeyDown={handleKeyDown} onChange={e => setPhrase(e.target.value)} placeholder='Ex. Minha vida é um meme, e eu sou o protagonista!' />
                                            </Box>
                                            {phrase && <Button hoverIndicator icon={<Add />} onClick={handlePhrase} />}
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

                                <Button onClick={() => setActiveIndex(activeIndex + 1)} secondary fill="horizontal" pad={'small'} label="Próximo" />
                            </Form>
                        </Tab>
                        <Tab title="Personalização">
                            <Form>
                                <FormField required label="Escolha o modelo">
                                    <Box pad={'small'} direction="row-responsive" gap="small">
                                        {
                                            templates.map((template, index) => (
                                                <Button primary={activeButton === index} onClick={() => handleTemplate(template, index)} style={{
                                                    color: template.color,
                                                    WebkitTextStroke: template.stroke,
                                                    fontFamily: template.fontFamily,
                                                    fontWeight: 'normal'
                                                }} key={`templates_${index}`} label={template.title} color={'brand'} size="xlarge" />
                                            ))
                                        }
                                    </Box>
                                </FormField>

                                <FormField required label="Alinhar texto">
                                    <Box pad={'small'} direction="row" gap={'small'}>
                                        <Button onClick={() => setActiveAlignment('top')} primary={activeAlignment === 'top'} secondary icon={<LinkTop />} color={'brand'} size="xlarge" />
                                        <Button onClick={() => setActiveAlignment('middle')} primary={activeAlignment === 'middle'} secondary icon={<Shift />} color={'brand'} size="xlarge" />
                                        <Button onClick={() => setActiveAlignment('bottom')} primary={activeAlignment === 'bottom'} secondary icon={<LinkBottom />} color={'brand'} size="xlarge" />
                                    </Box>
                                </FormField>
                            </Form>

                            <Box direction="row" gap={'small'}>
                                <Button fill="horizontal" onClick={() => setActiveIndex(activeIndex - 1)} secondary color={'light-6'} pad={'small'} label="Voltar" />
                                <Button fill="horizontal" busy={busy} onClick={handleSubmit} secondary pad={'small'} label="Gerar Vídeos" />
                            </Box>
                        </Tab>
                    </Tabs>
                </Box>
                <Box align="center" gap={'large'}>
                    <Box>
                        <Heading margin={'none'} textAlign="center">Prévia</Heading>
                        <Text textAlign="center">Como vão ficar os seus vídeos</Text>
                    </Box>
                    <canvas width={video_width.display} height={video_height.display} ref={canvasRef} style={{ border: '1px solid #7D4CDB', width: video_width.display, height: video_height.display }}></canvas>
                </Box>
            </Box>
            {
                urls.length > 0 &&
                <Box align="center" gap={'large'}>
                    <Heading alignSelf="center" margin={'none'} textAlign="center">Vídeos Gerados</Heading>
                    <Box direction="row-responsive" gap={'small'}>
                        {
                            urls.map((url, index) => (
                                <video key={`videos_${index}`} autoPlay style={{ border: '1px solid #7D4CDB' }} controls height={video_height.display} width={video_width.display}>
                                    <source src={url} type="video/mp4" />
                                </video>
                            ))
                        }
                    </Box>
                    <Button label="Baixar Todos" />
                </Box>
            }
        </>
    )
}

export default Create