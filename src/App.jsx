import { React } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import TermsOfUse from './pages/TermsOfUse'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Create from './pages/Create'
import Pricing from './pages/Pricing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Main } from 'grommet'

function App() {
  return (
    <>
      <Main gap={{ row: 'xlarge' }} pad={{
        vertical: 'medium',
        horizontal: 'xlarge'
      }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-use" element={<TermsOfUse />} />
          <Route path="create" element={<Create />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
        <Footer />
      </Main>
    </>
  )
}

export default App
