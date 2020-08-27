import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { parseISO, formatDistanceToNow, format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { ToastActionsCreators } from 'react-native-redux-toast'

import api from '../../services/api'
import { convertToBRL } from '../../services/currency'
import AuthActions from '../../store/ducks/auth'

import BackButton from '../../components/BackButton'
import OrderModal from '../../components/OrderModal'
import { ActivityIndicator, FlatList, View,Text } from 'react-native';
import {
  Container,
  OrdersList,
  OrderItem,
  OrderInfo,
  OrderNumber,
  OrderElapsedTime,
  OrderTotal,
  OrderStatus,
  Footer,
  LogoutButton,
  LogoutButtonText,
  EmptyMessage,
  LinkButton,
  LinkButton1,
  ButtonText,
  Text1,
  OrderButton,
  OrderButtonText
} from './styles'

let id 

function Profile ({ navigation }) {
  const [orders, setOrders] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [modalOrder, setModalOrder] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    loadOrders()
  }, [])

  

  async function loadOrders () {
    try {
      setRefreshing(true)

      const { data } = await api.get('orders')
      id = data[0].user_id
      console.log(id)
      setOrders(
        data.map(order => ({
          ...order,
          total: convertToBRL(Number(order.total))
        }))
      )
    } catch (err) {
      dispatch(ToastActionsCreators.displayError('Erro ao carregar pedidos'))
    } finally {
      setRefreshing(false)
    }
  }
  async function loadOrder (orderId) {
    try {
      const { data } = await api.get(`orders/${orderId}`) 
      
      setModalOrder({
        ...data,
        total: convertToBRL(Number(data.total)),
        created_at: format(parseISO(data.created_at), 'Pp', {
          locale: pt
        })
      })
    } catch (err) {
      dispatch(ToastActionsCreators.displayError('Erro ao exibir pedido'))
    }
  }
 
  function closeOrder () {
    setModalOrder(null)
  }

  function signOut () {
    dispatch(AuthActions.signOut())
  }
 

  function renderOrderItem ({ item, index }) {
    
    return (
      
      <OrderItem onPress={() => loadOrder(item.id)}>
      
        <OrderInfo>
    <OrderNumber>{`Pedido #${index + 1}`} </OrderNumber>
    <OrderNumber>Número da encomenda: {item.id}</OrderNumber>
          
          <OrderElapsedTime>{item.elapsedTime}</OrderElapsedTime>
          <OrderTotal>{item.total }</OrderTotal>
        
          
        </OrderInfo>
        <OrderStatus status={item.status}>{item.status}</OrderStatus>
      </OrderItem>
    )
  }
 
   


  return (
    <Container>
       {modalOrder && (<OrderModal order={modalOrder} closeOrder={closeOrder} />)}

      <OrdersList
     
        data={orders}
        keyExtractor={item => String(item.id)}
        
        renderItem={renderOrderItem}
        onRefresh={loadOrders}
        refreshing={refreshing}
        ListEmptyComponent={
          <OrderItem>
            <EmptyMessage>Nenhum histórico de pedido 
             </EmptyMessage>
            
          </OrderItem>
          
        }
      />
      
    
      

       <Text1>Pagamentos por MBWay tem que ser enviados com respetivo número de encomenda e para o seguinte número: 910017474</Text1>
       <Text1>Apresente o respetivo número de encomenda quando for buscar seu pedido.</Text1>


       <OrderButton onPress={() => navigation.navigate('Analises', { id })}>
          <OrderButtonText>Dê sua Opinião</OrderButtonText>
        </OrderButton>

      <Footer>
        <LogoutButton onPress={signOut}>
          <LogoutButtonText>SAIR</LogoutButtonText>
        </LogoutButton>
      </Footer>
    </Container>
  )
}

Profile.navigationOptions = ({ navigation }) => ({

  title: 'Meus pedidos',
  headerLeft: ({ tintColor }) => (
    <BackButton
      tintColor={tintColor}
      onPress={() => navigation.navigate('Main')}
    />
  )
})

export default Profile
