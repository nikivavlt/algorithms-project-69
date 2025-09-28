const search = (documents, searchPattern) => {
    const wordsArray = searchPattern.split(" ");

    const indexes = wordsArray.reduce((acc, word) => {
        const filteredDocuments = [];

        documents.forEach((doc) => {
            if ((new RegExp(`\\b${word}\\b`, "i").test(doc.text))) {
                const matches = doc.text.match(new RegExp(`\\b${word}\\b`, "gi")) || [];
                filteredDocuments.push({ doc, countMatches: matches.length });
            }
        });

        filteredDocuments.sort((a, b) => b.countMatches - a.countMatches);

        const finalResult = filteredDocuments.map((item) => item.doc.id);
        acc[word] = finalResult;
        return acc;
    }, {});

    const results = {};

    wordsArray.forEach((word) => {
        indexes[word].map((docId) => {
            const idf = documents.length / 1 + indexes[word].length;
            
            const document = documents.find((doc) => doc.id === docId);
            
            const matches = document.text.match(new RegExp(`\\b${word}\\b`, "gi")) || [];
            
            const tf = matches.length / document.text.split(' ').length;
            
            const score = tf * idf;
            
            if (results[docId]) {
                results[docId] += score;
            } else {
                results[docId] = score;
            }
        })
    })

    const finalResult = Object.entries(results).sort((a, b) => b[1] - a[1]).map((item) => item[0]);
    // console.log({ finalResult });
    return finalResult;

    // const regex = new RegExp(`\\b${searchPattern}\\b`, "i");
    
    // const searchedDocuments = documents
    //     .filter((doc) => {
    //         return wordsArray.some((word) => (new RegExp(`\\b${word}\\b`, "i").test(doc.text)));
    //     })
    //     .map((doc) => {
    //         const countMatches = wordsArray.reduce((counter, word) => {
    //             const matches = doc.text.match(new RegExp(`\\b${word}\\b`, "gi")) || [];
    //             return counter + matches.length;
    //         }, 0);

    //     return { doc, countMatches};
    //     })
    //     .sort((a, b) => b.countMatches - a.countMatches)
    //     .map((item) => item.doc.id);

    // return searchedDocuments;
};

export default search;