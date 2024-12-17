import { Box, Button, FormField, Select, Text, TextInput } from 'grommet'
import { React, useEffect, useRef, useState } from 'react'
import { templates, video_height, video_width } from '../constants'
import { BlockQuote, Bold, Italic, LinkBottom, LinkTop, Shift, TextAlignCenter, TextAlignFull, TextAlignLeft, TextAlignRight, Underline } from 'grommet-icons'

function Preview({ src, text }) {
    const canvas = useRef(null)
    const [quote, setQuote] = useState(text)
    const [url, setUrl] = useState(src)
    const [blockquote, setBlockQuote] = useState(false)
    const [bold, setBold] = useState(false)
    const [underline, setUnderline] = useState(false)
    const [italic, setItalic] = useState(false)
    const [activeAlignment, setActiveAlignment] = useState(2)
    const [activeTextAlignment, setActiveTextAlignment] = useState(2)
    const [color, setColor] = useState('#FFFFFF')
    const [font, setFont] = useState('roboto')
    const [fontSize, setFontSize] = useState('12')

    const handleActive = (get, set, length) => {
        if (get >= length) {
            set(1);
        } else {
            set(get + 1);
        }
    }

    const handleFiles = (_e, { files }) => {
        try {
            const url = URL.createObjectURL(files[0])

            setUrl(url)
        } catch (error) {
            console.error('Erro ao adicionar vídeo: ' + error.message)
        }
    }

    // const handleIA = async () => {
    //     try {
    //         if (!niche) {
    //             toast.error('Seleciona um nicho!')
    //             return
    //         }

    //         if (!user || user.credits < 7) {
    //             toast.error('Sem créditos o suficiente para gerar frases!')
    //             return
    //         }

    //         const { data } = await toast.promise(
    //             axios.post(import.meta.env.VITE_BASE_URL + '/openai/assistant', { niche }, { withCredentials: true }),
    //             {
    //                 loading: 'Gerando frases...',
    //                 success: 'Frases geradas com sucesso!',
    //                 error: 'Erro ao gerar as frases!',
    //             })

    //         setPhrases(prevPhrases => [...prevPhrases, ...data])

    //         await decrementCredits(7)
    //     } catch (error) {
    //         console.error('Erro ao gerar frases: ' + error.message)
    //     }
    // }

    // const deletePhrase = (index) => {
    //     setPhrases(phrases.filter((_, i) => i !== index))
    // }

    // const handleEditPhrase = (phrase, index) => {
    //     const updatedPhrases = [...phrases]

    //     updatedPhrases[index] = phrase

    //     setPhrases(updatedPhrases)
    // }






    // const processVideo = async (index = 0) => {
    //     try {
    //         if (index >= files.length) {
    //             setBusy(false)
    //             toast.success('Vídeos gerados com sucesso!')
    //             return
    //         }

    //         const video = document.createElement('video')
    //         video.src = files[index].src
    //         video.loop = false
    //         video.muted = true

    //         const phrase = phrases[index % phrases.length]

    //         const canvas = document.createElement('canvas')
    //         canvas.width = video_width.real
    //         canvas.height = video_height.real

    //         const ctx = canvas.getContext('2d')

    //         const recordedChunks = []

    //         const stream = canvas.captureStream(60)

    //         const mediaRecorder = new MediaRecorder(stream, {
    //             mimeType: 'video/mp4',
    //             videoBitsPerSecond: 25000000
    //         })

    //         await loadVideo(video)

    //         drawToCanvas(canvas, ctx, video, phrase)

    //         mediaRecorder.ondataavailable = (e) => {
    //             if (e.data.size > 0) {
    //                 recordedChunks.push(e.data)
    //             }
    //         }

    //         mediaRecorder.onstop = async () => {
    //             const blob = new Blob(recordedChunks, { type: 'video/mp4' })
    //             const url = URL.createObjectURL(blob)

    //             setUrls(prevUrls => [...prevUrls, url])

    //             processVideo(index + 1)

    //             canvas.remove()
    //             video.remove()

    //             await decrementCredits(20)
    //         }

    //         video.onended = () => {
    //             if (mediaRecorder.state === 'recording') {
    //                 mediaRecorder.stop()
    //             }
    //         }

    //         mediaRecorder.start()
    //     } catch (error) {
    //         console.error('Erro ao processar videos: ' + error)
    //         toast.error('Erro ao gerar seguinte vídeo: ' + files[index].name, {
    //             style: {
    //                 wordBreak: 'break-word',
    //                 overflowWrap: 'break-word',
    //             }
    //         })
    //         processVideo(index + 1)
    //     }
    // }

    // processVideo()



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

    const drawVideoToCanvas = () => {

    }


    const drawToCanvas = (canvas, video, quote, activeTextAlignment, activeAlignment, blockquote, underline, italic, color) => {
        video.play()

        const ctx = canvas.

        const update = () => {
            drawVideoToCanvas(canvas, ctx, video)
            drawTextToCanvas(canvas, ctx, phrase, template, activeAlignment)
            requestAnimationFrame(update)
        }

        update()
    }

    useEffect(() => {
        const video = document.createElement('video')

        video.src = url
        video.muted = true
        video.loop = false

        drawToCanvas(canvas.current, video, quote, activeTextAlignment, activeAlignment, blockquote, underline, italic, color)

    }, [url, quote, activeTextAlignment, activeAlignment, blockquote, underline, italic, color])

    return (
        <>
            <Box direction='row'>
                <Box>
                    <canvas ref={canvas} width={video_width.display} height={video_height.display} style={{ border: '1px solid #7D4CDB', width: video_width.display, height: video_height.display }}></canvas>
                    <Form>
                        <FormField htmlFor="video" label="Vídeo de fundo">
                            <FileInput id="video" name="videos" accept="video/*" onChange={handleFiles} messages={{
                                dropPromptMultiple: 'Arraste os arquivos aqui ou',
                                browse: 'Buscar'
                            }} />
                        </FormField>

                        <FormField htmlFor='quote' margin={{
                            top: 'medium'
                        }}>
                            <TextInput id='quote' onChange={e => setQuote(e.target.value)} value={quote} />
                        </FormField>

                        <FormField margin={{
                            top: 'medium'
                        }}>
                            <Select options={templates} />
                        </FormField>
                    </Form>
                </Box>
                <Box gap={'medium'} align='center'>
                    <Box>
                        <Text textAlign='center' size='large'>A</Text>
                        <TextInput style={{
                            background: color,
                            border: 'none'
                        }} value={color} onChange={e => setColor(e.target.value)} type='color' />
                    </Box>

                    <Button
                        pad={'none'}
                        color={'brand'}
                        onClick={() => handleActive(activeAlignment, setActiveAlignment, 3)}
                        icon={{
                            1: <LinkTop />,
                            2: <Shift />,
                            3: <LinkBottom />
                        }[activeAlignment]}
                    />

                    <Button pad={'none'} color={'brand'} onClick={() => setBold(!bold)} primary={bold} icon={<Bold />} />
                    <Button pad={'none'} color={'brand'} onClick={() => setItalic(!italic)} primary={italic} icon={<Italic />} />
                    <Button pad={'none'} color={'brand'} onClick={() => setUnderline(!underline)} primary={underline} icon={<Underline />} />
                    <Button pad={'none'} color={'brand'} onClick={() => setBlockQuote(!blockquote)} primary={blockquote} icon={<BlockQuote />} />

                    <Button
                        pad={'none'}
                        color={'brand'}
                        onClick={() => handleActive(activeTextAlignment, setActiveTextAlignment, 4)}
                        icon={{
                            1: <TextAlignLeft />,
                            2: <TextAlignCenter />,
                            3: <TextAlignFull />,
                            4: <TextAlignRight />
                        }[activeTextAlignment]}
                    />
                </Box>
            </Box>
        </>
    )
}

export default Preview