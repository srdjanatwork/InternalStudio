import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, Dimensions } from 'react-native';
import { PaddingSizes, MarginSizes, Colors, FontSizes } from '../resources';
import PropTypes from 'prop-types';

export default class Swiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      position: new Animated.ValueXY(),
    }

    this.screenWidth = Dimensions.get('window').width;
  }

  componentWillMount() {
    const { activeIndex, position } = this.state;

    this.animatedValueX = 0;
    position.x.addListener(value => this.animatedValueX = value.value);

    this.panResponder = PanResponder.create({
      // tells the OS we want to allow movement of the view we’ll attach this panresponder to.
      onMoveShouldSetResponderCapture: () => true,
      // does the same, but for dragging, which we want to be able to do.
      onMoveShouldSetPanResponderCapture: () => true,
      // gets invoked when we got access to the movement of the element. This is a perfect spot to set some initial values.
      onPanResponderGrant: (e, gestureState) => {
        position.setOffset({ x: this.animatedValueX });
        position.setValue({ x: 0 });
      },
      // gets invoked when we move the element, which we can use to calculate the next value for the object
      onPanResponderMove: (e, gestureState ) => {
        Animated.event([null, {
          dx: position.x
        }])(e, gestureState);
      },

      // The user has released all touches while this view is the responder. This typically means a gesture has succeeded
      onPanResponderRelease: (e, {vx, dx}) => {
        const { activeIndex } = this.state;
        const HALF_PAGE = 0.5;

        if (Math.abs(vx) >= HALF_PAGE || Math.abs(dx) >= HALF_PAGE * this.screenWidth) {
          Animated.timing(position.x, {
            toValue: this.checkSlidePosition(dx),
            duration: 200
          }).start();

          // change active slide index
          this.setActiveIndex(dx);
        } else {
          Animated.spring(position.x, {
            toValue: 0,
            bounciness: 1
          }).start();
        }
       }
    });
  }

  // check slide position if slide is the last or the first reset some slides movement
  checkSlidePosition = (dx) => {
    const { activeIndex } = this.state;
    const { slides } = this.props;

    let result = 0;

    if (dx > 0) {
      if (activeIndex === 0) {
        result = 0;
      } else {
        result = this.screenWidth;
      }
    } else if (dx < 0) {
      if (activeIndex === (slides.length - 1)) {
        result = 0;
      } else {
        result = -this.screenWidth;
      }
    }

    return result;
  }

  setActiveIndex = (dx) => {
    const { activeIndex } = this.state;
    const { slides } = this.props;

    if (dx < 0 && activeIndex !== (slides.length - 1) ) {
      this.setState({
        activeIndex: activeIndex + 1
      })
    } else if (dx > 0 && activeIndex !== 0) {
      this.setState({
        activeIndex: activeIndex - 1
      })
    }
  }

  componentWillUnmount() {
    this.state.position.x.removeAllListeners();
  }

  render() {
    const { position } = this.state;
    const { slides } = this.props;

    console.log('ACTIVE INDEX', this.state.activeIndex);

    return (
      <View style={ styles.sliderContainer }>
        <Animated.View style={ [styles.sliderWrapper, { transform: [ { translateX: position.x }]
         }] } {...this.panResponder.panHandlers}>
          { slides.map((slide, index) => {
            return (
              <View key={ slide.title } style={ styles.slide }>
                <Text style={ styles.slideTitle }>{ slide.title }</Text>
              </View>
            );
          })}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    backgroundColor: Colors.red,
    width: '100%',
  },
  sliderWrapper: {
    flexDirection: 'row',
    width: '100%'
  },
  slide: {
    borderRightWidth: 2,
    borderRightColor: 'black',
    width: '100%'
  },
  slideTitle: {
    paddingLeft: PaddingSizes.paddingPageHorizontal,
    marginTop: MarginSizes.xxxl,
    color: Colors.white,
    fontSize: FontSizes.sliderTitle,
    opacity: 1
  }
});

Swiper.propTypes = {
  slides: PropTypes.array,
};
