import styled from 'styled-components'

import ImageComponent from '../../components/Image'

export const Container = styled.View`
  height: 100%;
  width: 100%;
`
export const SliderContainer = styled.View`
  height: 40%;
  width: 100%;
`
export const CategoriesList = styled.FlatList.attrs({
  contentContainerStyle: { paddingVertical: 10, alignItems: 'center' }
})``

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 25px;
  align-self: center;
`

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  width: 90%;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  margin: 5px 0;
  padding: 12px;
  background-color: #fff;
  elevation: 8;
  borderBottomColor: #9A211E;
  borderBottomWidth: 3px;
`

export const CategoryImage = styled(ImageComponent).attrs({ size: 80 })``

export const CategoryInfo = styled.View`
  height: 80px;
  margin-left: 10px;
  flex: 1;
  justify-content: space-between;
`

export const CategoryInfoWrapper = styled.View``

export const CategoryTitle = styled.Text`
  color: #9A211E;
  font-size: 15;
`

export const CategoryDescription = styled.Text`
  font-size: 13px;
  color: #AD9D4E;
`

export const CategoryCookTime = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CategoryCookTimeText = styled.Text`
  color: #706e7b;
  font-size: 13px;
  margin-left: 5px;
`
export const ProductsList = styled.FlatList.attrs({
  contentContainerStyle: { paddingVertical: 10, alignItems: 'center' }
})``

export const Product = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  align-items: center;
  border-radius: 10px;
  margin: 5px 0;
  padding: 12px;
  width: 160px;
  background: #969696;
  elevation: 8;
`

export const ProductImage = styled(ImageComponent).attrs({ size: 120 })``

export const ProductTitle = styled.Text`
  color: #9A211E;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 5px 0;
`

export const LinkButton = styled.TouchableOpacity`
  font-size: 15px;
  alignItems:center;
  width: 30%;
  padding: 15px 0;
  background-color: transparent;
  border-radius: 30px;
`
export const ButtonText = styled.Text`
  marginTop: 50%;
  font-size: 15px;
  color: white;
  font-weight: bold;
  text-align: center;

`
export const InputWrapper = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: center;
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