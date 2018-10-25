import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PaddingSizes, PixelSizes } from '../resources';
import Img from '../components/Image';
import Menu from '../components/Menu';
import Swiper from '../components/Swiper';

const SLIDES = [
  { title: 'Brooklyn' },
  { title: 'Belgrade' },
  { title: 'Portland' },
  { title: 'Rio' },
];

export default class Home extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.swiperContainer }>
           <Swiper slides={ SLIDES } />
        </View>
        <View style={ styles.menuContainer }>
          <Menu />
        </View>
        <Img
          source={ require('../assets/profile.png') }
          imagePropStyles={ styles.image }
        />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer : {
    flex: 1,
    paddingHorizontal: PaddingSizes.paddingHorizontal,
  },
  image: {
    position: 'absolute',
    width: PixelSizes.profileImageSize,
    height: PixelSizes.profileImageSize,
    marginTop: 25,
    marginBottom: 28,
    top: 20,
    left: 20,
  },
  menuContainer: {
    position: 'absolute',
    bottom: PaddingSizes.paddingPageBottom,
    left: PaddingSizes.paddingPageHorizontal,
    right: 0,
    flex: 1,
  },
});
