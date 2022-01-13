import React from "react";
import styled from "styled-components";

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
          <Content>{`${props.title}${props.condition}`}</Content>
        </DropdownBody>
      </DisabledDropDownContainer>
    );
  }

  // 알림 활성화일 때
  return (
    <DropdownContainer className="dropdown">
      <DropdownBody onClick={onActiveToggle}>
        {item ? (
          <>
            <Content>{`${item}${props.condition}`}</Content>
          </>
        ) : (
          <>
            <Content>{`${props.title}${props.condition}`}</Content>
          </>
        )}
      </DropdownBody>
      {props.dayActive ? (
        <DropdownMenu height="70px" id="type2" isActive={props.dayActive}>
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
      ) : null}

      {props.hourActive ? (
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
      ) : null}

      {props.minutesActive ? (
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
      ) : null}
    </DropdownContainer>
  );
};

// --- styled-components ---
const DropdownContainer = styled.div`
  width: 93px;
  height: 48px;
  /* margin-top: 20px; */
  text-align: center;
  border: 1.5px solid gray;
  border-radius: 10px;
  display: absolute;
  box-sizing: border-box;
  background-color: white;

  &:hover {
    cursor: pointer;
    border: 2px solid #fbc037;
  }
`;

const DisabledDropDownContainer = styled.div`
  width: 93px;
  height: 48px;
  text-align: center;
  border: 1.5px solid gray;
  border-radius: 10px;
  display: absolute;
  box-sizing: border-box;
`;

const DropdownBody = styled.div`
  align-items: center;
  margin-top: "-5px";
  color: ${(props) => props.color && props.color};
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  width: 90px;
  height: ${(props) => props.height};
  overflow: scroll;
  background-color: white;
  position: absolute;
  margin-top: 12px;
  margin-left: -3px;
  border: 2px solid #fbc037;
  border-radius: 10px;
  overflow-x: hidden; // 가로 축 스크롤 감추기
  display: absolute;

  &::-webkit-scrollbar {
    /*  스크롤바 막대 너비 설정 */
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    /* 스크롤바 막대 높이 설정 : 현재가 제일 작은 값 */
    height: 10px;
    border-radius: 100px;
    box-shadow: inset 0 0 10px gray;
  }
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  margin-left: 31px;
  margin-top: 10px;

  &:last-child {
    border-bottom: none;
  }
`;

const Content = styled.p`
  margin-top: 12px;
`;

export default Dropdown;
