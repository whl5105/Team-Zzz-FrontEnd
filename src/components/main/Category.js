import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Icon } from "../../elements/index";

import { arrow_R_W } from "../../static/images/index";

const Category = (props) => {
  const history = useHistory();
  const { bannerImage, category, path, subTitle, title } = props;

  return (
    <CategoryStyle
      onClick={() => {
        history.push({
          pathname: `${path}`,
          category: `${category}`,
        });
      }}
      bannerImage={bannerImage}
    >
      <TextBox>
        <div>
          <h2>{title}</h2>
          <small>{subTitle}</small>
        </div>

        <div>
          <Icon src={arrow_R_W} alt="nextIcon" />
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
