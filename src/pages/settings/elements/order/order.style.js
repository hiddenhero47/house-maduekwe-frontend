import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const AddressWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	font-family: Outfit;
    margin-top: 25px;
    animation: ${fadeUp} 0.4s ease;

	.heading {
		font-size: 18px;
		font-weight: 400;
		line-height: 27.7px;
		letter-spacing: -0.4710937738418579px;
		text-align: center;
		padding-left: 20px;

        display: flex;
        align-items: center;
        gap: 5px;
	}
`;

export const TableWrapper = styled.div`
	width: 100%;
	margin-top: 40px;
`;
