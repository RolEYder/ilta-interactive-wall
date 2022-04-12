import * as React from "react";
import styled from "styled-components";
import colors from "../../utils/colors";
import { opacify } from "polished";
import { CSSTransition } from "react-transition-group";

interface ModalProps {
  visible: boolean;
}

const ModalContainer = styled.div`
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${opacify(0.1, colors.gray)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalView = styled.div`
  background-color: ${colors.white};
  min-width: 500px;
  padding: 2rem;
  box-shadow: 10px 10px 10px ${colors.gray};
  transition: all 300ms ease-out;
  border-radius: 40px;
`;

const TransitionContainer = styled.div`
  .modal-enter {
    opacity: 0.01;

    .modal-view {
      transform: scale(0.9) translateY(20%);
    }
  }
  .modal-enter-active {
    opacity: 1;
    transition: all 300ms ease-out;

    .modal-view {
      transform: scale(1) translateY(0%);
    }
  }
  .modal-exit {
    opacity: 1;

    .modal-view {
      transform: scale(1) translateY(0%);
    }
  }
  .modal-exit-active {
    opacity: 0.01;
    transition: all 300ms ease-out;

    .modal-view {
      transform: scale(0.9) translateY(20%);
    }
  }
`;

const Modal: React.SFC<ModalProps> = ({ visible, children }) => {
  return (
    <TransitionContainer>
      <CSSTransition
        in={visible}
        timeout={400}
        unmountOnExit
        classNames="modal"
      >
        {state => (
          <ModalContainer>
            <ModalView className="modal-view">{children}</ModalView>
          </ModalContainer>
        )}
      </CSSTransition>
    </TransitionContainer>
  );
};

export default Modal;
