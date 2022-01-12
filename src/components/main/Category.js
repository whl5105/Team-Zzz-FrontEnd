import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// --- components ---
import { Icon } from "../../elements/";

// --- images ---
import next from "../../static/images/icon/path_white.png";

const Category = (props) => {
  const history = useHistory();
  return (
    <CategoryStyle
      onClick={() => {
        history.push({
          pathname: `${props.path}`,
          category: `${props.category}`,
        });
      }}
      bannerImage={props.bannerImage}
    >
      <TextBox>
        <div>
          <h2>{props.title}</h2>
          <small>{props.subTitle}</small>
        </div>

        <div>
          <Icon src={next} alt="nextIcon" />
        </div>
      </TextBox>
    </CategoryStyle>
  );
};

const CategoryStyle = styled.div`
  height: 125px;
  border-radius: 12px;
  margin-bottom: ${({ theme }) => theme.margins.xxxxl};
  padding: ${({ theme }) => theme.paddings.xxxxl};
  display: flex;
  box-sizing: border-box;
  background-image: url(${(props) => props.bannerImage});
  background-repeat: no-repeat;
  background-size: cover;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const TextBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export default Category;
