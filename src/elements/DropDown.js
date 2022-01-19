import React from "react";
import styled from "styled-components";

// --- images ---
import { arrow_B_G } from "../static/images";

const Dropdown = (props) => {
  const [select, setSelect] = React.useState(null);

  const onActiveToggle = () => {
    const am_pm = document.getElementById("AM/PM");
    const day = document.getElementById("시");
    const hour = document.getElementById("분");
    const currentStatus = props.condition;

    if (currentStatus === "") {
      if (am_pm.style.borderColor === "rgb(251, 192, 55)") {
        am_pm.style.borderColor = "gray";
      } else {
        am_pm.style.borderColor = "#fbc037";
      }
      day.style.borderColor = "gray";
      hour.style.borderColor = "gray";

      dayChange();
    } else if (currentStatus === "시") {
      am_pm.style.borderColor = "gray";
      if (day.style.borderColor === "rgb(251, 192, 55)") {
        day.style.borderColor = "gray";
      } else {
        day.style.borderColor = "#fbc037";
      }
      hour.style.borderColor = "gray";

      hourChange();
    } else if (currentStatus === "분") {
      am_pm.style.borderColor = "gray";
      day.style.borderColor = "gray";
      if (hour.style.borderColor === "rgb(251, 192, 55)") {
        hour.style.borderColor = "gray";
      } else {
        hour.style.borderColor = "#fbc037";
      }

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
    setSelect(name);
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
          <img src={arrow_B_G} alt="" />
        </DropdownBody>
      </DisabledDropDownContainer>
    );
  }

  // 알림 활성화일 때
  return (
    <DropdownContainer
      id={`${props.condition === "" ? "AM/PM" : props.condition}`}
    >
      <DropdownBody>
        {select ? (
          <>
            <p>{`${select}${props.condition}`}</p>
            <img onClick={onActiveToggle} src={arrow_B_G} alt="" />
          </>
        ) : (
          <>
            <p>{`${props.title}${props.condition}`}</p>
            <img onClick={onActiveToggle} src={arrow_B_G} alt="" />
          </>
        )}
      </DropdownBody>
      {props.dayActive && (
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
  border: 2px solid
    ${(props) => (props.borderColor ? props.borderColor : "gray")};
  border-radius: 10px;
  box-sizing: border-box;
  background-color: white;
  margin-right: 8px;
  &:last-child {
    margin-right: 0px;
  }
`;

const DisabledDropDownContainer = styled.div`
  width: 100%;
  height: 48px;
  text-align: center;
  color: gray;
  border: 2px solid gray;
  border-radius: 10px;
  box-sizing: border-box;
  margin-right: 8px;

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
  position: relative;

  & > p {
    width: 100%;
    line-height: 44px;
    text-align: center;
  }
  & > img {
    position: absolute;
    top: 15px;
    right: 0px;
    width: 20px;
    height: 20px;
    padding: 0px 4px;
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
