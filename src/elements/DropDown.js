import React from "react";
import styled from "styled-components";

const Dropdown = (props) => {
  const [isActive, setIsActive] = React.useState(false);
  const [item, setItem] = React.useState(null);

  const onActiveToggle = () => {
    setIsActive(!isActive);
  };

  const onSelectItem = (name) => {
    setItem(name);
    props.state(name);
    setIsActive(false);
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
      <DropdownMenu id="type2" isActive={isActive}>
        {props.dropdownItems &&
          props.dropdownItems.map((dropdowmItem) => (
            <DropdownItemContainer
              key={dropdowmItem}
              onClick={() => {
                onSelectItem(dropdowmItem);
              }}
            >
              <p>{`${dropdowmItem}${props.condition}`}</p>
            </DropdownItemContainer>
          ))}
      </DropdownMenu>
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
