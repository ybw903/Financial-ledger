import { DropDownList } from './index.style'

interface IDropDown {
  isShow: boolean
}

const DropDown = ({ isShow }: IDropDown) => {
  return (
    <DropDownList isShow={isShow}>
      <li>test1</li>
      <li>test2</li>
      <li>test3</li>
    </DropDownList>
  )
}

export default DropDown
