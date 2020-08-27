/* eslint-disable max-len */
import React, { useState, useRef, Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast'
import axios from 'axios'
import { ScrollView } from 'react-native'

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




import api from '../../services/api'


import {
  Container,
  Input,
  SendOrderButton,
  SendOrderButtonText,
  InputWrapper,
  CheckboxText,
  Text1,
} from './styles'


function Analises ({ navigation }) {
  const [analise, setAnalise] = useState('')
  const [order_id, setOrderId] = useState('')


  const dispatch = useDispatch()


  async function handleOrderSubmit () {
    try {
      
      await api.post('analise', {
        analise,
        order_id
      })

      navigation.navigate('Profile')

      dispatch(ToastActionsCreators.displayInfo('Pedido enviado com sucesso!'))
      //Notificação de nova compra
      PushNotification.localNotification({
        /* Android Only Properties */
        bigText: "Analise efetuada com sucesso!", // (optional) default: "message" prop
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
        message: "Muito obrigado pela opinião!", // (required)
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      });
    } catch (err) {
      dispatch(
        ToastActionsCreators.displayError('Preencha os campos corretamente')
      )
    }
  }
    return (
      <Container>
        <ScrollView>
        <InputWrapper>
          <Input
            multiline
            numberOfLines={4}
            textAlignVertical='top'
            placeholder='O que achou da sua compra?'
            value={analise}
            onChangeText={text => setAnalise(text)}
            returnKeyType='next'
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            placeholder='Número do Pedido'
            textContentType='postalCode'
            keyboardType='numeric'
            value={order_id}
            onChangeText={text => setOrderId(text)}
            returnKeyType='next'
            blurOnSubmit={false}
          />
        </InputWrapper>
  
        <InputWrapper>
          <SendOrderButton onPress={handleOrderSubmit}>
            <SendOrderButtonText>FINALIZAR</SendOrderButtonText>
          </SendOrderButton>
        </InputWrapper>
        </ScrollView>
      </Container>

    )

  
}

Analises.navigationOptions = {
  title: 'Dê sua opinião',
  headerStyle: {
    backgroundColor: '#4f1913'
  }
}

export default Analises
