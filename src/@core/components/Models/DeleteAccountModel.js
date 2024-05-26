import React from 'react';
import {StyleSheet, View} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../infrustructure/theme';
import {ModalView} from './ModalView';
import {ModalContainer, UserActivityWrapper} from '../../../styles/screens';
import {
  ColumCenter,
  RowCenter,
  SpaceBetweenWrapper,
} from '../../../styles/infrustucture';
import {TextItem} from '../../../styles/typography';
import {ButtonAction} from '../../../components';

// ** Custom Components

export const DeleteAccountModel = props => {
  const {title, open, onToggle, description, isLoading, onSubmit} = props;

  return (
    <ModalView open={open} title={title} toggleModal={onToggle}>
      <ModalContainer>
        <ColumCenter>
          <TextItem
            size={3.5}
            color={AppTheme?.DefaultPalette()?.grey[700]}
            style={{textAlign: 'center'}}>
            {description}
          </TextItem>
        </ColumCenter>

        <View style={styles.ButtonContainer}>
          <UserActivityWrapper width={'48%'}>
            <ButtonAction
              left={false}
              title={'No'}
              size={'small'}
              onPress={onToggle}
              titleWeight={'bold'}
              labelColor={AppTheme.DefaultPalette()?.grey[700]}
              loadingColor={AppTheme.DefaultPalette().common.white}
            />
          </UserActivityWrapper>
          <UserActivityWrapper width={'48%'}>
            <ButtonAction
              end
              size={'small'}
              left={false}
              title={'Yes'}
              titleWeight={'bold'}
              onPress={onSubmit}
              loading={isLoading}
              color={AppTheme.DefaultPalette().error.main}
              labelColor={AppTheme.DefaultPalette().common.white}
              loadingColor={AppTheme.DefaultPalette().common.white}
            />
          </UserActivityWrapper>
        </View>
      </ModalContainer>
    </ModalView>
  );
};

const styles = StyleSheet.create({
  ButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: AppTheme?.WP(4),
    paddingHorizontal: AppTheme?.WP(4),
  },
});
