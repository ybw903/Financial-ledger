import { useMemo } from 'react'
import { DropDownElemnt, DropDownList } from './index.style'

interface IDropDown {
  isShow: boolean
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

const DropDown = ({ isShow, setDate }: IDropDown) => {
  const date = new Date()
  const beforeDate = Array.from(
    { length: 42 },
    (v, i) => new Date(date.getFullYear(), date.getMonth() - i)
  )

  const dropDownElementClickHandler = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    nextDate: Date
  ) => {
    setDate((prev) => nextDate)
  }
  return (
    <DropDownList isShow={isShow}>
      {beforeDate.map((v, i) => (
        <DropDownElemnt
          key={i}
          onClick={(evt) => dropDownElementClickHandler(evt, v)}
        >
          {v.getFullYear()}년 {v.getMonth() + 1}월
        </DropDownElemnt>
      ))}
    </DropDownList>
  )
}

export default DropDown
