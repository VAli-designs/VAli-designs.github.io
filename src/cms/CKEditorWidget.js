/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import CKEditor from '@ckeditor/ckeditor5-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Map } from 'immutable';
import BallonBlockEditor from '@ckeditor/ckeditor5-build-balloon-block';

class CKEditorWidget extends React.Component {
  currentUid = null;

  usedUids = [];

  pathRegistry = {};

  onChange = (event, editor) => {
    let data = editor.getData() || '';
    Object.keys(this.pathRegistry).forEach((url) => {
      data = data.split(`src="${url}"`).join(`src="${this.pathRegistry[url]}"`);
    });
    this.props.onChange(data);
  };

  openMediaLibrary() {
    const { field, onOpenMediaLibrary, value } = this.props;
    this.currentUid = uuidv4();
    this.usedUids.push(this.currentUid);
    return onOpenMediaLibrary({
      controlID: this.currentUid,
      forImage: false,
      privateUpload: field.get('private'),
      value,
      allowMultiple: false,
      config: field.get('media_library', Map()).get('config'),
      field,
    });
  }

  componentDidUpdate() {
    const { mediaPaths, getAsset } = this.props;
    const mediaPath = this.currentUid && mediaPaths.get(this.currentUid);
    if (mediaPath) {
      this.props.onRemoveMediaControl(this.currentUid);
      this.currentUid = null;
      this.editor.model.change((writer) => {
        const { url } = getAsset(mediaPath);
        const imageElement = writer.createElement('image', {
          src: url,
        });

        this.pathRegistry[url] = mediaPath;

        // Insert the image in the current selection location.
        this.editor.model.insertContent(
          imageElement,
          this.editor.model.document.selection,
        );
      });
    }
  }

  componentWillUnmount() {
    this.usedUids.forEach((id) => this.props.onRemoveMediaControl(id));
  }

  render() {
    const {
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      value,
    } = this.props;

    let data = value || '';
    Object.keys(this.pathRegistry).forEach((url) => {
      data = data.split(`src="${this.pathRegistry[url]}"`).join(`src="${url}"`);
    });
    return (
      <div
        className={classNameWrapper}
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          minHeight: 200,
        }}
      >
        <CKEditor
          id={forID}
          editor={BallonBlockEditor}
          onInit={(editor) => {
            this.editor = editor;
          }}
          config={{
            insertImage: {
              openMediaLibrary: () => {
                this.openMediaLibrary();
              },
            },
          }}
          data={data}
          onChange={this.onChange}
          onBlur={() => setInactiveStyle()}
          onFocus={() => setActiveStyle()}
          style={{ outline: 'none' }}
        />
      </div>
    );
  }
}

export default CKEditorWidget;
