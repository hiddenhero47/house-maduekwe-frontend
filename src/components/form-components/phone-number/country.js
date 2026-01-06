import styled from "styled-components";

export const CustomSelectContainer = styled.div`
  width: fit-content;
  max-width: 200px;
`;

export const CustomSelectValue = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  gap: 5px;

  .arrow {
		transition: all 0.4s;
		cursor: pointer;
		pointer-events: none;
		color: ${({ theme }) => theme?.form.sbText};
	}
`;

export const MenuDialog = styled.dialog.withConfig({
	shouldForwardProp: (prop) => prop !== 'closedBy',
})`
	padding-top: 10px;
	padding-bottom: 15px;
	padding-inline: 5px;
	position: absolute;
	top: 110%;
	width: 100%;
	max-height: 200px;
	margin-inline: auto;
	border: 1px solid ${({ theme }) => theme?.form.menuBorder};
	border-radius: 5px;
	display: ${({ $open }) => ($open ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	z-index: 1;
	background-color: ${({ theme }) => theme?.form.menuBg};
	transition: all 0.4s;
	color: ${({ theme }) => theme?.form.menuText};

	.wrapper {
		flex: 1;
		width: 100%;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 3px;
			height: 3px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgb(166, 171, 183, 0.7);
			border-radius: 40px;
		}
		&::-webkit-scrollbar-track {
			background-color: transparent;
		}
	}
`;

export const Option = styled.div`
  width: 97%;
  border-radius: 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: Outfit;
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  color: ${(props) =>
    props.selected
      ? (theme) => theme?.formInput?.optionHoverTx
      : (theme) => theme?.formInput?.menuTx};
  padding: 3px 10px;
  gap: 5px;
  background: ${(props) =>
    props.selected
      ? (theme) => theme?.formInput?.optionHoverBg
      : "transparent"};

  &:hover {
    background: ${({ theme }) => theme?.formInput?.optionHoverBg};
    color: ${({ theme }) => theme?.formInput?.optionHoverTx};
  }

  .imageContainer {
    height: 20px;
    width: 20px;
  }
`;

export const ImageHolder = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
  }
`;

export const SearchBox = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme?.formInput?.borderColor};
  transition: border-color 0.1s;
  padding: 7px 12px;
  margin-bottom: 8px;

  &:focus-within {
    border-color: ${({ theme }) => theme?.formInput?.borderColor};
  }

  button {
    color: ${({ theme }) => theme?.formInput?.placeholder};
    padding: 0;
    border: 0 solid transparent;
    background-color: transparent;
  }

  .myInput {
    padding: 0;
    width: 93%;
    background-color: transparent;
    font-family: Outfit;
    font-size: 14px;
    font-weight: 400;
    line-height: 12px;
    letter-spacing: 0em;
    color: ${({ theme }) => theme?.formInput?.color};

    &::placeholder {
      color: ${({ theme }) => theme?.formInput?.placeholder};
    }

    &:focus {
      outline: none;
      border-color: transparent;
    }
  }

  @media (min-width: 745px) and (max-width: 860px) {
    max-width: 100%;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
`;
