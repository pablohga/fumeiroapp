import React from 'react'
import { useSelector } from 'react-redux'
import { StatusBar } from 'react-native'

import { Wrapper, Background, Gradient } from './styles'
import headerBackground from './assets/images/header-background.png'
import fundo from './assets/images/fundo.jpg'

import createNavigator from './routes'

function App () {
  const auth = useSelector(({ auth }) => auth)

  const Routes = createNavigator(auth.signedIn)

  return (
    <Wrapper>
      <StatusBar
        backgroundColor='#ffffff'
        barStyle='light-content'
        hidden={!auth.signedIn}
      />
      
      
      <Routes />
    </Wrapper>
  )
}

export default App
