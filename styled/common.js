import styled from 'styled-components';

export const ContentHeaderContainer = styled.div`
    width: 100%;

    & div {
        display: inline-block;
    }

    & .topContainer {
        width: 80%;
    }

    & .contentContainer {
        width: 100%;
        border-top: 1px solid #066306;
        border-bottom: 1px solid #cecece;

        & .title {
            width: 80%;

        }
        & .date {
            width: 20%;
        }

        & p {
            text-align: center;
        }
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

`;



