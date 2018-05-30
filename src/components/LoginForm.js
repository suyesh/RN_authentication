import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onButtonPress = () => {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.onLoginSuccess()
      })
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
          .then((user) => {
            this.onLoginSuccess()
          })
          .catch(() => {
             this.onLoginFail()
          })
      })
  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }

  onLoginFail = () => {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    })
  }

  renderButton = () => {
    if (this.state.loading){
      return <Spinner size="small"/>
    }

    return(
      <Button onPress={this.onButtonPress}>
        Log in
      </Button>
    )
  }

  render(){
    return(
      <Card>
        <CardSection>
          <Input
            onChangeText={ email => this.setState({ email })}
            value={ this.state.text }
            label="Email"
            placeholder="john@appleseed.com"
          />
        </CardSection>

        <CardSection>
          <Input
            onChangeText={ password => this.setState({ password })}
            value={ this.state.text }
            label="Password"
            placeholder="password"
            secureTextEntry={ true }
          />
        </CardSection>

        <Text style={ styles.errorTextStyles }>
          { this.state.error }
        </Text>

        <CardSection>
           { this.renderButton() }
        </CardSection>

      </Card>
    )
  }
}

const styles = {
  errorTextStyles: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
