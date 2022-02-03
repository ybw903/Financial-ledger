import styled from 'styled-components'

interface IDropDownList {
  isShow: boolean
}

export const DropDownList = styled.div<IDropDownList>`
  position: absolute;
  top: 66px;
  display: ${(props) => (props.isShow ? 'block' : 'none')};
  box-shadow: 10px 10px 25px gray;
`
