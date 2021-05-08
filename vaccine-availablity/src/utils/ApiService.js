import axios from 'axios';
const RECAPTCHA = window.location.origin + "/isHuman";
const VISITOR_DATA  = window.location.origin +'/user';
export const  validateReCaptcha = (value) =>{
    axios.get(RECAPTCHA+`/${value}`).then((res)=>{
        return res.data.success;
    }).catch((error)=>{
        console.error(error);
        return false;
    });
};

export const postData = (data) =>{
    axios.post(VISITOR_DATA,data).then((res)=>{
        if(res.status === 200)
            alert(`NO Slots Available currently we will notify you once available...Thank You.`);
        else if(res.status === 201){
            if(res.data.message){
                alert(`${res.data.message}`);
            }
            else{
                alert(``);
            }
        }
    }).catch((error)=>{
        console.error(error);
    })
}
