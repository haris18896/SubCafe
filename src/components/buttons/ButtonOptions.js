import React from 'react';
import {StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import PropTypes from 'prop-types';

// ** Custom Components
import {
  ButtonOptionWrapper,
  ButtonOptionContainer,
} from '../../styles/components';
import {LinearButton} from './LinearButton';
import {TextItem} from '../../styles/typography';
import {Card, CardWrapper, ColumnCenter} from '../../styles/infrustucture';

const ButtonOptions = props => {
  // ** Props
  const {title, onPress, disabled, selected, customStyles, width, data} = props;

  return (
    <CardWrapper style={{width: '100%'}}>
      <Card color={AppTheme?.DefaultPalette()?.background?.paper}>
        <ColumnCenter>
          <TextItem
            size={4.5}
            color={AppTheme?.DefaultPalette()?.grey[700]}
            style={styles.labelStyles}>
            {title}
          </TextItem>

          <ButtonOptionWrapper mt={2}>
            <ButtonOptionContainer>
              {data &&
                data.map((item, index) => (
                  <LinearButton
                    key={index}
                    title={item?.title}
                    selected={selected === item?.title}
                    disabled={item?.disabled || disabled}
                    description={item?.description}
                    onPress={() => onPress(item)}
                    size={{
                      width,
                    }}
                    styles={customStyles}
                  />
                ))}
            </ButtonOptionContainer>
          </ButtonOptionWrapper>
        </ColumnCenter>
      </Card>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  labelStyles: {
    marginVertical: AppTheme?.WP(1),
    textAlign: 'center',
  },
  counterStyles: {
    width: '100%',
    marginVertical: AppTheme?.WP(5),
  },
});

ButtonOptions.propTypes = {
  selected: PropTypes.string,
  width: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string,
  data: PropTypes.array,
  customStyles: PropTypes?.object,
};

export {ButtonOptions};
