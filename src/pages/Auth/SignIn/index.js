import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import logo from '../../../assets/images/logo3x.png'

import AuthActions from '../../../store/ducks/auth'

import {
  Container,
  Input,
  PasswordInput,
  EyeIcon,
  SubmitButton,
  ButtonText,
  LinkButton,
  Logo,
  Teste,
  ButtonText1,
  Text4,
  
} from '../styles'

function SignIn ({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const emailguest = 'convidado@convidado.com'
  const passwordguest = 't71469469'
  
  const fetching = useSelector(({ auth }) => auth.fetching)

  const passwordRef = useRef()

  const dispatch = useDispatch()

  function handleSignInSubmit () {
    dispatch(AuthActions.signInRequest(email, password))
  }
  function handleSignInGuest () {
    dispatch(AuthActions.signInRequest(emailguest,passwordguest ))
  }

  return (
    <Container>
      <Logo source={logo} />

      <Input
        placeholder='E-mail'
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType='email-address'
        autoCapitalize='none'
        returnKeyType='next'
        blurOnSubmit={false}
        onSubmitEditing={() => passwordRef.current.focus()}
      />

      <PasswordInput>
        <Input
          password
          placeholder='Palavra-Passe'
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={!passwordVisible}
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='send'
          onSubmitEditing={handleSignInSubmit}
          ref={passwordRef}
        />
        <EyeIcon
          name={passwordVisible ? 'visibility' : 'visibility-off'}
          size={24}
          color='#222'
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      </PasswordInput>

      <SubmitButton onPress={handleSignInSubmit}>
        <ButtonText>{fetching ? 'Carregando...' : 'Entrar'}</ButtonText>
      </SubmitButton>

      <LinkButton onPress={() => navigation.navigate('SignUp')}>
        <ButtonText1>Criar conta</ButtonText1>
      </LinkButton>
    <Text4>RUA DA PAIÃ 25F 2675-935 ODIVELAS, LISBOA</Text4>
   
      
    
    </Container>
  )
}

export default SignIn
