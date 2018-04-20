import update from 'immutability-helper';

const contentReducer = function (state = {}, action) {

  var newState = state;

  switch (action.type) {

    case 'ALL_CONTENT_GET':
      newState = state;
      newState = update(newState, {
        contentData: {
          $set: action.contentData,
        }
      });
      return newState;
      break;

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
      newState = state;
      newState = update(newState, {
        fullData: {
          $set: action.fullData
        },
        inner_name: {
          $set: action.inner_name
        },
        translations: {
          $set: action.translations
        },
        sort: {
          $set: action.sort
        },
        active: {
          $set: action.active
        },
        tableTranslit: {
          $set: action.tableTranslit
        }
      });

      return newState;
      break;

    case 'CONTENT_EDITED':
      newState = state;
      newState = update(newState, {
        contentIsSave: {
          $set: !newState.contentIsSave
        }
      });
      return newState;
      break;

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
