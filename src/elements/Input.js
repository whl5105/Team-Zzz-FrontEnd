import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    resetInput,
    placeholder,
    onChange,
    onClick,
    name,
    value,
    type,
    src,
    alt,
    height,
    disabled,
    marginT,
    max,
  } = props;

  const styles = {
    height: height,
    marginT: marginT,
  };

  if (resetInput) {
    return (
      <>
        <InputGrop {...styles}>
          <InputBox
            {...styles}
            placeholder={placeholder}
            type={type}
            maxLength={max}
            name={name}
            value={value}
            onChange={onChange}
          ></InputBox>
          <img src={src} alt={alt} name={name} onClick={onClick} />
        </InputGrop>
      </>
    );
  }

  if (disabled) {
    return (
      <InputGropDisabled {...styles}>
        <InputBox
          {...styles}
          placeholder={placeholder}
          type={type}
          maxLength={max}
          name={name}
          value={value}
          onChange={onChange}
          disabled
        />
      </InputGropDisabled>
    );
  }

  return (
    <React.Fragment>
      <InputGrop {...styles}>
        <InputBox
          {...styles}
          placeholder={placeholder}
          type={type}
          maxLength={max}
          name={name}
          value={value}
          onChange={onChange}
        />
      </InputGrop>
    </React.Fragment>
  );
};

Input.defaultProps = {
  placeholder: "텍스트를 입력해주세요.",
  type: "",
  name: "",
  value: "",
  max: null,
  onChange: () => {},
  onClick: () => {},
  height: "60px",
};

const InputGrop = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  border: 1px solid ${({ theme }) => theme.colors.main_1};
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  ${(props) => (props.marginT ? `margin-top : ${props.marginT}` : ``)};

  & img {
    width: 20px;
    height: 20px;
    margin: auto;
    padding-right: 20px;
  }
`;

const InputBox = styled.input`
  width: 100%;
  height: ${(props) => props.height};
  padding: 0 ${({ theme }) => theme.margins.xxxxl};
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 0.875rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

const InputGropDisabled = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  border: 1px solid ${({ theme }) => theme.colors.gray_3};
  background-color: ${({ theme }) => theme.colors.gray_1};
  color: ${({ theme }) => theme.colors.gray_6};
  margin-top: ${({ theme }) => theme.margins.xxxxl};
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
`;
export default Input;
