import styled from 'styled-components'
import { Platform } from 'react-native'

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'iOS' ? 'padding' : ''
})`
  width: 100%;
  flex: 1;
  align-items: center;
`

export const InputWrapper = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: flex-end;
  align-self :center;
`

export const Input = styled.TextInput`
  flex: ${props => (props.placeholder === 'dfsdfsdfsd' || props.placeholder === 'dsfsdfsdf' ? 5 : 1)};
  border-radius: 10px;
  padding: 15px;
  margin: 5px 0;
  margin-right: ${props => (props.placeholder === 'fsdfsdfdsfsd' || props.placeholder === 'fdsfdsfsdf' ? '5px' : 0)};
  background: #fff;
  elevation: 8;
`

export const SendOrderButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  align-self: flex-end;
  height: 40px;
  margin-top: 20px;
  padding: 0 30px;
  border-radius: 20px;
  background: #e62638;
  align-items: center;
  justify-content: center;
`

export const SendOrderButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`

export const CheckboxText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-align: center;
  flex-direction: row;
  justify-content: center;
`

export const CheckboxWrapper = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: center;
`
export const Text1 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #9A211E;
  text-align: center;
  marginTop: 5%

`