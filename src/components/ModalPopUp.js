import React from "react";
import Modal from "react-modal";

import { history } from "../redux/configureStore";

const ModalPopUp = (props) => {
  const { children, pushData } = props;
  const [modal, setModal] = React.useState(true); // 모달창
  //-- 모달 닫기 --
  const modalOff = (props) => {
    setModal(false);
    history.replace(pushData);
  };
  return (
    <div>
      <Modal
        isOpen={modal}
        ariaHideApp={false}
        onRequestClose={modalOff}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 15, 15, 0.79)",
          },
          content: {
            position: "absolute",
            top: "60px",
            left: "35%",
            width: "20%",
            height: "80%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
            zIndex: "100",
          },
        }}
      >
        {children}
      </Modal>
    </div>
  );
};

export default ModalPopUp;

// import React from "react";

// const ModalPopUp = (props) => {
//   // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
//   const { open, close, header } = props;

//   return (
//     // 모달이 열릴때 openModal 클래스가 생성된다.
//     <div>
//       {open ? (
//         <section>
//           <header>
//             {header}
//             <button onClick={close}> &times; </button>
//           </header>
//           <main>{props.children}</main>
//           <footer>
//             <button onClick={close}> close </button>
//           </footer>
//         </section>
//       ) : null}
//     </div>
//   );
// };
// export default ModalPopUp;
