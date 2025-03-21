import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListarContatos from '../../pages/ListarContatos';
import Formulario from '../../pages/Formulario';

const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ListarContatos}
          options={{title: 'Contatos'}}
        />
        <Stack.Screen name="adicionar" component={Formulario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};