import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import Dashboard from "../components/Dashboard.js";

jest.mock("../components/Artist.js", () => {
    return () => {
        return (<span id="mockedArtist">Artist</span>);
    }
});

jest.mock("../components/FollowedArtists.js", () => {
    return () => {
        return (<span id="mockedFollowedArtists">FollowedArtists</span>);
    }
});

describe("The Dashboard Test Suite", () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });
    //https://stackoverflow.com/questions/36211739/invariant-violation-could-not-find-store-in-either-the-context-or-props-of-c
    it("renders the Artist component", () => {
        act(() => {
            render(<Dashboard />, container);
        });
        debugger;
        let mockedArtist = container.querySelector("#mockedArtist");
        expect(mockedArtist.innerHTML).toEqual("Artist");
    });

    it("renders the FollowedArtists component", () => {
        act(() => {
            render(<Dashboard />, container);
        });
        let mockedFollowedArtists = document.querySelector("#mockedFollowedArtists");
        expect(mockedFollowedArtists.innerHTML).toEqual("FollowedArtists");
    });
});