import video1 from './assets/video1.mp4'
import video2 from './assets/video2.mp4'
import video3 from './assets/video3.mp4'
import video4 from './assets/video4.mp4'
import video5 from './assets/video5.mp4'
import { currency, formatDate } from './helpers'

export const frequently_asked = [
    {
        question: 'Os vídeos gerados são protegidos por direitos autorais?',
        answer: 'Os vídeos gerados são exclusivos para o usuário, mas é importante garantir que os materiais usados estejam em conformidade com as leis de direitos autorais.'
    },
    {
        question: 'O site oferece suporte técnico em caso de problemas?',
        answer: 'Sim, o site oferece suporte técnico através de e-mail para ajudar os usuários com quaisquer questões ou problemas que possam ocorrer.'
    },
    {
        question: 'O site possui uma biblioteca de vídeos?',
        answer: 'Atualmente, o site não possui uma biblioteca de vídeos. Recomendamos buscar vídeos em plataformas como Pexels, Vimeo, ou Pinterest.'
    }
]

export const fonts = [
    {
        title: 'Roboto',
        fontFamily: 'Roboto, sans-serif',
        color: 'white',
        stroke: 'none'
    }
]

export const videos = [
    { src: video1 },
    { src: video2 },
    { src: video3 },
    { src: video4 },
    { src: video5 },
]

export const videoQuantities = [
    {
        label: '1 Vídeo',
        value: 1
    },
    {
        label: '2 Vídeos',
        value: 2
    },
    {
        label: '3 Vídeos',
        value: 3
    },
    {
        label: '7 Vídeos',
        value: 7
    },
    {
        label: '14 Vídeos',
        value: 14
    },
    {
        label: '21 Vídeos',
        value: 21
    }
]

export const videoDurations = [
    {
        label: '10 Segundos',
        value: 10
    },
    {
        label: '30 Segundos',
        value: 30
    },
    {
        label: '60 Segundos',
        value: 60
    }
]

export const plans = [
    {
        price: 19.90,
        title: '105 Créditos',
        benefits: ['Até 7 Vídeos', 'Até 20 frases', '105 Créditos']
    },
    {
        price: 29.90,
        title: '210 Créditos',
        benefits: ['Até 14 Vídeos', 'Até 50 frases', '210 Créditos']
    },
    {
        price: 39.90,
        title: '315 Créditos',
        benefits: ['Até 21 Vídeos', 'Até 100 frases', '315 Créditos']
    }
]

export const payment_history_columns = [
    {
        property: 'title',
        header: 'Créditos',
        primary: true
    },
    {
        property: 'price',
        header: 'Preço',
        render: datum => (
            currency(datum.price)
        ),
        primary: false
    },
    {
        property: 'date',
        header: 'Data',
        render: datum => (
            formatDate(datum.createdAt)
        ),
        primary: false
    }
]

export const video_height = {
    real: 1920,
    display: 1920 / 4
}

export const video_width = {
    real: 1080,
    display: 1080 / 4
}

export const logoSize = 30 + 'px'


export const date_last_update = '06/12/2024'