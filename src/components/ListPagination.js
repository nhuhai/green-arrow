import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SET_PAGE } from '../constants/actionTypes';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: SET_PAGE, page, payload })
});

class ListPagination extends Component {
  setPage(page) {
    const { pager, onSetPage } = this.props;

    if (pager) {
      onSetPage(page, pager(page));
    }
  }

  render() {
    const { articlesCount, currentPage } = this.props;

    if (articlesCount <= 10) {
      return null;
    }

    const pagesCount = [];
    for (let i = 0; i < Math.ceil(articlesCount/10); i++) {
      pagesCount.push(i);
    }

    return (
      <nav>
        <ul className='pagination'>
          {
            pagesCount.map(page => {
              const isCurrent = page === currentPage;
              const onClick = event => {
                event.preventDefault();
                this.setPage(page);
              };

              return (
                <li
                  className= {isCurrent ? 'page-item active' : 'page-item'}
                  onClick={onClick}
                  key={page.toString()}>
                  <a className='page-link' href=''>{page + 1}</a>
                </li>
              );
            })
          }
        </ul>
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPagination);
