import { AlbumType, PageType } from '../constants.js';

export default function parseArtistData(
    body,
    artistId
) {
    let name;
    try {
        name = body.header.musicImmersiveHeaderRenderer.title.runs[0].text;
    } catch (e) {
        console.error("Couldn't get artist name", e);
    }

    let description;
    try {
        description =
            body.header.musicImmersiveHeaderRenderer.description.runs[0].text;
    } catch (e) {
        console.error("Couldn't get artist description", e);
    }

    const thumbnails = [];
    try {
        const thumbnailArray =
            body.header.musicImmersiveHeaderRenderer.thumbnail.musicThumbnailRenderer
                .thumbnail.thumbnails;
        thumbnailArray.forEach((e) => {
            thumbnails.push(e);
        });
    } catch (e) {
        console.error("Couldn't get artist thumbnails", e);
    }

    let tracksPlaylistId;
    try {
        tracksPlaylistId =
            body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer
                .content.sectionListRenderer.contents[0].musicShelfRenderer.title
                .runs[0].navigationEndpoint.browseEndpoint.browseId;
    } catch (e) {
        console.error("Couldn't get artist songPlaylistId", e);
    }

    const albums = [];
    const singles = [];
    try {
        const { contents } =
            body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer
                .content.sectionListRenderer;
        for (const shelf of contents) {
            if (shelf.musicCarouselShelfRenderer?.contents) {
                if (
                    shelf.musicCarouselShelfRenderer.contents[0].musicTwoRowItemRenderer
                        .title.runs[0].navigationEndpoint?.browseEndpoint
                        .browseEndpointContextSupportedConfigs
                        .browseEndpointContextMusicConfig.pageType === PageType.album
                )
                    shelf.musicCarouselShelfRenderer.contents.forEach((item) => {
                        const parsedItem = parseArtistsAlbumItem(item);
                        if (parsedItem.type === AlbumType.single) singles.push(parsedItem);
                        else albums.push(parsedItem);
                    });
            }
        }
    } catch (e) {
        console.error("Couldn't get albums", e);
    }

    const suggestedArtists = [];
    try {
        const { contents } =
            body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer
                .content.sectionListRenderer;
        for (let i = contents.length - 1; i >= 0; i -= 1) {
            if (contents[i].musicCarouselShelfRenderer) {
                if (
                    contents[i].musicCarouselShelfRenderer.contents[0]
                        .musicTwoRowItemRenderer.title.runs[0].navigationEndpoint
                        .browseEndpoint.browseEndpointContextSupportedConfigs
                        .browseEndpointContextMusicConfig.pageType === PageType.artist
                )
                    contents[i].musicCarouselShelfRenderer.contents.forEach((v) => {
                        suggestedArtists.push(parseArtistsSuggestionsItem(v));
                    });
                break;
            }
        }
    } catch (e) {
        console.error("Couldn't get suggestedArtists", e);
    }

    let subscribers;
    try {
        subscribers =
            body.header.musicImmersiveHeaderRenderer.subscriptionButton
                .subscribeButtonRenderer.subscriberCountWithSubscribeText.runs[0].text;
    } catch (e) {
        console.error("Couldn't get subscribers", e);
    }
    return {
        artistId,
        name,
        description,
        albums,
        singles,
        thumbnails,
        tracksPlaylistId,
        suggestedArtists,
        subscribers,
    };
};
