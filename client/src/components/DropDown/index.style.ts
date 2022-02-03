import styled from 'styled-components'

interface IDropDownList {
  isShow: boolean
}

export const DropDownList = styled.div<IDropDownList>`
  position: absolute;
  top: 70px;
  display: ${(props) => (props.isShow ? 'block' : 'none')};
  min-width: 200px;
  font-weight: 500;
  background-color: #fcfcfc;
  border-radius: 8px;
  height: 160px;
  overflow-y: auto;
  box-shadow: 0px 0px 10px 3px rgba(190, 190, 190, 0.6);
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: rgb(194, 194, 194);
  }
`
export const DropDownElemnt = styled.div`
  color: rgb(37, 37, 37);
  font-size: 14px;
  padding: 12px 20px;
  &:hover {
    background-color: rgb(226, 226, 226);
  }
`
