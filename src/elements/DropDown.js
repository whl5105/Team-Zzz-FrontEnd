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
          <ItemName>{`${props.title}${props.condition}`}</ItemName>
        </DropdownBody>
      </DisabledDropDownContainer>
    );
  }

  // 알림 활성화일 때
  return (
    <DropdownContainer>
      <DropdownBody onClick={onActiveToggle}>
        {item ? (
          <>
            <ItemName>{`${item}${props.condition}`}</ItemName>
          </>
        ) : (
          <>
            <DropdownSelect>{`${props.title}${props.condition}`}</DropdownSelect>
          </>
        )}
      </DropdownBody>
      {props.dayActive ? (
        <DropdownMenu id="type2" isActive={props.dayActive}>
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
        <DropdownMenu id="type2" isActive={props.hourActive}>
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
        <DropdownMenu id="type2" isActive={props.minutesActive}>
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

const DropdownContainer = styled.div`
  width: 100px;
  margin: auto;
  text-align: center;
  border: 1px solid gray;

  /* &:hover {
    cursor: pointer;
    border: 3px solid #fbc037;
    border-radius: 10px;
  } */
`;

const DisabledDropDownContainer = styled.div`
  width: 100px;
  margin: auto;
  text-align: center;
  border: 1px solid gray;
`;

const DropdownBody = styled.div`
  align-items: center;
  color: ${(props) => props.color && props.color};
`;

const DropdownSelect = styled.p`
  font-weight: bold;
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  width: 60px;
  max-height: 200px;
  overflow: scroll;
  background-color: white;
  position: absolute;
  margin-top: -1px;
  margin-left: -3px;
  border: 3px solid #fbc037;
  border-radius: 10px;
  overflow-x: hidden; // 가로 축 스크롤 감추기
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  margin-left: -5px;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.p`
  font-weight: bold;
`;

export default Dropdown;
