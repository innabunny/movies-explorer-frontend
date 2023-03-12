import './CheckBox.css';
import {useState} from "react";

function CheckBox() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="checkbox">
      <button
          className={`checkbox__btn ${isActive ? "checkbox__btn__active" : "checkbox__btn__disabled"}`}
          type="button"
          onClick={() => {setIsActive(!isActive)}}
      />
      <span className="checkbox__text">Короткометражки</span>
    </div>
  )
}

export default CheckBox;