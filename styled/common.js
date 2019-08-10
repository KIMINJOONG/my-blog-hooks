import styled from 'styled-components';

export const ContentHeader = styled.div`
    width: 100%;
    margin-bottom: 10px;

    & div {
        display: inline-block;
    }

    & .topContainer {
        width: 80%;
    }

    & .menuContainer {
        width: 20%;
        text-align: right;
    }

    & p {
        font-family: SegoeUI;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
        text-align: left;
        color: #707070;
    }

    & .top {
        font-size: 20px;
    }

    & .menu {
        text-align: left;
    }
`;

