'use strict';

import RepoServerActionCreators from '../actions/RepoServerActionCreators';
import {
  request,
  normalizeRepoResponse,
  normalizeRepoArrayResponse
} from '../utils/APIUtils';

export default {
  requestRepo(fullName) {
    request(`repos/${fullName}`).end(function (res) {
      if (!res.ok) {
        RepoServerActionCreators.handleRepoError(res.text);
        return;
      }

      const response = normalizeRepoResponse(res);
      RepoServerActionCreators.handleRepoSuccess(response);
    });
  },

  requestStarredReposPage(login, serverSuppliedUrl) {
    const url = serverSuppliedUrl || `users/${login}/starred`;

    request(url).end(function (res) {
      if (!res.ok) {
        RepoServerActionCreators.handleStarredReposPageError(login, res.text);
        return;
      }

      const response = normalizeRepoArrayResponse(res);
      RepoServerActionCreators.handleStarredReposPageSuccess(login, response);
    });
  }
};
