export const currency = (value) => {
    const options = {
        style: 'currency',
        currency: 'BRL',
    }

    return new Intl.NumberFormat('pt-BR', options).format(value)
}

export const formatDate = (date) => {
    const dateEUA = new Date(date)

    const options = {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }

    const dateBR = new Intl.DateTimeFormat('pt-BR', options).format(dateEUA)

    return dateBR
}

export const loadVideo = (video) => {
    return new Promise((resolve, reject) => {
        video.addEventListener('canplaythrough', () => resolve())
        video.addEventListener('error', error => reject(error))
    })
}