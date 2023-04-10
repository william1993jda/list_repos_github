import styled from "styled-components";

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 0 30px;
    margin: 80px auto;

`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }
`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;

        & + li {
            margin-top: 12px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #0D2636;
        }

        div {
            flex: 1;
            margin-left: 12px;

            p {
                margin-top: 10px;
                font-size: 12px;
                color: #000;
            }
        }

        strong {
            font-size: 15px;

            a {
                text-decoration: none;
                color: #222;
                transform: 0.3s;

                &:hover {
                    color: #0071db;
                }
            }

            span {
                background-color: #222;
                color: #fff;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                padding: 4px 7px;
                margin-left: 10px;
            }
        }
    }
`;

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        background-color: #222;
        border-radius: 4px;
        display: flex;
        align-items: center;
        color: #fff;
        margin-bottom: 10px;
        padding: 5px 5px;
        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.8);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        .loading-circle {
            animation: rotation 1s infinite linear;
        }
        @keyframes rotation {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
`;

export const NavigateBack = styled.button`
    background-color: #222;
    font-weight: 600;
    padding-right: 10px;
    border-radius: 4px;
    border: 0;
    color: #fff;
    display: flex;
    align-items: center;
    outline: 0;
    transition: filter 0.2s;
        
    &:hover {
        filter: brightness(0.8);
    }
`;

export const FilterList = styled.div`
    margin: 15px 0;

    button {
        outline: 0;
        border: 0;
        border-radius: 4px;
        padding: 8px;
        margin: 0 3px;
        transition: filter 0.2s;
        &:nth-child(${props => props.active + 1}) {
            background-color: #0071db;
            color: #fff;
        }
        
        &:hover {
            filter: brightness(0.8);
        }
    }
`;