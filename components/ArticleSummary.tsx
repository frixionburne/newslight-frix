import { IArticleSummary } from "../models/ArticleSummary"

export interface Props {
    articleSummary: IArticleSummary | undefined
}

const ArticleSummary = (props: Props) => {

    const { articleSummary } = props;

    if (!articleSummary) {
        return (
            <span>No summary yet! Submit an article</span>
        )
    }

    return (
        <>
            <div className="col-12">
                <h2>{articleSummary.title}</h2>
                <div><img src={articleSummary.image} /></div>
            </div>
            <div className="col-12">
                <h3>What Happened</h3>
                <p>{articleSummary.content.summary}</p>
            </div>
            <div className="col-12">
                <h3>What You Need To Know</h3>
                <ul>
                    {articleSummary.content.bullet_points.map(p => (
                        <li>{p}</li>
                    ))}
                </ul>
            </div>
            <div className="col-12">
                <h3>Why It Matters</h3>
                <p>{articleSummary.content.why}</p>
            </div>
            <div className="col-12">
                <h3>Partisan Rating</h3>
                <p><span><b>{articleSummary.content.lean}</b></span> - {articleSummary.content.lean_why}</p>
            </div>
        </>
    )
}
// export default function ArticleSummary() {

export default ArticleSummary