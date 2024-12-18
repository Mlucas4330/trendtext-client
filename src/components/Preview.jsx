import { Box, Button, Collapsible, FileInput, Form, FormField, ResponsiveContext, Select, TextInput } from 'grommet'
import { React, useContext, useEffect, useRef, useState } from 'react'
import { fonts, video_height, video_width } from '../constants'
import { Add, Bold, Brush, Download, Edit, Facebook, Grommet, Instagram, Italic, LinkBottom, LinkTop, Share, Shift, Subtract, TextAlignCenter, TextAlignLeft, TextAlignRight, Tiktok, Youtube } from 'grommet-icons'
import { CompactPicker } from 'react-color'

function Preview({ src, text }) {
    const size = useContext(ResponsiveContext);
    const canvas = useRef(null)
    const [quote, setQuote] = useState(text)
    const [url, setUrl] = useState(src)
    const [video, setVideo] = useState(null)
    const [bold, setBold] = useState(false)
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [italic, setItalic] = useState(false)
    const [stroke, setStroke] = useState(false)
    const [activeAlignment, setActiveAlignment] = useState(2)
    const [activeTextAlignment, setActiveTextAlignment] = useState(2)
    const [editActive, setEditActive] = useState(false)
    const [customizationActive, setCustomizationActive] = useState(false)
    const [shareActive, setShareActive] = useState(false)
    const [color, setColor] = useState("#FFFFFF")
    const [font, setFont] = useState('Roboto, sans-serif')
    const [fontSize, setFontSize] = useState(12)

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

            setVideo(null)
        } catch (error) {
            console.error('Erro ao adicionar vídeo: ' + error.message)
        }
    }

    const drawTextToCanvas = (canvas, ctx, quote, activeTextAlignment, activeAlignment, bold, italic, color, font, fontSize, stroke) => {
        const centerX = canvas.width / 2;
        const maxWidth = canvas.width * 0.9;
        const lineHeight = fontSize * 1.2;

        ctx.font = `${italic ? 'italic' : ''} ${bold ? 'bold' : ''} ${fontSize}px ${font}`;
        ctx.fillStyle = color;

        const words = quote.split(' ');
        let lines = [];
        let line = '';

        const splitWord = (word) => {
            const parts = [];
            let current = '';
            for (let char of word) {
                if (ctx.measureText(current + char).width > maxWidth) {
                    parts.push(current);
                    current = char;
                } else {
                    current += char;
                }
            }
            if (current) parts.push(current);
            return parts;
        };

        for (let i = 0; i < words.length; i++) {
            let word = words[i];
            if (ctx.measureText(word).width > maxWidth) {
                const parts = splitWord(word);
                for (let part of parts) {
                    if (ctx.measureText(line + part).width > maxWidth && line !== '') {
                        lines.push(line);
                        line = part + ' ';
                    } else {
                        line += part + ' ';
                    }
                }
            } else {
                if (ctx.measureText(line + word).width > maxWidth && line !== '') {
                    lines.push(line);
                    line = word + ' ';
                } else {
                    line += word + ' ';
                }
            }
        }

        if (line) lines.push(line);

        const totalHeight = lines.length * lineHeight;

        let y;
        switch (activeAlignment) {
            case 1:
                y = lineHeight * 1.5;
                break;
            case 3:
                y = canvas.height - totalHeight - lineHeight / 10;
                break;
            case 2:
            default:
                y = (canvas.height / 2) - (totalHeight / 2) + lineHeight / 2;
                break;
        }

        for (let i = 0; i < lines.length; i++) {
            const textWidth = ctx.measureText(lines[i]).width;
            let x;

            switch (activeTextAlignment) {
                case 1:
                    x = (canvas.width - maxWidth) / 2;
                    break;
                case 3:
                    x = (canvas.width + maxWidth) / 2 - textWidth;
                    break;
                case 2:
                default:
                    x = centerX - textWidth / 2;
                    break;
            }

            ctx.fillText(lines[i], x, y);

            if (stroke) {
                ctx.lineWidth = fontSize * 0.05;
                ctx.strokeStyle = 'black';
                ctx.strokeText(lines[i], x, y);
            }

            y += lineHeight;
        }
    }

    const drawVideoToCanvas = (canvas, ctx, video) => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    }

    const drawToCanvas = (canvas, ctx, video, quote, activeTextAlignment, activeAlignment, bold, italic, color, font, fontSize, stroke) => {
        video.play()

        const update = () => {
            drawVideoToCanvas(canvas, ctx, video)
            drawTextToCanvas(canvas, ctx, quote, activeTextAlignment, activeAlignment, bold, italic, color, font, fontSize, stroke)
            requestAnimationFrame(update)
        }

        update()
    }

    useEffect(() => {
        if (!video) {
            const newVideo = document.createElement('video')

            newVideo.src = url
            newVideo.muted = true

            newVideo.addEventListener('ended', () => {
                newVideo.currentTime = 0
                newVideo.play()
            })

            setVideo(newVideo)

            drawToCanvas(canvas.current, canvas.current.getContext('2d'), newVideo, quote, activeTextAlignment, activeAlignment, bold, italic, color, font, fontSize, stroke)
        } else {
            drawToCanvas(canvas.current, canvas.current.getContext('2d'), video, quote, activeTextAlignment, activeAlignment, bold, italic, color, font, fontSize, stroke)
        }
    }, [url, quote, activeTextAlignment, activeAlignment, bold, italic, color, font, fontSize, stroke])

    return (
        <>
            <Box direction='row-responsive' gap={{
                column: 'medium',
                row: 'medium'
            }}>
                <canvas ref={canvas} width={video_width.display} height={video_height.display} style={{ border: '1px solid #7D4CDB', maxHeight: video_height.display, maxWidth: video_width.display }}></canvas>
                <Box>
                    <Box gap={'medium'} direction={{
                        'small': 'row',
                        'medium': 'column'
                    }[size]}>
                        <Button plain hoverIndicator icon={<Edit />} onClick={() => setEditActive(!editActive)} />
                        <Button plain hoverIndicator icon={<Brush />} onClick={() => setCustomizationActive(!customizationActive)} />
                        <Button plain hoverIndicator icon={<Download />} />
                        <Button plain hoverIndicator icon={<Share />} onClick={() => setShareActive(!shareActive)} />
                    </Box>
                    <Box>
                        <Collapsible open={editActive}>
                            <Box pad={{
                                top: 'medium'
                            }}>
                                <Form>
                                    <FormField htmlFor="video" label="Vídeo de fundo">
                                        <FileInput id="video" name="videos" accept="video/*" onChange={handleFiles} messages={{
                                            dropPromptMultiple: 'Arraste os arquivos aqui ou',
                                            browse: 'Buscar'
                                        }} />
                                    </FormField>

                                    <FormField margin={{
                                        top: 'medium'
                                    }} htmlFor='quote' label="Frase">
                                        <TextInput id='quote' onChange={e => setQuote(e.target.value)} value={quote} placeholder="Reescreva a frase, se necessário" />
                                    </FormField>

                                    <FormField margin={{
                                        top: 'medium'
                                    }} htmlFor='font' label="Fonte">
                                        <Select id='font' value={font} labelKey={'title'} valueKey={'fontFamily'} onChange={({ option }) => setFont(option.fontFamily)} options={fonts} />
                                    </FormField>
                                </Form>
                            </Box>
                        </Collapsible>

                        <Collapsible open={customizationActive}>
                            <Box pad={{
                                top: 'medium'
                            }} gap={'medium'} align='center' direction={{
                                'small': 'row',
                                'medium': 'column'
                            }[size]}>
                                <Box width={'24px'} height={'24px'} style={{
                                    position: 'relative'
                                }}>
                                    <Button
                                        hoverIndicator
                                        color={'brand'}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0
                                        }}
                                        pad={'none'}
                                        onClick={() => setDisplayColorPicker(!displayColorPicker)}
                                        icon={<Grommet color={color} />}
                                    />
                                    {displayColorPicker && <CompactPicker styles={{
                                        default: {
                                            compact: {
                                                position: 'absolute',
                                                left: '0',
                                                transform: 'translateY(40%)',
                                                background: 'white'
                                            }
                                        }
                                    }} color={color} onChange={({ hex }) => setColor(hex)} />}
                                </Box>



                                <Button
                                    pad={'none'}
                                    hoverIndicator
                                    color={'brand'}
                                    onClick={() => handleActive(activeAlignment, setActiveAlignment, 3)}
                                    icon={{
                                        1: <LinkTop />,
                                        2: <Shift />,
                                        3: <LinkBottom />
                                    }[activeAlignment]}
                                />

                                <Button
                                    pad={'none'}
                                    hoverIndicator
                                    color={'brand'}
                                    onClick={() => handleActive(activeTextAlignment, setActiveTextAlignment, 3)}
                                    icon={{
                                        1: <TextAlignLeft />,
                                        2: <TextAlignCenter />,
                                        3: <TextAlignRight />
                                    }[activeTextAlignment]}
                                />

                                <Button style={{
                                    color: stroke ? 'white' : 'black',
                                    borderRadius: '50%',
                                    width: '24px',
                                    textAlign: 'center',
                                    WebkitTextStroke: `1px ${stroke ? 'black' : 'white'}`,
                                    fontWeight: 'bold',
                                    height: '24px',
                                }} plain pad={'none'} hoverIndicator color={'brand'} onClick={() => setStroke(!stroke)} primary={stroke} label="S" />

                                <Button pad={'none'} hoverIndicator color={'brand'} onClick={() => setBold(!bold)} primary={bold} icon={<Bold />} />
                                <Button pad={'none'} hoverIndicator color={'brand'} onClick={() => setItalic(!italic)} primary={italic} icon={<Italic />} />
                                <Button pad={'none'} hoverIndicator color={'brand'} onClick={() => fontSize < 64 ? setFontSize(fontSize + 1) : ''} icon={<Add />} />
                                <Button pad={'none'} hoverIndicator color={'brand'} onClick={() => fontSize > 12 ? setFontSize(fontSize - 1) : ''} icon={<Subtract />} />
                            </Box>
                        </Collapsible>

                        <Collapsible open={shareActive}>
                            <Box align='center' pad={{
                                top: 'medium'
                            }} direction={{
                                'small': 'row',
                                'medium': 'column'
                            }[size]} gap={'medium'}>
                                <Button plain hoverIndicator icon={<Tiktok />} />
                                <Button plain hoverIndicator icon={<Instagram />} />
                                <Button plain hoverIndicator icon={<Youtube />} />
                                <Button plain hoverIndicator icon={<Facebook />} />
                            </Box>
                        </Collapsible>
                    </Box>
                </Box >
            </Box >
        </>
    )
}

export default Preview