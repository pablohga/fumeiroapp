import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastActionsCreators } from 'react-native-redux-toast'
import { ActivityIndicator, FlatList, View } from 'react-native';
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
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const senha = navigation.getParam('senha');
    useEffect(() => {
      fetch('https:///192.168.1.209:1348/email/'+{})
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);
  
    return (
      <View style={{ flex: 1, padding: 24 }}>
        <Text>{senha}</Text>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.title}, {item.releaseYear}</Text>
            )}
          />
        )}
      </View>
    );
  };
  

Products.navigationOptions = {
  title: '',
  headerStyle: {
    backgroundColor: '#4f1913'
  },
}

export default Products
