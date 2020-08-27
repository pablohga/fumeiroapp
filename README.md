# Fumeiro na Brasa APP Delivery

Fumeuro na Brasa Delivery - Painel Atendimento

Este sistema é composto por API, App Mobile, Painel Administrativo e Painel de Atendimento. Todo inclusos neste GitHub. Duvidas e esclarecimentos, entre em contato por pablohga@gmail.com . Caso deseje este sistema para o seu restuarante e se livrar do UBER EATS de vez, estarei disponivel para desenvolver uma versão persoanlizada para você!

## Try it now

Painel Administrativo: https://fumeiroadmin.herokuapp.com/
Painel de Atendimento: https://fumeiro-atendimento.herokuapp.com/

- email: `admin@delivery.com`
- password: `123456`

**Installing dependencies**

```shell
yarn install
```

## :satellite: Connecting with the server API

1. Follow the instructions on [delivery-api](https://github.com/CaioQuirinoMedeiros/delivery_api) to have the server up and running
2. Create a _.env_ file and set a variable `REACT_APP_API_URL` with the value of your server url

- It should looks like this: `CREATE_APP_API_URL=http://127.0.0.1:3333`

3. Run `adb reverse tcp:3333 tcp:3333` so the app can communicate with the backend

## :runner: Running

Make sure you have [react-native environment](https://facebook.github.io/react-native/docs/getting-started) properly configured

- Android
  ```shell
  react-native run-android
  ```
- iOS
  ```shell
  react-native run-ios
  ```

**run metro-bundler whenever needed**

```shell
react-native start
```



