import { useMemo } from 'react'
import { DropDownElemnt, DropDownList } from './index.style'

interface IDropDown {
  isShow: boolean
}

const DropDown = ({ isShow }: IDropDown) => {
  const date = new Date()
  const beforeDate = Array.from(
    { length: 42 },
    (v, i) => new Date(date.getFullYear(), date.getMonth() - i)
  )
  return (
    <DropDownList isShow={isShow}>
      {beforeDate.map((v, i) => (
        <DropDownElemnt key={i}>
          {v.getFullYear()}년 {v.getMonth() + 1}월
        </DropDownElemnt>
      ))}
    </DropDownList>
  )
}

export default DropDown
