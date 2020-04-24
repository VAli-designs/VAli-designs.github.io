import CMS from 'netlify-cms-app';
import CKEditorWidget from './CKEditorWidget';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import '!style-loader!css-loader!./editor.css';

CMS.registerWidget('richtext', CKEditorWidget);
