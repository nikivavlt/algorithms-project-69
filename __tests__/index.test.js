import { expect, describe, test } from '@jest/globals'
import search from '../src/index.js';

describe('search', () => {
  const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
  const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
  const doc3 = { id: 'doc3', text: "I'm your shooter." };
  const docs = [doc1, doc2, doc3];

  test('returns empty array when no documents match', () => {
    const result = search(docs, 'banana');
    expect(result).toEqual([]);
  });

  test('returns empty array when docs list is empty', () => {
    const result = search([], 'shoot');
    expect(result).toEqual([]);
  });

  test('search is case insensitive', () => {
    const result = search(docs, 'Shoot');
    expect(result).toEqual(['doc2', 'doc1']);
  });

  test('matches whole words only (not substrings)', () => {
    const result = search(docs, 'shooter');
    expect(result).toEqual(['doc3']);
  });

  test('ignores punctuation around words', () => {
    const result = search(docs, 'pint');
    expect(result).toEqual(['doc1']);
  });

  test('ranks more relevant documents higher', () => {
    const result = search(docs, 'shoot');
    expect(result).toEqual(['doc2', 'doc1']);
  });

  test('evaluates pattern with multiple words', () => {
    const result = search(docs, 'shoot at me');
    expect(result).toEqual(['doc2', 'doc1']);
  });
});
