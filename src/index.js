const search = (documents, searchPattern) => {
  const wordsArray = searchPattern.split(' ');
  const documentsMap = new Map(documents.map((doc) => [doc.id, doc]));

  const indexes = {};
  wordsArray.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');

    indexes[word] = documents
      .filter((doc) => (regex.test(doc.text)))
      .map((doc) => doc.id);
  });

  const results = {};

  wordsArray.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');

    indexes[word].forEach((docId) => {
      const document = documentsMap.get(docId);

      const matches = document.text.match(regex) || [];
      const totalWords = document.text.match(/\w+/g)?.length || 0;

      const idf = Math.log(1 + documents.length / (1 + indexes[word].length));
      const tf = matches.length / totalWords;
      const score = tf * idf;

      if (results[docId]) {
        results[docId] += score;
      } else {
        results[docId] = score;
      }
    });
  });

  const finalResult = Object.entries(results)
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);

  return finalResult;
};

export default search;
