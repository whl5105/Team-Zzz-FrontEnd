import React from "react";
import styled from "styled-components";

const Dropdown = (props) => {
  const [isActive, setIsActive] = React.useState(false);
  const [item, setItem] = React.useState(null);

  const onActiveToggle = () => {
    setIsActive((prev) => !prev);
  };

  const onSelectItem = (name) => {
    setItem(name);
    setIsActive(false);
  };

  return (
    <DropdownContainer>
      <DropdownBody onClick={onActiveToggle}>
        {item ? (
          <>
            <ItemName>{item}</ItemName>
          </>
        ) : (
          <>
            <DropdownSelect>{props.title}</DropdownSelect>
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
              <p>{dropdowmItem}</p>
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

  &:hover {
    cursor: pointer;
  }
`;

const DropdownBody = styled.div`
  align-items: center;
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
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  margin-left: -3px;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.p`
  font-weight: bold;
`;

export default Dropdown;
