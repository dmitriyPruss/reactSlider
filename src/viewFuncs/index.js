import constants from '../constants';

/**
 *
 * @param {string} name
 * @param {string} prop
 * @param {string} timeValue
 * @returns Promise
 */
function showMainItem (name, prop, timeValue) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.setState({ [name]: prop });
      resolve(true);
    }, timeValue);
  });
}

/**
 *
 * @param {object} obj
 */
export function strRender (obj) {
  const { name, price, image } = obj;

  this.setState({
    mainName: '',
    mainPrice: '',
    mainImage: constants.MAIN_IMAGE,
  });

  const timeout = constants.DEFAULT_TIMEOUT;
  const showImg = showMainItem.bind(this, 'mainImage', image, timeout);
  const showName = showMainItem.bind(this, 'mainName', name, timeout / 2);
  const showPrice = showMainItem.bind(this, 'mainPrice', price, timeout / 2);

  const strPromise = async () => {
    const res = await showImg();
    return res;
  };

  strPromise()
    .then(async result => {
      const { mainName } = this.state;
      const res = await showName();
    })
    .then(async result => {
      const { mainPrice } = this.state;
      const res = await showPrice();
    });
}
