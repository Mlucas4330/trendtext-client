import { Box, Button, Card, CardBody, CardFooter, CardHeader, DataTable, Heading, Tab, Tabs, Text } from 'grommet'
import { payment_history_columns, plans } from '../constants'
import { StatusGood } from 'grommet-icons'
import { currency } from '../helpers'
import { useEffect, useState, React } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

function Pricing() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [busy, setBusy] = useState(false)
    const [creditPayments, setCreditPayments] = useState([])

    const handlePurchase = async (plan) => {
        if (!user) {
            return navigate('/sign-in')
        }

        try {
            setBusy(true)

            const { data } = await axios.post(import.meta.env.VITE_BASE_URL + '/mercadopago/preference', {
                title: plan.title,
                unit_price: plan.price,
                quantity: 1
            }, {
                withCredentials: true
            })

            window.location.href = data?.init_point
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data)
            } else {
                console.error('Erro na compra:' + error.message)
            }
        } finally {
            setBusy(false)
        }
    }

    const handleCreditPayments = async () => {
        try {
            const { data } = await axios.get(import.meta.env.VITE_BASE_URL + '/mercadopago/credit-payments', { withCredentials: true })

            setCreditPayments(data)
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data)
            } else {
                console.error('Erro na busca do histórico de créditos:' + error.message)
            }
        }
    }

    useEffect(() => {
        handleCreditPayments()
    }, [])

    return <>
        <Tabs>
            <Tab title="Créditos">
                <Box margin={{
                    top: 'medium'
                }} direction="row-responsive" gap={'medium'}>
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
                                    <Button busy={busy} secondary fill style={{
                                        textAlign: 'center'
                                    }} label="Comprar Agora" onClick={() => handlePurchase(plan)} />
                                </CardFooter>
                            </Card>
                        ))
                    }
                </Box>
            </Tab>
            <Tab title="Histórico">
                <DataTable sortable border={true} margin={{
                    top: 'medium'
                }} fill columns={payment_history_columns} data={creditPayments} />
            </Tab>
        </Tabs>
    </>
}

export default Pricing