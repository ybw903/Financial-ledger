import * as React from 'react'
import DropDown from '../DropDown'
import { ArrowButton, MonthTitle, PlusButton } from './index.style'
interface IHeaderBar {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

const HeaderBar: React.FC<IHeaderBar> = (props) => {
  const [isShow, setIsShow] = React.useState<boolean>(false)

  const arrowButtonClickHandler = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsShow((prev) => !prev)
  }
  return (
    <>
      <MonthTitle>
        <div>{props.date.getMonth() + 1}월</div>
        <ArrowButton onClick={arrowButtonClickHandler} />
        <DropDown isShow={isShow} setDate={props.setDate} />
      </MonthTitle>
      <div>
        <PlusButton />
        <div>편집 버튼</div>
      </div>
    </>
  )
}

export default HeaderBar
