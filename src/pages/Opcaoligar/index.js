import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ActivityIndicator, FlatList, View, Linking,ImageBackground } from 'react-native';
import api from '../../services/api'

import {
  Container,
  ProductsList,
  Product,
  ProductImage,
  ProductTitle,
  LinkButton,
  ButtonText,
  Text,
  Button
  
} from './styles'

function Products ({ navigation }) {

    return (
      <ImageBackground
        style={{ flex: 1 }}
        //We are using online image to set background
        source={{
          uri:
            'https://i.ibb.co/W3ZmD8y/OKKKKKKK.png',
        }}
        //You can also set image from your project folder
        //require('./images/background_image.jpg')        //
        >

      
      <View style={{ flex: 1, padding: 24 }}>
        <Text>Se deseja ligar para 910017474:</Text>
          <Button onPress={()=>{Linking.openURL('tel:910017474');} }>
      <Icon name='call' size={45} color='#9A211E' />
    </Button>
    <Text>Se deseja ligar para 210980969:</Text>
          <Button onPress={()=>{Linking.openURL('tel:210980969');} }>
      <Icon name='call' size={45} color='#9A211E' />
    </Button>
    <Text>Se deseja mandar uma mensagem no whatsapp:</Text>
          <Button onPress={()=>{Linking.openURL('whatsapp://send?phone=351910017474&text=Olá Fumeiro na Brasa! Gostava de fazer um pedido.');} }>
      <Icon name='sms' size={45} color='#9A211E' />
    </Button>
      
      </View>
    </ImageBackground>

    );
  };
  

Products.navigationOptions = {
  title: '',
  headerStyle: {
    backgroundColor: '#4f1913'
  },
}

export default Products
