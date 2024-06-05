import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Box, Text, useTheme } from 'matrix-ui-components';
import { PAYMENT_CARDS_LIMIT, ios, screenWidth } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import { RFValue } from 'react-native-responsive-fontsize';
import { CardAddIcon } from 'assets/svgs';
import ConfirmModal from 'src/components/confirm-modal';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import MethodPaymentSkeleton from './skeleton/MethodPaymentSkeleton';
import { CardProps, CardsListProps, FlatListEventProps } from '../types/types';
import AddCard from './AddCard';
import useDeleteMethodPayment from '../hooks/useDeleteMethodPayment';
import PaymentCard from './PaymentCard';

const ITEM_SIZE = screenWidth - RFValue(48);

const CardsList: React.FC<CardsListProps> = ({
  cards,
  onSelect,
  cardSelected,
  loading,
  navigate,
  testID,
}) => {
  const { handleDeleteMethodPayment, deleteLoading } = useDeleteMethodPayment();

  const [activeViewCard, setActiveViewCard] = useState(1);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const { colors, spacing } = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const setActiveCard = (index: number) => {
    setActiveViewCard(index);
    onSelect(cards[index - 1]);
  };

  const onScrollEnd = (e: FlatListEventProps) => {
    const pageNumber = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / ITEM_SIZE + 0.5) + 1, 0),
      cards.length,
    );
    setActiveCard(pageNumber);
  };

  const sliderNavigate = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: index < cards.length - 1 ? 0.8 : 0,
    });
  };

  const goToNext = (positionKey: number) => {
    setActiveCard(positionKey + 1);
    sliderNavigate(positionKey);
  };

  const handleConfirmCardDelete = async (): Promise<void> => {
    setTimeout(() => {
      setDeleteModalVisible(false);
    }, 100);
    const cardIsDeleted = await handleDeleteMethodPayment(cardSelected?.cardId || '');
    if (cardIsDeleted) {
      onSelect(null);
    }
  };

  useEffect(() => {
    if (cards.length > 0) {
      if (cards.length === 1) {
        onSelect(cards[0]);
      }

      setTimeout(() => {
        goToNext(0);
      }, 100);
    }
  }, [cards.length]);

  const renderDots = () => {
    if (cards.length > 1) {
      return (
        <Box justifyContent="center" alignItems="center" flexDirection="row">
          {cards.map((card, key) => {
            const isActive = activeViewCard === key + 1;
            return (
              <TouchableOpacity
                hitSlop={{
                  bottom: 10,
                  top: 10,
                }}
                disabled={isActive}
                onPress={() => goToNext(key)}
                key={card.cardId}
              >
                <Box
                  height={isActive ? 10 : 4}
                  width={30}
                  backgroundColor={isActive ? 'transparent' : 'gray100'}
                  borderRadius={10}
                  marginHorizontal="spacing-xxxs"
                  borderWidth={isActive ? 3 : 0}
                  borderColor="primaryDarkest"
                />
              </TouchableOpacity>
            );
          })}
        </Box>
      );
    }
    return null;
  };

  const renderSeparator = () => <Box ml="spacing-s" />;

  function handleCardRender() {
    if (loading) {
      return <MethodPaymentSkeleton isVisible={loading} />;
    }

    if (cards.length > 0) {
      return (
        <>
          <FlatList
            ref={flatListRef}
            data={cards}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.cardId}
            horizontal
            bounces={false}
            decelerationRate={ios ? 0 : 0.98}
            renderToHardwareTextureAndroid
            snapToInterval={ITEM_SIZE + RFValue(16)}
            snapToAlignment="start"
            contentContainerStyle={{ paddingHorizontal: spacing['spacing-m'] }}
            onMomentumScrollEnd={onScrollEnd}
            pagingEnabled
            scrollEventThrottle={16}
            ItemSeparatorComponent={renderSeparator}
            // eslint-disable-next-line react/no-unused-prop-types
            renderItem={({ item }: { item: CardProps }) => (
              <PaymentCard
                isOnlyCard={cards.length === 1}
                isSelected={cardSelected?.cardId === item.cardId}
                number={item.cardNumber}
                type={item.cardType}
                icon={item.cardIcon}
                width={ITEM_SIZE}
                onRemovePress={() => {
                  setDeleteModalVisible(true);
                  onSelect(item);
                }}
              />
            )}
          />
          {renderDots()}
        </>
      );
    }
    return <AddCard onPress={() => navigate()} />;
  }

  const renderAddCardsButton = () => {
    const enabled = cards.length < PAYMENT_CARDS_LIMIT;
    return (
      <TouchableOpacity testID={testID} onPress={() => navigate()} disabled={!enabled}>
        <Box flexDirection="row" alignItems="center">
          <CardAddIcon color={enabled ? 'black' : colors.primary400} width={24} height={24} />
          <Text
            variant="body13SemiBold"
            color={enabled ? 'primary1000' : 'primary400'}
            ml="spacing-xxs"
          >
            {i18n.t('cardPayment.card-add')}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <Box mb="spacing-m">
      <Box
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        mx="spacing-m"
      >
        <Box flex={1}>
          <Text variant="Subtitle18Medium" mb="spacing-s">
            {i18n.t('cardPayment.payment_method')}
          </Text>
        </Box>
        {renderAddCardsButton()}
      </Box>
      {handleCardRender()}
      <ConfirmModal
        title={i18n.t('cardPayment.title-delete')}
        description={i18n.t('cardPayment.message-delete')}
        isVisible={deleteModalVisible}
        confirmButton={{
          label: i18n.t('cardPayment.yes'),
          onPress: () => handleConfirmCardDelete(),
        }}
        onClose={() => setDeleteModalVisible(false)}
        cancelButton={{
          label: i18n.t('cardPayment.no'),
        }}
      />
      <LoadingIndicator isVisible={deleteLoading} />
    </Box>
  );
};

CardsList.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  cardSelected: undefined,
};

export default CardsList;
