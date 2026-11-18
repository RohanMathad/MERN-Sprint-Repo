import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: #ffe600ff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`


const Button = () => {
  return (
    <StyledButton>
        
    </StyledButton>
  )
}

export default Button