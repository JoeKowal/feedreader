/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(
  (function() {
    describe("RSS Feeds", function() {

      //test for rss feeds to be defined and not NULL
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      //loop through each feed to make sure URL is defined and not NULL
      it("have valid URL", function() {
        for (let feed of allFeeds) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        }
      });

      //loop through each feed to make sure name is defined and not NULL
      it("have valid name", function() {
        for (let feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        }
      });
    });

    //Menu test suite
    describe("The Menu", function() {
      //test that menu is hidden by default
      it("is hidden", function() {
        const body = document.querySelector("body");
        expect(body.classList.contains("menu-hidden")).toBe(true);
      });

      //test that menu changes visibility when clicked
      it("changes visibility", function() {
        const body = document.querySelector("body");
        const menu = document.querySelector(".menu-icon-link");
        menu.click(); //simulate the click to expose the menu
        expect(body.classList.contains("menu-hidden")).toBe(false); //menu no longer hidden
        menu.click(); //simulate the click to HIDE the menu
        expect(body.classList.contains("menu-hidden")).toBe(true); //menu now hidden
      });
    });

    //Initial Entries test suite
    describe("Initial Entries", function() {
      //make sure the async feed loading has completed
      beforeEach(function(done) {
        loadFeed(0, done);
      });
      //check for an entry in the feed container
      it("are loaded", function() {
        expect($(".feed .entry").length).toBeGreaterThan(0);
      });
    });

    //New Feed Selection test suite
    describe("New Feed Selection", function() {
      var originalFeed, newFeed; //feeds to test

      //load testing feeds
      beforeEach(function(done) {
        originalFeed = $('.feed').children().text();
        // call Feed again and get new
        loadFeed(1, function() {
          newFeed = $('.feed').children().text();
          done();
        });
    });

      //compare the feeds to insure they have changed
      it('content changes', function() {
       
        expect(newFeed).not.toBe(originalFeed);
      });
    });
  })
);
