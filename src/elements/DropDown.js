import React from "react";
import styled from "styled-components";

const Dropdown = (props) => {
  const [day, setDay] = React.useState(props.dayActive);
  const [hour, setHour] = React.useState(props.hourActive);
  const [minutes, setMinutes] = React.useState(props.minutesActive);
  const [item, setItem] = React.useState(null);

  const onActiveToggle = async () => {
    if (props.condition === "") {
      await dayChange();
    } else if (props.condition === "시") {
      await hourChange();
    } else if (props.condition === "분") {
      await minutesChange();
    }
  };

  const dayChange = () => {
    props.setDayActive(!day);
    props.setHourActive(false);
    props.setMinutesActive(false);
  };

  const hourChange = () => {
    props.setDayActive(false);
    props.setHourActive(!hour);
    props.setMinutesActive(false);
  };

  const minutesChange = () => {
    props.setDayActive(false);
    props.setHourActive(false);
    props.setMinutesActive(!minutes);
  };

  const onSelectItem = (name) => {
    setItem(name);
    props.state(name);

    if (day) {
      setDay(!day);
    } else if (hour) {
      setHour(!hour);
    } else if (minutes) {
      setMinutes(!minutes);
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
      {day ? (
        <DropdownMenu id="type2" isActive={day}>
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

      {hour ? (
        <DropdownMenu id="type2" isActive={hour}>
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

      {minutes ? (
        <DropdownMenu id="type2" isActive={minutes}>
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
