import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useState } from 'react'
import { IArticleSummary } from '../models/ArticleSummary'
import ArticleSummary from '../components/ArticleSummary'

export default function Home() {

  const [articleUrl, setArticleUrl] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [summaryLoading, setSummaryLoading] = useState<boolean>(false);
  const [articleSummary, setArticleSummary] = useState<IArticleSummary>();

  const handleArticleUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.length > 1) {
      setFormValid(true);
    }
    setArticleUrl(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSummaryLoading(true);

    const articleUrlEncoded = encodeURIComponent(articleUrl);
    const endpoint = `https://alpha.rend.ai/concise?q=${articleUrlEncoded}`;

    const response = await fetch(endpoint);
    const summaryJson = await response.json();
    setArticleSummary(summaryJson);
    setSummaryLoading(false);
  };

  return (
    <>
      <Head>
        <title>Newslight AI</title>
        <meta name="description" content="Shed the light on your news" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">

          <div className="row">
            <div className='col-12 text-center'>
              <h1 className={styles.underline_example}>Newslight AI</h1>
              <form onSubmit={handleSubmit}>
                <div className="col-12">
                  <div className='mb-3'><span>What can I summarize for you today?</span></div>
                  <input type="text" className="form-control" placeholder="Article URL" value={articleUrl} onChange={handleArticleUrlChange}></input>
                  <button type="submit" disabled={!formValid || summaryLoading} className="btn btn-primary mt-2">Summarize</button>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {summaryLoading ?
                (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )
                :
                (
                  <ArticleSummary articleSummary={articleSummary} />
                )
              }
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
