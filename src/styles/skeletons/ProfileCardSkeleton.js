import React from 'react';

// ** Custom Components
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Skeleton
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProfileCardSkeleton = () => {
  return (
    <SkeletonPlaceholder
      borderRadius={4}
      enabled={true}
      speed={1000}
      backgroundColor={AppTheme.DefaultPalette().skeleton.backgroundColor}
      highlightColor={AppTheme.DefaultPalette().skeleton.highlightColor}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent={'space-between'}>
        <SkeletonPlaceholder.Item
          flexDirection="column"
          alignItems="flex-start">
          <SkeletonPlaceholder.Item
            width={AppTheme.WP(45)}
            height={AppTheme.WP(5)}
          />
          <SkeletonPlaceholder.Item
            marginTop={AppTheme.WP(3)}
            width={AppTheme.WP(40)}
            height={AppTheme.WP(3)}
          />
          <SkeletonPlaceholder.Item
            marginTop={AppTheme.WP(3)}
            width={AppTheme.WP(40)}
            height={AppTheme.WP(3)}
          />
          <SkeletonPlaceholder.Item
            marginTop={AppTheme.WP(3)}
            width={AppTheme.WP(40)}
            height={AppTheme.WP(3)}
          />
          <SkeletonPlaceholder.Item
            marginTop={AppTheme.WP(3)}
            width={AppTheme.WP(40)}
            height={AppTheme.WP(3)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            marginRight={AppTheme.WP(3)}
            width={AppTheme.WP(30)}
            height={AppTheme.WP(30)}
            borderRadius={AppTheme.WP(50)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

const UserProfileCardSkeleton = () => {
  return (
    <SkeletonPlaceholder
      borderRadius={20}
      enabled={true}
      speed={1000}
      backgroundColor={AppTheme.DefaultPalette().skeleton.backgroundColor}
      highlightColor={AppTheme.DefaultPalette().skeleton.highlightColor}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        paddingVertical={5}
        paddingHorizontal={4}
        justifyContent={'space-between'}>
        <SkeletonPlaceholder.Item
          width={AppTheme.WP(40)}
          height={AppTheme.WP(4)}
        />

        <SkeletonPlaceholder.Item
          width={AppTheme.WP(30)}
          height={AppTheme.WP(4)}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export {ProfileCardSkeleton, UserProfileCardSkeleton};
