import { Modal } from 'matrix-ui-components';
import React from 'react';
import ProcessingModal from 'src/screens/CardOffer/modals/ProcessingModal';
import Load from 'src/screens/CardOffer/components/Load';

interface IInfoModalProps {
  closeInfoModal: ()=> void;
  isLoadingReissues: boolean;
}

export const InfoModal = ({
  isLoadingReissues, closeInfoModal,
}: IInfoModalProps) => (
  <Modal animationType="fade" visible={isLoadingReissues}>
    <ProcessingModal isVisible={true}>
      <Load type="generatingCard" />
    </ProcessingModal>
  </Modal>
);

InfoModal.name = 'InfoModal';

export default InfoModal;
