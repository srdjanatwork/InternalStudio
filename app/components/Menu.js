import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { Colors, BorderSizes, PixelSizes, PaddingSizes, FontStyles } from '../resources';
import PropTypes from 'prop-types';

const MENU_ITEMS = ['Getting on WiFi', 'Travel', 'Office Entrances', 'Local Favorites', 'Safety Tips'];

export default class Menu extends Component {
  state = {
    items: MENU_ITEMS,
  }
  openModal = (i) => {
    console.log(i);
  }
  render() {
    const { items } = this.state;

    return items.map((item, i) => (
      <View style={ styles.menuItemWrapper } key={ item }>
        <TouchableHighlight onPress={() => this.openModal(i)}>
          <Text style={ styles.menuItem }>{ item }</Text>
        </TouchableHighlight>
      </View>
    ));
  }
}

const styles = StyleSheet.create({
  menuItemWrapper : {
    borderTopColor: Colors.greyBorder,
    borderTopWidth: BorderSizes.thin,
    paddingTop: PaddingSizes.menuPaddingTop,
    paddingBottom: PaddingSizes.menuPaddingBottom
  },
  menuItem: {
    color: Colors.white,
    fontSize: FontStyles.menuItem.fontSize,
  }
});

Menu.propTypes = {
  items: PropTypes.array,
};
