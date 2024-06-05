import React, { useState } from 'react';
import { Box, AccordionCard } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import IconSwitchItem from 'src/components/IconSwitchItem/IconSwitchItem';
import BiometrySetting from 'assets/svgs/finger-cricle.svg';

const BiometrySettings = () => {
  const [isBiometricActive, setIsBiometricActive] = useState<boolean>(false);
  return (
    <AccordionCard title={i18n.t('app-settings.card-title-biometry')}>
      <Box mt="spacing-s">
        <IconSwitchItem
          leftItem={<BiometrySetting />}
          label={i18n.t('app-settings.switch-item-title-biometry')}
          infoLabel={i18n.t('app-settings.switch-item-subtitle-biometry')}
          infoLabelColor="primaryDark"
          isActive={isBiometricActive}
          onChange={() => setIsBiometricActive(!isBiometricActive)}
        />
      </Box>
    </AccordionCard>
  );
};

export default BiometrySettings;
