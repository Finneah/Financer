(function() {
    document.onreadystatechange = function() {
        if (document.readyState == "complete") {
            try {
                require("./../controller/module");
                DATABASE.createDB();
                if (window.location.pathname.indexOf("main.html") != -1) {
                    initMainPage();
                } else if (window.location.pathname.indexOf("newEntry.html") != -1) {
                    initEntryPage();
                }
            } catch (error) {
                const ERRORHANDLER = new (require("./../controller/errorhandling"))();
                ERRORHANDLER.handleError(error, error.message);
            }
        }
    };

    /**
     * @description Load the Modules for mainPage
     */
    function initMainPage() {
        try {
            MAINPAGE = new (require("./mainPage"))();
            MAINPAGE.preparePage();
            translator.loadLanguageKeys("mainPage");
        } catch (error) {
            throw error;
        }
    }
    /**
     * @description Load the Modules for EntryPage
     */
    function initEntryPage() {
        try {
            ENTRYPAGE = new (require("./../renderer/entryPage"))();
            ENTRYPAGE.preparePage();
            translator.loadLanguageKeys("entryPage");
        } catch (error) {
            throw error;
        }
    }
})();
