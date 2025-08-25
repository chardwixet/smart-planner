import { Headphone } from "@/components/share/CardList";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Modal {
  isOpen: boolean;
  props?: {
    product?: Headphone;
    total?: { totalPrice: number; totalCount: number };
  };
}

interface ModalSlice {
  [key: string]: Modal;
}

const initialState: ModalSlice = {
  payModal: { isOpen: false, props: {} },
  productModal: {
    isOpen: false,
    props: {},
  },
};

interface PayloadType {
  modalName: string;
  props?: Record<string, unknown> | null;
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, { payload }: PayloadAction<PayloadType>) {
      const { modalName, props } = payload;
      state[modalName].isOpen = true;

      if (props) {
        state[modalName].props = props;
      }
    },
    closeModal(state, { payload }: PayloadAction<PayloadType>) {
      const { modalName } = payload;
      state[modalName].isOpen = false;
      state[modalName].props = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
