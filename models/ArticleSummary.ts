interface IArticleSummary {
    title: string;
    url: string;
    image: string;
    content: {
        bullet_points: Array<string>,
        lean: string;
        lean_why: string;
        summary: string;
        why: string;
    }
}

export type { IArticleSummary } 