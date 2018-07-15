const fetcher = require('./fetcher');
const Fetch = new fetcher();

module.exports = class User {
    constructor(accessKey) { this.accessKey = accessKey; };

    profile(uname, id) {
        if (!uname && !id) { throw new Error("AniList username or id is missing!"); }
        var start = this.variables(uname, id);
        var query = start[1] + `id name about
        avatar { large medium } bannerImage isFollowing
        options { titleLanguage displayAdultContent airingNotifications profileColor }
        mediaListOptions { scoreFormat rowOrder useLegacyLists sharedTheme sharedThemeEnabled }
        unreadNotificationCount
        siteUrl donatorTier moderatorStatus updatedAt } }`;
        return Fetch.send(query, start[0], this.accessKey);
    };

    stats(uname, id) {
        if (!uname && !id) { throw new Error("AniList username or id is missing!"); }
        var start = this.variables(uname, id);
        var query = start[1] + `stats {
            watchedTime chaptersRead
            activityHistory { date amount level }
            animeStatusDistribution { status amount }
            mangaStatusDistribution { status amount }
            animeScoreDistribution { score amount }
            mangaScoreDistribution { score amount }
            animeListScores { meanScore standardDeviation }
            mangaListScores { meanScore standardDeviation }
            favouredGenresOverview { genre amount meanScore timeWatched }
            favouredGenres { genre amount meanScore timeWatched }
            favouredTags { amount meanScore timeWatched }
            favouredActors { amount meanScore timeWatched }
            favouredStaff { amount meanScore timeWatched }
            favouredStudios { amount meanScore timeWatched }
            favouredYears { year amount meanScore }
            favouredFormats { format amount } } } }`;
        return Fetch.send(query, start[0], this.accessKey);
    };

    all(uname, id) {
        if (!uname && !id) { throw new Error("AniList username or id is missing!"); }
        var start = this.variables(uname, id);
        var query = start[1] + `id name about
        avatar { large medium } bannerImage isFollowing
        stats {
            watchedTime chaptersRead
            activityHistory { date amount level }
            animeStatusDistribution { status amount }
            mangaStatusDistribution { status amount }
            animeScoreDistribution { score amount }
            mangaScoreDistribution { score amount }
            animeListScores { meanScore standardDeviation }
            mangaListScores { meanScore standardDeviation }
            favouredGenresOverview { genre amount meanScore timeWatched }
            favouredGenres { genre amount meanScore timeWatched }
            favouredTags { amount meanScore timeWatched }
            favouredActors { amount meanScore timeWatched }
            favouredStaff { amount meanScore timeWatched }
            favouredStudios { amount meanScore timeWatched }
            favouredYears { year amount meanScore }
            favouredFormats { format amount } } } 
        } options { titleLanguage displayAdultContent airingNotifications profileColor }
        mediaListOptions { scoreFormat rowOrder useLegacyLists sharedTheme sharedThemeEnabled }
        unreadNotificationCount
        siteUrl donatorTier moderatorStatus updatedAt } }`;
        return Fetch.send(query, start[0], this.accessKey);
    }

    variables(uname, id) {
        if (uname.length > 1) { return [{ name: uname }, `query ($name: String) { User (name: $name) { `]; }
        else if (id.length > 1) { return [{id: id}, `query ($id: Int) { User (id: $id) { `]; }
    };
}