import axios from 'axios';
const RECAPTCHA = "http://notifyme-back-end.herokuapp.com/isHuman";
const URL = 'http://notifyme-back-end.herokuapp.com/user';

const instance = axios.create({
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
  });

export const validateReCaptcha = (value) => {
    axios.get(RECAPTCHA + `/${value}`).then((res) => {
        return res.data.success;
    }).catch((error) => {
        console.error(error);
        return false;
    });
};

export const postData = (data) => {
    instance.post(URL, data).then((res) => {
        if (res.status === 200)
            alert(`NO Slots Available currently we will notify you once available...Thank You.`);
        else if (res.status === 201) {
            if (res.data.message) {
                alert(`${res.data.message}`);
            }
            else {
                alert(``);
            }
        }
    }).catch((error) => {
        console.error(error);
    })
}
