import './CheckBox.css';

function CheckBox({ checkboxStatus, handleChangeCheckbox }) {

  return (
    <div className="checkbox">
      <label className={`checkbox__wrapper ${checkboxStatus ? "checkbox__wrapper__active" : "checkbox__wrapper__disabled"}`}>
        <input
          type="checkbox"
          onChange={handleChangeCheckbox}
          value={checkboxStatus}
        />
      </label>
      <span className="checkbox__text">Короткометражки</span>
    </div>
  )
}

export default CheckBox;