import styled from 'styled-components'

import ImageComponent from '../../components/Image'

export const Container = styled.View`
  height: 100%;
  width: 100%;
`

export const ProductsList = styled.FlatList.attrs({
  contentContainerStyle: { paddingVertical: 10 },
  columnWrapperStyle: { justifyContent: 'space-evenly' }
})``

export const Product = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  align-items: center;
  border-radius: 10px;
  margin: 5px 0;
  padding: 12px;
  width: 160px;
  background: #fff;
  elevation: 8;
`

export const TextInput = styled.TextInput`
margin-left: 15%;
  width: 60%;
  background: transparent;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 8px;
  padding-right: ${props => (props.password ? '50px' : '0')};
  borderBottomColor: #9A211E;
  borderBottomWidth: 3px;
  `
export const InputWrapper = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: center;
`
export const ProductImage = styled(ImageComponent).attrs({ size: 120 })``

export const ProductTitle = styled.Text`
  color: #0b2031;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
`
export const LinkButton = styled.TouchableOpacity`
  font-size: 15px;
  width: 100%;
  padding: 10px 0;
`
export const ButtonText = styled.Text`
  font-size: 15px;
  color: black;
  font-weight: bold;
  text-align: center;
`

export const Text = styled.Text`
  font-size: 25px;
  color: black;
  font-weight: bold;
  text-align: center;
`
export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  }
})`
  
  width: 100px;
  margin: 0 35%;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  background: ${props => (props.red ? '#E62638' : 'transparent')};
`