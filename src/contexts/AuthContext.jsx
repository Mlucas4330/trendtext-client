import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { createContext, useState, useContext, useEffect, React } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [busy, setBusy] = useState(false)

    useEffect(() => {
        const token = Cookies.get('token')

        if (token) {
            const user = jwtDecode(token)
            setUser(user)
        }
    }, [])

    const signUp = async (value) => {
        try {
            setBusy(true)

            const { data } = await axios.post(import.meta.env.VITE_BASE_URL + '/users/sign-up', value)

            toast.success(data)

            navigate('/sign-in')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data)
            } else {
                console.error('Erro no cadastro: ' + error.message)
            }
        } finally {
            setBusy(false)
        }
    }

    const signIn = async (value) => {
        try {
            setBusy(true)

            const { data } = await axios.post(import.meta.env.VITE_BASE_URL + '/users/sign-in', value)

            Cookies.set('token', data.token)
            setUser(data.user)

            toast.success(data.message)

            navigate('/create')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data)
            } else {
                console.error('Erro no login: ' + error.message)
            }
        } finally {
            setBusy(false)
        }
    }

    const signOut = () => {
        Cookies.remove('token')
        setUser(null)
        toast.success('Usuário deslogado com sucesso!')
    }

    const decrementCredits = async (value) => {
        try {
            setBusy(true)

            const { data } = await axios.patch(import.meta.env.VITE_BASE_URL + '/users/credits', value)

            setUser(prevUser => ({
                ...prevUser,
                credits: data
            }))
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data)
            } else {
                console.error('Erro na diminuição dos créditos: ' + error.message)
            }
        } finally {
            setBusy(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut, decrementCredits, busy }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)