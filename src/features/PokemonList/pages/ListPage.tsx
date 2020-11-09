import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PADDING_SIZE } from '../../../shared/constants';
import { ListContainer } from '../containers';


export const ListPage = () => (
  <View style={styles.root}>
    <ListContainer />
  </View>
);

const styles = StyleSheet.create({
    root: {
        padding: PADDING_SIZE
    }
})