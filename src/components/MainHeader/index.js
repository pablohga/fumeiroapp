import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { Container, Button, Title, CartItems } from './styles'

const MainHeader = ({ navigation, height, itemsLength }) => (
  <Container headerHeight={height}>
    <Button onPress={() => navigation.navigate('Profile')}>
      <Icon name='user-circle' size={24} color='#9A211E' />
    </Button>
   
    <Title > Fumeiro na Brasa </Title>
    <Button onPress={() => navigation.navigate('Horario')}>
      <Icon name='clock' size={20} color='#9A211E' />
    </Button>
    
    <Button onPress={() => navigation.navigate('Cart')}>
      {itemsLength > 0 ? <CartItems>{itemsLength}</CartItems> : <></>}
      <Icon name='shopping-cart' size={20} color='#9A211E' />
      
    </Button>
  </Container>
)

MainHeader.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired,
  height: PropTypes.number,
  itemsLength: PropTypes.number.isRequired
}

MainHeader.defaultProps = {
  height: 60
  
}
const mapStateToProps = state => ({
  itemsLength: state.cart.data.length
})

export default connect(mapStateToProps, null)(MainHeader)
