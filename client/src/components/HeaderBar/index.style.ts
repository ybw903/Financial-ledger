import styled from 'styled-components'

export const MonthTitle = styled.div`
  display: flex;
`
export const ArrowButton = styled.div`
  &:after {
    content: '';
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 0.1rem solid #333;
    border-right: 0.1rem solid #333;
    transform: rotate(45deg);
    cursor: pointer;
  }
`

export const PlusButton = styled.div`
  &:after {
    content: '';
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    margin-top: 0.8rem;
    border-top: 0.2rem solid #333;
    border-left: 0.2rem solid #333;
    cursor: pointer;
  }
  &::before {
    content: '';
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    margin-bottom: 0.8rem;
    border-bottom: 0.2rem solid #333;
    border-right: 0.2rem solid #333;
    cursor: pointer;
  }
`
