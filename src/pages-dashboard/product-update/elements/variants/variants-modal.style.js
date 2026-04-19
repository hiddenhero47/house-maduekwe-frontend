import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100%;
	background: var(--mainBody-container);
	border-radius: 12px;
	padding: 20px;
	border: 1px solid var(--mainBody-line);
`;

export const Header = styled.div`
	margin-bottom: 16px;

	h3 {
		font-size: 18px;
		font-weight: 700;
		color: var(--mainBody-text);
	}

	p {
		font-size: 13px;
		color: var(--mainBody-sbText);
	}
`;

export const AddRow = styled.div`
	display: flex;
	gap: 10px;
	margin-bottom: 20px;

	select {
		flex: 1;
		padding: 8px;
		border: 1px solid var(--mainBody-line);
		background: var(--mainBody-card);
		color: var(--mainBody-text);
	}

	button {
		padding: 8px 14px;
		background: var(--mainBody-toolkitBg);
		border-radius: 6px;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 10px;
	border: 1px solid var(--mainBody-line);
	border-radius: 8px;
`;

export const Primary = styled.div`
	min-width: 100px;
	font-weight: 600;
`;

export const Options = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	flex: 1;
`;

export const Option = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;

	input {
		width: 60px;
		padding: 4px;
	}
`;

export const DeleteBtn = styled.button`
	color: red;
`;

export const Footer = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: flex-end;

	button {
		color: red;
		font-size: 13px;
	}
`;

export const Empty = styled.div`
	font-size: 13px;
	opacity: 0.6;
`;
