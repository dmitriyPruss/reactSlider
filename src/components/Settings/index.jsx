import React from 'react';
import constants from '../../constants';
import styles from './../Slides/Slides.module.scss';

/**
 *
 * @param {object} props
 * @returns JSX.Element
 */
function Settings (props) {
  const {
    settings: { rangeValue },
    changeRange,
    changeTheme,
  } = props;

  const forest = constants.FOREST_THEME;
  const sky = constants.SKY_THEME;

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settings}>
        <label className={styles.settingElement}>
          <span>Set theme:</span>
          <select onChange={changeTheme}>
            <option>Choose theme...</option>
            <option value={forest}>Forest</option>
            <option value={sky}>Sky</option>
          </select>
        </label>
        <label className={styles.settingElement}>
          <span>Set Timeout range: {rangeValue}</span>
          <input
            type='range'
            min={1}
            max={10}
            value={rangeValue}
            onChange={changeRange}
          />
        </label>
      </div>
    </div>
  );
}

export default Settings;
