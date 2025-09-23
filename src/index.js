const search = (documents, searchWord) => {
    const regex = new RegExp(`\\b${searchWord}\\b`, "i");

    const filteredDocuments = documents.filter((doc) => regex.test(doc.text));

    return filteredDocuments.map((doc) => doc.id);
};

export default search;