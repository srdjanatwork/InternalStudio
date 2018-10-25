import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

export default class Img extends Component {
  render() {
    return <Image source={ this.props.source } style={[styles.imageStyles, this.props.imagePropStyles]} />;
  }
}

const styles = StyleSheet.create({
  imageStyles: {
    width: 30,
    height: 30,
  },
});

Img.propTypes = {
  source: PropTypes.number,
  imagePropStyles: PropTypes.object,
};
