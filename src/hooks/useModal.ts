import * as React from "react";

function useModal(initialVisible = false) {
  const [visible, updateVisible] = React.useState(initialVisible);

  function showModal() {
    updateVisible(true);
  }

  function hideModal() {
    updateVisible(false);
  }

  return { visible, showModal, hideModal };
}

export default useModal;
