import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.resrobot.se",
});

export default {
    getSearchResult(query) {
        const key = "6507dfef-eeaa-471b-8ee7-639a4c37ebbf";
        return apiClient.get(
            `/v2/location.name?key=${key}&input=${query}&format=json`
        );
    },
    getLocation({
        lat,
        long
    }) {
        const key = "6507dfef-eeaa-471b-8ee7-639a4c37ebbf";
        return apiClient.get(
            `/v2/location.nearbystops?key=${key}&originCoordLat=${lat}&originCoordLong=${long}&format=json`
        );
    },
    getTimeTable({
        id
    }) {
        const key = "84c5aaec-b571-4fd3-b4ca-36f3f8975283";
        return apiClient.get(
            `/v2/departureBoard?key=${key}&id=${id}&maxJourneys=5&format=json`
        );
    },
};