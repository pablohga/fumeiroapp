import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast'

import CartActions from '../../store/ducks/cart'
import { convertToBRL } from '../../services/currency'

import api from '../../services/api'

import {
  Container,
  ProductsList,
  Product,
  ProductImage,
  ProductTitle,
  ProductDescription
  
} from './styles'

function Products ({ navigation }) {
  const [products, setProducts] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const items = useSelector(({ cart }) => cart.data)

  const categoryId = navigation.getParam('categoryId')

  const dispatch = useDispatch()

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts () {
    try {
      setRefreshing(true)

      const { data } = await api.get('products', {
        params: { category: categoryId, esgotado: 0 }
      })

      setProducts(data)
    } catch (err) {
      dispatch(ToastActionsCreators.displayError('Erro ao buscar categorias'))
    } finally {
      setRefreshing(false)
    }
  }

  async function handleProductSelect (productId) {
    const itemInCart = items.find(item => item.id === productId)

    if (itemInCart) {
      dispatch(CartActions.increaseItemQuantity(itemInCart.id))
      navigation.navigate('Sizes')
    } else {
      try {
        const { data } = await api.get(`products/${productId}`)

        dispatch(CartActions.addItem(data))

        navigation.navigate('Cart')
      } catch (err) {
        dispatch(ToastActionsCreators.displayError('Produto não encontrado'))
      }
    }
  }



  function renderProduct ({ item }) {
    return (
      <Product onPress={() => handleProductSelect(item.id)}>
        <ProductImage image={item.image} />
        <ProductTitle>{item.name}</ProductTitle>

       <ProductTitle>{item.base_price}€</ProductTitle>
      <ProductDescription>{item.description}</ProductDescription>
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
