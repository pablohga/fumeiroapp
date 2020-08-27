/* eslint-disable max-len */
import React, { useState, useRef, Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast'
import axios from 'axios'
import { ScrollView } from 'react-native'
import socketIOClient from 'socket.io-client'

import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

PushNotification.configure({

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },


  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

import { Dropdown } from 'react-native-material-dropdown';



import api from '../../services/api'

import CartTotal from '../../components/CartTotal'

import CartActions from '../../store/ducks/cart'

import {
  Container,
  Input,
  SendOrderButton,
  SendOrderButtonText,
  InputWrapper,
  CheckboxText,
  Text1,
} from './styles'


function Order ({ navigation }) {
  const [observations, setObservations] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [street, setStreet] = useState('')
  const [lisboa, setLisboa] = useState()
  const [district, setDistrict] = useState('')
  const [number, setNumber] = useState('')
  const [pagamento, setPagamento] = useState('')
  const [entrega, setEntrega] = useState()
  const [mensagem, setMensagem] = useState('')
  const [mensagem2, setMensagem2] = useState('')
  const [mensagem3, setMensagem3] = useState('')
  const [cel, setCel] = useState('')
  
  const type = global.delivery;


  const streetRef = useRef()
  const districtRef = useRef()
  const numberRef = useRef()

  const items = useSelector(({ cart }) => cart.data)

  const total = useSelector(({ cart }) => cart.data.reduce(
    (total, item) => total + (item.base_price * item.quantity),
    0
  ))

  const dispatch = useDispatch()

  class Lisboa extends Component {
    render() {
      let data = [{
        value: 'Campo Grande',
      }, {
        value: 'Santa Clara',
      }, {
        value: 'Lumiar',
      }, {
        value: 'Olivais',
      }, {
        value: 'Parque das Nações',
      }, {
        value: 'Carnide',
      }, {
        value: 'Alvalade',
      }, {
        value: 'Benfica',
      }, {
        value: 'São Domingos de Benfica',
      }, {
        value: 'Marvila',
      }, {
        value: 'Areeiro',
      }, {
        value: 'Campolide',
      }, {
        value: 'Avenidas Novas',
      }, {
        value: 'Beato',
      }, {
        value: 'Arroios',
      }, {
        value: 'Penha de França',
      }, {
        value: 'São Vicente',
      }, {
        value: 'Santo Antônio',
      }, {
        value: 'Santa Maria Maior',
      }, {
        value: 'Misericordia',
      }, {
        value: 'Campo de Ourique',
      }, {
        value: 'Estrela',
      }, {
        value: 'Alcântara',
      }, {
        value: 'Ajuda',
      }, {
        value: 'Belém',
      }];
   
      return (
        <Dropdown
          label='Escolha sua freguesia.'
          data={data}
          containerStyle = {{ height: 50, width: 300,marginBottom:10}}
          onChangeText={value => defineEntrega(value)}
        />
      );
    }
  }

  async function zipCodeLookup () {
  
      
      const { data } = await axios.get(
        `https://secure.geonames.org/postalCodeLookupJSON?postalcode=${zipCode}&country=PT&username=tiiwall`
      )

      if (data.postalcodes[0]) {
        if(global.delivery === 'Takeaway') {
          setMensagem('Sem custo de entrega para Takeaway.')
          setEntrega(0)
        } else {
  
            if(data.postalcodes[0].adminName3 === 'Odivelas' || data.postalcodes[0].adminName3 === 'Olival Basto' || data.postalcodes[0].adminName3 === 'Póvoa De Santo Adrião' || data.postalcodes[0].adminName3 === 'Pontinha' || data.postalcodes[0].adminName3 === 'Famões' || data.postalcodes[0].adminName3 === 'Ramada') {
            if (total > 15) {
              setMensagem('Seu custo de entrega é : 0 €')
              setLisboa()
              setEntrega(0)
              setMensagem3('')
  
            } else {
              setEntrega(2)
              setMensagem(`O custo de entrega para ${data.postalcodes[0].adminName3} é: 2 €`)
              setMensagem2(` €`)
              setMensagem3('')
              setLisboa()
            }
          } else if (data.postalcodes[0].adminName3 === 'Caneças') {
            setEntrega(4)
            setMensagem(`O custo de entrega para ${data.postalcodes[0].adminName3} é: 4 €`)
            setMensagem2(` €`)
            setMensagem3('Escolha sua Freguesia:')
          } else if (data.postalcodes[0].adminName3 === 'Lisboa'){
            setEntrega(1)
            setMensagem('')
              setMensagem2('')
            setMensagem3('Escolha sua Freguesia:')
            setLisboa(<Lisboa></Lisboa>)
          } else {
            setMensagem('Seu Código Postal é inválido.')
              setZipCode('')
              setEntrega()
              setMensagem2('')
              setMensagem3('')
              setLisboa()
          }
          
        }
      } else {
        setMensagem('Seu Código Postal é inválido.')
              setZipCode('')
              setEntrega()
              setMensagem2('')
              setMensagem3('')
              setLisboa()
      }


      
      
  }

  async function defineEntrega (value) {
    if (value === 'Campo Grande' || value === 'Santa Clara' || value === 'Lumiar' || value === 'Olivais' || value === 'Carnide') {
      setEntrega(4)
      setMensagem(`O custo de entrega para ${value} é: 4 €`)
      setMensagem2(` €`)
    }

    if (value === 'Benfica' || value === 'São Domingos de Benfica' || value === 'Campolide' || value === 'Avenidas Novas' || value === 'Alvalade' || value === 'Areeiro') {
      setEntrega(6)
      setMensagem(`O custo de entrega para ${value} é: 6 €`)
      setMensagem2(` €`)
    }

    if (value === 'Belém' || value === 'Ajuda' || value === 'Alcântara' || value === 'Campo de Ourique' || value === 'Estrela' || value === 'Santo Antônio' || value === 'Misericórdia' || value === 'Estrela' || value === 'Santa Maria Maior' || value === 'São Vicente' || value === 'Arroios' || value === 'Penha de França' || value === 'Beato' || value === 'Marvila' || value === 'Parque das Nações') {
      setEntrega(7)
      setMensagem(`O custo de entrega para ${value} é: 7 €`)
      setMensagem2(` €`)
    }
    
}


  class Pagamento extends Component {
    render() {
      let data = [{
        value: 'Dinheiro',
      }, {
        value: 'MBWay',
      }];
   
      return (
        <Dropdown
          label='Escolha seu método de pagamento'
          data={data}
          containerStyle = {{ height: 50, width: 300,}}
          onChangeText={value => setPagamento(value)}
        />
      );
    }
  }


  async function handleOrderSubmit () {

    if (global.delivery === 'Delivery') {
      if (!(zipCode === '' || street === '' || district === '' || number === '' || cel === '' || pagamento === '' || entrega === 1 || entrega === '')) {
        try {
      
          await api.post('orders', {
            observations,
            zip_code: zipCode,
            district,
            street,
            number,
            type,
            pagamento,
            entrega,
            cel,
            items: items.map(item => ({
              product_id: item.id,
              quantity: item.quantity
            }))
          })
    
          dispatch(CartActions.clearItems())
    
          navigation.navigate('Profile')
    
          dispatch(ToastActionsCreators.displayInfo('Pedido enviado com sucesso!'))
          //Notificação de nova compra
          PushNotification.localNotification({
            /* Android Only Properties */
            bigText: "Sua compra foi efetuada com sucesso!", // (optional) default: "message" prop
            color: "red", // (optional) default: system default
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            priority: "high", // (optional) set notification priority, default: high
            visibility: "private", // (optional) set notification visibility, default: private
            importance: "high", // (optional) set notification importance, default: high
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
          
          
            /* iOS and Android properties */
            title: "Compra", // (optional)
            message: "Muito obrigado pela compra!", // (required)
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          });
        } catch (err) {
          dispatch(
            ToastActionsCreators.displayError('Preencha os campos corretamente')
          )
        }
      } else {
        dispatch(
          ToastActionsCreators.displayError('Preencha os campos corretamente')
        )
      }
    } else {
      if (!(cel === '' || pagamento === '')) {
      
        try {

          
      
          await api.post('orders', {
            observations,
            zip_code: zipCode,
            district,
            street,
            number,
            type,
            pagamento,
            entrega,
            cel,
            items: items.map(item => ({
              product_id: item.id,
              quantity: item.quantity
            }))
          })
    
          dispatch(CartActions.clearItems())
    
          navigation.navigate('Profile')
    
          dispatch(ToastActionsCreators.displayInfo('Pedido enviado com sucesso!'))
          //Notificação de nova compra
          PushNotification.localNotification({
            /* Android Only Properties */
            bigText: "Sua compra foi efetuada com sucesso!", // (optional) default: "message" prop
            color: "red", // (optional) default: system default
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            priority: "high", // (optional) set notification priority, default: high
            visibility: "private", // (optional) set notification visibility, default: private
            importance: "high", // (optional) set notification importance, default: high
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
          
          
            /* iOS and Android properties */
            title: "Compra", // (optional)
            message: "Muito obrigado pela compra!", // (required)
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          });
        } catch (err) {
          dispatch(
            ToastActionsCreators.displayError('Preencha os campos corretamente')
          )
        }
      } else {
        dispatch(
          ToastActionsCreators.displayError('Preencha os campos corretamente')
        )
      }
    }

  
  }

  if (global.delivery === 'Delivery') {
    return (
      <Container>
        <ScrollView>
        <Text1>Compras acima de 15 Euros possuem entrega gratuita em Odivelas!</Text1>
        <InputWrapper>
          <Input
            multiline
            numberOfLines={4}
            textAlignVertical='top'
            placeholder='Alguma observação?'
            value={observations}
            onChangeText={text => setObservations(text)}
            returnKeyType='next'
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder='Telemóvel'
            keyboardType='numeric'
            value={cel}
            maxLength={9}
            onChangeText={text => setCel(text)}
            returnKeyType='next'
            blurOnSubmit={false}
            
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder='Código Postal'
            textContentType='postalCode'
            keyboardType='numeric'
            value={zipCode}
            minLength={7}
            maxLength={8}
            onChangeText={text => setZipCode(text)}
            returnKeyType='next'
            blurOnSubmit={false}
            onSubmitEditing={zipCodeLookup}
            onEndEditing={zipCodeLookup}
            require
          />
        </InputWrapper>
        <CheckboxText>{mensagem3}</CheckboxText>
        <InputWrapper>{lisboa}</InputWrapper>
    <CheckboxText>{mensagem}</CheckboxText>
        <InputWrapper>
          <Input
            placeholder='Rua'
            textContentType='streetAddressLine1'
            value={street}
            onChangeText={text => setStreet(text)}
            returnKeyType='next'
            blurOnSubmit={false}
            onSubmitEditing={() => districtRef.current.focus()}
            ref={streetRef}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder='Nº, Andar, Lote'
            value={number}
            onChangeText={text => setNumber(text)}
            returnKeyType='next'
            ref={numberRef}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder='Localidade'
            value={district}
            onChangeText={text => setDistrict(text)}
            returnKeyType='next'
            blurOnSubmit={false}
            onSubmitEditing={() => numberRef.current.focus()}
            ref={districtRef}
          />
        </InputWrapper>
  
        {/* Adicionando os campos no código de entrega e pagamento */}
        <InputWrapper>
          <Pagamento></Pagamento>
        </InputWrapper>
  
        <Text1>Pagamentos por MBWay tem que ser enviados para o seguinte número: 910017474</Text1>
        <Text1>Tempo de Preparo varia de 10 a 15 minutos.</Text1>
  
        <InputWrapper>
          <SendOrderButton onPress={handleOrderSubmit}>
            <SendOrderButtonText>FINALIZAR</SendOrderButtonText>
          </SendOrderButton>
        </InputWrapper>
        </ScrollView>
      </Container>

    )
  } else {
    return (
      <Container>
        <ScrollView>
        <InputWrapper>
          <Input
            multiline
            numberOfLines={4}
            textAlignVertical='top'
            placeholder='Alguma observação?'
            value={observations}
            onChangeText={text => setObservations(text)}
            returnKeyType='next'
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder='Telemóvel'
            keyboardType='numeric'
            maxLength={9}
            value={cel}
            onChangeText={text => setCel(text)}
            returnKeyType='next'
            blurOnSubmit={false}
            
          />
        </InputWrapper>
  
        <InputWrapper>
          <Pagamento></Pagamento>
        </InputWrapper>
        {/* Adicionando os campos no código de entrega e pagamento */}
  
        <Text1>Pagamentos por MBWay tem que ser enviados para o seguinte número: 910017474</Text1>
        <Text1>Tempo de Preparo varia de 10 a 15 minutos.</Text1>
  
        <InputWrapper>
          <SendOrderButton onPress={handleOrderSubmit}>
            <SendOrderButtonText>FINALIZAR</SendOrderButtonText>
          </SendOrderButton>
        </InputWrapper>
        </ScrollView>
      </Container>
  
      
    )
  }

  
}

Order.navigationOptions = {
  title: 'Realizar pedido',
  headerStyle: {
    backgroundColor: '#4f1913'
  },
  headerRight: <CartTotal />
}

export default Order
