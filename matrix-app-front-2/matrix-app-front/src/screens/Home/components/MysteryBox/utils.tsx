import { Text, theme } from 'matrix-ui-components';
import React from "react";
import { Benefist } from "src/types/types";
import { i18n } from 'src/utils/core/MTXStrings';
import { Image } from 'react-native';
import { DOCUMENTS_BASE_URL } from 'src/utils/constants';

export const transformData = (mysteryGift: Benefist) => {
  const data = mysteryGift;
  const benefist: Benefist | null = data ? data : null;

  const customGift = benefist?.descriptionGift ? {
    title: `${i18n.t('mistery-box.surprise')} ${benefist.establishment}`,
    description: benefist.descriptionGift,
    image: (<Image style={{ width: 140, height: 120 }} source={{ uri: `${DOCUMENTS_BASE_URL}${benefist.binderImg}/${benefist.img}` }} />),
  } : null

  return customGift;
}