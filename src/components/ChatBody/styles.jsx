import styled from "styled-components";
import image from '../../assets/image.webp'

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-image: url(${image});
    color:"#fff";
    overflow-y: scroll;   

    ::-webkit-scrollbar{
        width: 0;
    }

`