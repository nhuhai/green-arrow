import React, { Component } from 'react';
import { connect } from 'react-redux';
import agent from '../agent';
import {
  ADD_TAG,
  REMOVE_TAG,
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
  ARTICLE_SUBMITTED
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED , payload }),
  onUnload: () =>
    dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload })
});

class Editor extends Component {
  changeTitle(event) {
    this.props.onUpdateField('title', event.target.value);
  }

  changeDescription(event) {
    this.props.onUpdateField('description', event.target.value);
  }

  changeBody(event) {
    this.props.onUpdateField('body', event.target.value);
  }

  changeTagInput(event) {
    this.props.onUpdateField('tagInput', event.target.value);
  }

  watchForEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.onAddTag();
    }
  }

  removeTagHandler(tag) {
    return () => this.props.onRemoveTag(tag);
  }

  submitForm(event) {
    event.preventDefault();

    const { title, description, body, tagList } = this.props;
    const article = { title, description, body, tagList };

    const slug = { slug : this.props.articleSlug };
    const promise = this.props.articleSlug ?
      agent.Articles.update(Object.assign(article, slug)) :
      agent.Articles.create(article);

    this.props.onSubmit(promise);
  }

  // componentWillReceiveProps(nextProps) {
  //   const currentSlug = this.props.match.params.slug;
  //   const newSlug = nextProps.match.params.slug;

  //   console.log('currentSlug: ' + currentSlug);
  //   console.log('newSlug: ' + newSlug);

  //   if (currentSlug !== newSlug) {
  //     if (newSlug) {
  //       this.props.onUnload();
  //       return this.props.onLoad(agent.Articles.get(currentSlug));
  //     }

  //     this.props.onLoad();
  //   }
  // }

  componentWillMount() {
    const slug = this.props.match.params.slug;

    if (slug) {
      this.props.onLoad(agent.Articles.get(slug));
    } else {
      this.props.onLoad();
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className='editor-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 col-xs12'>

              <form>
                <fieldset>
                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='Article Title'
                      value={this.props.title}
                      onChange={this.changeTitle.bind(this)} />
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription.bind(this)} />
                  </fieldset>

                  <fieldset className='form-group'>
                    <textarea
                      className='form-control'
                      rows='8'
                      placeholder='Write you article (in markdown)'
                      value={this.props.body}
                      onChange={this.changeBody.bind(this)}>
                    </textarea>
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Enter tags'
                      value={this.props.tagInput}
                      onChange={this.changeTagInput.bind(this)}
                      onKeyUp={this.watchForEnter.bind(this)} />

                    <div className='tag-list'>
                      {
                        this.props.tagList.map(tag => {
                          return (
                            <span className='tag-default tag-pill' key={tag}>
                              <i className='ion-close-round'
                                onClick={this.removeTagHandler(tag)}>
                              </i>
                              {tag}
                            </span>
                          )
                        })
                      }
                    </div>
                  </fieldset>

                  <button
                    className='btn btn-lg pull-xs-right btn-primary'
                    type='button'
                    disabled={this.props.inProgress}
                    onClick={this.submitForm.bind(this)}>
                    {this.props.articleSlug ? 'Update Article' : 'Publish Article'}
                  </button>

                </fieldset>

              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
