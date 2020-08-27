import styled from 'styled-components'

import ImageComponent from '../../components/Image'

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #EDD6BE;
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

  font-size: 45px;
  color: black;
  font-weight: bold;
  text-align: center;
  
`


export const Text4 = styled.Text`

  font-size: 10px;
  color: #4F1913;
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

  height: 0px;
  width: 60px;

  margin: 0% 30%;
  border-radius: 18px;
  text-align: center;
  justify-content: center;
  background: ${props => (props.red ? '#E62638' : 'transparent')};
`
export const Button1 = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  }
})`
  
  height: 0px;
  width: 100px;
  margin: 0% 45%;
  border-radius: 18px;
  text-align: center;
  justify-content: center;
  background: ${props => (props.red ? '#E62638' : 'transparent')};
`
export const Button2 = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  }
})`
  
  height: 0px;
  width: 100px;
  margin: 0% 60%;
  border-radius: 18px;
  text-align: center;
  justify-content: center;
  background: ${props => (props.red ? '#E62638' : 'transparent')};
`

