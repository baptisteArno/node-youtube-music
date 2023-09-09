export default function parseRankingData(body) {

    const { contents } = body;

    let popularArtists = [];

    const popularArtistsContent = contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[2]?.musicCarouselShelfRenderer?.contents;

    const countryName = contents?.singleColumnBrowseResultsRenderer?.tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents[0]?.musicShelfRenderer?.subheaders[0]?.musicSideAlignedItemRenderer?.startItems[0]?.musicSortFilterButtonRenderer?.title?.runs[0]?.text

    popularArtistsContent?.forEach((item) => {
        let tmpArtist = {            
            name: item.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
            artistId: item.musicResponsiveListItemRenderer.navigationEndpoint.browseEndpoint.browseId,
            thumbnailUrl: item.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()?.url,
            subscribers: item.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
        }

        popularArtists.push(tmpArtist);
    });

    return {
        isoCode: null,
        nameCountry: countryName,
        artists : popularArtists
    };
};