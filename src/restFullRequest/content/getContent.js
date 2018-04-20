import axios from 'axios';
import store from '../../redux/Store';

var getContent = function() {
  axios.get('http://api.rumex.com/api/contents')
    .then(response => {
      store.dispatch({
        type: 'ALL_CONTENT_GET',
        contentData: response.data
      })
    });
};

export default getContent;