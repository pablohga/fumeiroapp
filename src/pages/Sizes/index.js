/* eslint-disable max-len */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import api from '../../services/api'

import {
  Container,
  SizesList,
  Size,
  SizeImage,
  SizeTitle,
  SizePrice
} from './styles'
let state; 

function Sizes ({ navigation }) {
 
  const [estado, setEstado] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    loadState();
  }, [])

  async function loadState () {

    try {
      setRefreshing(true)
      const {data}  = await api.get('state')
      console.log(data)
      setEstado(data)
      setEstado(
        data.map(estado => ({
          ...estado,
          
        }))
      )
      state = data[0].estado
      
    } catch (err) {
     
    } finally {
      setRefreshing(false)
    }
  }

  function renderEstado() {
    if (state === 0) {
      return (
        <Container>
         <Size onPress={() => handleSizeSelect('Delivery')}>
            <SizeTitle>Delivery</SizeTitle>
            <SizePrice>Entregamos na sua casa.</SizePrice>
          </Size>
    
          <Size onPress={() => handleSizeSelect('Takeaway')}>
            <SizeTitle>Takeaway</SizeTitle>
            <SizePrice>Venha buscar ao nosso estabelecimento.</SizePrice>
          </Size>
    
          <SizeTitle>AVISO! Apenas entregamos até porta do prédio!</SizeTitle>
        </Container>
      )
    } else if (state === 1) {
      return (
        <Container>
         
    
        
        <SizeTitle>No momento não estamos atendendo. Por favor, volte mais tarde.</SizeTitle>
         
      </Container>
      )
    }
  }


  async function handleSizeSelect (sizeId) {
      global.delivery = sizeId

      navigation.navigate('Main')
  }
  return (
    <Container>
      
      {renderEstado()}
	  
    </Container>
  );
  
  
}

Sizes.navigationOptions = {
  title: 'Selecione o método de entrega',
  headerStyle: {
    backgroundColor: '#4f1913'
  },
}

export default Sizes
