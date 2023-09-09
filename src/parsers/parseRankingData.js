export default function parseRankingData(body) {

    const { contents } = body;

    let popularVideos = [];
    let popularArtists = [];
    let trending = [];

    const popularVideosContent = contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[1]?.musicCarouselShelfRenderer?.contents;
    const popularArtistsContent = contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[2]?.musicCarouselShelfRenderer?.contents;
    const trendingContent = contents?.singleColumnBrowseResultsRenderer?.tabs[0].tabRenderer.content?.sectionListRenderer?.contents[3]?.musicCarouselShelfRenderer?.contents;

    popularVideosContent?.forEach((item) => {
        let tmpVideo = {
            trackId: item.musicTwoRowItemRenderer.navigationEndpoint.watchEndpoint.videoId,
            title: item.musicTwoRowItemRenderer.title.runs[0].text,
            artists: listArtists(item.musicTwoRowItemRenderer.subtitle.runs),
            thumbnailUrl: item.musicTwoRowItemRenderer.thumbnailRenderer.musicThumbnailRenderer.thumbnail.thumbnails.pop()?.url,
            position: item.musicTwoRowItemRenderer.customIndexColumn.musicCustomIndexColumnRenderer.text.runs[0].text,
        }

        popularVideos.push(tmpVideo);
    });

    popularArtistsContent?.forEach((item) => {
        let tmpArtist = {
            artistId: item.musicResponsiveListItemRenderer.navigationEndpoint.browseEndpoint.browseId,
            name: item.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
            thumbnailUrl: item.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()?.url,
            position: item.musicResponsiveListItemRenderer.customIndexColumn.musicCustomIndexColumnRenderer.text.runs[0].text,
        }

        popularArtists.push(tmpArtist);
    });

    trendingContent?.forEach((item) => {
        let tmpTrending = {
            trackId: item.musicResponsiveListItemRenderer.playlistItemData.videoId,
            title: item.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
            artists: listArtists(item.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs),
            thumbnailUrl: item.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()?.url,
            position: item.musicResponsiveListItemRenderer.customIndexColumn.musicCustomIndexColumnRenderer.text.runs[0].text,
        }

        trending.push(tmpTrending);
    });


    return {
        popularVideos,
        popularArtists,
        trending
    };
};