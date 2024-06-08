import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party packages
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Custom Components
import {TextItem} from '../../styles/typography';
import {FeatureRowHeader, FeatureRowWrapper} from '../../styles/components';

import {restaurants} from '../../utils/dummyData';
import {ItemRow} from './ItemRow';

import {RowStart} from '../../styles/infrustucture';

const FeaturedRow = ({data, title, description, address, specialOrder}) => {
  return (
    <FeatureRowWrapper style={styles.container}>
      <FeatureRowHeader style={styles.header}>
        <TextItem size={4}>{title}</TextItem>
      </FeatureRowHeader>
      <TextItem
        style={{marginTop: AppTheme?.WP(1)}}
        size={3.5}
        color={AppTheme?.DefaultPalette()?.grey[600]}>
        {description}
      </TextItem>

      {address && (
        <RowStart style={{marginTop: AppTheme?.WP(1)}}>
          <MaterialCommunityIcon
            name={'map-marker'}
            color={AppTheme?.DefaultPalette()?.primary?.main}
            size={AppTheme?.WP(6)}
          />
          <TextItem
            style={{marginLeft: AppTheme?.WP(2)}}
            size={3.5}
            color={AppTheme?.DefaultPalette()?.grey[600]}>
            {address}
          </TextItem>
        </RowStart>
      )}

      {specialOrder && (
        <RowStart style={{marginTop: AppTheme?.WP(1)}}>
          <MaterialCommunityIcon
            name={'noodles'}
            color={AppTheme?.DefaultPalette()?.primary?.main}
            size={AppTheme?.WP(6)}
          />
          <TextItem
            style={{marginLeft: AppTheme?.WP(2)}}
            size={3.5}
            color={AppTheme?.DefaultPalette()?.grey[600]}>
            {specialOrder}
          </TextItem>
        </RowStart>
      )}

      <ScrollView
        horizontal
        contentContainerStyle={[
          styles.scrollView,
          {width: restaurants.length === 0 ? '100%' : 'auto'},
        ]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {data?.length > 0 && data?.map(item => <ItemRow data={item} />)}
      </ScrollView>
    </FeatureRowWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    paddingTop: AppTheme?.WP(2),
  },
  loadingContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingBottom: AppTheme?.WP(4),
  },
});

export {FeaturedRow};
