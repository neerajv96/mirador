import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import RootRef from '@material-ui/core/RootRef';
import Typography from '@material-ui/core/Typography';
import CompanionWindow from '../containers/CompanionWindow';
import SearchPanelControls from '../containers/SearchPanelControls';
import SearchResults from '../containers/SearchResults';
import uuidV4 from "uuid/v4";

/** */
export class SearchPanel extends Component {
  /** */
  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
  }

  /** */
  render() {
    const {
      classes,
      fetchSearch,
      windowId,
      id,
      query,
      removeSearch,
      searchService,
      suggestedSearches,
      t,
      searchOption
    } = this.props;

    return (
      <RootRef rootRef={this.containerRef}>
        <CompanionWindow
          ariaLabel={t('searchTitle')}
          title={(
            <>
              {t('searchTitle')}
              {
                query && query !== '' && (
                  <Chip
                    className={classes.clearChip}
                    color="secondary"
                    label={t('clearSearch')}
                    onClick={removeSearch}
                    onDelete={removeSearch}
                    size="small"
                    variant="outlined"
                  />
                )
              }
            </>
          )}
          windowId={windowId}
          id={id}
          titleControls={<SearchPanelControls companionWindowId={id} windowId={windowId} />}
        >
          <SearchResults
            containerRef={this.containerRef}
            companionWindowId={id}
            windowId={windowId}
          />
          {
            fetchSearch && suggestedSearches && query === '' && suggestedSearches.map(search => (
              <Typography component="p" key={`${search}${uuidV4()}`} variant="body1">
                <Button className={classes.inlineButton} color="secondary"
                  onClick={() => fetchSearch(`${searchService.id}?q=${search}${searchOption && `&searchOption=${searchOption}`}`, search, searchOption)}>
                  {t('suggestSearch', { query: search })}
                </Button>
              </Typography>
            ))
          }
        </CompanionWindow>
      </RootRef>
    );
  }
}

SearchPanel.propTypes = {
  classes: PropTypes.shape({
    clearChip: PropTypes.string,
    inlineButton: PropTypes.string,
  }),
  fetchSearch: PropTypes.func,
  id: PropTypes.string.isRequired,
  query: PropTypes.string,
  removeSearch: PropTypes.func.isRequired,
  searchService: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  suggestedSearches: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

SearchPanel.defaultProps = {
  classes: {},
  fetchSearch: undefined,
  query: '',
  suggestedSearches: [],
  t: key => key,
};
