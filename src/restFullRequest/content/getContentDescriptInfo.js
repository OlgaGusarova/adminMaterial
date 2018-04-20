import axios from 'axios';
import store from '../../redux/Store';

var getContentDescriptInfo = function (data) {

  axios.get('http://api.rumex.com/api/contents/' + data)
    .then(response => {
      var translations = response.data.translations,
          tableTranslit = JSON.parse(JSON.stringify(translations));

      tableTranslit.map((field) => {
        delete field.body;
      });

      store.dispatch({
        type: 'CONTENT_FIELDS_GET',
        fullData: response.data,
        inner_name: response.data.inner_name ? response.data.inner_name : '',
        sort: response.data.sort ? response.data.sort : '',
        active: response.data.active,
        translations: translations,
        tableTranslit: tableTranslit
      });
    });
};
export default getContentDescriptInfo;
