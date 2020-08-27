import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import BackButton from './components/BackButton'

import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'

import Main from './pages/Main'
import Products from './pages/Products'
import Sizes from './pages/Sizes'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Order from './pages/Order'
import Pesquisa from './pages/Pesquisa'
import Horario from './pages/Horario'
import Opcaoligar from './pages/Opcaoligar'
import Detalhesconta from './pages/DetalhesConta'
import Analises from './pages/Analises'

const AuthStack = createStackNavigator(
  { SignIn, SignUp },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
    transparentCard: true
  }
)

const AppStack = createStackNavigator(
  {
    Sizes,
    Analises,
    Main,
    Products,
    Cart,
    Profile,
    Order,
    Pesquisa,
    Horario,
    Detalhesconta,
  },
  {
    initialRouteName: 'Sizes',
    headerMode: 'float',
    transparentCard: true,
    defaultNavigationOptions: {
      headerStyle: {
        height: 75,
        backgroundColor: 'transparent'
      },
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#4f1913'
      },
      headerLeft: BackButton,
      headerTitleStyle: { marginHorizontal: 0, fontWeight: 'bold' }
    }
  }
)

const createNavigator = isLoggedIn =>
  createAppContainer(
    createSwitchNavigator(
      { AuthStack, AppStack},
      { initialRouteName: isLoggedIn ? 'AppStack' : 'AuthStack' }
    )
  )

export default createNavigator
