import React, {useState, useMemo} from 'react';

// ** Utils
import {showToast} from '../../../utils/utils';
import {theme as AppTheme} from '../../../@core/infrustructure/theme';

// ** Third Party Packages
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';

// ** Custom Packages
import {
  BookingContainer,
  DatePickerView,
  DinningWrapper,
  UserActivityWrapper,
} from '../../../styles/screens';
import {Menu} from './menu';
import {Empty} from '../../../@core/components';
import {TextItem} from '../../../styles/typography';
import {ButtonAction} from '../../buttons/ButtonAction';
import {ButtonOptions} from '../../buttons/ButtonOptions';

// ** Store && Actions
import {useDispatch, useSelector} from 'react-redux';
import {TableBookingAction} from '../../../redux/Orders';
import {setRestaurant} from '../../../redux/Restaurant';

const Booking = props => {
  // ** Params
  const {type, seats, userId, restaurantId} = props;

  // ** navigation
  const navigation = useNavigation();
  const {restaurant} = useSelector(state => state?.restaurants);

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [tables, setTables] = useState(null);
  const [isLoading, setIsLoading] = useState('');
  const [showDinning, setShowDinning] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(moment().toDate());
  const [customEndDate, setCustomEndDate] = useState(
    moment().add(1, 'hour').toDate(),
  );
  const [datePickerOpen, setDatePickerOpen] = useState({
    start: false,
    end: false,
  });

  const array = useMemo(() => {
    if (seats === 0) {
      return [];
    }

    const tempArray = [];
    for (let i = 0; i < seats; i++) {
      tempArray.push({
        id: i + 1,
        title: `${i + 1}`,
        value: `${i + 1}`,
      });
    }
    return tempArray;
  }, [seats]);

  const apiCall = async () => {
    setIsLoading('Table_booking');

    dispatch(
      TableBookingAction({
        data: {
          user_id: userId,
          id: restaurantId,
          no_of_tables_booked: tables,
          start_time: customStartDate,
          end_time: customEndDate,
        },
        refreshing: () => setIsLoading(''),
        errorCallback: err => {
          setIsLoading('');
          console.log('show me error...', err);
        },
        callback: () => {
          setShowDinning(true);
          dispatch(
            setRestaurant({
              ...restaurant,
              reservation_start_time: customStartDate.toString(),
              reservation_end_time: customEndDate.toString(),
            }),
          );
          showToast({
            type: 'success',
            title: 'Reservation',
            message: `${tables} Table has been reserved for you`,
          });
        },
      }),
    );
  };

  return (
    <>
      {showDinning ? (
        <Menu type={type} />
      ) : (
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
                  setDatePickerOpen({
                    ...datePickerOpen,
                    start: false,
                    end: true,
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

          <TextItem
            style={{marginBottom: AppTheme?.WP(1)}}
            size={4}
            color={AppTheme?.DefaultPalette()?.grey[800]}>
            Booking
          </TextItem>
          <BookingContainer>
            <DatePickerView
              onPress={() =>
                setDatePickerOpen(prev => ({start: true, end: false}))
              }>
              <TextItem
                size={3.5}
                color={AppTheme?.DefaultPalette()?.grey[600]}>
                Start Time
              </TextItem>
              <TextItem
                size={3.5}
                color={AppTheme?.DefaultPalette()?.grey[700]}>
                {moment(customStartDate).format('MMM DD, HH:MM A')}
              </TextItem>
            </DatePickerView>

            <DatePickerView
              onPress={() =>
                setDatePickerOpen(prev => ({start: false, end: true}))
              }>
              <TextItem
                size={3.5}
                color={AppTheme?.DefaultPalette()?.grey[600]}>
                End Time
              </TextItem>
              <TextItem
                size={3.5}
                color={AppTheme?.DefaultPalette()?.grey[700]}>
                {moment(customEndDate).format('MMM DD, HH:MM A')}
              </TextItem>
            </DatePickerView>
          </BookingContainer>

          {seats === 0 ? (
            <Empty title={'All Tables Reserved'} />
          ) : (
            <ButtonOptions
              width={'30%'}
              data={array}
              selected={tables}
              onPress={item => setTables(item.title)}
              title={'How many Tables do you want to reserve'}
              customStyles={{
                container: {
                  pl: 3,
                  pr: 3,
                  pt: 3,
                  pb: 3,
                  titleFontSize: 3.2,
                  descriptionFontSize: 2.7,
                },
              }}
            />
          )}

          <UserActivityWrapper
            marginTop={2}
            direction={'column'}
            alignItems={'flex-end'}
            justifyContent={'flex-end'}>
            <ButtonAction
              end={true}
              title={'Available Seats'}
              titleWeight={'bold'}
              onPress={apiCall}
              disabled={!tables}
              loading={isLoading === 'Table_booking'}
              border={AppTheme?.DefaultPalette()?.buttons?.primary}
              color={AppTheme?.DefaultPalette()?.buttons?.primary}
              labelColor={AppTheme.DefaultPalette().common.white}
              loadingColor={AppTheme.DefaultPalette().common.white}
            />
          </UserActivityWrapper>
        </DinningWrapper>
      )}
    </>
  );
};
export {Booking};
