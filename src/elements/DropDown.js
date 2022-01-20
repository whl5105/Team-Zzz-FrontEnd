import React, { useRef, useState } from "react";
import styled from "styled-components";

// --- images ---
import { arrow_B_G } from "../static/images";

const Dropdown = (props) => {
  const [select, setSelect] = useState(null);
  const timeRef = useRef();

  const onActiveToggle = () => {
    const refId = timeRef.current.id;

    if (refId === "AM/PM") {
      colorConversion();
      disabledDopDown("시");
      disabledDopDown("분");
      dayActivition();
    } else if (refId === "시") {
      colorConversion();
      disabledDopDown("AM/PM");
      disabledDopDown("분");
      hourActivition();
    } else if (refId === "분") {
      colorConversion();
      disabledDopDown("AM/PM");
      disabledDopDown("시");
      minutesActivition();
    }
  };

  const colorConversion = () => {
    const borderColor = timeRef.current.style.borderColor;

    if (borderColor === "rgb(251, 192, 55)") {
      timeRef.current.style = "border-color: gray;";
    } else {
      timeRef.current.style = "border-color: #fbc037;";
    }
  };

  const disabledDopDown = (id) => {
    document.getElementById(id).style.borderColor = "gray";
  };

  const dayActivition = () => {
    props.setDayActive(!props.dayActive);
    props.setHourActive(false);
    props.setMinutesActive(false);
  };

  const hourActivition = () => {
    props.setDayActive(false);
    props.setHourActive(!props.hourActive);
    props.setMinutesActive(false);
  };

  const minutesActivition = () => {
    props.setDayActive(false);
    props.setHourActive(false);
    props.setMinutesActive(!props.minutesActive);
  };

  const onSelectItem = (name) => {
    setSelect(name);
    props.state(name);

    if (props.dayActive) {
      props.setDayActive(!props.dayActive);
      timeRef.current.style = "border-color: gray;";
    } else if (props.hourActive) {
      props.setHourActive(!props.hourActive);
      timeRef.current.style = "border-color: gray;";
    } else if (props.minutesActive) {
      props.setMinutesActive(!props.minutesActive);
      timeRef.current.style = "border-color: gray;";
    }
  };

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

  return (
    <DropdownContainer
      id={`${props.condition === "" ? "AM/PM" : props.condition}`}
      ref={timeRef}
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

const DropdownContainer = styled.div`
  width: 100%;
  max-height: 48px;
  text-align: center;
  border: 2px solid
    ${(props) => (props.borderColor ? props.borderColor : "gray")};
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
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
  &:last-child {
    margin-right: 0px;
  }
  & > img {
    position: absolute;
    top: 30%;
    right: 6px;
    width: 20px;
    height: 20px;
  }

  &:last-child {
    margin-right: 0px;
  }
`;

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

const DropdownItemContainer = styled.li`
  padding: 5px 0;
`;

export default Dropdown;
