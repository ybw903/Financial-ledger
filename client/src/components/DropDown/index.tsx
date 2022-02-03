import { DropDownElemnt, DropDownList } from './index.style'

interface IDropDown {
  isShow: boolean
}

const DropDown = ({ isShow }: IDropDown) => {
  return (
    <DropDownList isShow={isShow}>
      <DropDownElemnt>test1</DropDownElemnt>
      <DropDownElemnt>test2</DropDownElemnt>
      <DropDownElemnt>test3</DropDownElemnt>
    </DropDownList>
  )
}

export default DropDown
