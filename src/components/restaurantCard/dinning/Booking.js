import React, {useState} from 'react';

// ** Utils
import {theme as AppTheme} from '../../../@core/infrustructure/theme';

// ** Third Party Packages
import DatePicker from 'react-native-date-picker';

// ** Custom Packages
import {
  BookingContainer,
  DatePickerView,
  DinningWrapper,
  UserActivityWrapper,
} from '../../../styles/screens';
import {TextItem} from '../../../styles/typography';
import moment from 'moment';
import {ButtonAction} from '../../buttons/ButtonAction';
import {FormikValuesChanged, isObjEmpty} from '../../../utils/utils';

const Booking = props => {
  const {type} = props;

  // ** States
  const [isLoading, setIsLoading] = useState('');
  const [customEndDate, setCustomEndDate] = useState(new Date());
  const [customStartDate, setCustomStartDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState({
    start: false,
    end: false,
  });

  const apiCall = () => {
    console.log('check for available seats');
  };

  return (
    <DinningWrapper>
      {type === 'booking' && (
        <>
          <DatePicker
            modal={true}
            date={customStartDate}
            minimumDate={new Date()}
            open={datePickerOpen?.start}
            onConfirm={date => {
              setCustomStartDate(date);
              setDatePickerOpen({...datePickerOpen, start: false, end: true});
            }}
            onCancel={() => {
              setDatePickerOpen({
                ...datePickerOpen,
                start: false,
                end: false,
              });
            }}
          />

          <DatePicker
            modal={true}
            minimumDate={new Date()}
            date={customEndDate}
            open={datePickerOpen?.end}
            onConfirm={date => {
              setCustomEndDate(date);
              setDatePickerOpen({
                ...datePickerOpen,
                start: false,
                end: false,
              });
            }}
            onCancel={() => {
              setDatePickerOpen({
                ...datePickerOpen,
                start: false,
                end: false,
              });
            }}
          />
        </>
      )}

      <TextItem size={4} color={AppTheme?.DefaultPalette()?.grey[700]}>
        Booking
      </TextItem>
      <BookingContainer>
        <DatePickerView
          onPress={() =>
            setDatePickerOpen(prev => ({start: true, end: false}))
          }>
          <TextItem size={3.5} color={AppTheme?.DefaultPalette()?.grey[600]}>
            Start Time
          </TextItem>
          <TextItem size={3.5} color={AppTheme?.DefaultPalette()?.grey[700]}>
            {moment(customEndDate).format('MMM DD, HH:MM A')}
          </TextItem>
        </DatePickerView>

        <DatePickerView
          onPress={() =>
            setDatePickerOpen(prev => ({start: false, end: true}))
          }>
          <TextItem size={3.5} color={AppTheme?.DefaultPalette()?.grey[600]}>
            End Time
          </TextItem>
          <TextItem size={3.5} color={AppTheme?.DefaultPalette()?.grey[700]}>
            {moment(customEndDate).format('MMM DD, HH:MM A')}
          </TextItem>
        </DatePickerView>
      </BookingContainer>

      <UserActivityWrapper
        direction={'column'}
        alignItems={'flex-end'}
        justifyContent={'flex-end'}>
        <ButtonAction
          end={true}
          title={'Available Seats'}
          titleWeight={'bold'}
          loading={isLoading === 'login_pending'}
          onPress={() => apiCall()}
          border={AppTheme?.DefaultPalette()?.buttons?.primary}
          color={AppTheme?.DefaultPalette()?.buttons?.primary}
          labelColor={AppTheme.DefaultPalette().common.white}
          loadingColor={AppTheme.DefaultPalette().common.white}
        />
      </UserActivityWrapper>
    </DinningWrapper>
  );
};
export {Booking};
