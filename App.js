
import React, { Component } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from 'react-native';

export default class App extends Component {
  state = {
    email: '',
    loading: false
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true })
    const data = {
      loginId: this.state.email
    };

    const options = {
      headers: { 'Content-Type': 'application/json' }
    };

    axios.post(`http://myneighby.herokuapp.com/api/v2/forgot-password`,
      data, options)
      .then((response) => {
        console.log("sucess =====>", response);
        this.setState({ loading: false })
        alert(response.data.message);
      }, (error) => {
        console.log("ERROR ===>", error);
        this.setState({ loading: false })
        switch (error.response.status) {
          case 401:
            alert("Account does not exist.")
            break

          case 404:
            alert("Service not found")
            break

          case 500:
            alert("Check your network")
            break
        }
      })
  }

  render() {
    if (this.state.loading) {
      return (<View>
        <View style={{ margin: 7 }} />
        <ActivityIndicator size="large" color="#0000ff" />
      </View>)
    } else {
      return (
        <View style={styles.container}>
          <Text
            style={styles.title}>
            Forgot you password?
          </Text>
          <Text
            style={styles.subTitle}>
            Please enter the email address registeredon you account.
          </Text>
          <View>
            <TextInput style={{ borderBottomWidth: 1.0 }} placeholder='Email:' name="email" onChangeText={(text) => { this.setState({ email: text }) }} />
          </View>

          <View style={{ margin: 7 }} />
          <Button
            color="#f194ff"
            onPress={this.handleSubmit}
            title="Submit"
          />
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
    justifyContent: 'center',
    fontSize: 20
  },
  subTitle: {
    textAlign: 'center',
    marginVertical: 8,
    justifyContent: 'center',
    fontSize: 12
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
