import axios from "axios";

const  instance=axios.create({
    //baseURL:'http://localhost:5001/challenge-7f107/us-central1/api' //THE API (cloud function) URL
    baseURL:"https://us-central1-challenge-7f107.cloudfunctions.net/api"
});

export default instance;
