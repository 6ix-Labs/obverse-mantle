import React from "react";
import { Helmet } from "react-helmet-async";

interface PreviewMetaProps {
    title: string;
    description: string;
    pageUrl: string;
    previewImageUrl?: string;
}

const PreviewMeta: React.FC<PreviewMetaProps> = ({ title, description, pageUrl, previewImageUrl }) => {
    const hasPreviewImage = typeof previewImageUrl === "string" && previewImageUrl.trim().length > 0;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />

            {/*
        Some crawlers do not execute SPA JavaScript, so runtime head updates may be skipped.
        If SSR/prerender exists in this project, mirror the same tags there as well.
      */}
            {hasPreviewImage && (
                <>
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:url" content={pageUrl} />
                    <meta property="og:image" content={previewImageUrl} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={title} />
                    <meta name="twitter:description" content={description} />
                    <meta name="twitter:image" content={previewImageUrl} />
                </>
            )}
        </Helmet>
    );
};

export default PreviewMeta;