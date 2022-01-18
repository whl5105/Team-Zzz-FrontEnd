import React from "react";
import styled from "styled-components";

// --- images ---
import dropDown from "../static/images/icon/dropDown.png";

const Dropdown = (props) => {
  const [item, setItem] = React.useState(null);

  const onActiveToggle = () => {
    if (props.condition === "") {
      dayChange();
    } else if (props.condition === "시") {
      hourChange();
    } else if (props.condition === "분") {
      minutesChange();
    }
  };

  const dayChange = () => {
    props.setDayActive(!props.dayActive);
    props.setHourActive(false);
    props.setMinutesActive(false);
  };

  const hourChange = () => {
    props.setDayActive(false);
    props.setHourActive(!props.hourActive);
    props.setMinutesActive(false);
  };

  const minutesChange = () => {
    props.setDayActive(false);
    props.setHourActive(false);
    props.setMinutesActive(!props.minutesActive);
  };

  const onSelectItem = (name) => {
    setItem(name);
    props.state(name);

    if (props.dayActive) {
      props.setDayActive(!props.dayActive);
    } else if (props.hourActive) {
      props.setHourActive(!props.hourActive);
    } else if (props.minutesActive) {
      props.setMinutesActive(!props.minutesActive);
    }
  };

  // 알림 비활성화일 때
  if (props.state === "disabled") {
    return (
      <DisabledDropDownContainer>
        <DropdownBody color="gray">
          <p>{`${props.title}${props.condition}`}</p>
          <img src={dropDown} alt="" />
        </DropdownBody>
      </DisabledDropDownContainer>
    );
  }

  // 알림 활성화일 때
  return (
    <DropdownContainer className="dropdown">
      <DropdownBody>
        {item ? (
          <>
            <p>{`${item}${props.condition}`}</p>
            <img onClick={onActiveToggle} src={dropDown} alt="" />
          </>
        ) : (
          <>
            <p>{`${props.title}${props.condition}`}</p>
            <img onClick={onActiveToggle} src={dropDown} alt="" />
          </>
        )}
      </DropdownBody>
<<<<<<< HEAD
      {props.dayActive && (
=======
      {props.dayActive ? (
>>>>>>> 62fe15b848907859712a3f039833ca682c31efc3
        <DropdownMenu height="67px" id="type2" isActive={props.dayActive}>
          {props.dayItems &&
            props.dayItems.map((item) => (
              <DropdownItemContainer
                key={item}
                onClick={() => {
                  onSelectItem(item);
                }}
              >
                <p>{`${item}${props.condition}`}</p>
              </DropdownItemContainer>
            ))}
        </DropdownMenu>
      )}

      {props.hourActive && (
        <DropdownMenu height="100px" id="type2" isActive={props.hourActive}>
          {props.hourItems &&
            props.hourItems.map((item) => (
              <DropdownItemContainer
                key={item}
                onClick={() => {
                  onSelectItem(item);
                }}
              >
                <p>{`${item}${props.condition}`}</p>
              </DropdownItemContainer>
            ))}
        </DropdownMenu>
      )}

      {props.minutesActive && (
        <DropdownMenu height="100px" id="type2" isActive={props.minutesActive}>
          {props.minutesItems &&
            props.minutesItems.map((item) => (
              <DropdownItemContainer
                key={item}
                onClick={() => {
                  onSelectItem(item);
                }}
              >
                <p>{`${item}${props.condition}`}</p>
              </DropdownItemContainer>
            ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

// --- styled-components ---
const DropdownContainer = styled.div`
  width: 100%;
  max-height: 48px;
  text-align: center;
  border: 2px solid gray;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: white;
  margin-right: 8px;
  &:hover {
    cursor: pointer;
    border: 2px solid #fbc037;
  }
`;

const DisabledDropDownContainer = styled.div`
  width: 100%;
  height: 48px;
  text-align: center;
  border: 2px solid gray;
  border-radius: 10px;
  box-sizing: border-box;
<<<<<<< HEAD
  position: relative;
  margin: 0px 2px;

=======
  margin-right: 8px;
>>>>>>> 62fe15b848907859712a3f039833ca682c31efc3
  & > img {
    position: absolute;
    top: 30%;
    right: 6px;
    width: 20px;
    height: 20px;
  }
`;

// 닫힌 부분
const DropdownBody = styled.div`
  align-items: center;
  line-height: 48px;
  color: ${(props) => props.color && props.color};
  position: relative;
  /* display: flex; */
  & > p {
    width: 100%;
    line-height: 44px;
    text-align: center;
  }
  & > img {
    position: absolute;
    top: 10px;
    right: 0px;
    width: 24px;
    height: 24px;
    padding: 0px 6px;
  }
`;

//열린부분 목록
const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  height: ${(props) => props.height};
  overflow-y: scroll;
  background-color: white;
  position: relative;
  border: 2px solid #fbc037;
  border-radius: 10px;
  margin-top: -2px;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    height: 10px;
    border-radius: 100px;
    box-shadow: inset 0 0 10px gray;
  }
`;

//열린부분 각 요소
const DropdownItemContainer = styled.li`
  padding: 5px 0;
`;

export default Dropdown;
