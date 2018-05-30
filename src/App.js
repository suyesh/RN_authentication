import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Card, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import firebaseConfig from '../config';

class App extends Component {
  state = {
    loggedIn: null
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return(
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>
                Log Out
              </Button>
            </CardSection>
          </Card>
        )
      case false:
        return <LoginForm/>
      default:
        return (
          <Card>
            <CardSection>
              <Spinner size="large"/>
            </CardSection>
          </Card>
        )
    }
  }

  render(){
    return(
      <View>
        <Header headerText="Authentication"/>
        { this.renderContent() }
      </View>
    )
  }
}

export default App
