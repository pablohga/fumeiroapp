import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast'
import {  View,Image,Linking,ImageBackground,StyleSheet,} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
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
  Text1,
  Text2,
  Text3,
  Text4,
  Button,
  Button1,
  Button2
} from './styles'

let state;

function Horario ({ navigation }) {

  
  const [refreshing, setRefreshing] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    loadState();

  }, [])

  async function loadState () {

    try {
      
      setRefreshing(true)
      const {data}  = await api.get('horario')
      console.log(data)
      state = data[0].horario
      
    } catch (err) {
     console.log('coco')
    } finally {
      setRefreshing(false)
    }
  }
  

  return (
   
      <ImageBackground
        style={{ flex: 1 }}
        //We are using online image to set background
        source={{
          uri:
            'https://i.ibb.co/dKpjpMp/Horario.jpg',
        }}
        //You can also set image from your project folder
        //require('./images/background_image.jpg')        //
        >
        <View style={{ flex: 1, marginTop:"90%" }}>
        <ButtonText>{state}</ButtonText>
        </View>
  <View style={{ flex: 1, marginTop:"50%" }}>
        
          <Button onPress={()=>{Linking.openURL('tel:910017474');} }>
      <Icon name='mobile' size={45} color='#9A211E' />
    </Button>
    
          <Button1 onPress={()=>{Linking.openURL('tel:910017474');} }>
      <Icon name='phone' size={40} color='#9A211E' />
    </Button1>
    <Button2 onPress={()=>{Linking.openURL('whatsapp://send?phone=351910017474&text=Olá Fumeiro na Brasa! Gostava de fazer um pedido.');} }>
      <Icon name='whatsapp' size={40} color='#9A211E' />
    </Button2>
    </View>
      </ImageBackground>
    );
  }

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginBottom:'90%',

    alignItems: 'center',
  },
  TextStyle: {
    color: '#0250a3',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 90,
  },
});


Horario.navigationOptions = {
  title: 'Horário',
  headerStyle: {
    backgroundColor: '#4f1913'
  },
}

export default Horario
