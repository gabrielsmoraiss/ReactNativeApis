import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

import api from './services/api';

export default class App extends Component<Props> {
  signIn = async () => {
    const response = await api.post('/auth/authenticate')
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.signIn} title="Entrar" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
