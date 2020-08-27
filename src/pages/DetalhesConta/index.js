import React, { useState, useEffect } from 'react'
import {FlatList, View} from 'react-native'
import { useDispatch } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast'

import api from '../../services/api'
import AuthActions from '../../store/ducks/auth'
import BackButton from '../../components/BackButton'

import {
    Container,
    ProductsList,
    Product,
    ProductImage,
    ProductTitle,
    LinkButton,
    ButtonText,
    Text,
    Texto
    
  } from './styles'


function Detalhesconta ({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    loadProfile()
  }, []);

  async function loadProfile () {
    try {
      setRefreshing(true)

      const data  = await api.get('profile')
      
      console.log(data)
    } catch (err) {
      dispatch(ToastActionsCreators.displayError('Erro ao carregar perfil'))
    } finally {
      setRefreshing(false)
    }
  }

  return (

    <Container>
      
    </Container>
  );

};

Detalhesconta.navigationOptions= ({ navigation }) => ({

  title: 'Perfil',
  headerLeft: ({ tintColor }) => (
    <BackButton
      tintColor={tintColor}
      onPress={() => navigation.navigate('Main')}
    />
  )
})
export default Detalhesconta
