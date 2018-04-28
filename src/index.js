import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';

import api from './services/api';

export default class App extends Component {
  state = {
    loggedInUser: null,
    errorMessage: null,
    projects: [],
  };

  signIn = async () => {
    
    try {
      const response = await api.post('/auth/authenticate', {
        email: 'tesatee@teastee.com.br',
        password: '12345678',
      });

      const { user, token } = response.data;

      //console.log(user, JSON.stringify(user), token);
      await AsyncStorage.multiSet([
        ['@ReactNativeApis:token', token],
        ['@ReactNativeApis:user', JSON.stringify(user)],
      ]);
      Alert.alert('Login com Sucesso!');

      this.setState({ loggedInUser: user });

    } catch (response) {
      if (response.data) {
        this.setState({ errorMessage: response.data.error });
      } else {
        console.log(response);
      }
    }
  };

  getProjectList = async () => {
    try {
      const response = await api.get('/projects');

      const { projects } = response.data;

      this.setState({ projects });
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@ReactNativeApis:token');
    const user = JSON.parse(await AsyncStorage.getItem('@ReactNativeApis:user'));

    if (token && user) {
      this.setState({ loggedInUser: user });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        { !!this.state.loggedInUser && <Text> { this.state.loggedInUser.name } </Text> }
        { !!this.state.errorMessage && <Text> { this.state.errorMessage } </Text> }
        { this.state.loggedInUser ?
          <Button onPress={this.getProjectList} title="Carregar" /> :
          <Button onPress={this.signIn} title="Entrar" />
        }
        { this.state.projects.map(project => (
          <View key={project._id} style={{ marginTop: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>{project.title}</Text>
            <Text>{project.description}</Text>

          </View>
        ))}
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
