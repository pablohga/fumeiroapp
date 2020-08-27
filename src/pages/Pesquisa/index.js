import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast'

import api from '../../services/api'

import {
  Container,
  ProductsList,
  Product,
  ProductImage,
  ProductTitle,
  LinkButton,
  ButtonText,
  Text
  
} from './styles'

function Products ({ navigation }) {
  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const categoryId = navigation.getParam('pesquisa')

  const dispatch = useDispatch()

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts () {
    try {
      setRefreshing(true)

      const { data } = await api.get('pesquisa', {
        params: { category : categoryId }
      })
     
       
      setProducts(data)
    } catch (err) {
      dispatch(ToastActionsCreators.displayError('Erro ao buscar categorias'))
    } finally {
      setRefreshing(false)
    }
  }

  function handleProductSelect (productId) {
    navigation.navigate('Sizes', { productId })
  }

  function renderProduct ({ item }) {
    return (
      <Product onPress={() => handleProductSelect(item.id)}>
        <ProductImage image={item.image} />
        <ProductTitle>{item.name}</ProductTitle>
        <ProductTitle>{item.base_price}€</ProductTitle>
      </Product>
    )
  }

  return (
    <Container>
       
      <ProductsList
        data={products}
        numColumns={2}
        keyExtractor={item => String(item.id)}
        renderItem={renderProduct}
        onRefresh={loadProducts}
        
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  )
}

Products.navigationOptions = {
  title: 'Selecione o que deseja',
  headerStyle: {
    backgroundColor: '#4f1913'
  },
}

export default Products
