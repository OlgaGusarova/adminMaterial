import update from 'immutability-helper';

const contentReducer = function (state = {}, action) {

  var newState = state;

  switch (action.type) {

    case 'ALL_CONTENT_GET':
      return Object.assign({}, state, {
          contentData: action.contentData
      });

    case 'CONTENT_ACTIVE_CHANGED':
      return Object.assign({}, state, {
        contentData:
          state.contentData.map((prop) => {
            if(prop.id === action.id){
              return Object.assign({}, prop, {
                active: action.active
              });
            }
            return prop;
          })
      });

      case 'CONTENT_TRANSLIT_CHANGED':
      return Object.assign({}, state, {
        tableTranslit: action.tableTranslit,
        translations:
          state.translations.map((prop) => {
            if(prop.code === action.code){
              for (var name in prop){
                prop[name] = action.translations[name];
              }
            }
            return prop;
          })
      });

    case 'CONTENT_FIELD_CHANGED':
      newState = state;
      return Object.assign({}, newState, {
        [action.name]: action.value
      });

    case 'CONTENT_FIELDS_GET':
        return Object.assign({}, state, {
            fullData: action.fullData,
            inner_name: action.inner_name,
            translations: action.translations,
            sort: action.sort,
            active: action.active,
            tableTranslit: action.tableTranslit
        });

    default :
      return {
        ...state,
        fullData: {},
        inner_name: '',
        translations: [],
        active: false,
        contentIsSave: false,
        editedTranslations: [],
        contentData: [],
        sort: '',
        tableTranslit: []
      };
      break;
  }
};
export default contentReducer;
