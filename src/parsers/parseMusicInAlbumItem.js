import { explicitBadgeText } from '../constants.js';
import { parseDuration } from './utils.js';

export default function parseMusicInAlbumItem(content) {
    let trackId;
    try {
        trackId =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
                .navigationEndpoint.watchEndpoint.videoId;
    } catch (err) { }

    let title;
    try {
        title =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
    } catch (err) { }

    const artists = [];
    try {
        if (
            content.musicResponsiveListItemRenderer.flexColumns[1]
                ?.musicResponsiveListItemFlexColumnRenderer.text.runs
        )
            for (
                let i = 0;
                i <
                content.musicResponsiveListItemRenderer.flexColumns[1]
                    .musicResponsiveListItemFlexColumnRenderer.text.runs.length;
                i += 2
            ) {
                artists.push({
                    name: content.musicResponsiveListItemRenderer.flexColumns[1]
                        .musicResponsiveListItemFlexColumnRenderer.text.runs[i].text,
                });
            }
    } catch (err) { }

    let duration;
    try {
        duration = {
            label:
                content.musicResponsiveListItemRenderer.fixedColumns[0]
                    .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text,
            totalSeconds: parseDuration(
                content.musicResponsiveListItemRenderer.fixedColumns[0]
                    .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text
            ),
        };
    } catch (err) { }
    let isExplicit;
    try {
        isExplicit =
            content.musicResponsiveListItemRenderer?.badges[0]
                .musicInlineBadgeRenderer.icon.iconType === explicitBadgeText;
    } catch (err) {
        isExplicit = false;
    }

    return {
        trackId,
        title,
        artists,
        duration,
        isExplicit,
    };
};