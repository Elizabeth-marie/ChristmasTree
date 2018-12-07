import React, { Component } from 'react';
import Draggable from "./Circles";
import { Fonts } from './Fonts'
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import Flake from './Flake';

// Detect screen size
const { width, height } = Dimensions.get('window');

export default class Tree extends Component {

  constructor(props) {
    super(props)

    this.state = {
      flakesCount: this.props.flakesCount
    }
  }

  onLongPress = (ev) => {
    this.setState({
      ...this.state,
      flakesCount: 0
    })
  }

  onPress = (ev) => {
    this.makeItRain()
  }

  makeItRain = () => {
    this.setState({
      ...this.state,
      flakesCount: this.state.flakesCount + 25
    })
  }

  static defaultProps = {
    flakesCount: 0, // total number of flakes on the screen
  }

  render({ flakesCount } = this.state) {
    return <View style={styles.container}>
      {/* Christmas Tree background image */}

      <Image
        style={styles.image}
        source={require('./assets/tree.jpg')}
      >
        {/* Render flakesCount number of flakes */}
        {[...Array(flakesCount)].map((_, index) => <Flake
          x={Math.random() * width}               // x-coordinate
          y={Math.random() * height}              // y-coordinate
          radius={Math.random() * 4 + 1}          // radius
          density={Math.random() * flakesCount}   // density
          key={index}
        />)}
      </Image>

      <TouchableHighlight onPress={this.onPress} underlayColor="red" onLongPress={this.onLongPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Make it Rain (Winter Style)</Text>
        </View>
      </TouchableHighlight>

    </View>;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    position: 'relative',
  },
  button: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: Fonts.MountainsofChristmas,
    color: "green",
    fontSize: 25,
  }
});
