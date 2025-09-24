const search = (documents, searchPattern) => {
    const wordsArray = searchPattern.split(" ");

    // const regex = new RegExp(`\\b${searchPattern}\\b`, "i");
    
    const searchedDocuments = documents
        .filter((doc) => {
            return wordsArray.some((word) => (new RegExp(`\\b${word}\\b`, "i").test(doc.text)));
        })
        .map((doc) => {
            const countMatches = wordsArray.reduce((counter, word) => {
                const matches = doc.text.match(new RegExp(`\\b${word}\\b`, "gi")) || [];
                return counter + matches.length;
            }, 0);

        return { doc, countMatches};
        })
        .sort((a, b) => b.countMatches - a.countMatches)
        .map((item) => item.doc.id);

    return searchedDocuments;
};

export default search;