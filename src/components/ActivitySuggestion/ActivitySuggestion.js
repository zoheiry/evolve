import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

import UserDataProvider from '../../containers/UserDataProvider';
import ActivitiesDataProvider from '../../containers/ActivitiesDataProvider';
import Alert from '../Alert';
import ActivityPreview from '../ActivitiesOverview/ActivityPreview';
import Button from '../Button';
import Sessions from '../Sessions';

const CtaWrapper = styled('div')`
  padding: 30px;
`;

const AlertBodyWrapper = styled('div')`
  padding: 15px 0;
  width: 100%;
`;

const LastSession = styled('div')`
  text-align: left;
  > div:first-child {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

const EmptyStateSession = styled('div')`
  font-weight: 300;
  text-align: left;
`;

class ActivitySuggestion extends PureComponent {
  state = {
    showAlert: false
  }

  handleShowAlert = () => {
    this.setState({ showAlert: true });
  }

  handleHideAlert = () => {
    this.setState({ showAlert: false });
  }

  renderAlertBody = (suggestedActivity = {}) => {
    return (
      <AlertBodyWrapper>
        <ActivityPreview
          name={suggestedActivity.name}
          priority={suggestedActivity.priority}
          id={suggestedActivity.id}
          active={!!suggestedActivity.activeSession}
        />
        {suggestedActivity.sessions.length
          ? (
            <LastSession>
              <div>Last session:</div>
              <Sessions sessionsList={suggestedActivity.sessions} limit={1} />
            </LastSession>
          ) : (
            <EmptyStateSession>You have not put it any time on this activity yet</EmptyStateSession>
          )
        }
      </AlertBodyWrapper>
    )
  }

  render() {
    const { theme } = this.props;

    return (
      <UserDataProvider
        render={({ user }) => (
          <ActivitiesDataProvider
            render={({ getSuggestedActivity, skipSuggestedActivity, activities }) => {
              const suggestedActivity = activities.suggestedActivity;
              if (!suggestedActivity.id || !this.state.showAlert) {
                return (
                  <CtaWrapper>
                    <Button
                      fluid
                      color={theme.success}
                      loading={suggestedActivity.isFetching}
                      onClick={() => {
                        this.handleShowAlert();
                        getSuggestedActivity(user.id);
                      }}
                    >
                      Suggest an activity
                    </Button>
                  </CtaWrapper>
                );
              }
              return (
                <Alert
                  body={this.renderAlertBody(suggestedActivity)}
                  fluid
                  buttonText="Skip"
                  onAction={() => skipSuggestedActivity(user.id, suggestedActivity.id)}
                  onClickOutside={this.handleHideAlert}
                />
              );
            }}
          />
        )}
      />
    );
  }
}

ActivitySuggestion.propTypes = {
  theme: PropTypes.object,
}

export default withTheme(ActivitySuggestion);
