import axios from 'axios';
const RECAPTCHA ='http://localhost:4000/isHuman'// "https://notifyme-back-end.herokuapp.com/isHuman";
const URL = 'https://notifyme-back-end.herokuapp.com/user';

const instance = axios.create({
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
  });

export const validateReCaptcha = (value) => {
    let result = false;
    axios.post(RECAPTCHA + `?key=${value}`).then((res) => {
        if(res.status === 200){
            result =  res.data;
        }
    }).catch((error) => {
        console.error(error);
        result =  false;
    }).finally(()=>{
        return result
    })
};

export const postData = (data) => {
    instance.post(URL, data).then((res) => {
        if (res.status === 200)
            alert(`Successfully submitted!!! we'll send you a mail when the vaccine is available in your region.`);
        else if (res.status === 201) {
            if (res.data.message) {
                alert(`${res.data.message}`);
            }
            else {
                alert(`Unable to submit data. please try again in sometime`);
            }
        }
    }).catch((error) => {
        console.error(error);
    })
}
