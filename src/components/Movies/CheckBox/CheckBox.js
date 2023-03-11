import './CheckBox.css';
import {useState} from "react";

function CheckBox() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="checkbox">
      <span className="checkbox__text">Короткометражки</span>
      <button
          className={`checkbox__btn ${isActive ? "checkbox__btn__active" : "checkbox__btn__disabled"}`}
          type="button"
          onClick={() => {setIsActive(!isActive)}}
      />
    </div>
  )
}

export default CheckBox;