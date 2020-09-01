import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import shortid from "shortid";

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return `rgb(${getRandomNumber(240, 255)},${getRandomNumber(
    82,
    212
  )},${getRandomNumber(225, 250)})`;
}
const { height, width } = Dimensions.get("window");
const animationEndY = Math.ceil(height * 0.7);
const negativeEndY = animationEndY * -1;

export default class HeartFloating extends React.Component {
  state = {
    hearts: [],
    count: 0,
  };

  componentDidUpdate(prevProps) {
    if (this.props.animate !== prevProps.animate && this.props.animate) {
      var x = 0;
      const id = setInterval(() => {
        this.addHeart();
        if (++x === this.props.limit) {
          clearInterval(id);
          this.props.onComplete();
        }
      }, 150);
    }
  }

  addHeart = () => {
    this.setState({
      hearts: [
        ...this.state.hearts,
        {
          id: shortid.generate(),
          right: getRandomNumber(-10, width / 2),
          color: getRandomColor(),
        },
      ],
      count: this.state.count++,
    });
  };

  removeHeart = (id) => {
    this.setState({
      hearts: this.state.hearts.filter((heart) => {
        return heart.id !== id;
      }),
    });
  };
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
        {this.state.hearts.map((heart) => {
          return (
            <HeartContainer
              onComplete={() => this.removeHeart(heart.id)}
              key={heart.id}
              style={{ right: heart.right }}
              color={heart.color}
            />
          );
        })}
      </View>
    );
  }
}

class HeartContainer extends React.Component {
  constructor() {
    super();
    this.yAnimation = this.state.position.interpolate({
      inputRange: [negativeEndY, 0],
      outputRange: [animationEndY, 0],
    });

    this.opacityAnimation = this.yAnimation.interpolate({
      inputRange: [0, animationEndY],
      outputRange: [1, 0],
    });

    this.scaleAnimation = this.yAnimation.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [0, 1.4, 1],
      extrapolate: "clamp",
    });

    this.xAnimation = this.yAnimation.interpolate({
      inputRange: [
        0,
        animationEndY / 6,
        animationEndY / 3,
        animationEndY / 2,
        animationEndY,
      ],
      outputRange: [0, 25, 15, 0, 10],
    });

    this.rotateAnimation = this.yAnimation.interpolate({
      inputRange: [
        0,
        animationEndY / 6,
        animationEndY / 3,
        animationEndY / 2,
        animationEndY,
      ],
      outputRange: ["0deg", "-5deg", "0deg", "5deg", "0deg"],
    });
  }
  state = {
    position: new Animated.Value(0),
  };

  static defaultProps = {
    onComplete() {},
  };
  componentDidMount() {
    Animated.timing(this.state.position, {
      duration: 2000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(this.props.onComplete);
  }

  getHeartStyle() {
    return {
      transform: [
        { translateY: this.state.position },
        { scale: this.scaleAnimation },
        { translateX: this.xAnimation },
        { rotate: this.rotateAnimation },
      ],
      opacity: this.opacityAnimation,
    };
  }
  render() {
    return (
      <Animated.View
        style={[styles.heartContainer, this.getHeartStyle(), this.props.style]}
      >
        <Heart color={this.props.color} />
      </Animated.View>
    );
  }
}

const Heart = (props) => {
  return (
    <View {...props} style={[styles.heart, props.style]}>
      <AntDesign name="heart" size={48} color={props.color}></AntDesign>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "green",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 32,
    left: 32,
  },
  heartContainer: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "transparent",
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
