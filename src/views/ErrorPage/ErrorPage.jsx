import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearForm} from '../../store/actions';
import {Helmet} from 'react-helmet';
import { Delighter } from '../../components/atomic';
import { Link } from 'react-router-dom';

import './ErrorPage.scss';

const ErrorPage = ({ initErrorsList }) => {

  const dispatch = useDispatch();
  const formSnapshot = useSelector(store => store.form);

  const handleStartOver = () => {
    dispatch(clearForm());
  };

  const renderDelighters = () => (
    <div className="cts-delighter-container">
      <Delighter
        classes="cts-livehelp"
        url="/contact"
        titleText={
          <>
            Have a question?
            <br />
            We're here to help
          </>
        }
      >
        <p>
          <strong>Chat with us:</strong> LiveHelp
          <br />
          <strong>Call us:</strong> 1-800-4-CANCER
          <br />
          (1-800-422-6237)
        </p>
      </Delighter>

      <Delighter
        classes="cts-which"
        url="/trial-guide"
        titleText={<>Which trials are right for you?</>}
      >
        <p>
          Use the checklist in our guide to gather the information you’ll need.
        </p>
      </Delighter>
    </div>
  );  

  return (
    <>
      <Helmet>
        <title>
          Clinical Trials Search Results - National Cancer Institute
        </title>
        <meta property="og:title" content="Clinical Trials Search Results" />
        
        <meta
          name="description"
          content="Find an NCI-supported clinical trial - Search results"
        />
        <meta
          property="og:description"
          content="Find an NCI-supported clinical trial - Search results"
        />
      </Helmet>
      <article className="results-page">
        <h1>Clinical Trials Search Results</h1>

        <div class="results-page__content">
          <div className="results-page__control --top">
            <div className="results-page__list">
              <div class="results-list invalid-zip">
                <p>
                  Sorry you seem to have entered invalid criteria. Please check the
                  following, and try your search again:
                </p>
                <ul>
                  {initErrorsList.map(item => <li key={item}>{item.fieldName}</li>)}
                </ul>
                <p>
                  For assistance, please contact the NCI Contact Center. You can{' '}
                  <a href="/contact" className="live-help-link">
                    chat online
                  </a>{' '}
                  or call 1-800-4-CANCER (1-800-422-6237).
                </p>
                <p>
                  <Link
                    to={`${formSnapshot.formType === 'basic' ? '/about-cancer/treatment/clinical-trials/search' : '/about-cancer/treatment/clinical-trials/search/advanced'}`}
                    onClick={handleStartOver}
                  >
                    Try a new search
                  </Link>
                </p>
              </div>
              <aside className="results-page__aside --side">
                {renderDelighters()}
              </aside>
            </div>
          </div>
        </div>
        <aside className="results-page__aside --bottom">
          {renderDelighters()}
        </aside>
      </article>
    </>
  );

}

export default ErrorPage;