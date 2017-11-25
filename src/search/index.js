import React, { Component } from 'react'
import ReactTag from 'react-tag-autocomplete'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actionCreators from './action-creators'

import AutoTags from './components/AutoTags';
import Article from '../core/components/Article';
import Carousel from '../core/components/Carousel';

export class SearchPage extends Component {
  constructor(props){
      super(props);

      this.state={

      }

      console.log(this.props.search)

      this.props.actions.search.fetchArticles(15, this.props.search.search.tags)
  }
  componentWillMount(){
      const { category } = this.props.match.params;
  }
  render() {
      const { category } = this.props.match.params;
      const { actions, search, allKeyWords } = this.props

      return (
        <div>
          <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
              <AutoTags
                onTagAdd={actions.search.addTag}
                onTagRemove={actions.search.removeTag}
                tags={search.search.tags}
                suggestions={allKeyWords.map((p) => ({ id: p.id, name: p.word }))} />
              <Article articles={this.props.search.article.articles} />
          </div>
        </div>
      )
  }
}

function mapStateToProps (state) {
  return {
    search: state.search,
    allKeyWords: state.core.keyWords.keyWords
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      search: bindActionCreators(actionCreators, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
