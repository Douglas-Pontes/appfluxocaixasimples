import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './src/Home';
import Cadastro from './src/Cadastro';
import Login from './src/Login';
import Interna from './src/Interna';
import Preload  from './src/Preload';
import addReceita from './src/addReceita';
import addDespesa from './src/addDespesa';

const Navegador = StackNavigator({
  Preload:{
      screen:Preload  
  },
    Interna:{
    screen:Interna
  },
  Home:{
    screen:Home
  },
  Cadastro:{
    screen:Cadastro
  },
  Login:{
    screen:Login
  },
  addReceita:{
    screen:addReceita
  },
  addDespesa:{
    screen:addDespesa
  }

});

export default Navegador;